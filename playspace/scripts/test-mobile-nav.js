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
    '--remote-debugging-port=9228',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9228/json/list');
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();
    let loadResolve = null;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Page.loadEventFired') {
        if (loadResolve) {
          const r = loadResolve;
          loadResolve = null;
          r();
        }
      }
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

    console.log('--- Testing Mobile Navbar Drawer & Interactions ---');

    for (const w of [320, 360, 375, 390, 414, 430, 480, 600, 768, 820]) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: w,
        height: 667,
        deviceScaleFactor: 1,
        mobile: true
      });

      const loadPromise = new Promise(r => loadResolve = r);
      await send('Page.navigate', { url: `http://localhost:${PORT}/index.html` });
      await loadPromise;
      // Extra short wait for layout & fonts
      await new Promise(r => setTimeout(r, 200));

      const testResult = await send('Runtime.evaluate', {
        expression: `(() => {
          const toggle = document.querySelector('.ps-mobile-toggle');
          const navMenu = document.querySelector('.ps-nav-menu');
          if (!toggle) return { error: 'No mobile toggle found in document: ' + document.title + ' URL: ' + location.href };
          
          const toggleStyle = window.getComputedStyle(toggle);
          const visible = toggleStyle.display !== 'none';
          
          // Click toggle
          toggle.click();
          const isOpenAfterClick = navMenu.classList.contains('open');
          
          const menuRect = navMenu.getBoundingClientRect();
          const fitsScreen = menuRect.right <= window.innerWidth + 1;

          // Test dropdown accordion inside mobile menu
          const dropdownItem = navMenu.querySelector('.ps-nav-item:has(.ps-dropdown-menu)');
          let dropdownWorked = false;
          let dropdownDisplay = '';
          if (dropdownItem) {
            const link = dropdownItem.querySelector('.ps-nav-link');
            const menu = dropdownItem.querySelector('.ps-dropdown-menu');
            if (link && menu) {
              link.click();
              dropdownWorked = dropdownItem.classList.contains('active');
              dropdownDisplay = window.getComputedStyle(menu).display;
            }
          }

          return {
            width: window.innerWidth,
            toggleVisible: visible,
            isOpenAfterClick,
            menuWidth: Math.round(menuRect.width),
            menuRight: Math.round(menuRect.right),
            fitsScreen,
            dropdownWorked,
            dropdownDisplay
          };
        })()`,
        returnByValue: true
      });

      console.log(`[${w}px] Mobile menu test:`, testResult.result.value);
    }

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    edge.kill();
    server.close();
  }
});
