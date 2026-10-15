const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('--- Testing Sign In Navbar Integration ---');

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

// 1. build-base.js template
const buildBaseJs = fs.readFileSync(path.join(ROOT_DIR, 'scripts', 'build-base.js'), 'utf8');
assert(buildBaseJs.includes('class="ps-btn ps-btn-outline ps-btn-sm ps-nav-auth-btn">Sign In</a>'), 'build-base.js has Sign In button in getPublicHeader');
assert(buildBaseJs.includes('class="ps-nav-item ps-nav-item-mobile-only"'), 'build-base.js has mobile drawer Sign In option');

// 2. index.html & home-2.html
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
assert(indexHtml.includes('class="ps-btn ps-btn-outline ps-btn-sm ps-nav-auth-btn">Sign In</a>'), 'index.html has Sign In action button in navbar');
assert(indexHtml.includes('href="pages/login.html"'), 'index.html Sign In links to pages/login.html');

const home2Html = fs.readFileSync(path.join(ROOT_DIR, 'home-2.html'), 'utf8');
assert(home2Html.includes('class="ps-btn ps-btn-outline ps-btn-sm ps-nav-auth-btn">Sign In</a>'), 'home-2.html has Sign In button in navbar');

// 3. Pages check
const aboutHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'about.html'), 'utf8');
assert(aboutHtml.includes('class="ps-btn ps-btn-outline ps-btn-sm ps-nav-auth-btn">Sign In</a>'), 'about.html has Sign In button in navbar');
assert(aboutHtml.includes('href="../pages/login.html"'), 'about.html Sign In links to ../pages/login.html');

const pricingHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'pricing-passes.html'), 'utf8');
assert(pricingHtml.includes('class="ps-btn ps-btn-outline ps-btn-sm ps-nav-auth-btn">Sign In</a>'), 'pricing-passes.html has Sign In button in navbar');

// 4. CSS styling
const layoutCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'layout.css'), 'utf8');
assert(layoutCss.includes('.ps-nav-auth-btn'), 'layout.css defines .ps-nav-auth-btn');
assert(layoutCss.includes('.ps-nav-item-mobile-only'), 'layout.css defines .ps-nav-item-mobile-only');

const responsiveCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'responsive.css'), 'utf8');
assert(responsiveCss.includes('.ps-nav-item-mobile-only') && responsiveCss.includes('display: block;'), 'responsive.css displays mobile-only item in drawer');
assert(responsiveCss.includes('.ps-nav-actions .ps-nav-auth-btn'), 'responsive.css sizes .ps-nav-auth-btn on mobile viewports');

// 5. authentication.js logic
const authJs = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'js', 'authentication.js'), 'utf8');
assert(authJs.includes("btn.textContent = 'Sign In';"), "authentication.js updates navbar auth button to 'Sign In' when logged out");
assert(authJs.includes("btn.textContent = `Account (${shortName})`;"), "authentication.js updates navbar auth button with user name when logged in");

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
