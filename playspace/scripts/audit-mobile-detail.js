const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8089;
const playspaceDir = path.resolve(__dirname, '..');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(playspaceDir, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    return res.end('Not found');
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9224/json/list');
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        cb(msg.result, msg.error);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        callbacks.set(msgId, (result, err) => {
          if (err) reject(err);
          else resolve(result);
        });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await new Promise(r => ws.onopen = r);
    await send('Page.enable');

    const testPages = [
      'index.html',
      'home-2.html',
      'pages/about.html',
      'pages/attractions.html',
      'pages/attraction-mega-trampoline-arena.html',
      'pages/pricing-passes.html',
      'pages/pass-booking.html',
      'pages/birthday-parties.html',
      'pages/birthday-booking.html',
      'pages/birthday-details.html',
      'pages/group-events.html',
      'pages/gallery.html',
      'pages/blog.html',
      'pages/blog-details.html',
      'pages/contact.html',
      'pages/booking.html',
      'pages/cart.html',
      'pages/login.html',
      'pages/register.html',
      'pages/safety-guidelines.html',
      'pages/faq.html',
      'pages/testimonials.html',
      'parent/dashboard.html',
      'parent/book-session.html',
      'admin/dashboard.html',
      'admin/bookings.html'
    ];

    const widths = [320, 360, 375, 390, 414, 430, 480, 600, 768, 820];
    const clippedIssues = [];

    for (const page of testPages) {
      await send('Page.navigate', { url: `http://localhost:${PORT}/${page}` });
      await new Promise(r => setTimeout(r, 600));

      for (const w of widths) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: w,
          height: 800,
          deviceScaleFactor: 1,
          mobile: true
        });
        await new Promise(r => setTimeout(r, 120));

        const res = await send('Runtime.evaluate', {
          expression: `(() => {
            const winWidth = window.innerWidth;
            const els = Array.from(document.querySelectorAll('body *'));
            const overflowing = [];
            for (const el of els) {
              if (el.closest('.ps-nav-menu:not(.open)') || el.closest('.ps-modal:not(.open)') || el.closest('.ps-lightbox:not(.open)')) continue;
              const style = window.getComputedStyle(el);
              if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
              
              if (style.overflowX === 'auto' || style.overflowX === 'scroll') continue;
              if (el.closest('.ps-table-wrap, .table-responsive, .ps-comparison-table-wrap, .ps-schedule-grid')) continue;

              const r = el.getBoundingClientRect();
              if (r.right > winWidth + 2 && r.width > 0 && r.height > 0) {
                overflowing.push({
                  tag: el.tagName,
                  cls: (el.className || '').toString().slice(0, 40),
                  text: (el.innerText || '').slice(0, 30).trim(),
                  right: Math.round(r.right),
                  width: Math.round(r.width)
                });
              }
            }
            return overflowing;
          })()`,
          returnByValue: true
        });

        const list = res.result && res.result.value ? res.result.value : [];
        if (list.length > 0) {
          clippedIssues.push({ page, width: w, items: list.slice(0, 6) });
        }
      }
    }

    console.log(`Found ${clippedIssues.length} width/page combinations with cut-off elements:`);
    clippedIssues.forEach(ci => {
      console.log(`\n[${ci.width}px] ${ci.page}:`);
      ci.items.forEach(it => {
        console.log(`   <${it.tag} class="${it.cls}"> width=${it.width} right=${it.right} text="${it.text}"`);
      });
    });

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    edge.kill();
    server.close();
  }
});
