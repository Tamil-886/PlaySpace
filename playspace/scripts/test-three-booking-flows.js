const fs = require('fs');
const path = require('path');
const { ATTRACTION_ZONES } = require('./attractions-data');

const ROOT_DIR = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT_DIR, 'pages');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ ${testName} - ${details}`);
  }
}

console.log('\n=== PLAYSPACE 3-BOOKING FLOW VERIFICATION SUITE ===\n');

// ---------------------------------------------------------
// 1. ATTRACTIONS BOOKING FLOW VERIFICATION
// ---------------------------------------------------------
console.log('--- 1. Attractions Individual Zone Booking Flow ---');

// Check all 21 zone booking pages exist
ATTRACTION_ZONES.forEach(zone => {
  const pagePath = path.join(PAGES_DIR, `booking-${zone.id}.html`);
  const exists = fs.existsSync(pagePath);
  assert(exists, `Page exists: booking-${zone.id}.html`);

  if (exists) {
    const html = fs.readFileSync(pagePath, 'utf8');

    // Displays zone title, image, description
    assert(html.includes(zone.title), `${zone.id}: displays zone title`);
    assert(html.includes(zone.heroImage), `${zone.id}: displays zone hero image`);
    assert(html.includes(zone.description), `${zone.id}: displays zone description`);

    // Validated form fields
    assert(html.includes('id="psBookingContactName"'), `${zone.id}: has Parent Name field`);
    assert(html.includes('id="psBookingEmail"'), `${zone.id}: has Email Address field`);
    assert(html.includes('id="psBookingPhone"'), `${zone.id}: has Phone Number field`);
    assert(html.includes('id="psBookingDateInput"'), `${zone.id}: has Booking Date field`);
    assert(html.includes('id="psBookingTimeSlot"'), `${zone.id}: has Time Slot field`);
    assert(html.includes('id="psBookingChildrenInput"'), `${zone.id}: has Number of Children counter`);
    assert(html.includes('id="psBookingDurationSelect"'), `${zone.id}: has Session Duration select`);
    assert(html.includes('id="ps-btn-complete-booking"'), `${zone.id}: has Confirm Booking button`);

    // Success confirmation
    assert(html.includes('Booking Completed Successfully!'), `${zone.id}: has success heading "Booking Completed Successfully!"`);
    assert(html.includes('#PS-ZONE-'), `${zone.id}: generates #PS-ZONE- reference code`);
    assert(html.includes('playspace_attraction_bookings'), `${zone.id}: saves to playspace_attraction_bookings localStorage`);

    // Navigation and clean structure
    assert(html.includes('Back to Home'), `${zone.id}: has "Back to Home" button`);
    assert(!html.includes('ps-dashboard-sidebar'), `${zone.id}: no dashboard sidebar present`);
    assert(!html.includes('../parent/dashboard.html#booking'), `${zone.id}: no redirect to parent dashboard`);
  }
});

// Check attractions.html buttons
const attractionsHtml = fs.readFileSync(path.join(PAGES_DIR, 'attractions.html'), 'utf8');
assert(attractionsHtml.includes('ps-btn-add-cart'), 'attractions.html: has Add to Cart buttons for all zones');
assert(attractionsHtml.includes('Book This Zone'), 'attractions.html: has "Book This Zone" buttons');
ATTRACTION_ZONES.forEach(zone => {
  assert(attractionsHtml.includes(`href="booking-${zone.id}.html"`), `attractions.html: links to booking-${zone.id}.html`);
  assert(attractionsHtml.includes(`data-add-cart="attraction-${zone.id}"`), `attractions.html: has Add to Cart for ${zone.id}`);
});

// ---------------------------------------------------------
// 2. BIRTHDAY PARTIES BOOKING FLOW VERIFICATION
// ---------------------------------------------------------
console.log('\n--- 2. Birthday Parties Dedicated Booking Flow ---');

const bdayBookingPath = path.join(PAGES_DIR, 'birthday-booking.html');
assert(fs.existsSync(bdayBookingPath), 'birthday-booking.html page exists');

if (fs.existsSync(bdayBookingPath)) {
  const bdayHtml = fs.readFileSync(bdayBookingPath, 'utf8');

  // Package preselection & cards
  assert(bdayHtml.includes('Basic Bouncer'), 'birthday-booking: displays Basic package');
  assert(bdayHtml.includes('VIP Glow Adventure'), 'birthday-booking: displays VIP Glow package');
  assert(bdayHtml.includes('Ultimate Arena Takeover'), 'birthday-booking: displays Ultimate package');
  assert(bdayHtml.includes('selectedPackageId'), 'birthday-booking: supports package preselection');

  // Specific required fields
  assert(bdayHtml.includes('id="partyChildName"'), 'birthday-booking: has Birthday Child Name field');
  assert(bdayHtml.includes('id="partyChildAge"'), 'birthday-booking: has Child Birthday Date / Age Turning field');
  assert(bdayHtml.includes('id="partyDate"'), 'birthday-booking: has Party Date field');
  assert(bdayHtml.includes('id="partyTimeSlotContainer"'), 'birthday-booking: has Time Slot selection');
  assert(bdayHtml.includes('id="partyChildrenCount"'), 'birthday-booking: has Number of Children counter');
  assert(bdayHtml.includes('id="partyAdultsCount"'), 'birthday-booking: has Number of Adults counter');
  assert(bdayHtml.includes('id="partyParentName"'), 'birthday-booking: has Parent Name field');
  assert(bdayHtml.includes('id="partyParentEmail"'), 'birthday-booking: has Parent Email field');
  assert(bdayHtml.includes('id="partyParentPhone"'), 'birthday-booking: has Parent Phone field');
  assert(bdayHtml.includes('id="partyFood"'), 'birthday-booking: has Food Preferences selector');
  assert(bdayHtml.includes('id="partyTheme"'), 'birthday-booking: has Decoration Theme selector');
  assert(bdayHtml.includes('id="partyNotes"'), 'birthday-booking: has Additional Requirements/Notes field');

  // Dynamic pricing
  assert(bdayHtml.includes('updatePartyPrice'), 'birthday-booking: has dynamic total price calculator');
  assert(bdayHtml.includes('summaryTotalPrice'), 'birthday-booking: has live total summary display');

  // Success Confirmation
  assert(bdayHtml.includes('Birthday Party Booking Completed Successfully!'), 'birthday-booking: has exact success heading "Birthday Party Booking Completed Successfully!"');
  assert(bdayHtml.includes('#PS-PARTY-'), 'birthday-booking: generates unique #PS-PARTY- reference');
  assert(bdayHtml.includes('playspace_birthday_bookings'), 'birthday-booking: saves in playspace_birthday_bookings localStorage');
  assert(bdayHtml.includes('Back to Home'), 'birthday-booking: provides "Back to Home" button');

  // Clean standalone structure
  assert(!bdayHtml.includes('ps-dashboard-sidebar'), 'birthday-booking: no dashboard sidebar');
  assert(!bdayHtml.includes('parent/birthday-booking.html'), 'birthday-booking: not linking to dashboard');
}

// Check birthday-parties.html & birthday-details.html buttons
const bdayPartiesHtml = fs.readFileSync(path.join(PAGES_DIR, 'birthday-parties.html'), 'utf8');
assert(!bdayPartiesHtml.includes('data-add-cart'), 'birthday-parties.html: zero Add to Cart functionality');
assert(bdayPartiesHtml.includes('href="birthday-booking.html?package=party-basic"'), 'birthday-parties.html: links to birthday-booking.html for Basic');
assert(bdayPartiesHtml.includes('href="birthday-booking.html?package=party-vip"'), 'birthday-parties.html: links to birthday-booking.html for VIP Glow');
assert(bdayPartiesHtml.includes('href="birthday-booking.html?package=party-ultimate"'), 'birthday-parties.html: links to birthday-booking.html for Ultimate');

const bdayDetailsHtml = fs.readFileSync(path.join(PAGES_DIR, 'birthday-details.html'), 'utf8');
assert(!bdayDetailsHtml.includes('data-add-cart'), 'birthday-details.html: zero Add to Cart functionality');
assert(bdayDetailsHtml.includes('href="birthday-booking.html?package=party-vip"'), 'birthday-details.html: links to birthday-booking.html for VIP Glow');

// ---------------------------------------------------------
// 3. PRICING & PASSES BOOKING FLOW VERIFICATION
// ---------------------------------------------------------
console.log('\n--- 3. Pricing & Passes Dedicated Booking Flow ---');

const passBookingPath = path.join(PAGES_DIR, 'pass-booking.html');
assert(fs.existsSync(passBookingPath), 'pass-booking.html page exists');

if (fs.existsSync(passBookingPath)) {
  const passHtml = fs.readFileSync(passBookingPath, 'utf8');

  // Plan preselection & cards
  assert(passHtml.includes('60-Min Pass'), 'pass-booking: displays 60-min pass');
  assert(passHtml.includes('90-Min Pass'), 'pass-booking: displays 90-min pass');
  assert(passHtml.includes('120-Min Pass'), 'pass-booking: displays 120-min pass');
  assert(passHtml.includes('All-Day Pass'), 'pass-booking: displays All-Day pass');
  assert(passHtml.includes('5-Session Pass'), 'pass-booking: displays 5-Session pass');
  assert(passHtml.includes('10-Session Pass'), 'pass-booking: displays 10-Session punch pass');
  assert(passHtml.includes('20-Session Pack'), 'pass-booking: displays 20-Session season pack');
  assert(passHtml.includes('selectedPassId'), 'pass-booking: supports pass preselection');

  // Displays visits & validity
  assert(passHtml.includes('summaryPassVisits'), 'pass-booking: displays number of visits');
  assert(passHtml.includes('summaryPassValidity'), 'pass-booking: displays validity period');

  // Specific required fields
  assert(passHtml.includes('id="passStartDate"'), 'pass-booking: has Start Date field');
  assert(passHtml.includes('id="passJumpersCount"'), 'pass-booking: has Number of Children/Jumpers counter');
  assert(passHtml.includes('id="passParentName"'), 'pass-booking: has Parent Name field');
  assert(passHtml.includes('id="passParentEmail"'), 'pass-booking: has Parent Email field');
  assert(passHtml.includes('id="passParentPhone"'), 'pass-booking: has Parent Phone field');
  assert(passHtml.includes('id="passAddonSocks"'), 'pass-booking: has Grip Socks add-on option');

  // Dynamic pricing
  assert(passHtml.includes('updatePassPrice'), 'pass-booking: has dynamic total price calculator');
  assert(passHtml.includes('summaryPassTotal'), 'pass-booking: has live total due summary');

  // Success Confirmation
  assert(passHtml.includes('Pass Booking Completed Successfully!'), 'pass-booking: has exact success heading "Pass Booking Completed Successfully!"');
  assert(passHtml.includes('#PS-PASS-'), 'pass-booking: generates unique #PS-PASS- reference');
  assert(passHtml.includes('playspace_pass_bookings'), 'pass-booking: saves in playspace_pass_bookings localStorage');
  assert(passHtml.includes('Back to Home'), 'pass-booking: provides "Back to Home" button');

  // Clean standalone structure
  assert(!passHtml.includes('ps-dashboard-sidebar'), 'pass-booking: no dashboard sidebar');
  assert(!passHtml.includes('parent/purchase-pass.html'), 'pass-booking: not redirecting to dashboard');
}

// Check pricing-passes.html buttons
const pricingPassesHtml = fs.readFileSync(path.join(PAGES_DIR, 'pricing-passes.html'), 'utf8');
assert(!pricingPassesHtml.includes('data-add-cart'), 'pricing-passes.html: zero Add to Cart functionality');
assert(pricingPassesHtml.includes('Book This Pass'), 'pricing-passes.html: has "Book This Pass" buttons');
assert(pricingPassesHtml.includes('href="pass-booking.html?pass=pass-60"'), 'pricing-passes.html: links to pass-booking.html for 60m');
assert(pricingPassesHtml.includes('href="pass-booking.html?pass=pass-90"'), 'pricing-passes.html: links to pass-booking.html for 90m');
assert(pricingPassesHtml.includes('href="pass-booking.html?pass=pass-120"'), 'pricing-passes.html: links to pass-booking.html for 120m');
assert(pricingPassesHtml.includes('href="pass-booking.html?pass=pass-allday"'), 'pricing-passes.html: links to pass-booking.html for All-Day');
assert(pricingPassesHtml.includes('href="pass-booking.html?pass=punch-10"'), 'pricing-passes.html: links to pass-booking.html for 10-Punch');

// ---------------------------------------------------------
// 4. HOMEPAGE & HOME-2 BOOKING BUTTONS VERIFICATION
// ---------------------------------------------------------
console.log('\n--- 4. Homepage (index.html & home-2.html) Booking Verification ---');

const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
assert(!indexHtml.includes('data-add-cart="pass-90"'), 'index.html: no Add to Cart on attraction cards or passes');
assert(!indexHtml.includes('data-add-cart="party-basic"'), 'index.html: no Add to Cart on party cards');
assert(indexHtml.includes('Book This Zone'), 'index.html: has "Book This Zone" buttons');
assert(indexHtml.includes('Book Birthday Party'), 'index.html: has "Book Birthday Party" buttons');
assert(indexHtml.includes('Book This Pass'), 'index.html: has "Book This Pass" button');

const home2Html = fs.readFileSync(path.join(ROOT_DIR, 'home-2.html'), 'utf8');
assert(!home2Html.includes('data-add-cart="pass-60"'), 'home-2.html: no Add to Cart on pass cards');
assert(!home2Html.includes('data-add-cart="party-vip"'), 'home-2.html: no Add to Cart on party buttons');
assert(home2Html.includes('Book This Zone'), 'home-2.html: has "Book This Zone" buttons');
assert(home2Html.includes('Book Birthday Party'), 'home-2.html: has "Book Birthday Party" buttons');
assert(home2Html.includes('Book This Pass'), 'home-2.html: has "Book This Pass" buttons');

// Summary
console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('ALL THREE BOOKING FLOWS ARE VERIFIED AND COMPLIANT WITH ALL REQUIREMENTS!');
}
