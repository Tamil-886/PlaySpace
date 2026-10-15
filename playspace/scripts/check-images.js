const fs = require('fs');
const path = require('path');
const https = require('https');

const urls = new Set();

function findImages(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git') findImages(full);
    } else if (f.endsWith('.html') || f.endsWith('.js')) {
      const txt = fs.readFileSync(full, 'utf8');
      const re = /https:\/\/images\.unsplash\.com\/[^\s"'<>]+/g;
      let m;
      while ((m = re.exec(txt)) !== null) {
        urls.add(m[0]);
      }
    }
  });
}
findImages('playspace');
findImages('scripts');

console.log('Total unique Unsplash image URLs:', urls.size);

const list = Array.from(urls);
let checked = 0;
const results = { ok: [], failed: [] };

list.forEach(u => {
  https.get(u, res => {
    checked++;
    if (res.statusCode >= 200 && res.statusCode < 400) {
      results.ok.push(u);
    } else {
      results.failed.push({ url: u, status: res.statusCode });
    }
    if (checked === list.length) {
      console.log('--- CHECK RESULTS ---');
      console.log('OK count:', results.ok.length);
      console.log('FAILED count:', results.failed.length);
      results.failed.forEach(f => console.log('BROKEN:', f.status, f.url));
      process.exit(0);
    }
  }).on('error', e => {
    checked++;
    results.failed.push({ url: u, error: e.message });
    if (checked === list.length) {
      console.log('--- CHECK RESULTS ---');
      console.log('OK count:', results.ok.length);
      console.log('FAILED count:', results.failed.length);
      results.failed.forEach(f => console.log('BROKEN:', f.status || f.error, f.url));
      process.exit(0);
    }
  });
});
