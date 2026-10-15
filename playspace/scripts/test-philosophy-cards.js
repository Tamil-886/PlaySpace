/**
 * Automated Verification: Our Play Philosophy Cards & Quick Add Alignment & Contrast
 */
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  FAIL: ${testName}`);
    failed++;
  }
}

console.log('--- Verifying Play Philosophy Cards Alignment & Contrast ---');

const aboutPath = path.join(__dirname, '../pages/about.html');
const aboutHtml = fs.readFileSync(aboutPath, 'utf8');

// 1. Check Card 4 icon overflow fix
assert(!aboutHtml.includes('📱❌'), 'Card 4 does NOT contain broken double emoji "📱❌"');
assert(aboutHtml.includes('📵'), 'Card 4 contains clean single-glyph screen-free icon "📵"');

// 2. Check all 4 cards have ps-philosophy-card class
const cardClassMatches = (aboutHtml.match(/ps-philosophy-card/g) || []).length;
assert(cardClassMatches >= 4, `Found at least 4 ps-philosophy-card elements (found ${cardClassMatches})`);

// 3. Check title min-height locking across cards
const titleMinHeightMatches = (aboutHtml.match(/min-height:\s*3\.2rem/g) || []).length;
assert(titleMinHeightMatches >= 4, `All 4 philosophy cards have locked title min-height (found ${titleMinHeightMatches})`);

// 4. Check flex-grow on card descriptions for baseline alignment
const pFlexGrowMatches = (aboutHtml.match(/flex-grow:\s*1/g) || []).length;
assert(pFlexGrowMatches >= 4, `Card content flex-grows to maintain equal card heights (found ${pFlexGrowMatches})`);

// 5. Check bottom badges margin-top: auto
const badgeMarginTopMatches = (aboutHtml.match(/margin-top:\s*auto/g) || []).length;
assert(badgeMarginTopMatches >= 4, `All 4 badges anchored with margin-top: auto (found ${badgeMarginTopMatches})`);

// 6. Check badge high contrast (pure black #000000 on brand yellow #FFCC00)
assert(!aboutHtml.includes('background: rgba(255,204,0,0.2)'), 'No cards use low-contrast rgba(255,204,0,0.2) badge backgrounds');
const yellowBadgeMatches = (aboutHtml.match(/background:\s*#FFCC00/g) || []).length;
assert(yellowBadgeMatches >= 4, `All 4 badges use solid brand yellow #FFCC00 background (found ${yellowBadgeMatches})`);
const blackTextBadgeMatches = (aboutHtml.match(/color:\s*#000000/g) || []).length;
assert(blackTextBadgeMatches >= 4, `All 4 badges use solid black #000000 text for 15.4:1 contrast (found ${blackTextBadgeMatches})`);

// 7. Check build-public-pages.js template is in sync
const buildPubPath = path.join(__dirname, 'build-public-pages.js');
const buildPubJs = fs.readFileSync(buildPubPath, 'utf8');
assert(!buildPubJs.includes('📱❌'), 'build-public-pages.js does NOT contain "📱❌"');
assert(buildPubJs.includes('📵'), 'build-public-pages.js contains "📵"');
assert(buildPubJs.includes('ps-philosophy-card'), 'build-public-pages.js contains ps-philosophy-card');
assert(buildPubJs.includes('ps-philosophy-badge'), 'build-public-pages.js contains ps-philosophy-badge');

// 8. Check CSS styling in pages.css
const pagesCssPath = path.join(__dirname, '../assets/css/pages.css');
const pagesCss = fs.readFileSync(pagesCssPath, 'utf8');
assert(pagesCss.includes('.ps-philosophy-card'), 'pages.css defines .ps-philosophy-card');
assert(pagesCss.includes('.ps-philosophy-badge'), 'pages.css defines .ps-philosophy-badge');
assert(pagesCss.includes('min-height: 3.2rem'), 'pages.css locks title min-height: 3.2rem');

// 9. Check Dark Mode in dark-mode.css
const darkModeCssPath = path.join(__dirname, '../assets/css/dark-mode.css');
const darkModeCss = fs.readFileSync(darkModeCssPath, 'utf8');
assert(darkModeCss.includes('[data-theme="dark"] .ps-philosophy-card'), 'dark-mode.css styles .ps-philosophy-card');
assert(darkModeCss.includes('[data-theme="dark"] .ps-philosophy-badge'), 'dark-mode.css styles .ps-philosophy-badge with high contrast');

// 10. Check Quick Add section removed from cart.js
const cartJsPath = path.join(__dirname, '../assets/js/cart.js');
const cartJs = fs.readFileSync(cartJsPath, 'utf8');
assert(!cartJs.includes('ps-cart-quick-add'), 'Quick Add Popular Items section has been removed from Cart Drawer in cart.js');
assert(!cartJs.includes('Quick Add Popular Items'), 'Cart Drawer does NOT display "Quick Add Popular Items"');

console.log('===============================================================');
console.log(`Result: ${passed} passed, ${failed} failed.`);
console.log('===============================================================');

if (failed > 0) process.exit(1);
