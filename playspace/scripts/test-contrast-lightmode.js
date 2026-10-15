const fs = require('fs');
const path = require('path');

const ROOT_DIR = fs.existsSync(path.resolve(__dirname, '..', 'pages'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..', 'playspace');

console.log('--- Testing Light Mode & Dark Container Button Contrast ---');

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

// 1. Check index.html Birthday Party Basic button
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
assert(indexHtml.includes('party-basic'), 'index.html contains party-basic button');
const darkCards = indexHtml.split('class="ps-card ps-card-dark"').slice(1);
const darkCardButtonsWithLowContrast = darkCards.filter(cardChunk => {
  const cardContent = cardChunk.slice(0, cardChunk.indexOf('</div>\n        </div>'));
  return cardContent.includes('color: var(--ps-text-main)');
});
assert(darkCardButtonsWithLowContrast.length === 0, 'No dark card in index.html contains color: var(--ps-text-main) on buttons');

// 2. Check components.css button contrast rules
const componentsCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'components.css'), 'utf8');
assert(componentsCss.includes('.ps-btn-dark') && componentsCss.includes('color: #FFFFFF !important;'), 'components.css enforces #FFFFFF !important on .ps-btn-dark');
assert(componentsCss.includes('.ps-btn-outline') && componentsCss.includes('color: #FFFFFF !important;'), 'components.css enforces #FFFFFF !important on .ps-btn-outline');
assert(componentsCss.includes('.ps-card-dark .ps-btn-outline'), 'components.css has high-contrast override for .ps-card-dark .ps-btn-outline');
assert(componentsCss.includes('.ps-section-dark .ps-btn-outline'), 'components.css has high-contrast override for .ps-section-dark .ps-btn-outline');

// 3. Check cart.css contrast rules for .ps-btn-add-cart
const cartCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'cart.css'), 'utf8');
assert(cartCss.includes('.ps-btn-add-cart.ps-btn-dark') && cartCss.includes('color: #FFFFFF !important;'), 'cart.css enforces #FFFFFF !important on .ps-btn-add-cart.ps-btn-dark');
assert(cartCss.includes('.ps-btn-add-cart.ps-btn-outline') && cartCss.includes('color: #FFFFFF !important;'), 'cart.css enforces #FFFFFF !important on .ps-btn-add-cart.ps-btn-outline');

// 4. Verify update-buttons.js does not regress index.html button
const updateButtonsJs = fs.readFileSync(path.join(ROOT_DIR, 'scripts', 'update-buttons.js'), 'utf8');
assert(!updateButtonsJs.includes('party-basic" style="border-color: var(--ps-border-color); color: var(--ps-text-main);"'), 'update-buttons.js does not contain the low-contrast regression snippet');

// 5. Scan all HTML files for any dark container having buttons with black text
function scanHtml(dir) {
  let issues = 0;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules') issues += scanHtml(full);
    } else if (f.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      const lines = html.split('\n');
      lines.forEach((line, idx) => {
        if (line.includes('ps-card-dark') && line.includes('var(--ps-text-main)')) {
          console.error(`  SUSPECT: ${path.relative(ROOT_DIR, full)}:${idx+1}: ${line.trim()}`);
          issues++;
        }
      });
    }
  }
  return issues;
}
const darkIssues = scanHtml(ROOT_DIR);
assert(darkIssues === 0, 'No dark card in any HTML file has var(--ps-text-main) inline color on buttons');

// 6. Verify Featured Pricing Cards in Light Mode have guaranteed high contrast
const pricingPassesHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'pricing-passes.html'), 'utf8');
assert(!pricingPassesHtml.includes('ps-pricing-card featured" style="display: flex; flex-direction: column; justify-content: space-between; border: 2px solid #FFCC00; background: var(--ps-bg-card)'), 'pricing-passes.html Pass 3 does not use var(--ps-bg-card) which turns white in light mode');
assert(pricingPassesHtml.includes('ps-pricing-card featured" style="display: flex; flex-direction: column; justify-content: space-between; border: 2px solid #FFCC00; background: #000000; color: #FFFFFF;'), 'pricing-passes.html Pass 3 enforces background: #000000 and color: #FFFFFF');
assert(pricingPassesHtml.includes('<h3 style="font-size: 1.3rem; margin: 0.75rem 0 0.25rem 0; color: #FFFFFF;">2-Hour Pass</h3>'), 'Pass 3 title has explicit #FFFFFF contrast');

const groupEventsHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'group-events.html'), 'utf8');
assert(!groupEventsHtml.includes('ps-pricing-card featured" style="padding: 2.25rem 1.5rem; border: 2px solid #FFCC00; background: var(--ps-bg-card)'), 'group-events.html Tier 2 does not use var(--ps-bg-card)');
assert(groupEventsHtml.includes('background: #000000; color: #FFFFFF;'), 'group-events.html Tier 2 enforces dark background and white text');

const pagesCss = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'css', 'pages.css'), 'utf8');
assert(pagesCss.includes('.ps-pricing-card.featured,') && pagesCss.includes('background: #000000 !important;'), 'pages.css enforces background: #000000 !important on featured cards');

// 7. Verify Outline Buttons in Light Mode (Toddler Banner & Birthday Links)
assert(pricingPassesHtml.includes('class="ps-btn ps-btn-outline-dark" style="border-color: var(--ps-border-color); color: #000000; font-weight: 800;">Compare Plans</a>'), 'Toddler Compare Plans button has high contrast ps-btn-outline-dark and #000000 text');
assert(pricingPassesHtml.includes('class="ps-btn ps-btn-outline-dark" style="border-color: var(--ps-border-color); color: #000000; font-weight: 800;">\n          View Full Birthday Packages'), 'Birthday Packages outline button has high contrast');
assert(pricingPassesHtml.includes('class="ps-btn ps-btn-outline-dark" style="border-color: #FFCC00; color: #000000; font-weight: 800;">\n          Explore VIP Glow Party Features'), 'VIP Glow Party Features button has high contrast black text on yellow border in light mode');
// 8. Verify Badge and Timeline Card Centering
assert(componentsCss.includes('.ps-badge {') && componentsCss.includes('justify-content: center;') && componentsCss.includes('text-align: center;'), 'components.css centers .ps-badge content');
assert(componentsCss.includes('.ps-card[style*="text-align: center"] .ps-badge') && componentsCss.includes('align-self: center;'), 'components.css centers badges inside centered cards');

const birthdayPartiesHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'birthday-parties.html'), 'utf8');
assert(birthdayPartiesHtml.includes('align-self: center; display: inline-flex; justify-content: center; text-align: center;">15 Mins Prior</span>'), 'birthday-parties.html centers 15 Mins Prior badge');
assert(birthdayPartiesHtml.includes('align-self: center; display: inline-flex; justify-content: center; text-align: center;">90–120 Mins Flight</span>'), 'birthday-parties.html centers 90-120 Mins Flight badge');
assert(birthdayPartiesHtml.includes('align-self: center; display: inline-flex; justify-content: center; text-align: center;">30–60 Mins Suite</span>'), 'birthday-parties.html centers 30-60 Mins Suite badge');
assert(birthdayPartiesHtml.includes('align-self: center; display: inline-flex; justify-content: center; text-align: center;">Departure</span>'), 'birthday-parties.html centers Departure badge');

// 9. Verify home-2.html Slot 4 Timetable Time Color
const home2Html = fs.readFileSync(path.join(ROOT_DIR, 'home-2.html'), 'utf8');
assert(!home2Html.includes('margin-bottom: 0.35rem; color: #FFCC00;">07:00 PM – 10:00 PM</div>'), 'home-2.html Slot 4 does not use yellow color on time display');
assert(home2Html.includes('margin-bottom: 0.35rem;">07:00 PM – 10:00 PM</div>'), 'home-2.html Slot 4 has black/default text color matching other slots');

// 10. Verify home-2.html Toddler Lagoon Image
assert(home2Html.includes('assets/images/Toddler_Lagoon_safe_play_2K_20261014104620.jpg'), 'home-2.html uses Toddler_Lagoon_safe_play_2K_20261014104620.jpg');

// 11. Verify home-2.html Group Adventures Image
assert(home2Html.includes('assets/images/Planning_group_adventures_and_sc…_2K_20261014105017.jpg'), 'home-2.html uses Planning_group_adventures_and_sc…_2K_20261014105017.jpg');

// 12. Verify home-2.html Staff Images Match Titles & Roles
assert(home2Html.includes('assets/images/team/Trampoline_operations_and_CPR_ce…_2K_20261014105255.jpg'), 'home-2.html Marcus Vance uses Trampoline Operations / CPR image');
assert(home2Html.includes('assets/images/team/Early_childhood_specialist_profile_2K_20261014105351.jpg'), 'home-2.html Sarah Lin uses Early Childhood Specialist / 500+ Parties image');
assert(home2Html.includes('assets/images/team/Climbing_inspector_and_agility_c…_2K_20261014105633.jpg'), 'home-2.html David Ramos uses ACCT Climbing Inspector image');

// 13. Verify home-2.html Specialty Adventure Zones Images Match Titles
assert(home2Html.includes('assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224636.jpg'), 'home-2.html Olympic Freestyle Bounce uses Mega Trampoline Arena 2K image');
assert(home2Html.includes('assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil…_2K_20261013230406.jpg'), 'home-2.html Clip n Climb Towers uses Adventure Climbing Zone 2K image');
assert(home2Html.includes('assets/images/attractions/Ninja%20Warrior%20Course/Ninja_warrior_course_for_children_2K_20261013225815.jpg'), 'home-2.html Ninja Warrior Matrix uses Ninja Warrior Course 2K image');
assert(home2Html.includes('assets/images/attractions/Airbag%20Jump%20Zone/Children_jumping_on_airbag_2K_20261014010234.jpg'), 'home-2.html Stunt Airbag Crater uses Airbag Jump Zone 2K image');
assert(!home2Html.includes('photo-1522163182402-834f871fd851'), 'home-2.html does not use generic unsplash climbing photo');
assert(!home2Html.includes('photo-1534438327276-14e5300c3a48'), 'home-2.html does not use generic unsplash gym dumbbells photo');
assert(!home2Html.includes('photo-1574629810360-7efbbe195018'), 'home-2.html does not use generic unsplash soccer photo');

// 14. Verify Attraction Cards include Add to Cart option in all zones
const attractionsHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'attractions.html'), 'utf8');
assert(attractionsHtml.includes('ps-btn-add-cart') && (attractionsHtml.match(/data-add-cart="attraction-/g) || []).length === 21, 'attractions.html includes Add to Cart option for all 21 zones');
assert(home2Html.includes('data-add-cart="attraction-mega-trampoline-arena"'), 'home-2.html Zone 1 includes Add to Cart option');
assert(home2Html.includes('data-add-cart="attraction-adventure-climbing-zone"'), 'home-2.html Zone 2 includes Add to Cart option');
assert(home2Html.includes('data-add-cart="attraction-ninja-warrior-course"'), 'home-2.html Zone 3 includes Add to Cart option');
assert(home2Html.includes('data-add-cart="attraction-airbag-jump-zone"'), 'home-2.html Zone 4 includes Add to Cart option');

// 15. Verify Glow Nights image updated to Neon_Blacklight_Glow_Nights_2K_20261014112057.jpg
assert(home2Html.includes('assets/images/Neon_Blacklight_Glow_Nights_2K_20261014112057.jpg'), 'home-2.html uses Neon_Blacklight_Glow_Nights_2K_20261014112057.jpg');
const bdayDetailsHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'birthday-details.html'), 'utf8');
assert(bdayDetailsHtml.includes('../assets/images/birthdays/blacklight-arena-jump.jpg') || bdayDetailsHtml.includes('../assets/images/Neon_Blacklight_Glow_Nights_2K_20261014112057.jpg'), 'birthday-details.html uses authentic blacklight jump image');
assert(!bdayDetailsHtml.includes('photo-1516450360452-9312f5e86fc7'), 'birthday-details.html does not use photo-1516450360452-9312f5e86fc7');

// 16. Verify home-2.html Specialty Adventure Zones equal-height flex alignment
assert((home2Html.match(/min-height:\s*3\.4rem/g) || []).length === 4, 'home-2.html locks title min-height: 3.4rem across all 4 specialty cards');
assert((home2Html.match(/min-height:\s*4\.5rem/g) || []).length === 4, 'home-2.html locks description min-height: 4.5rem across all 4 specialty cards');
assert((home2Html.match(/min-height:\s*44px/g) || []).length === 4, 'home-2.html locks specs row min-height: 44px across all 4 specialty cards');
assert((home2Html.match(/class="ps-attraction-actions" style="margin-top:\s*auto/g) || []).length === 4, 'home-2.html anchors action buttons to bottom via margin-top: auto across all 4 cards');
assert((home2Html.match(/class="ps-card" style="display:\s*flex;\s*flex-direction:\s*column;\s*height:\s*100%;"/g) || []).length >= 4, 'home-2.html specialty cards use full height flex column container');
assert(componentsCss.includes('.ps-card .ps-attraction-actions'), 'components.css includes margin-top: auto rule for card actions');

// 17. Verify Bottom CTA Banners have ps-section-dark and high-contrast outline buttons
assert(birthdayPartiesHtml.includes('class="ps-section ps-section-dark" style="background-color: #000000;'), 'birthday-parties.html bottom CTA has ps-section-dark');
assert(bdayDetailsHtml.includes('class="ps-section ps-section-dark" style="background-color: #000000;'), 'birthday-details.html bottom CTA has ps-section-dark');
assert(pricingPassesHtml.includes('class="ps-section ps-section-dark" style="background-color: #000000;'), 'pricing-passes.html bottom CTA has ps-section-dark');
assert(groupEventsHtml.includes('class="ps-section ps-section-dark" style="background-color: #000000;'), 'group-events.html bottom CTA has ps-section-dark');
assert(componentsCss.includes('.ps-section:not(.ps-section-dark):not([style*="#000"]):not([style*="black"]) .ps-btn-outline'), 'components.css excludes dark inline-styled sections from black button overrides');
assert(componentsCss.includes('.ps-section[style*="#000"] .ps-btn-outline') && componentsCss.includes('color: #FFCC00 !important;'), 'components.css guarantees yellow outline button contrast in black sections');

// 18. Verify gallery.html Bottom CTA Banner and Sign Safety Waiver Button Contrast in Light Mode
const galleryHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'gallery.html'), 'utf8');
assert(galleryHtml.includes('class="ps-section ps-section-dark" style="background-color: #000000;'), 'gallery.html bottom CTA has ps-section-dark');
assert(galleryHtml.includes('class="ps-btn ps-btn-outline" style="border-color: rgba(255,255,255,0.5); color: #FFFFFF; font-size: 1.1rem; padding: 0.9rem 1.75rem;">\n          Sign Safety Waiver'), 'gallery.html Sign Safety Waiver uses high-contrast ps-btn-outline');
assert(!galleryHtml.includes('class="ps-btn ps-btn-outline-dark" style="border-color: rgba(255,255,255,0.35); color: #FFFFFF; font-size: 1.1rem; padding: 0.9rem 1.75rem;">\n          Sign Safety Waiver'), 'gallery.html does not use ps-btn-outline-dark which turns black on black in light mode');
assert(componentsCss.includes('.ps-section-dark .ps-btn-outline-dark') && componentsCss.includes('.ps-section[style*="#000"] .ps-btn-outline-dark'), 'components.css guarantees high contrast for .ps-btn-outline-dark in dark sections');

const buildPublicPagesJs = fs.readFileSync(path.join(ROOT_DIR, 'scripts', 'build-home-pages.js'), 'utf8');

// 19. Verify index.html Popular Play Zones Preview (Section 2) Images Fit Titles Exactly
assert(indexHtml.includes('assets/images/attractions/Interactive%20Play%20Arena/Interactive_play_arena_for_children_2K_20261013232047.jpg'), 'index.html Soft Play Zone uses authentic 2K Interactive Play Arena image');
assert(indexHtml.includes('assets/images/attractions/Rainbow%20Ball%20Pit/Rainbow_Ball_Pit_2K_20261013231429.jpg'), 'index.html Sanitized Ball Pit uses authentic 2K Rainbow Ball Pit image');
assert(indexHtml.includes('assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil%E2%80%A6_2K_20261013230406.jpg'), 'index.html Clip n Climb Wall uses authentic 2K Adventure Climbing Zone image');
assert(indexHtml.includes('assets/images/attractions/Ninja%20Warrior%20Course/Child_running_ninja_course_2K_20261013225811.jpg'), 'index.html Ninja Obstacle Course uses authentic 2K Ninja Warrior Course image');
assert(indexHtml.includes('assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233235.jpg'), 'index.html Toddler Play Zone uses authentic 2K Little Explorers Zone image');

assert(!indexHtml.includes('photo-1596461404969-9ae70f2830c1'), 'index.html does not use generic unsplash wooden train toy photo for ball pit');
assert(!indexHtml.includes('photo-1522163182402-834f871fd851'), 'index.html does not use generic unsplash outdoor mountain cliff photo for climbing wall');
assert(!indexHtml.includes('photo-1534438327276-14e5300c3a48'), 'index.html does not use generic unsplash gym dumbbells photo for ninja course');
assert(!indexHtml.includes('photo-1566454544259-f4b94c3d758c'), 'index.html does not use generic unsplash clothes rack photo for toddler zone');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);


