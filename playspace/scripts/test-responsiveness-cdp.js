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
  console.log('Static server started on port ' + PORT);

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9223/json/list');
    const tabs = await listRes.json();
    const wsUrl = tabs[0].webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
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
    await send('DOM.enable');

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
      'parent/dashboard.html',
      'parent/book-session.html',
      'admin/dashboard.html',
      'admin/bookings.html'
    ];

    const widths = [320, 360, 375, 390, 414, 430, 480, 600, 768, 820, 1024, 1280];

    console.log('Testing ' + testPages.length + ' pages across ' + widths.length + ' viewports...');

    const issues = [];

    for (const page of testPages) {
      await send('Page.navigate', { url: `http://localhost:${PORT}/${page}` });
      await new Promise(r => setTimeout(r, 600));

      for (const w of widths) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: w,
          height: 800,
          deviceScaleFactor: 1,
          mobile: w < 992
        });
        await new Promise(r => setTimeout(r, 120));

        const evalRes = await send('Runtime.evaluate', {
          expression: `(() => {
            const docWidth = document.documentElement.scrollWidth;
            const winWidth = window.innerWidth;
            const diff = docWidth - winWidth;
            if (diff <= 1) return { overflow: false };

            // Find elements overflowing
            const overflowingEls = [];
            const all = document.querySelectorAll('*');
            for (const el of all) {
              const r = el.getBoundingClientRect();
              if (r.right > winWidth + 1.5 && r.width > 0 && r.height > 0) {
                let p = el.parentElement;
                let clipped = false;
                while (p && p !== document.body && p !== document.documentElement) {
                  const s = window.getComputedStyle(p);
                  if (s.overflowX === 'hidden' || s.overflowX === 'clip' || s.overflowX === 'auto' || s.overflowX === 'scroll') {
                    clipped = true;
                    break;
                  }
                  p = p.parentElement;
                }
                if (!clipped) {
                  overflowingEls.push({
                    tag: el.tagName,
                    cls: el.className ? String(el.className).slice(0, 50) : '',
                    id: el.id || '',
                    right: Math.round(r.right),
                    width: Math.round(r.width)
                  });
                }
              }
            }
            return {
              overflow: true,
              diff,
              docWidth,
              winWidth,
              overflowingEls: overflowingEls.slice(0, 5)
            };
          })()`,
          returnByValue: true
        });

        if (evalRes.result && evalRes.result.value && evalRes.result.value.overflow) {
          issues.push({
            page,
            width: w,
            ...evalRes.result.value
          });
          process.stdout.write('X');
        } else {
          process.stdout.write('.');
        }
      }
      console.log(' - ' + page);
    }

    console.log('\n\n=== ISSUES DETECTED (' + issues.length + ') ===');
    issues.forEach(iss => {
      console.log(`[${iss.width}px] ${iss.page}: docWidth=${iss.docWidth}, winWidth=${iss.winWidth}, diff=${iss.diff}px`);
      iss.overflowingEls.forEach(el => {
        console.log(`   -> <${el.tag} class="${el.cls}" id="${el.id}"> width=${el.width} right=${el.right}`);
      });
    });

    ws.close();
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    edge.kill();
    server.close();
  }
});
