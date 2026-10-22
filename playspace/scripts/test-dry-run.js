const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../index.html');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /(?:[ \t]*<!--\s*Docked Sticky Action Bar\s*-->\s*\r?\n)?[ \t]*<aside\s+class="ps-sticky-bar"[\s\S]*?<\/aside>\s*\r?\n?/;
const match = content.match(regex);
console.log('Match found:', !!match);
if (match) {
  console.log('Matched text:\n', match[0]);
  const newContent = content.replace(regex, '');
  console.log('Still has sticky bar?:', newContent.includes('ps-sticky-bar') || newContent.includes('psStickyBar'));
  console.log('Back to top intact?:', newContent.includes('ps-back-to-top'));
  console.log('Scripts intact?:', newContent.includes('assets/js/theme.js'));
}
