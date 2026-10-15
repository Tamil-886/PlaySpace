const fs = require('fs');
const path = require('path');

console.log('--- Testing Pricing & Passes Badge Clipping Fixes ---');

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

const ROOT_DIR = fs.existsSync(path.resolve(__dirname, '..', 'pages'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..', 'playspace');

// 1. Check components.css
const componentsCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'components.css'), 'utf8');
assert(componentsCss.includes('.ps-card {') && componentsCss.includes('overflow: visible;'), 'components.css sets .ps-card to overflow: visible');
assert(componentsCss.includes('.ps-card:has([style*="top: -"])') || componentsCss.includes('.ps-card.featured'), 'components.css has explicit overflow: visible for badges/featured cards');

// 2. Check dashboard.css
const dashboardCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'dashboard.css'), 'utf8');
assert(dashboardCss.includes('.ps-pass-wallet-card') && dashboardCss.includes('overflow: visible;'), 'dashboard.css sets .ps-pass-wallet-card to overflow: visible');

// 3. Check pricing-passes.html
const pricingHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'pricing-passes.html'), 'utf8');

// Family 4-pack banner check (Integrated Header Banner)
const familyCardIdx = pricingHtml.indexOf('SAVE $35 BUNDLE');
assert(familyCardIdx !== -1, 'SAVE $35 BUNDLE banner exists in pricing-passes.html');
if (familyCardIdx !== -1) {
  const cardSnippet = pricingHtml.slice(Math.max(0, familyCardIdx - 600), familyCardIdx + 100);
  assert(cardSnippet.includes('border: 2px solid #FFCC00'), 'Family 4-Pack card has 2px solid #FFCC00 border');
  assert(!cardSnippet.includes('top: -12px; right: 20px;'), 'Family 4-Pack card removed awkward border-cutting floating pill');
  assert(cardSnippet.includes('background: #FFCC00') && cardSnippet.includes('BEST FAMILY VALUE'), 'Family 4-Pack has sleek integrated header banner');
}

// Pass 3 (2-Hour Pass) badge check
const pass3Idx = pricingHtml.indexOf('MOST POPULAR • SAVE $8');
assert(pass3Idx !== -1, 'MOST POPULAR • SAVE $8 badge exists in pricing-passes.html');
if (pass3Idx !== -1) {
  const cardSnippet = pricingHtml.slice(Math.max(0, pass3Idx - 600), pass3Idx);
  assert(cardSnippet.includes('overflow: visible'), 'Pass 3 card has overflow: visible');
  const badgeSnippet = pricingHtml.slice(Math.max(0, pass3Idx - 300), pass3Idx + 150);
  assert(badgeSnippet.includes('white-space: nowrap'), 'Pass 3 badge has white-space: nowrap to prevent 2-line distortion');
}

// 10-Visit Punch Card check
const punch10Idx = pricingHtml.indexOf('BEST VALUE PUNCH CARD');
assert(punch10Idx !== -1, 'BEST VALUE PUNCH CARD badge exists in pricing-passes.html');
if (punch10Idx !== -1) {
  const cardSnippet = pricingHtml.slice(Math.max(0, punch10Idx - 600), punch10Idx);
  assert(cardSnippet.includes('overflow: visible'), 'Pass 10-Visit card has overflow: visible');
  const badgeSnippet = pricingHtml.slice(Math.max(0, punch10Idx - 300), punch10Idx + 150);
  assert(badgeSnippet.includes('white-space: nowrap'), '10-Visit badge has white-space: nowrap to prevent text wrap');
}

// Birthday Package 2 check
const bday2Idx = pricingHtml.indexOf('MOST POPULAR BIRTHDAY');
assert(bday2Idx !== -1, 'MOST POPULAR BIRTHDAY badge exists in pricing-passes.html');
if (bday2Idx !== -1) {
  const cardSnippet = pricingHtml.slice(Math.max(0, bday2Idx - 600), bday2Idx);
  assert(cardSnippet.includes('overflow: visible'), 'Birthday Package 2 card has overflow: visible');
  const badgeSnippet = pricingHtml.slice(Math.max(0, bday2Idx - 300), bday2Idx + 150);
  assert(badgeSnippet.includes('white-space: nowrap'), 'Birthday Package 2 badge has white-space: nowrap to prevent text wrap');
}

// Check CSS rules
const pagesCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'pages.css'), 'utf8');
assert(componentsCss.includes('white-space: nowrap') && componentsCss.includes('.ps-card-featured-badge'), 'components.css defines .ps-card-featured-badge with white-space: nowrap');
assert(pagesCss.includes('.ps-card-featured-badge') && pagesCss.includes('white-space: nowrap'), 'pages.css defines .ps-card-featured-badge with white-space: nowrap');

// 4. Check build-public-pages.js template
const buildPublic = fs.readFileSync(path.join(__dirname, 'build-public-pages.js'), 'utf8');
assert(buildPublic.includes('SAVE $35 BUNDLE'), 'build-public-pages.js contains SAVE $35 BUNDLE');
const buildPublicFamilyIdx = buildPublic.indexOf('SAVE $35 BUNDLE');
if (buildPublicFamilyIdx !== -1) {
  const snippet = buildPublic.slice(Math.max(0, buildPublicFamilyIdx - 350), buildPublicFamilyIdx);
  assert(snippet.includes('BEST FAMILY VALUE') || snippet.includes('border: 2px solid #FFCC00'), 'build-public-pages.js template has integrated header banner for Family 4-Pack');
}
const buildPublicPass3Idx = buildPublic.indexOf('MOST POPULAR • SAVE $8');
assert(buildPublicPass3Idx !== -1, 'build-public-pages.js contains MOST POPULAR • SAVE $8');
if (buildPublicPass3Idx !== -1) {
  const snippet = buildPublic.slice(Math.max(0, buildPublicPass3Idx - 300), buildPublicPass3Idx + 150);
  assert(snippet.includes('white-space: nowrap'), 'build-public-pages.js has white-space: nowrap on MOST POPULAR • SAVE $8 badge');
}

// 5. Check index.html, home-2.html, birthday-parties.html, group-events.html
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
assert(indexHtml.includes('ps-card-featured-badge') && indexHtml.includes('left: 50%'), 'index.html package 2 has centered ps-card-featured-badge');

const home2Html = fs.readFileSync(path.join(ROOT_DIR, 'home-2.html'), 'utf8');
assert(home2Html.includes('ps-card-featured-badge') && home2Html.includes('left: 50%'), 'home-2.html pass 2 has centered ps-card-featured-badge');

const bdayHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'birthday-parties.html'), 'utf8');
assert(bdayHtml.includes('ps-card-featured-badge') && bdayHtml.includes('left: 50%'), 'birthday-parties.html package 2 has centered ps-card-featured-badge');

const groupHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'group-events.html'), 'utf8');
assert(groupHtml.includes('ps-card-featured-badge') && groupHtml.includes('left: 50%'), 'group-events.html tier 2 has centered ps-card-featured-badge');

// 6. Check global badge nowrap rules in components.css, typography.css, and rtl.css
const typoCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'typography.css'), 'utf8');
assert(typoCss.includes('.badge-tag') && typoCss.includes('white-space: nowrap'), 'typography.css sets white-space: nowrap on .badge-tag');

const rtlCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'rtl.css'), 'utf8');
assert(rtlCss.includes('[dir="rtl"] .ps-card-featured-badge') && rtlCss.includes('left: 50%'), 'rtl.css keeps floating badges centered');

assert(componentsCss.includes('.ps-badge {') && componentsCss.includes('white-space: nowrap'), 'components.css sets white-space: nowrap on .ps-badge');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
