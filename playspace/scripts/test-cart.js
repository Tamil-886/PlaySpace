const fs = require('fs');
const path = require('path');

const ROOT_DIR = fs.existsSync(path.resolve(__dirname, '..', 'pages'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..', 'playspace');

console.log('--- Testing PlaySpace Cart Button & Functionality ---');

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

// 1. Check cart.css and style.css
const cartCssPath = path.join(ROOT_DIR, 'assets', 'css', 'cart.css');
assert(fs.existsSync(cartCssPath), 'cart.css exists');
const cartCss = fs.readFileSync(cartCssPath, 'utf8');
assert(cartCss.includes('.ps-cart-toggle'), 'cart.css styles .ps-cart-toggle');
assert(cartCss.includes('.ps-cart-badge'), 'cart.css styles .ps-cart-badge');
assert(cartCss.includes('.ps-cart-drawer'), 'cart.css styles .ps-cart-drawer');
assert(cartCss.includes('[dir="rtl"] .ps-cart-drawer'), 'cart.css includes RTL drawer positioning');
assert(cartCss.includes('[data-theme="dark"]'), 'cart.css includes dark mode tokens');

const styleCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'style.css'), 'utf8');
assert(styleCss.includes("@import url('cart.css');"), 'style.css imports cart.css');

// 2. Check cart.js
const cartJsPath = path.join(ROOT_DIR, 'assets', 'js', 'cart.js');
assert(fs.existsSync(cartJsPath), 'cart.js exists');
const cartJs = fs.readFileSync(cartJsPath, 'utf8');
assert(cartJs.includes('CartManager'), 'cart.js defines CartManager class');
assert(cartJs.includes('localStorage'), 'cart.js handles localStorage persistence');
assert(cartJs.includes('ensureNavbarButton'), 'cart.js dynamically ensures cart button exists');
assert(cartJs.includes('ensureDrawerDOM'), 'cart.js dynamically renders drawer DOM');
assert(cartJs.includes('ps-btn-add-cart') || cartJs.includes('[data-add-cart]'), 'cart.js binds Add to Cart buttons');
assert(cartJs.includes('psCartDrawerClose'), 'cart.js handles drawer close');
assert(cartJs.includes('psCartClearBtn'), 'cart.js handles clear cart');
assert(cartJs.includes('handleCheckout'), 'cart.js handles checkout navigation');

// 3. Check Navbar Cart button in HTML files
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
assert(indexHtml.includes('class="ps-cart-toggle'), 'index.html contains .ps-cart-toggle');
assert(indexHtml.includes('class="ps-cart-badge'), 'index.html contains .ps-cart-badge');
assert(indexHtml.includes('assets/js/cart.js'), 'index.html loads cart.js');

const home2Html = fs.readFileSync(path.join(ROOT_DIR, 'home-2.html'), 'utf8');
assert(home2Html.includes('class="ps-cart-toggle'), 'home-2.html contains .ps-cart-toggle');
assert(home2Html.includes('assets/js/cart.js'), 'home-2.html loads cart.js');

const pricingHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'pricing-passes.html'), 'utf8');
assert(pricingHtml.includes('class="ps-cart-toggle'), 'pricing-passes.html contains .ps-cart-toggle');
assert(pricingHtml.includes('ps-btn-add-cart'), 'pricing-passes.html contains Add to Cart buttons');
assert(pricingHtml.includes('data-add-cart="pass-60"'), 'pricing-passes.html has Add to Cart for 60-min pass');
assert(pricingHtml.includes('data-add-cart="pass-90"'), 'pricing-passes.html has Add to Cart for 90-min pass');
assert(pricingHtml.includes('data-add-cart="pass-120"'), 'pricing-passes.html has Add to Cart for 2-hour pass');
assert(pricingHtml.includes('data-add-cart="pass-allday"'), 'pricing-passes.html has Add to Cart for all-day pass');
assert(pricingHtml.includes('assets/js/cart.js'), 'pricing-passes.html loads cart.js');

const purchasePassHtml = fs.readFileSync(path.join(ROOT_DIR, 'parent', 'purchase-pass.html'), 'utf8');
assert(purchasePassHtml.includes('class="ps-cart-toggle'), 'purchase-pass.html contains .ps-cart-toggle');
assert(purchasePassHtml.includes('ps-btn-add-cart'), 'purchase-pass.html contains Add to Cart buttons');
assert(purchasePassHtml.includes('assets/js/cart.js'), 'purchase-pass.html loads cart.js');

const bookSessionHtml = fs.readFileSync(path.join(ROOT_DIR, 'parent', 'book-session.html'), 'utf8');
assert(bookSessionHtml.includes('class="ps-cart-toggle'), 'book-session.html contains .ps-cart-toggle');
assert(bookSessionHtml.includes('assets/js/cart.js'), 'book-session.html loads cart.js');

// 4. Check build-base.js
const buildBaseJs = fs.readFileSync(path.join(ROOT_DIR, 'scripts', 'build-base.js'), 'utf8');
assert(buildBaseJs.includes('ps-cart-toggle'), 'build-base.js has ps-cart-toggle in getPublicHeader');
assert(buildBaseJs.includes('cart.js'), 'build-base.js includes cart.js in getCommonScripts');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
