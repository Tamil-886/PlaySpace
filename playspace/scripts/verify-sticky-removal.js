const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) res = res.concat(walk(full));
    else if (f.endsWith('.html')) res.push(full);
  });
  return res;
}

const files = walk(path.join(__dirname, '..'));
const matches = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('ps-sticky-bar') || content.includes('psStickyBar')) {
    const regex = /(<!--\s*Docked Sticky Action Bar\s*-->\s*)?<aside\s+class="ps-sticky-bar"[\s\S]*?<\/aside>/;
    const m = content.match(regex);
    matches.push({ file: f, matched: !!m });
  }
});

console.log('Total files with sticky bar:', matches.length);
console.log('Matched files:', matches.filter(m => m.matched).length);
if (matches.some(m => !m.matched)) {
  console.log('Unmatched files:', matches.filter(m => !m.matched).map(m => m.file));
}
