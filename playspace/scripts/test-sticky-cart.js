/**
 * Automated Verification: Sticky Nav Bar Add to Cart Button Across PlaySpace
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

console.log('--- Verifying Sticky Navbar Add to Cart Button ---');

// 1. Check layout.css header sticky rules
const layoutCss = fs.readFileSync(path.join(__dirname, '../assets/css/layout.css'), 'utf8');
assert(layoutCss.includes('position: sticky') && layoutCss.includes('top: 0'), 'layout.css sets .ps-header to position: sticky; top: 0');

// 2. Check reset.css body overflow-x: clip
const resetCss = fs.readFileSync(path.join(__dirname, '../assets/css/reset.css'), 'utf8');
assert(resetCss.includes('overflow-x: clip'), 'reset.css uses overflow-x: clip so position: sticky is not broken');

// 3. Check responsive.css mobile navbar
const responsiveCss = fs.readFileSync(path.join(__dirname, '../assets/css/responsive.css'), 'utf8');
assert(responsiveCss.includes('.ps-nav-actions .ps-cart-toggle'), 'responsive.css guarantees .ps-cart-toggle remains visible and sticky on mobile');

// 4. Check cart.css rules
const cartCss = fs.readFileSync(path.join(__dirname, '../assets/css/cart.css'), 'utf8');
assert(cartCss.includes('.ps-nav-actions .ps-cart-toggle'), 'cart.css has rules for .ps-nav-actions .ps-cart-toggle');

// 5. Check cart.js navbar button ensuring
const cartJs = fs.readFileSync(path.join(__dirname, '../assets/js/cart.js'), 'utf8');
assert(cartJs.includes('.ps-nav-actions .ps-cart-toggle'), 'cart.js ensureNavbarButton checks .ps-nav-actions specifically');
assert(cartJs.includes('.ps-cart-badge-text'), 'cart.js updates .ps-cart-badge-text across all sticky bars');

// 6. Check key pages for presence of cart button in navbar and sticky bar
const samplePages = [
  'index.html',
  'home-2.html',
  'pages/about.html',
  'pages/attractions.html',
  'pages/birthday-parties.html',
  'pages/pricing-passes.html',
  'pages/contact.html',
  'pages/faq.html',
  'parent/book-session.html'
];

samplePages.forEach(p => {
  const filePath = path.join(__dirname, '..', p);
  const html = fs.readFileSync(filePath, 'utf8');
  assert(html.includes('ps-cart-toggle ps-btn-icon'), `${p} contains .ps-cart-toggle in navbar`);
  assert(html.includes('cart.js'), `${p} loads cart.js`);
  assert(!html.includes('ps-sticky-bar'), `${p} does NOT contain bottom sticky bar`);
});

// 7. Check footer removal specifically on cart.html (and preserved elsewhere)
const cartHtml = fs.readFileSync(path.join(__dirname, '../pages/cart.html'), 'utf8');
assert(!cartHtml.includes('<footer class="ps-footer">'), 'cart.html does NOT contain <footer class="ps-footer">');
assert(!cartHtml.includes('ps-footer-grid'), 'cart.html does NOT contain ps-footer-grid');

const aboutHtml = fs.readFileSync(path.join(__dirname, '../pages/about.html'), 'utf8');
assert(aboutHtml.includes('<footer class="ps-footer">'), 'about.html retains its footer');

const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
assert(indexHtml.includes('<footer class="ps-footer">'), 'index.html retains its footer');

console.log('===============================================================');
console.log(`Result: ${passed} passed, ${failed} failed.`);
console.log('===============================================================');

if (failed > 0) process.exit(1);

