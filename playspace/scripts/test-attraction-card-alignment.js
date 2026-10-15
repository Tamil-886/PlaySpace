const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const pagesCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'pages.css'), 'utf8');

console.log('--- Testing Attraction Cards Baseline & Height Alignment ---');

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

// 1. CSS rules for card stretch and action alignment
assert(pagesCss.includes('.ps-attraction-card') && pagesCss.includes('height: 100%;'), '.ps-attraction-card has height: 100%');
assert(pagesCss.includes('.ps-attraction-body') && pagesCss.includes('flex-grow: 1;'), '.ps-attraction-body has flex-grow: 1');
assert(pagesCss.includes('.ps-attraction-actions') && pagesCss.includes('margin-top: auto;'), '.ps-attraction-actions has margin-top: auto');
assert(pagesCss.includes('.ps-attraction-body p') && pagesCss.includes('flex-grow: 1;'), '.ps-attraction-body p has flex-grow: 1');

// 2. index.html cards have .ps-attraction-actions with margin-top: auto
const actionCount = (indexHtml.match(/class="ps-attraction-actions"/g) || []).length;
assert(actionCount === 6, `All 6 attraction cards have .ps-attraction-actions (found ${actionCount})`);

// 3. All 6 button containers have margin-top: auto
const marginTopAutoCount = (indexHtml.match(/class="ps-attraction-actions"[^>]*margin-top:\s*auto/g) || []).length;
assert(marginTopAutoCount === 6, `All 6 cards have margin-top: auto explicitly set on actions container (found ${marginTopAutoCount})`);

// 4. All 6 cards have flex-grow: 1 on their description paragraphs
const pFlexGrowCount = (indexHtml.match(/class="text-muted" style="font-size: 0\.92rem; line-height: 1\.5; margin-bottom: 1\.25rem; flex-grow: 1;"/g) || []).length;
assert(pFlexGrowCount === 6, `All 6 cards have flex-grow: 1 on description paragraph (found ${pFlexGrowCount})`);

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
