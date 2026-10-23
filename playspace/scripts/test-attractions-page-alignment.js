const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const htmlPath = path.join(ROOT_DIR, 'pages', 'attractions.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- Verifying Alignment on attractions.html (All 21 Cards) ---');

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

// 1. Total card count
const cards = html.match(/<!-- \d+\. [^>]+ -->\s*<div class="ps-attraction-card"/g) || [];
assert(cards.length === 21, `Found all 21 attraction cards (found ${cards.length})`);

// 2. All cards have direct flex body with flex-grow: 1
const bodyMatches = html.match(/class="ps-attraction-body" style="padding: 1\.25rem; display: flex; flex-direction: column; flex-grow: 1;"/g) || [];
assert(bodyMatches.length === 21, `All 21 cards have direct flex-growing body container (found ${bodyMatches.length})`);

// 3. All cards have specs with min-height: 56px
const specsMatches = html.match(/class="ps-attraction-specs" style="min-height: 56px;/g) || [];
assert(specsMatches.length === 21, `All 21 cards have specs row locked with min-height: 56px (found ${specsMatches.length})`);

// 4. All titles have min-height: 52px
const titleMatches = html.match(/<h3 style="font-size: 1\.3rem; margin: 0\.25rem 0 0\.5rem 0; color: var\(--ps-text-main\); min-height: 52px;/g) || [];
assert(titleMatches.length === 21, `All 21 cards have title locked with min-height: 52px (found ${titleMatches.length})`);

// 5. All descriptions have height and min-height: 44px
const descMatches = html.match(/class="text-muted" style="font-size: 0\.9rem; line-height: 1\.5; margin-bottom: 0\.85rem; height: 44px; min-height: 44px;/g) || [];
assert(descMatches.length === 21, `All 21 cards have description locked with min-height: 44px (found ${descMatches.length})`);

// 6. All Age Suitability boxes have min-height: 40px and NO flex-wrap: wrap
const ageBoxMatches = html.match(/min-height: 40px; display: flex; align-items: center; justify-content: space-between;/g) || [];
assert(ageBoxMatches.length === 21, `All 21 cards have Age Suitability locked with min-height: 40px (found ${ageBoxMatches.length})`);
const wrappedAgeBoxes = html.match(/<div style="background: rgba\(255,204,0,0\.12\)[^>]*flex-wrap:\s*wrap/g) || [];
assert(wrappedAgeBoxes.length === 0, `No Age Suitability box has flex-wrap: wrap (found ${wrappedAgeBoxes.length})`);

// 7. All Age Badges have flex-shrink: 0 and white-space: nowrap
const badgeMatches = html.match(/white-space: nowrap; flex-shrink: 0;/g) || [];
assert(badgeMatches.length === 21, `All 21 Age badges protected against line wrapping (found ${badgeMatches.length})`);

// 8. All Safety Information boxes have min-height: 72px
const safetyMatches = html.match(/min-height: 72px; display: flex; flex-direction: column; justify-content: center;/g) || [];
assert(safetyMatches.length === 21, `All 21 Safety boxes locked with min-height: 72px (found ${safetyMatches.length})`);

// 9. All 21 cards have bottom action buttons with margin-top: auto
const actionMatches = html.match(/class="ps-attraction-actions" style="margin-top: auto;/g) || [];
assert(actionMatches.length === 21, `All 21 cards have action buttons anchored to bottom via margin-top: auto (found ${actionMatches.length})`);

// 10. Check cards 4, 5, 6 specifically (from user's screenshot)
const c4Regex = /<!-- 4\. Super Slide Mountain -->[\s\S]*?<!-- 5\. Rainbow Ball Pit -->/;
const c5Regex = /<!-- 5\. Rainbow Ball Pit -->[\s\S]*?<!-- 6\. Sky-High Rope Adventure -->/;
const c6Regex = /<!-- 6\. Sky-High Rope Adventure -->[\s\S]*?<!-- 7\. Foam Pit Challenge -->/;
const c4 = html.match(c4Regex)?.[0] || '';
const c5 = html.match(c5Regex)?.[0] || '';
const c6 = html.match(c6Regex)?.[0] || '';

assert(c6.includes('cleanAge') === false, 'Template rendered variables properly without raw template strings');
assert(c6.includes('Ages 6 - 14 Years') && c6.includes('Ages 6 - 14'), 'Card 6 age cleaned without Min Height text overflow');
assert(c4.includes('min-height: 40px') && c5.includes('min-height: 40px') && c6.includes('min-height: 40px'), 'Cards 4, 5, 6 all have identical 40px age bar heights');
assert(c4.includes('min-height: 72px') && c5.includes('min-height: 72px') && c6.includes('min-height: 72px'), 'Cards 4, 5, 6 all have identical 72px safety box heights');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
