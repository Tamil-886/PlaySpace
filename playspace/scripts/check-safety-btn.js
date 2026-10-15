const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
  let fp = path.join(path.resolve('playspace'), decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) fp = path.join(fp, 'index.html');
  if (!fs.existsSync(fp)) { res.writeHead(404); return res.end(); }
  res.writeHead(200);
  fs.createReadStream(fp).pipe(res);
});

server.listen(0, async () => {
  const PORT = server.address().port;
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9232',
    '--disable-gpu',
    '--no-first-run',
    'about:blank'
  ]);
  await new Promise(r => setTimeout(r, 1200));
  const listRes = await fetch('http://127.0.0.1:9232/json/list');
  const tabs = await listRes.json();
  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
  let id = 1;
  const cbs = new Map();
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (cbs.has(m.id)) { cbs.get(m.id)(m.result); cbs.delete(m.id); }
  };
  function send(method, params = {}) {
    return new Promise(r => {
      const mid = id++;
      cbs.set(mid, r);
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  }
  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:' + PORT + '/index.html' });
  await new Promise(r => setTimeout(r, 1500));

  const styles = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('a[href*="safety-guidelines.html"]');
      if (!btn) return { error: 'not found', title: document.title, totalLinks: document.querySelectorAll('a').length };
      const s = window.getComputedStyle(btn);
      return {
        text: btn.innerText.trim(),
        color: s.color,
        backgroundColor: s.backgroundColor,
        borderColor: s.borderColor,
        borderWidth: s.borderWidth,
        borderStyle: s.borderStyle,
        parentBg: window.getComputedStyle(btn.parentElement).backgroundColor,
        grandparentBg: window.getComputedStyle(btn.closest('.ps-occupancy-banner-grid')).backgroundColor
      };
    })()`,
    returnByValue: true
  });
  console.log('Button computed styles in Light Mode:', styles.result.value);

  ws.close();
  edge.kill();
  server.close();
});
