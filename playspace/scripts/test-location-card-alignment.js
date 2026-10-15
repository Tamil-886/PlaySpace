const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const buildScript = fs.readFileSync(path.join(ROOT_DIR, 'scripts', 'build-home-pages.js'), 'utf8');

console.log('--- Verifying Location, Opening Hours & Contact Card Alignment ---');

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

// 1. Grid structure
assert(indexHtml.includes('class="ps-grid ps-grid-3" style="gap: 2rem; align-items: stretch;"'), 'Grid is aligned with stretch alignment and uniform gap');

// 2. Column flex structures
const flexColMatches = indexHtml.match(/<div style="display: flex; flex-direction: column;">/g) || [];
assert(flexColMatches.length >= 3, `All 3 columns use flex-column structure (found ${flexColMatches.length})`);

// 3. Header consistency
const h4Matches = indexHtml.match(/<h4 style="margin-bottom: 0\.85rem; display: flex; align-items: center; gap: 0\.5rem; font-size: 1\.15rem;">/g) || [];
assert(h4Matches.length >= 3, `All 3 column headers share identical font-size, margin, and icon flex alignment (found ${h4Matches.length})`);

// 4. Content line height consistency
const pMatches = indexHtml.match(/<p class="text-muted" style="margin: 0; font-size: 0\.95rem; line-height: 1\.65;">/g) || [];
assert(pMatches.length >= 3, `All 3 column paragraphs share identical font-size, margin: 0, and line-height: 1.65 (found ${pMatches.length})`);

// 5. Line count parity across columns
const locationCardSection = indexHtml.substring(
  indexHtml.indexOf('Location, Opening Hours &amp; Contact'),
  indexHtml.indexOf('<!-- 8. Footer -->')
);
assert(locationCardSection.includes('Highway 101, Exit 42 • Main Concourse'), 'Column 1 has balanced 4th landmark line');
assert(locationCardSection.includes('Toddler Time: Mon–Fri 9:00 – 11:00 AM'), 'Column 2 has balanced 4th schedule line');
assert(locationCardSection.includes('Email: <strong>jump@playspacepark.com</strong>'), 'Column 3 has balanced 4th contact line');

// 6. Action Footer Bar
assert(locationCardSection.includes('border-top: 1px solid var(--ps-border-color)'), 'Card has dedicated full-width divider line');
assert(locationCardSection.includes('justify-content: space-between; flex-wrap: wrap; gap: 1rem;'), 'Action bar distributes badges and CTAs with clean flex spacing');

// 7. Badges and CTAs in footer
assert(locationCardSection.includes('Free 300-Vehicle Parking Lot') && locationCardSection.includes('Glow Night: Fri &amp; Sat 7–10 PM'), 'Footer bar groups facility highlights cleanly on the left');
assert(locationCardSection.includes('Get Directions') && (locationCardSection.includes('Book Session') || locationCardSection.includes('Book This Pass')), 'Footer bar groups primary and secondary CTAs cleanly on the right');

// 8. build-home-pages.js template synchronization
assert(buildScript.includes('class="ps-grid ps-grid-3" style="gap: 2rem; align-items: stretch;"'), 'build-home-pages.js template is in sync with index.html');
assert(buildScript.includes('<!-- Aligned Card Footer: Highlights & Unified Actions -->'), 'build-home-pages.js contains aligned card footer template');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
