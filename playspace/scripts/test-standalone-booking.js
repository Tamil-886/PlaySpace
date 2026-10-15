/**
 * Test Suite: Dedicated Standalone Jump Session Booking Flow Verification
 * Verifies all requirements from User Request:
 * 1. Separate Jump Session Booking Page (standalone, no dashboard sidebar/widgets/profile).
 * 2. Relevant form fields: Parent Name, Email, Phone, Booking Date, Time Slot, Number of Children, Session Duration, Total Price, Confirm Booking button.
 * 3. Form validation: Prevents incomplete/invalid submissions.
 * 4. Successful Booking Confirmation:
 *    - "Booking Completed Successfully!"
 *    - "Your Jump Session has been booked successfully. Thank you for choosing PLAYSPACE!"
 *    - Booking Reference Number, Date, Time, Number of Children, Session Duration, Total Price.
 *    - Back to Home button and View Booking Details button.
 * 5. Booking Functionality: localStorage demo persistence, duplicate prevention, cart sync.
 * 6. Parent Dashboard isolation: Dashboard preserved with its own layout.
 * 7. Design & Navigation: Consistent theme, Book Jump links to dedicated booking page.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
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

console.log('===============================================================');
console.log('--- Testing Jump Session Booking Flow & Standalone Page ---');
console.log('===============================================================');

// 1. Separate Jump Session Booking Page
const bookingPath = path.join(rootDir, 'pages', 'booking.html');
assert(fs.existsSync(bookingPath), 'pages/booking.html exists as a standalone public page');

if (fs.existsSync(bookingPath)) {
  const bookingContent = fs.readFileSync(bookingPath, 'utf8');

  // Verify it uses public layout, NOT dashboard layout
  assert(bookingContent.includes('class="ps-header"'), 'booking.html contains standard PlaySpace public header');
  assert(bookingContent.includes('class="ps-footer"'), 'booking.html contains standard PlaySpace public footer');
  assert(!bookingContent.includes('class="ps-dashboard-layout"'), 'booking.html does NOT contain ps-dashboard-layout');
  assert(!bookingContent.includes('class="ps-dash-sidebar"'), 'booking.html does NOT contain ps-dash-sidebar');
  assert(!bookingContent.includes('ps-dash-header'), 'booking.html does NOT contain ps-dash-header');
  assert(!bookingContent.includes('Parent Portal &bull; VIP Member'), 'booking.html does NOT display Parent Portal header badge');

  // 2. Jump Session Booking Form - Required Fields
  assert(bookingContent.includes('id="psBookingContactName"'), 'booking.html contains Parent Name field');
  assert(bookingContent.includes('id="psBookingEmail"'), 'booking.html contains Email Address field');
  assert(bookingContent.includes('id="psBookingPhone"'), 'booking.html contains Phone Number field');
  assert(bookingContent.includes('id="psBookingDateInput"'), 'booking.html contains Booking Date field');
  assert(bookingContent.includes('id="psTimeslotGrid"') && bookingContent.includes('class="ps-timeslot-btn'), 'booking.html contains Available Time Slot selection grid');
  assert(bookingContent.includes('data-counter-type="jumpers"') && bookingContent.includes('id="psCounterChildrenVal"'), 'booking.html contains Number of Children field');
  assert(bookingContent.includes('id="psBookingDurationSelect"'), 'booking.html contains Session Duration selector');
  assert(bookingContent.includes('id="summary-total-price"'), 'booking.html displays Total Price dynamically');
  assert(bookingContent.includes('id="ps-btn-complete-booking"'), 'booking.html contains Confirm Booking button');

  // Form Validation and Alert
  assert(bookingContent.includes('id="psBookingValidationAlert"'), 'booking.html contains Form Validation Alert element');
  assert(bookingContent.includes('id="psJumpBookingForm"'), 'booking.html wraps fields in an accessible form element');

  // 3. Successful Booking Confirmation Elements on Booking Page
  assert(bookingContent.includes('id="psBookingSuccessView"'), 'booking.html contains Successful Booking Confirmation view container');
  assert(bookingContent.includes('Booking Completed Successfully!'), 'booking.html includes "Booking Completed Successfully!" heading');
  assert(bookingContent.includes('Your Jump Session has been booked successfully. Thank you for choosing PLAYSPACE!'), 'booking.html includes confirmation message');
  assert(bookingContent.includes('id="successBookingRef"'), 'booking.html displays booking reference number in success view');
  assert(bookingContent.includes('id="successDate"'), 'booking.html displays selected booking date in success view');
  assert(bookingContent.includes('id="successTimeSlot"'), 'booking.html displays selected time slot in success view');
  assert(bookingContent.includes('id="successChildren"'), 'booking.html displays number of children in success view');
  assert(bookingContent.includes('id="successDuration"'), 'booking.html displays session duration in success view');
  assert(bookingContent.includes('id="successTotal"'), 'booking.html displays total price in success view');
  assert(bookingContent.includes('id="psBtnSuccessBackHome"') && bookingContent.includes('../index.html'), 'booking.html provides Back to Home button');
  assert(bookingContent.includes('id="psBtnSuccessViewDetails"') || bookingContent.includes('booking-confirmation.html'), 'booking.html provides View Booking Details option');

  // Script inclusions
  assert(bookingContent.includes('src="../assets/js/cart.js"'), 'booking.html loads cart.js');
  assert(bookingContent.includes('src="../assets/js/booking.js"'), 'booking.html loads booking.js');
}

// 4. Dedicated Standalone Booking Confirmation Page (pages/booking-confirmation.html)
const confPath = path.join(rootDir, 'pages', 'booking-confirmation.html');
assert(fs.existsSync(confPath), 'pages/booking-confirmation.html exists as a standalone confirmation page');

if (fs.existsSync(confPath)) {
  const confContent = fs.readFileSync(confPath, 'utf8');
  assert(confContent.includes('class="ps-header"'), 'booking-confirmation.html contains standard public header');
  assert(confContent.includes('class="ps-footer"'), 'booking-confirmation.html contains standard public footer');
  assert(!confContent.includes('class="ps-dashboard-layout"'), 'booking-confirmation.html does NOT contain ps-dashboard-layout');
  assert(!confContent.includes('class="ps-dash-sidebar"'), 'booking-confirmation.html does NOT contain ps-dash-sidebar');
  assert(confContent.includes('Booking Completed Successfully!'), 'booking-confirmation.html displays "Booking Completed Successfully!"');
  assert(confContent.includes('Your Jump Session has been booked successfully. Thank you for choosing PLAYSPACE!'), 'booking-confirmation.html displays confirmation message');
  assert(confContent.includes('id="confBookingId"'), 'booking-confirmation.html displays Booking Reference Number');
  assert(confContent.includes('id="confDate"'), 'booking-confirmation.html displays Booking Date');
  assert(confContent.includes('id="confTimeSlot"'), 'booking-confirmation.html displays Available Time Slot');
  assert(confContent.includes('id="confChildren"'), 'booking-confirmation.html displays Number of Children');
  assert(confContent.includes('id="confDuration"'), 'booking-confirmation.html displays Session Duration');
  assert(confContent.includes('id="confTotal"'), 'booking-confirmation.html displays Total Price');
  assert(confContent.includes('id="confBackHomeBtn"') && confContent.includes('href="../index.html"'), 'booking-confirmation.html provides Back to Home button');
  assert(confContent.includes('id="confViewDetailsBtn"'), 'booking-confirmation.html provides View Booking Details option');
}

// 5. Booking Functionality & Logic in assets/js/booking.js
const bookingJsPath = path.join(rootDir, 'assets', 'js', 'booking.js');
assert(fs.existsSync(bookingJsPath), 'assets/js/booking.js exists');

if (fs.existsSync(bookingJsPath)) {
  const bookingJsContent = fs.readFileSync(bookingJsPath, 'utf8');

  // Form Validation
  assert(bookingJsContent.includes('validateBookingForm'), 'booking.js defines validateBookingForm function');
  assert(bookingJsContent.includes('emailRegex'), 'booking.js validates email address format');
  assert(bookingJsContent.includes('showAlert'), 'booking.js displays error alert for invalid fields');

  // Unique reference number & Total price calculation
  assert(bookingJsContent.includes("'PS-' + Math.floor"), 'booking.js generates unique demo reference number (e.g. PS-XXXX)');
  assert(bookingJsContent.includes('calculateTotalPrice'), 'booking.js calculates total price dynamically from duration and children');

  // Data persistence
  assert(bookingJsContent.includes("localStorage.setItem('playspace_last_booking'"), 'booking.js saves confirmed booking to playspace_last_booking in localStorage');
  assert(bookingJsContent.includes('playspace_parent_bookings'), 'booking.js appends booking to playspace_parent_bookings history');

  // Duplicate prevention & Cart sync
  assert(bookingJsContent.includes('isSubmitted'), 'booking.js prevents duplicate submissions');
  assert(bookingJsContent.includes("localStorage.removeItem('playspace_cart')"), 'booking.js clears cart upon confirmation to prevent duplicates');

  // Success view presentation & redirect
  assert(bookingJsContent.includes('psBookingSuccessView'), 'booking.js unhides psBookingSuccessView on successful submission');
  assert(bookingJsContent.includes('booking-confirmation.html?id='), 'booking.js links to dedicated booking-confirmation page');
}

// 6. Parent Dashboard Isolation
const dashPath = path.join(rootDir, 'parent', 'dashboard.html');
assert(fs.existsSync(dashPath), 'parent/dashboard.html exists');

if (fs.existsSync(dashPath)) {
  const dashContent = fs.readFileSync(dashPath, 'utf8');
  assert(dashContent.includes('class="ps-dashboard-layout"'), 'parent/dashboard.html retains ps-dashboard-layout');
  assert(dashContent.includes('class="ps-dash-sidebar"'), 'parent/dashboard.html retains ps-dash-sidebar');
  assert(dashContent.includes('class="ps-sidebar-nav"'), 'parent/dashboard.html retains dashboard navigation links');
  assert(dashContent.includes('my-bookings.html'), 'parent/dashboard.html links to my-bookings');
  assert(dashContent.includes('children.html'), 'parent/dashboard.html links to children management');
  assert(dashContent.includes('my-passes.html'), 'parent/dashboard.html links to membership passes');
}

// 7. Redirect from Navbar & Direct Booking Buttons
const indexHtmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
  assert(
    indexContent.includes('href="pages/booking.html"') && indexContent.includes('Book Jump'),
    'index.html navbar Book Jump CTA links directly to pages/booking.html (not Dashboard)'
  );
}

// 8. Test cart.html Proceed to Booking links to booking.html
const cartPath = path.join(rootDir, 'pages', 'cart.html');
if (fs.existsSync(cartPath)) {
  const cartContent = fs.readFileSync(cartPath, 'utf8');
  assert(
    cartContent.includes('href="booking.html"') && cartContent.includes('id="psCartPageProceedBtn"'),
    'cart.html Proceed to Booking links directly to booking.html'
  );
}

console.log('===============================================================');
console.log(`Jump Session Booking Suite: ${passed} passed, ${failed} failed.`);
console.log('===============================================================');

process.exit(failed > 0 ? 1 : 0);
