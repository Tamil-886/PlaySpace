const fs = require('fs');
const path = require('path');

for (const f of fs.readdirSync('playspace/pages')) {
  if (f.endsWith('.html')) {
    const c = fs.readFileSync(path.join('playspace/pages', f), 'utf8');
    const r = /href="([^"#]*attraction[^"#]*)(#[^"]*)?"/g;
    let m;
    while ((m = r.exec(c)) !== null) {
      console.log(f + ' -> ' + m[0]);
    }
  }
}
