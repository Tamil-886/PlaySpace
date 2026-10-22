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

const rootDir = path.join(__dirname, '..');
const files = walk(rootDir);
const regex = /(?:[ \t]*<!--\s*Docked Sticky Action Bar\s*-->\s*\r?\n)?[ \t]*<aside\s+class="ps-sticky-bar"[\s\S]*?<\/aside>\s*\r?\n?/;

let modifiedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('ps-sticky-bar') || content.includes('psStickyBar')) {
    const newContent = content.replace(regex, '');
    if (newContent.includes('ps-sticky-bar') || newContent.includes('psStickyBar')) {
      console.error('Error: Failed to completely remove sticky bar from:', f);
      process.exit(1);
    }
    fs.writeFileSync(f, newContent, 'utf8');
    modifiedCount++;
  }
});

console.log(`Successfully removed sticky action bar from ${modifiedCount} HTML files.`);
