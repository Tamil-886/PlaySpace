/**
 * Test Suite: Register Page Layout Verification
 * Verifies that register.html matches login.html layout exactly:
 *  - Navbar removed completely
 *  - Footer removed completely
 *  - Sticky bar and back to top removed
 *  - Contains PlaySpace dual logo, heading, subtitle
 *  - Form fields: Name, Email, Phone, Password, Terms checkbox with validation
 *  - Register submit button
 *  - Top floating actions (.ps-auth-topbar) with Back to Home and toggles
 *  - Matched container width (460px), card padding, alignment, styling
 *  - Link to login.html
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const loginPath = path.join(__dirname, '..', 'pages', 'login.html');
const registerPath = path.join(__dirname, '..', 'pages', 'register.html');

const loginHtml = fs.readFileSync(loginPath, 'utf8');
const registerHtml = fs.readFileSync(registerPath, 'utf8');

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✓ ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${description} -> ${err.message}`);
    failed++;
  }
}

console.log('\n--- Testing Register Page Layout Match with Login Page ---\n');

test('Navbar is completely removed from register.html', () => {
  assert(!registerHtml.includes('<header class="ps-header">'), 'Header navbar must be removed');
  assert(!registerHtml.includes('ps-navbar'), 'Navbar classes must be removed');
  assert(!registerHtml.includes('ps-nav-menu'), 'Navbar menu must be removed');
});

test('Footer is completely removed from register.html', () => {
  assert(!registerHtml.includes('<footer class="ps-footer">'), 'Footer must be removed');
  assert(!registerHtml.includes('ps-footer-grid'), 'Footer grid must be removed');
  assert(!registerHtml.includes('ps-footer-cert-ribbon'), 'Cert ribbon must be removed');
});

test('Sticky action bar and back-to-top are removed from register.html', () => {
  assert(!registerHtml.includes('ps-sticky-bar'), 'Sticky bar must be removed');
  assert(!registerHtml.includes('ps-back-to-top'), 'Back to top button must be removed');
});

test('Top floating actions bar (.ps-auth-topbar) matches login.html', () => {
  assert(registerHtml.includes('class="ps-auth-topbar"'), 'Missing .ps-auth-topbar');
  assert(registerHtml.includes('Back to Home'), 'Missing Back to Home link');
  assert(registerHtml.includes('class="ps-lang-toggle"'), 'Missing LTR/RTL toggle');
  assert(registerHtml.includes('class="ps-theme-toggle'), 'Missing dark mode toggle');
});

test('Container width matches login.html (max-width: 460px; width: 100%)', () => {
  assert(registerHtml.includes('max-width: 460px; width: 100%;'), 'Container max-width must match login.html (460px)');
  assert(registerHtml.includes('class="ps-container"'), 'Missing ps-container');
});

test('Card styling and padding matches login.html', () => {
  assert(registerHtml.includes('padding: 2.75rem 2.25rem; border: 2px solid var(--ps-border-color); box-shadow: var(--ps-shadow-lg);'), 'Card styling must match login.html');
  assert(registerHtml.includes('class="ps-card"'), 'Missing ps-card');
});

test('PlaySpace dual theme logos match login.html', () => {
  assert(registerHtml.includes('class="ps-brand-logo-light ps-brand-logo-card"'), 'Missing light logo');
  assert(registerHtml.includes('class="ps-brand-logo-dark ps-brand-logo-card"'), 'Missing dark logo');
  assert(registerHtml.includes('logo-dark.svg'), 'Missing logo-dark.svg');
  assert(registerHtml.includes('logo.svg'), 'Missing logo.svg');
});

test('Registration heading and subtitle exist', () => {
  assert(registerHtml.includes('Create Account'), 'Missing Create Account heading');
  assert(registerHtml.includes('Register to book and track passes'), 'Missing subtitle');
});

test('Registration form fields and validation attributes exist', () => {
  assert(registerHtml.includes('data-type="name"'), 'Missing name validation data-type');
  assert(registerHtml.includes('data-type="email"'), 'Missing email validation data-type');
  assert(registerHtml.includes('data-type="mobile"'), 'Missing mobile validation data-type');
  assert(registerHtml.includes('type="password"'), 'Missing password field');
  assert(registerHtml.includes('class="ps-checkbox"'), 'Missing terms checkbox');
});

test('Register submit button matches login button styling', () => {
  assert(registerHtml.includes('class="ps-btn ps-btn-primary ps-btn-block"'), 'Submit button classes must match');
  assert(registerHtml.includes('Register'), 'Submit button must have Register text');
});

test('Bottom switch link links to login.html', () => {
  assert(registerHtml.includes('Already have an account?'), 'Missing switch prompt text');
  assert(registerHtml.includes('href="login.html"'), 'Must link to login.html');
  assert(registerHtml.includes('Sign In'), 'Must display Sign In link text');
});

test('Required scripts are loaded (validation.js, theme.js, etc.)', () => {
  assert(registerHtml.includes('theme.js'), 'Must load theme.js');
  assert(registerHtml.includes('validation.js'), 'Must load validation.js');
  assert(registerHtml.includes('authentication.js'), 'Must load authentication.js');
});

console.log(`\nResults: ${passed} PASSED, ${failed} FAILED\n`);
if (failed > 0) process.exit(1);
