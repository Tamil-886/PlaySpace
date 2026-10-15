const fs = require('fs');
const path = require('path');

const ROOT_DIR = fs.existsSync(path.resolve(__dirname, '..', 'pages'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..', 'playspace');
const loginHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'login.html'), 'utf8');
const registerHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'register.html'), 'utf8');
const forgotHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'forgot-password.html'), 'utf8');
const pagesCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'pages.css'), 'utf8');
const darkModeCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'dark-mode.css'), 'utf8');
const themeJs = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'js', 'theme.js'), 'utf8');

console.log('--- Testing Dark Mode Login Page Fixes ---');

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

// 1. Dual theme logos on login.html
assert(loginHtml.includes('class="ps-brand-logo-light ps-brand-logo-card"'), 'login.html has .ps-brand-logo-light');
assert(loginHtml.includes('class="ps-brand-logo-dark ps-brand-logo-card"'), 'login.html has .ps-brand-logo-dark');
assert(loginHtml.includes('src="../assets/images/brand/logo.svg"'), 'login.html has dark-mode logo.svg referenced');

// 2. CSS rules for logo switching
assert(pagesCss.includes('.ps-brand-logo-light'), 'pages.css defines .ps-brand-logo-light');
assert(pagesCss.includes('.ps-brand-logo-dark'), 'pages.css defines .ps-brand-logo-dark');
assert(darkModeCss.includes('[data-theme="dark"] .ps-brand-logo-light'), 'dark-mode.css hides light logo');
assert(darkModeCss.includes('[data-theme="dark"] .ps-brand-logo-dark'), 'dark-mode.css displays dark logo');

// 3. Fallback CSS rule for logo-dark in dark mode
assert(darkModeCss.includes('[data-theme="dark"] .ps-card img[src*="logo-dark.svg"]'), 'dark-mode.css has fallback content rule');

// 4. theme.js dynamic logo updates
assert(themeJs.includes('updateThemeLogos'), 'theme.js contains updateThemeLogos logic');
assert(themeJs.includes('logo-dark.svg') && themeJs.includes('logo.svg'), 'theme.js swaps between logo-dark.svg and logo.svg');

// 5. Auth links color fix in dark mode (no black text on black card)
assert(!loginHtml.includes('color: var(--ps-black);'), 'login.html no longer has color: var(--ps-black)');
assert(loginHtml.includes('class="ps-auth-link"'), 'login.html uses .ps-auth-link');
assert(darkModeCss.includes('[data-theme="dark"] .ps-auth-link'), 'dark-mode.css defines .ps-auth-link');

// 6. register.html & forgot-password.html also verified
assert(registerHtml.includes('class="ps-brand-logo-dark ps-brand-logo-card"'), 'register.html has dual theme logo');
assert(!registerHtml.includes('color: var(--ps-black);'), 'register.html no longer has color: var(--ps-black)');
assert(!forgotHtml.includes('color: var(--ps-black);'), 'forgot-password.html no longer has color: var(--ps-black)');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
