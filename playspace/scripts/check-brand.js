const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.html')) {
      const c = fs.readFileSync(p, 'utf8');
      const m = c.match(/<a[^>]*class="[^"]*ps-navbar-brand[^"]*"[^>]*>([\s\S]*?)<\/a>/);
      if (m) {
        const inner = m[1].trim();
        if (!inner.includes('logo.svg')) {
          console.log(p, '-> non-standard brand:', inner);
        }
      }
    }
  }
}

walk(path.join(__dirname, '..'));
console.log('Brand check complete.');
