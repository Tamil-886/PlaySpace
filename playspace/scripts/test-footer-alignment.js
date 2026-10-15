const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const layoutCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'layout.css'), 'utf8');
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');

console.log('--- Testing Footer Alignment & Contact Column Wrap Prevention ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  PASS: ${message}`);
    passed++;
  } else {
    console.error(`  FAIL: ${message}`);
    failed++;
  }
}

// 1. Grid Proportions in layout.css
assert(layoutCss.includes('.ps-footer-grid {'), 'layout.css defines .ps-footer-grid');
const gridColMatch = layoutCss.match(/\.ps-footer-grid\s*\{[^}]*grid-template-columns:\s*([^;]+);/);
assert(gridColMatch !== null, 'layout.css specifies grid-template-columns for .ps-footer-grid');
if (gridColMatch) {
  const colRule = gridColMatch[1];
  assert(colRule.includes('2fr') || colRule.includes('1.9'), `Contact column (Col 5) is given expanded width for hours and phone: ${colRule}`);
}

// 2. Prevent line break on phone numbers
assert(layoutCss.includes('.ps-footer-contact a[href^="tel"]') && layoutCss.includes('white-space: nowrap;'), 'layout.css sets white-space: nowrap on phone links');

// 3. Operating Hours formatting and wrap prevention
assert(layoutCss.includes('.ps-hours-box div > div') && layoutCss.includes('white-space: nowrap;'), 'layout.css forces white-space: nowrap on all operating hours schedule rows');
assert(layoutCss.includes('.ps-hours-box strong') && layoutCss.includes('white-space: nowrap;'), 'layout.css forces white-space: nowrap on operating hours header');

// 4. HTML structure verification across footer
assert(indexHtml.includes('class="ps-footer-grid"'), 'index.html contains .ps-footer-grid');
assert(indexHtml.includes('class="ps-hours-box"'), 'index.html contains .ps-hours-box');
assert(indexHtml.includes('Mon–Thu: 10:00 AM – 8:00 PM'), 'index.html contains exact Mon-Thu hours');
assert(indexHtml.includes('Fri–Sat: 9:00 AM – 10:00 PM'), 'index.html contains exact Fri-Sat hours');
assert(indexHtml.includes('Sun: 10:00 AM – 7:00 PM'), 'index.html contains exact Sun hours');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
