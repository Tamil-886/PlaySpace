const fs = require('fs');
const path = require('path');

const ROOT_DIR = fs.existsSync(path.resolve(__dirname, '..', 'index.html'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..', 'playspace');
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const pagesCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'pages.css'), 'utf8');
const responsiveCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'responsive.css'), 'utf8');

console.log('--- Testing Home 1 Hero Section Sizing & Responsiveness ---');

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

// 1. Structure Verification
assert(indexHtml.includes('<section class="ps-hero">'), 'index.html contains .ps-hero');
assert(indexHtml.includes('class="ps-hero-split"'), 'index.html contains .ps-hero-split');
assert(indexHtml.includes('class="ps-hero-title"'), 'index.html contains .ps-hero-title');
assert(indexHtml.includes('class="ps-hero-subtitle"'), 'index.html contains .ps-hero-subtitle');
assert(indexHtml.includes('class="ps-hero-actions"'), 'index.html contains .ps-hero-actions');
assert(indexHtml.includes('class="ps-hero-stats-grid"'), 'index.html contains .ps-hero-stats-grid');
assert(indexHtml.includes('class="ps-hero-img-main"'), 'index.html contains .ps-hero-img-main');

// 2. Exact requested text and image
assert(indexHtml.includes('Jump, Play &amp; <span style="color: #FFCC00;">Make Happy Memories!</span>'), 'Hero title text is exact');
assert(indexHtml.includes('Welcome to PLAYSPACE — a fun-filled indoor playground where kids can jump, climb, explore, and enjoy exciting adventures in a safe and friendly environment.'), 'Hero paragraph text is exact');
assert(indexHtml.includes('Kids_indoor_trampoline_play_center_2K_20261013150818.jpg'), 'Hero image source is correct');

// 3. CSS rules in pages.css
assert(pagesCss.includes('height: clamp(360px, 46vh, 480px);'), 'pages.css has clamped height for .ps-hero-img-main');
assert(pagesCss.includes('object-fit: cover;'), 'pages.css has object-fit: cover');
assert(pagesCss.includes('font-size: clamp(2.35rem, 3.5vw, 3.5rem);'), 'pages.css has proportional title clamp');
assert(pagesCss.includes('.ps-hero-stat-val'), 'pages.css defines .ps-hero-stat-val');
assert(pagesCss.includes('.ps-hero-stat-desc'), 'pages.css defines .ps-hero-stat-desc');

// 4. Responsive rules in responsive.css
assert(responsiveCss.includes('@media (max-width: 1024px)') && responsiveCss.includes('height: clamp(320px, 38vh, 400px);'), 'responsive.css has 1024px hero clamp');
assert(responsiveCss.includes('@media (max-width: 900px)'), 'responsive.css has 900px hero breakpoint');
assert(responsiveCss.includes('@media (max-width: 768px)') && responsiveCss.includes('height: 280px;'), 'responsive.css has 768px hero height');
assert(responsiveCss.includes('@media (max-width: 480px)') && responsiveCss.includes('grid-template-columns: repeat(3, 1fr);'), 'responsive.css maintains 3 columns for mobile stats');
assert(responsiveCss.includes('@media (max-width: 360px)') && responsiveCss.includes('height: 190px;'), 'responsive.css has 360px hero mobile adjustments');

// 5. Hero 2 Quick Flight Duration Pills Alignment
const home2Html = fs.readFileSync(path.join(ROOT_DIR, 'home-2.html'), 'utf8');
assert(home2Html.includes('class="ps-duration-pill-group"'), 'home-2.html contains .ps-duration-pill-group');
assert(home2Html.includes('max-width: 960px'), 'home-2.html has widened 960px container to fit all 4 pills on 1 line');
assert(home2Html.includes('class="ps-pill-price"'), 'home-2.html uses .ps-pill-price');
assert(pagesCss.includes('.ps-duration-pill-group') && pagesCss.includes('flex-wrap: nowrap;'), 'pages.css forces flex-wrap: nowrap on desktop for duration pills');
assert(pagesCss.includes('.ps-duration-pill:hover strong,') && pagesCss.includes('color: #000000 !important;'), 'pages.css guarantees dark text contrast on active/hover pills');
assert(pagesCss.includes('@media (max-width: 860px)') && pagesCss.includes('grid-template-columns: repeat(2, minmax(0, 1fr));'), 'pages.css provides balanced 2x2 grid for tablet screens');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
