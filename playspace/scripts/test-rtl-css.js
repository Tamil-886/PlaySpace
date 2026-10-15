const fs = require('fs');
const path = require('path');

const rtlCss = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'rtl.css'), 'utf8');
const layoutCss = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'layout.css'), 'utf8');

console.log('Testing CSS rules for ps-navbar in rtl.css:');
console.log('Contains [dir="rtl"] .ps-navbar:', rtlCss.includes('[dir="rtl"] .ps-navbar'));

// Find lines around ps-navbar in rtl.css
const lines = rtlCss.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('ps-navbar')) {
    console.log(`Line ${idx + 1}: ${line}`);
    console.log(`Line ${idx + 2}: ${lines[idx + 1]}`);
    console.log(`Line ${idx + 3}: ${lines[idx + 2]}`);
  }
});
