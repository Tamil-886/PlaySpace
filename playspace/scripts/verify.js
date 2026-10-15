const fs = require('fs');
const path = require('path');


let errors = 0;
let totalFiles = 0;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.name.endsWith('.html')) {
      totalFiles++;
      const content = fs.readFileSync(fullPath, 'utf8');
      const regex = /href="([^"#]+)"/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const target = match[1];
        if (target.startsWith('http') || target.startsWith('tel:') || target.startsWith('mailto:') || target.startsWith('javascript:')) continue;
        const cleanTarget = target.split('?')[0];
        const resolved = path.resolve(dir, cleanTarget);
        if (!fs.existsSync(resolved)) {
          console.warn(`${fullPath}: Missing link target -> ${target} (resolved: ${resolved})`);
          errors++;
        }
      }
    }
  }
}

scanDir('playspace');

if (errors === 0) {
  console.log(`SUCCESS: All internal links across all ${totalFiles} HTML files resolve to real existing files!`);
} else {
  console.log(`Found ${errors} unresolved links across ${totalFiles} files.`);
}
