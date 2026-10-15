const fs = require('fs');
const path = require('path');
function check(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) check(p);
    else if (f.name.endsWith('.html') || f.name.endsWith('.js')) {
      const c = fs.readFileSync(p, 'utf8');
      if (c.includes('attraction-details')) {
        console.log(p);
      }
    }
  }
}
check('playspace');
check('scripts');
