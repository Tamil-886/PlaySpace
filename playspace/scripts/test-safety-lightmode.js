const fs = require('fs');
const path = require('path');

const ROOT_DIR = fs.existsSync(path.resolve(__dirname, '..', 'pages'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..', 'playspace');
const variablesCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'variables.css'), 'utf8');
const darkModeCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'dark-mode.css'), 'utf8');
const pagesCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'pages.css'), 'utf8');
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');

console.log('--- Testing Safety Section Light Mode Contrast & Fixes ---');

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

// 1. variables.css --ps-bg-surface-alt token must NOT be #000000 in default light mode
assert(!variablesCss.includes('--ps-bg-surface-alt: #000000;'), 'variables.css does not define --ps-bg-surface-alt as #000000');
assert(variablesCss.includes('--ps-bg-surface-alt: #F8F9FA;'), 'variables.css defines --ps-bg-surface-alt as light #F8F9FA');

// 2. dark-mode.css --ps-bg-surface-alt token
assert(!darkModeCss.includes('--ps-bg-surface-alt: #000000;'), 'dark-mode.css does not define --ps-bg-surface-alt as solid black');

// 3. pages.css has .ps-safety-feature-item with light background and yellow left border
assert(pagesCss.includes('.ps-safety-feature-item'), 'pages.css defines .ps-safety-feature-item class');
assert(pagesCss.includes('border-left: 3px solid var(--ps-yellow)'), 'pages.css gives .ps-safety-feature-item yellow left border');

// 4. index.html contains .ps-safety-feature-item cards
assert(indexHtml.includes('class="ps-safety-feature-item"'), 'index.html uses .ps-safety-feature-item');
assert(indexHtml.includes('🛡️ ASTM F2970 Engineered Padding'), 'Safety item 1 (Padding) exists');
assert(indexHtml.includes('✨ Hospital-Grade Daily &amp; Midday Sanitation'), 'Safety item 2 (Sanitation) exists');
assert(indexHtml.includes('👀 Certified Jump Patrol &amp; Capacity Caps'), 'Safety item 3 (Jump Patrol) exists');

// 5. Check that index.html no longer has the bug where background is black with black text
const bugCount = (indexHtml.match(/background:\s*var\(--ps-bg-surface-alt,\s*rgba\(0,0,0,0\.03\)\)/g) || []).length;
assert(bugCount === 0, 'No remaining outdated fallback inline declarations in index.html safety section');

// 6. Section 5 index.html Alignment: Centered Header & Stretched Columns
assert(indexHtml.includes('<div class="ps-section-header text-center" style="max-width: 760px; margin: 0 auto 3.5rem auto;">\n        <span class="badge-tag">NON-NEGOTIABLE STANDARDS</span>\n        <h2 style="margin-top: 0.75rem; font-size: 2.25rem;">Safety and Cleanliness Features</h2>'), 'index.html has full-width centered section header for Section 5');
assert(indexHtml.includes('class="ps-grid ps-grid-2" style="gap: 2.5rem; align-items: stretch;"'), 'index.html Section 5 uses align-items: stretch grid');
assert(!indexHtml.includes('class="ps-grid ps-grid-2 ps-items-center" style="gap: 3rem;">\n        <div>\n          <span class="badge-tag">NON-NEGOTIABLE STANDARDS</span>'), 'index.html Section 5 does not vertically center columns against misplaced header');

// 7. Section 4 about.html Alignment: Centered Header & Stretched Columns
const aboutHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'about.html'), 'utf8');
assert(aboutHtml.includes('<div class="ps-section-header text-center" style="max-width: 760px; margin: 0 auto 3.5rem auto;">\n        <span class="badge-tag">NON-NEGOTIABLE STANDARDS</span>\n        <h2 style="color: #FFFFFF; margin-top: 0.75rem; font-size: 2.25rem;">Safety-First Environment</h2>'), 'about.html Section 4 has full-width centered section header');
assert(aboutHtml.includes('class="ps-grid ps-grid-2" style="gap: 2.5rem; align-items: stretch;"'), 'about.html Section 4 uses align-items: stretch grid');
assert(!aboutHtml.includes('class="ps-grid ps-grid-2 ps-items-center" style="gap: 3rem;">\n        <div>\n          <span class="badge-tag">NON-NEGOTIABLE STANDARDS</span>\n          <h2 style="color: #FFFFFF; margin-top: 0.75rem; font-size: 2.1rem;">Safety-First Environment</h2>'), 'about.html Section 4 does not vertically center columns against misplaced header');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
