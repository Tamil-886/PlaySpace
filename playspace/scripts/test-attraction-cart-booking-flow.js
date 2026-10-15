/**
 * PlaySpace - Attraction Cart-to-Booking Flow Test Suite
 * Validates the full attraction booking flow for all 21 zones:
 * Attraction Zone -> Add to Cart -> Cart -> Book Now / Proceed -> Corresponding Zone Booking Page -> Confirm Booking -> Booking Success Message
 */

const fs = require('fs');
const path = require('path');
const { ATTRACTION_ZONES } = require('./attractions-data');

const ROOT_DIR = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT_DIR, 'pages');
const CART_JS_PATH = path.join(ROOT_DIR, 'assets', 'js', 'cart.js');
const ATTRACTIONS_HTML_PATH = path.join(PAGES_DIR, 'attractions.html');

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

console.log('\n=== PLAYSPACE ATTRACTION CART-TO-BOOKING FLOW VERIFICATION SUITE ===\n');

// 1. Verify Cart.js Catalog, Image mapping, and Direct Booking Link Generation
console.log('--- 1. Cart.js Architecture & Attractions Catalog ---');
const cartJsCode = fs.readFileSync(CART_JS_PATH, 'utf8');

assert(cartJsCode.includes('getZoneBookingUrl'), 'cart.js: contains getZoneBookingUrl helper function');
assert(!cartJsCode.includes('id="psCartCheckoutBtn"'), 'cart.js: Proceed to Booking button removed from cart drawer per user request');
assert(cartJsCode.includes('psCartViewPageBtn'), 'cart.js: provides primary View Full Cart Page action in drawer');
assert(cartJsCode.includes('isAttraction'), 'cart.js: checks for attraction items');
assert(cartJsCode.includes('fromCart: \'1\'') || cartJsCode.includes("fromCart: '1'") || cartJsCode.includes('fromCart'), 'cart.js: passes fromCart flag in query params');

// 2. Verify attractions.html has Add to Cart and Book buttons for all 21 zones
console.log('\n--- 2. Attractions Page (attractions.html) All 21 Zones ---');
const attractionsHtml = fs.readFileSync(ATTRACTIONS_HTML_PATH, 'utf8');

ATTRACTION_ZONES.forEach(zone => {
  const cardCartBtn = attractionsHtml.includes(`data-add-cart="attraction-${zone.id}"`);
  const cardBookBtn = attractionsHtml.includes(`href="booking-${zone.id}.html"`);
  assert(cardCartBtn, `attractions.html: Zone ${zone.num} (${zone.id}) has Add to Cart button`);
  assert(cardBookBtn, `attractions.html: Zone ${zone.num} (${zone.id}) has Book This Zone button`);
});

// 3. Verify Dedicated Booking Page for Every Single Zone (All 21 Zones)
console.log('\n--- 3. Dedicated Booking Pages & Data Handshake (All 21 Zones) ---');

ATTRACTION_ZONES.forEach(zone => {
  const pagePath = path.join(PAGES_DIR, `booking-${zone.id}.html`);
  const exists = fs.existsSync(pagePath);
  assert(exists, `booking-${zone.id}.html: page exists on disk`);

  if (exists) {
    const pageHtml = fs.readFileSync(pagePath, 'utf8');

    // Display correct zone name and image
    assert(pageHtml.includes(zone.title), `${zone.id}: displays zone title "${zone.title}"`);
    assert(pageHtml.includes(zone.heroImage), `${zone.id}: displays zone image`);

    // Required fields: Date, timeslot, children count, duration, parent details, total price
    assert(pageHtml.includes('id="psBookingDateInput"'), `${zone.id}: has Booking Date input`);
    assert(pageHtml.includes('id="psTimeslotGrid"'), `${zone.id}: has Available Time Slots grid`);
    assert(pageHtml.includes('id="psBookingTimeSlot"'), `${zone.id}: has hidden Time Slot field`);
    assert(pageHtml.includes('id="psBookingChildrenInput"'), `${zone.id}: has Number of Children input`);
    assert(pageHtml.includes('id="psBookingDurationSelect"'), `${zone.id}: has Session Duration select`);
    assert(pageHtml.includes('id="psBookingContactName"'), `${zone.id}: has Parent Name input`);
    assert(pageHtml.includes('id="psBookingEmail"'), `${zone.id}: has Email Address input`);
    assert(pageHtml.includes('id="psBookingPhone"'), `${zone.id}: has Phone Number input`);
    assert(pageHtml.includes('id="summary-total-price"'), `${zone.id}: has Total Price summary display`);

    // Cart Handshake & Context Notice
    assert(pageHtml.includes('id="psCartContextBanner"'), `${zone.id}: has Cart context banner for fromCart`);
    assert(pageHtml.includes('fromCart'), `${zone.id}: client script parses fromCart query param`);
    assert(pageHtml.includes('qtyParam'), `${zone.id}: client script parses qty param for children count`);
    assert(pageHtml.includes('durationParam'), `${zone.id}: client script parses duration param`);

    // Submission & Confirmation View
    assert(pageHtml.includes('id="ps-btn-complete-booking"'), `${zone.id}: has Confirm Zone Booking button`);
    assert(pageHtml.includes('Booking Completed Successfully!'), `${zone.id}: has "Booking Completed Successfully!" success heading`);
    assert(pageHtml.includes('id="successBookingRef"'), `${zone.id}: has booking reference container`);
    assert(pageHtml.includes('#PS-ZONE-'), `${zone.id}: generates unique #PS-ZONE- reference code`);
    assert(pageHtml.includes('id="successZoneImage"'), `${zone.id}: includes Zone Image in confirmation table`);
    assert(pageHtml.includes('id="successTotal"'), `${zone.id}: includes Total Price in confirmation table`);

    // Duplicate submission prevention
    assert(pageHtml.includes('isSubmitting'), `${zone.id}: client script includes isSubmitting flag`);
    assert(pageHtml.includes('disabled = true'), `${zone.id}: disables submit button upon form submission`);

    // Preserves cart in localStorage
    assert(!pageHtml.includes('localStorage.removeItem(\'playspace_cart\')'), `${zone.id}: preserves playspace_cart in storage`);
    assert(!pageHtml.includes('localStorage.removeItem("playspace_cart")'), `${zone.id}: preserves playspace_cart (double quote check)`);

    // Destination verification: NO dashboard redirects
    assert(!pageHtml.includes('../parent/dashboard.html#booking'), `${zone.id}: does not redirect to parent dashboard`);
    assert(!pageHtml.includes('ps-dashboard-sidebar'), `${zone.id}: does not use dashboard layout`);
  }
});

// 4. Cart Page Proceed Button & Item Routing
console.log('\n--- 4. Cart Page Dedicated Zone Booking Flow Routing ---');
const cartPageHtml = fs.readFileSync(path.join(PAGES_DIR, 'cart.html'), 'utf8');

assert(cartPageHtml.includes('id="psCartPageItemsContainer"'), 'cart.html: contains dynamic items container');
assert(cartPageHtml.includes('id="psCartPageProceedBtn"'), 'cart.html: contains Proceed to Booking button');
assert(cartPageHtml.includes('assets/js/cart.js'), 'cart.html: loads cart.js engine');

// 5. Test Flagship Booking Page (booking-attraction-details.html)
console.log('\n--- 5. Flagship Attraction Booking Page (booking-attraction-details.html) ---');
const flagshipPagePath = path.join(PAGES_DIR, 'booking-attraction-details.html');
assert(fs.existsSync(flagshipPagePath), 'booking-attraction-details.html exists');
if (fs.existsSync(flagshipPagePath)) {
  const flagshipHtml = fs.readFileSync(flagshipPagePath, 'utf8');
  assert(flagshipHtml.includes('Booking Completed Successfully!'), 'flagship: has Booking Completed Successfully!');
  assert(flagshipHtml.includes('id="successZoneImage"'), 'flagship: has successZoneImage');
  assert(flagshipHtml.includes('isSubmitting'), 'flagship: has duplicate prevention');
}

// 6. Non-regression check on Birthday and Pass booking flows
console.log('\n--- 6. Non-Regression Check on Other Booking Flows ---');
const bdayBookingHtml = fs.readFileSync(path.join(PAGES_DIR, 'birthday-booking.html'), 'utf8');
assert(bdayBookingHtml.includes('Birthday Party Booking Completed Successfully!'), 'birthday-booking.html intact');

const passBookingHtml = fs.readFileSync(path.join(PAGES_DIR, 'pass-booking.html'), 'utf8');
assert(passBookingHtml.includes('Pass Booking Completed Successfully!'), 'pass-booking.html intact');

console.log('\n========================================');
console.log(`TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('========================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('ALL ATTRACTION CART-TO-BOOKING FLOW CHECKS PASSED PERFECTLY!\n');
}
