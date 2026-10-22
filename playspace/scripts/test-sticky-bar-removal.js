const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

function walk(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) res = res.concat(walk(full));
    else if (f.endsWith('.html')) res.push(full);
  });
  return res;
}

console.log('--- Verifying Complete Removal of Docked Sticky Action Bar ---');

const projectDir = path.join(__dirname, '..');
const htmlFiles = walk(projectDir);

console.log(`\n1. Scanning ${htmlFiles.length} HTML files...`);
let htmlViolations = 0;
htmlFiles.forEach(f => {
  const rel = path.relative(projectDir, f);
  const content = fs.readFileSync(f, 'utf8');
  if (
    content.includes('ps-sticky-bar') ||
    content.includes('id="psStickyBar"') ||
    content.includes('psStickyBarClose') ||
    content.includes('Jump Patrol on Duty • ASTM F2970 Safety Certified')
  ) {
    console.error(`    Found sticky bar in: ${rel}`);
    htmlViolations++;
  }
});
assert(htmlViolations === 0, `All ${htmlFiles.length} HTML files are free of sticky action bar markup`);

console.log('\n2. Verifying CSS files...');
const layoutCss = fs.readFileSync(path.join(projectDir, 'assets/css/layout.css'), 'utf8');
assert(!layoutCss.includes('.ps-sticky-bar'), 'layout.css has no .ps-sticky-bar definition');
assert(!layoutCss.includes('body.has-sticky-bar'), 'layout.css has no body.has-sticky-bar rule');
assert(layoutCss.includes('.ps-back-to-top {\n  position: fixed;\n  bottom: 24px;'), 'layout.css positions .ps-back-to-top at bottom: 24px');

const responsiveCss = fs.readFileSync(path.join(projectDir, 'assets/css/responsive.css'), 'utf8');
assert(!responsiveCss.includes('.ps-sticky-bar'), 'responsive.css has no .ps-sticky-bar rules');
assert(!responsiveCss.includes('body.has-sticky-bar'), 'responsive.css has no body.has-sticky-bar rules');
assert(responsiveCss.includes('bottom: 20px;'), 'responsive.css positions .ps-back-to-top at bottom: 20px for mobile');

const cartCss = fs.readFileSync(path.join(projectDir, 'assets/css/cart.css'), 'utf8');
assert(!cartCss.includes('.ps-sticky-bar'), 'cart.css has no .ps-sticky-bar rule');

const rtlCss = fs.readFileSync(path.join(projectDir, 'assets/css/rtl.css'), 'utf8');
assert(!rtlCss.includes('.ps-sticky-bar'), 'rtl.css has no .ps-sticky-bar rule');

console.log('\n3. Verifying JavaScript files...');
const componentsJs = fs.readFileSync(path.join(projectDir, 'assets/js/components.js'), 'utf8');
assert(!componentsJs.includes('psStickyBar'), 'components.js does not reference psStickyBar');
assert(!componentsJs.includes('has-sticky-bar'), 'components.js does not reference has-sticky-bar');

console.log('\n4. Verifying Build and Utility scripts...');
const buildBaseJs = fs.readFileSync(path.join(projectDir, 'scripts/build-base.js'), 'utf8');
assert(!buildBaseJs.includes('ps-sticky-bar'), 'build-base.js has no sticky bar in getPublicFooter');

const updateStickyCartJs = fs.readFileSync(path.join(projectDir, 'scripts/update-sticky-cart.js'), 'utf8');
assert(!updateStickyCartJs.includes('ps-sticky-bar-actions'), 'update-sticky-cart.js does not inject into sticky bar');

console.log('\n5. Verifying Back to Top button and scripts integrity...');
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert(indexHtml.includes('id="psBackToTop"'), 'index.html retains psBackToTop button');
assert(indexHtml.includes('<footer class="ps-footer">'), 'index.html retains footer');
assert(indexHtml.includes('assets/js/components.js'), 'index.html loads components.js');

console.log('\n===============================================================');
console.log(`Results: ${passed} passed, ${failed} failed.`);
console.log('===============================================================');

if (failed > 0) process.exit(1);
