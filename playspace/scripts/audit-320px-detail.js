const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

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

server.listen(0, async () => {
  const PORT = server.address().port;

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9230',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9230/json/list');
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
    await send('DOM.enable');

    await send('Emulation.setDeviceMetricsOverride', {
      width: 320,
      height: 600,
      deviceScaleFactor: 1,
      mobile: true
    });

    // Test all html files
    function findHtml(dir) {
      let res = [];
      for (const item of fs.readdirSync(dir)) {
        const full = path.join(dir, item);
        if (fs.statSync(full).isDirectory()) {
          res = res.concat(findHtml(full));
        } else if (item.endsWith('.html')) {
          res.push(path.relative(playspaceDir, full).replace(/\\/g, '/'));
        }
      }
      return res;
    }

    const allPages = findHtml(playspaceDir);
    console.log(`Auditing ${allPages.length} pages at exactly 320px width...`);

    const detailedIssues = [];

    for (const page of allPages) {
      await send('Page.navigate', { url: `http://localhost:${PORT}/${page}` });
      await new Promise(r => setTimeout(r, 400));

      const res = await send('Runtime.evaluate', {
        expression: `(() => {
          const winWidth = window.innerWidth;
          const docScrollW = document.documentElement.scrollWidth;
          const bodyScrollW = document.body.scrollWidth;
          const maxScrollW = Math.max(docScrollW, bodyScrollW);

          const issues = [];
          
          // Check for horizontal overflow of elements
          const allEls = Array.from(document.querySelectorAll('body *'));
          for (const el of allEls) {
            // Skip closed menus / dialogs / hidden elements
            if (el.closest('.ps-nav-menu:not(.open)') || el.closest('.ps-modal:not(.open)') || el.closest('.ps-lightbox:not(.open)') || el.closest('.ps-cart-drawer:not(.open)')) continue;
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
            if (style.overflowX === 'auto' || style.overflowX === 'scroll') continue;
            if (el.closest('.ps-table-wrap, .table-responsive, .ps-comparison-table-wrap, .ps-schedule-grid')) continue;

            const r = el.getBoundingClientRect();
            // Check if sticking past 320px
            if (r.right > winWidth + 1.5 && r.width > 0 && r.height > 0) {
              issues.push({
                type: 'overflow-right',
                tag: el.tagName,
                cls: (el.className || '').toString().slice(0, 45),
                id: el.id || '',
                right: Math.round(r.right),
                width: Math.round(r.width),
                text: (el.innerText || '').slice(0, 25).trim()
              });
            }

            // Check if element has fixed width > 320
            const styleWidth = el.style.width || '';
            const styleMinWidth = el.style.minWidth || '';
            if (parseInt(styleWidth) > 320 || parseInt(styleMinWidth) > 320) {
              issues.push({
                type: 'inline-fixed-width',
                tag: el.tagName,
                cls: (el.className || '').toString().slice(0, 45),
                styleWidth,
                styleMinWidth
              });
            }
          }

          // Test navbar layout at 320px
          const navbar = document.querySelector('.ps-navbar');
          let navbarWrapped = false;
          let navbarHeight = 0;
          if (navbar) {
            navbarHeight = navbar.getBoundingClientRect().height;
            if (navbarHeight > 90) navbarWrapped = true;
          }

          return {
            page: location.pathname,
            maxScrollW,
            hasDocOverflow: maxScrollW > winWidth + 1,
            navbarWrapped,
            navbarHeight,
            issues: issues.slice(0, 6)
          };
        })()`,
        returnByValue: true
      });

      const data = res.result && res.result.value;
      if (data && (data.hasDocOverflow || data.issues.length > 0 || data.navbarWrapped)) {
        detailedIssues.push({ page, ...data });
        process.stdout.write('!');
      } else {
        process.stdout.write('.');
      }
    }

    console.log(`\n\nFound issues on ${detailedIssues.length} pages at 320px:`);
    detailedIssues.forEach(di => {
      console.log(`\nPage: ${di.page} (scrollWidth: ${di.maxScrollW})`);
      if (di.navbarWrapped) console.log(`  NAVBAR WRAPPED: height = ${di.navbarHeight}px`);
      di.issues.forEach(iss => {
        console.log(`  [${iss.type}] <${iss.tag} class="${iss.cls}" id="${iss.id}"> right=${iss.right} w=${iss.width} txt="${iss.text}"`);
      });
    });

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    edge.kill();
    server.close();
  }
});
