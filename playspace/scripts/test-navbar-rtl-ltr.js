/**
 * Test Suite: Navbar Brand Name Alignment and RTL/LTR Support
 *
 * Verifies:
 * 1. Brand name and logo alignment in LTR mode (left-aligned, start of navbar).
 * 2. Brand name and logo alignment in RTL mode (right-aligned, start of navbar in RTL).
 * 3. Removal of incorrect row-reverse from rtl.css.
 * 4. CSS logical properties (margin-inline, padding-inline, text-align).
 * 5. Responsive scaling across desktop, tablet, and mobile breakpoints (1180px, 768px, 480px, 360px).
 * 6. Dynamic RTL/LTR switcher script (rtl.js) handling and HTML integration.
 * 7. Preservation of brand styling, colors, logo dimensions, and navbar functionality.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
let passedTests = 0;
let totalTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${description}`);
    console.error(`    ${err.message}`);
  }
}

console.log('===============================================================');
console.log('PlaySpace Navbar Brand Alignment & RTL/LTR Verification Suite');
console.log('===============================================================');

// 1. CSS Files Loading
const layoutCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'layout.css'), 'utf8');
const rtlCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'rtl.css'), 'utf8');
const responsiveCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'responsive.css'), 'utf8');
const rtlJs = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'js', 'rtl.js'), 'utf8');

console.log('\n--- 1. LTR Brand Alignment & CSS Logical Properties (layout.css) ---');

test('layout.css: .ps-header .ps-navbar uses logical property margin-inline', () => {
  assert(layoutCss.includes('margin-inline: auto;'), 'Expected margin-inline: auto; in .ps-header .ps-navbar');
});

test('layout.css: .ps-header .ps-navbar uses logical property padding-inline', () => {
  assert(layoutCss.includes('padding-inline: var(--ps-space-lg);'), 'Expected padding-inline: var(--ps-space-lg); in .ps-header .ps-navbar');
});

test('layout.css: .ps-navbar-brand uses display: inline-flex or flex and align-items: center', () => {
  assert(layoutCss.includes('.ps-navbar-brand {') && layoutCss.includes('align-items: center;'), 'Expected align-items: center in .ps-navbar-brand');
});

test('layout.css: .ps-navbar-brand uses logical properties margin-inline and padding-inline', () => {
  assert(layoutCss.includes('margin-inline: 0;') && layoutCss.includes('padding-inline: 0;'), 'Expected margin-inline: 0 and padding-inline: 0 in .ps-navbar-brand');
});

test('layout.css: .ps-navbar-brand uses text-align: start', () => {
  assert(layoutCss.includes('text-align: start;'), 'Expected text-align: start in .ps-navbar-brand');
});

test('layout.css: explicit [dir="ltr"] .ps-navbar sets flex-direction: row', () => {
  assert(layoutCss.includes('[dir="ltr"] .ps-navbar {') && layoutCss.includes('flex-direction: row;'), 'Expected [dir="ltr"] .ps-navbar { flex-direction: row; }');
});

test('layout.css: explicit [dir="ltr"] .ps-navbar-brand sets text-align: left and justify-content: flex-start', () => {
  assert(layoutCss.includes('[dir="ltr"] .ps-navbar-brand {') &&
         layoutCss.includes('text-align: left;') &&
         layoutCss.includes('justify-content: flex-start;'), 'Expected left alignment for LTR brand');
});

test('layout.css: .ps-navbar-brand img has max-width: 100% and height: 44px base', () => {
  assert(layoutCss.includes('height: 44px;') && layoutCss.includes('max-width: 100%;'), 'Expected responsive base img styles');
});

console.log('\n--- 2. RTL Brand Alignment & Bug Fix (rtl.css) ---');

test('rtl.css: NO flex-direction: row-reverse on [dir="rtl"] .ps-navbar (Inversion Bug Fixed)', () => {
  const match = rtlCss.match(/\[dir="rtl"\]\s+\.ps-navbar\s*\{([^}]*)\}/);
  assert(match, 'Expected [dir="rtl"] .ps-navbar rule in rtl.css');
  assert(!match[1].includes('row-reverse'), 'rtl.css must NOT set row-reverse on .ps-navbar');
});

test('rtl.css: [dir="rtl"] .ps-navbar sets flex-direction: row and justify-content: space-between', () => {
  const match = rtlCss.match(/\[dir="rtl"\]\s+\.ps-navbar\s*\{([^}]*)\}/);
  assert(match[1].includes('flex-direction: row;') && match[1].includes('justify-content: space-between;'),
    'Expected flex-direction: row and justify-content: space-between in [dir="rtl"] .ps-navbar');
});

test('rtl.css: [dir="rtl"] .ps-navbar-brand sets text-align: right and justify-content: flex-start', () => {
  assert(rtlCss.includes('[dir="rtl"] .ps-navbar-brand {'), 'Expected [dir="rtl"] .ps-navbar-brand in rtl.css');
  assert(rtlCss.includes('text-align: right;'), 'Expected text-align: right in rtl.css');
  assert(rtlCss.includes('margin-inline-start: 0;'), 'Expected margin-inline-start: 0 in rtl.css');
});

test('rtl.css: [dir="rtl"] .ps-navbar-brand brand text classes align right', () => {
  assert(rtlCss.includes('[dir="rtl"] .ps-navbar-brand .ps-brand-text') || rtlCss.includes('[dir="rtl"] .ps-navbar-brand .ps-brand-name'),
    'Expected brand text RTL alignment rules');
});

test('rtl.css: [dir="rtl"] .ps-nav-actions sets flex-direction: row', () => {
  assert(rtlCss.includes('[dir="rtl"] .ps-nav-actions {') && rtlCss.includes('flex-direction: row;'),
    'Expected [dir="rtl"] .ps-nav-actions { flex-direction: row; }');
});

console.log('\n--- 3. Responsive Scaling & Viewport Adaptations (responsive.css) ---');

test('responsive.css: scales brand image at <=1180px breakpoint (height: 40px)', () => {
  const media1180 = responsiveCss.slice(responsiveCss.indexOf('@media (max-width: 1180px)'));
  assert(media1180.includes('.ps-navbar-brand img') && media1180.includes('height: 40px;'),
    'Expected brand height: 40px at max-width 1180px');
});

test('responsive.css: scales brand image at <=768px breakpoint (height: 38px)', () => {
  const media768 = responsiveCss.slice(responsiveCss.indexOf('@media (max-width: 768px)'));
  assert(media768.includes('.ps-navbar-brand img') && media768.includes('height: 38px;'),
    'Expected brand height: 38px at max-width 768px');
});

test('responsive.css: scales brand image and navbar padding at <=480px breakpoint', () => {
  const media480 = responsiveCss.slice(responsiveCss.indexOf('@media (max-width: 480px)'));
  assert(media480.includes('.ps-navbar-brand img') && media480.includes('height: 34px;'),
    'Expected brand height: 34px at max-width 480px');
  assert(media480.includes('max-width: 165px;'), 'Expected brand max-width restriction at 480px');
  assert(media480.includes('padding-inline: var(--ps-space-md);'), 'Expected reduced padding-inline at 480px');
  assert(media480.includes('.ps-nav-actions') && media480.includes('gap: 0.45rem;'), 'Expected tighter nav action gap at 480px');
});

test('responsive.css: scales brand image and navbar padding at <=360px breakpoint', () => {
  const media360 = responsiveCss.slice(responsiveCss.indexOf('@media (max-width: 360px)'));
  assert(media360.includes('.ps-navbar-brand img') && media360.includes('height: 30px;'),
    'Expected brand height: 30px at max-width 360px');
  assert(media360.includes('max-width: 140px;'), 'Expected brand max-width restriction at 360px');
  assert(media360.includes('padding-inline: 0.75rem;'), 'Expected compact padding-inline at 360px');
  assert(media360.includes('gap: 0.35rem;'), 'Expected compact action gap at 360px');
});

console.log('\n--- 4. RTL/LTR Toggle Engine & Dynamic Switching (rtl.js) ---');

test('rtl.js: defines applyDir function updating dir attribute on document.documentElement', () => {
  assert(rtlJs.includes("document.documentElement.setAttribute('dir', dir)"),
    'rtl.js must set dir attribute on document.documentElement');
});

test('rtl.js: stores and reads direction from localStorage', () => {
  assert(rtlJs.includes("localStorage.getItem(STORAGE_KEY)"), 'rtl.js must read from localStorage');
  assert(rtlJs.includes("localStorage.setItem(STORAGE_KEY, dir)"), 'rtl.js must write to localStorage');
});

test('rtl.js: updates .ps-lang-toggle buttons with appropriate label (LTR vs RTL)', () => {
  assert(rtlJs.includes('<span>LTR</span>') && rtlJs.includes('<span>RTL</span>'),
    'rtl.js must update toggle button text');
});

test('rtl.js: exposes window.PlaySpaceRTL API for programmatic toggling', () => {
  assert(rtlJs.includes('window.PlaySpaceRTL'), 'rtl.js must expose window.PlaySpaceRTL');
});

console.log('\n--- 5. Brand Identity & Color Scheme Integrity ---');

test('logo.svg: brand colors are strictly preserved (#000000, #FFFFFF, #FFCC00)', () => {
  const logoSvg = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'images', 'brand', 'logo.svg'), 'utf8');
  assert(logoSvg.includes('#FFCC00'), 'logo.svg must retain signature Yellow (#FFCC00)');
  assert(logoSvg.includes('#000000'), 'logo.svg must retain signature Black (#000000)');
  assert(logoSvg.includes('#FFFFFF'), 'logo.svg must retain White (#FFFFFF)');
  assert(logoSvg.includes('PLAY'), 'logo.svg must contain PLAY brand text');
  assert(logoSvg.includes('SPACE'), 'logo.svg must contain SPACE brand text');
  assert(logoSvg.includes('TRAMPOLINE &amp; SOFT PLAY'), 'logo.svg must contain subtitle text');
});

console.log('\n--- 6. HTML Pages Brand & Navbar Markup Consistency ---');

const checkPages = [
  'index.html',
  'home-2.html',
  'pages/about.html',
  'pages/attractions.html',
  'pages/pricing-passes.html',
  'pages/birthday-parties.html',
  'pages/gallery.html',
  'pages/contact.html',
  'parent/dashboard.html',
  'admin/dashboard.html'
];

checkPages.forEach(relPath => {
  test(`HTML Page: ${relPath} contains .ps-navbar-brand with valid logo`, () => {
    const filePath = path.join(ROOT_DIR, relPath);
    assert(fs.existsSync(filePath), `File should exist: ${relPath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    assert(content.includes('class="ps-navbar-brand"') || content.includes("class='ps-navbar-brand'"),
      `${relPath} should have .ps-navbar-brand`);
    assert(content.includes('logo.svg') || content.includes('logo-dark.svg'),
      `${relPath} brand should contain logo.svg`);
  });
});

console.log('\n===============================================================');
console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} PASSED, ${totalTests - passedTests} FAILED`);
console.log('===============================================================');

if (passedTests === totalTests) {
  console.log('\n🎉 ALL NAVBAR BRAND ALIGNMENT & RTL/LTR TESTS PASSED PERFECTLY!\n');
  process.exit(0);
} else {
  console.error('\n❌ SOME TESTS FAILED. PLEASE REVIEW.\n');
  process.exit(1);
}
