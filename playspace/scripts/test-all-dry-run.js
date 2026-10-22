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
const regex = /(?:[ \t]*<!--\s*Docked Sticky Action Bar\s*-->\s*\r?\n)?[ \t]*<aside\s+class="ps-sticky-bar"[\s\S]*?<\/aside>\s*\r?\n?/;

let successCount = 0;
let failCount = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('ps-sticky-bar') || content.includes('psStickyBar')) {
    const replaced = content.replace(regex, '');
    if (replaced.includes('ps-sticky-bar') || replaced.includes('psStickyBar')) {
      console.error('Failed to completely clean:', f);
      failCount++;
    } else {
      successCount++;
    }
  }
});

console.log(`Dry run results: ${successCount} files cleaned cleanly, ${failCount} failures.`);
