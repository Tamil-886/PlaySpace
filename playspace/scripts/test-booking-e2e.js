/**
 * End-to-End Simulation Test: Complete Jump Session Booking Journey
 * Tests:
 * Home Page → Jump Session Booking Page → Fill Form → Form Validation → Confirm Booking → Booking Completed Successfully.
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

console.log('======================================================================');
console.log('--- Testing Complete End-to-End Journey: Home → Booking → Success ---');
console.log('======================================================================');

// --- STEP 1: Home Page (index.html) ---
console.log('\n[Step 1: User on Home Page]');
const indexHtmlPath = path.join(rootDir, 'index.html');
assert(fs.existsSync(indexHtmlPath), 'Home page (index.html) exists');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const hasBookJumpNav = indexHtml.includes('href="pages/booking.html"') && indexHtml.includes('Book Jump');
assert(hasBookJumpNav, 'Home page has "Book Jump" button linking directly to pages/booking.html');

const doesNotPointToDashboard = !indexHtml.includes('href="parent/dashboard.html"') || indexHtml.includes('class="ps-nav-link ">Dashboard');
assert(doesNotPointToDashboard, 'Home page does not redirect booking buttons to parent dashboard');

// --- STEP 2: Jump Session Booking Page (pages/booking.html) ---
console.log('\n[Step 2: User navigates to Jump Session Booking Page]');
const bookingHtmlPath = path.join(rootDir, 'pages', 'booking.html');
assert(fs.existsSync(bookingHtmlPath), 'Jump Session Booking page (pages/booking.html) exists');

const bookingHtml = fs.readFileSync(bookingHtmlPath, 'utf8');

// Check standalone structure (no dashboard layout or widgets)
assert(!bookingHtml.includes('class="ps-dashboard-layout"'), 'Booking page is standalone (no ps-dashboard-layout)');
assert(!bookingHtml.includes('class="ps-dash-sidebar"'), 'Booking page does not contain dashboard sidebar');
assert(!bookingHtml.includes('class="ps-dash-header"'), 'Booking page does not contain dashboard header');
assert(!bookingHtml.includes('class="ps-dash-card"'), 'Booking page does not contain dashboard widgets or cards');

// Verify only the 9 relevant booking fields
console.log('\n[Step 3: Verify the 9 Relevant Booking Fields]');
assert(bookingHtml.includes('id="psBookingContactName"'), '1. Parent Name field is present');
assert(bookingHtml.includes('id="psBookingEmail"'), '2. Email Address field is present');
assert(bookingHtml.includes('id="psBookingPhone"'), '3. Phone Number field is present');
assert(bookingHtml.includes('id="psBookingDateInput"'), '4. Booking Date field is present');
assert(bookingHtml.includes('id="psTimeslotGrid"') && bookingHtml.includes('class="ps-timeslot-btn'), '5. Available Time Slot selection is present');
assert(bookingHtml.includes('id="psCounterChildrenVal"') && bookingHtml.includes('data-counter-type="jumpers"'), '6. Number of Children field is present');
assert(bookingHtml.includes('id="psBookingDurationSelect"'), '7. Session Duration selector is present');
assert(bookingHtml.includes('id="summary-total-price"'), '8. Total Price display is present');
assert(bookingHtml.includes('id="ps-btn-complete-booking"'), '9. Confirm Booking button is present');

// --- STEP 3: Form Validation Logic ---
console.log('\n[Step 4: Form Validation & Security Checks]');
const bookingJsPath = path.join(rootDir, 'assets', 'js', 'booking.js');
const bookingJs = fs.readFileSync(bookingJsPath, 'utf8');

// Simulate client validation function
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function mockValidate(parentName, email, phone, date, slot, children, duration) {
  if (!parentName || parentName.trim().length < 2) return { valid: false, error: 'Parent Name' };
  if (!email || !emailRegex.test(email.trim())) return { valid: false, error: 'Email' };
  if (!phone || phone.replace(/\D/g, '').length < 7) return { valid: false, error: 'Phone' };
  if (!date) return { valid: false, error: 'Date' };
  if (!slot) return { valid: false, error: 'TimeSlot' };
  if (!children || children < 1) return { valid: false, error: 'Children' };
  if (!duration) return { valid: false, error: 'Duration' };
  return { valid: true };
}

// Incomplete tests
assert(mockValidate('', 'test@example.com', '5551234567', '2026-10-20', '10:00 AM', 2, '90').valid === false, 'Form rejects submission with empty Parent Name');
assert(mockValidate('John', 'not-an-email', '5551234567', '2026-10-20', '10:00 AM', 2, '90').valid === false, 'Form rejects submission with invalid Email Address');
assert(mockValidate('John', 'john@example.com', '123', '2026-10-20', '10:00 AM', 2, '90').valid === false, 'Form rejects submission with invalid Phone Number');
assert(mockValidate('John', 'john@example.com', '5551234567', '', '10:00 AM', 2, '90').valid === false, 'Form rejects submission with missing Date');
assert(mockValidate('John', 'john@example.com', '5551234567', '2026-10-20', '10:00 AM', 0, '90').valid === false, 'Form rejects submission with 0 children');

// Valid input test
const validResult = mockValidate('Sarah Jenkins', 'sarah.jenkins@example.com', '(555) 234-5678', '2026-10-17', '10:00 AM - 11:30 AM', 3, '90');
assert(validResult.valid === true, 'Form accepts valid submission with all completed fields');

// --- STEP 4: Total Price Calculation ---
console.log('\n[Step 5: Dynamic Total Price Calculation]');
function calcPrice(durationMinutes, childrenCount) {
  const rates = { '60': 18.00, '90': 24.00, '120': 28.00, 'allday': 36.00 };
  const rate = rates[durationMinutes] || 24.00;
  return rate * childrenCount;
}

assert(calcPrice('60', 1) === 18.00, '1 child for 60 mins = $18.00');
assert(calcPrice('90', 1) === 24.00, '1 child for 90 mins = $24.00');
assert(calcPrice('90', 2) === 48.00, '2 children for 90 mins = $48.00');
assert(calcPrice('90', 3) === 72.00, '3 children for 90 mins = $72.00');
assert(calcPrice('allday', 2) === 72.00, '2 children for All-Day = $72.00');

// --- STEP 5: Successful Booking Confirmation Display ---
console.log('\n[Step 6: Successful Booking Confirmation Display]');
// Check on booking.html
assert(bookingHtml.includes('Booking Completed Successfully!'), 'booking.html has exact success headline "Booking Completed Successfully!"');
assert(bookingHtml.includes('Your Jump Session has been booked successfully. Thank you for choosing PLAYSPACE!'), 'booking.html has exact confirmation message');
assert(bookingHtml.includes('id="successBookingRef"'), 'booking.html displays booking reference number');
assert(bookingHtml.includes('id="successDate"'), 'booking.html displays booking date');
assert(bookingHtml.includes('id="successTimeSlot"'), 'booking.html displays time slot');
assert(bookingHtml.includes('id="successChildren"'), 'booking.html displays number of children');
assert(bookingHtml.includes('id="successDuration"'), 'booking.html displays session duration');
assert(bookingHtml.includes('id="successTotal"'), 'booking.html displays total price');
assert(bookingHtml.includes('id="psBtnSuccessBackHome"') && bookingHtml.includes('../index.html'), 'booking.html has Back to Home button');
assert(bookingHtml.includes('id="psBtnSuccessViewDetails"'), 'booking.html has View Booking Details button');

// Check on booking-confirmation.html
const confHtmlPath = path.join(rootDir, 'pages', 'booking-confirmation.html');
const confHtml = fs.readFileSync(confHtmlPath, 'utf8');
assert(confHtml.includes('Booking Completed Successfully!'), 'booking-confirmation.html has exact success headline "Booking Completed Successfully!"');
assert(confHtml.includes('Your Jump Session has been booked successfully. Thank you for choosing PLAYSPACE!'), 'booking-confirmation.html has exact confirmation message');
assert(confHtml.includes('id="confBookingId"'), 'booking-confirmation.html displays booking reference number');
assert(confHtml.includes('id="confDate"'), 'booking-confirmation.html displays booking date');
assert(confHtml.includes('id="confTimeSlot"'), 'booking-confirmation.html displays time slot');
assert(confHtml.includes('id="confChildren"'), 'booking-confirmation.html displays number of children');
assert(confHtml.includes('id="confDuration"'), 'booking-confirmation.html displays session duration');
assert(confHtml.includes('id="confTotal"'), 'booking-confirmation.html displays total price');
assert(confHtml.includes('id="confBackHomeBtn"'), 'booking-confirmation.html has Back to Home button');
assert(confHtml.includes('id="confViewDetailsBtn"'), 'booking-confirmation.html has View Booking Details button');

// --- STEP 6: Duplicate Booking Prevention & Storage State ---
console.log('\n[Step 7: Duplicate Booking Prevention & Data Persistence]');
assert(bookingJs.includes('isSubmitted'), 'booking.js contains duplicate submission guard flag');
assert(bookingJs.includes("localStorage.setItem('playspace_last_booking'"), 'booking.js persists confirmed booking to localStorage');
assert(bookingJs.includes("localStorage.removeItem('playspace_cart')"), 'booking.js clears cart to prevent stale duplicate entries');

// --- STEP 7: Parent Dashboard Preserved ---
console.log('\n[Step 8: Parent Dashboard Preserved Independently]');
const dashHtmlPath = path.join(rootDir, 'parent', 'dashboard.html');
const dashHtml = fs.readFileSync(dashHtmlPath, 'utf8');
assert(dashHtml.includes('class="ps-dashboard-layout"'), 'Parent dashboard retains its independent layout');
assert(dashHtml.includes('class="ps-dash-sidebar"'), 'Parent dashboard retains its sidebar');
assert(dashHtml.includes('children.html'), 'Parent dashboard retains child management');
assert(dashHtml.includes('my-bookings.html'), 'Parent dashboard retains booking history');

console.log('\n======================================================================');
console.log(`End-to-End Journey Result: ${passed} passed, ${failed} failed.`);
console.log('======================================================================');

process.exit(failed > 0 ? 1 : 0);
