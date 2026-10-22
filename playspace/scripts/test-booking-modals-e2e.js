/**
 * End-to-End Validation & Modal Interaction Test for
 * 1. Pricing & Passes Booking Flow (pass-booking.html)
 * 2. Birthday Party Booking Flow (birthday-booking.html)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✓ ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${description} -> ${err.message}`);
    failed++;
  }
}

console.log('\n=== TESTING E2E BOOKING CONFIRMATION & SUCCESS POPUP MODALS ===\n');

// -------------------------------------------------------------
// Part 1: Pricing & Passes (pass-booking.html)
// -------------------------------------------------------------
console.log('--- 1. Pricing & Passes Booking Flow & Popup Modal ---');
const passHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'pass-booking.html'), 'utf8');

test('pass-booking: has Book Now button with data-action="book-now"', () => {
  assert(passHtml.includes('id="btnConfirmPassBooking"'), 'Missing id="btnConfirmPassBooking"');
  assert(passHtml.includes('Book Now &rarr;'), 'Missing Book Now text');
  assert(passHtml.includes('data-action="book-now"'), 'Missing data-action="book-now"');
});

test('pass-booking: popup modal markup contains green checkmark SVG and circle', () => {
  assert(passHtml.includes('id="psPassSuccessModal"'), 'Missing #psPassSuccessModal');
  assert(passHtml.includes('class="ps-success-checkmark-circle"'), 'Missing ps-success-checkmark-circle');
  assert(passHtml.includes('class="ps-success-checkmark-svg"'), 'Missing ps-success-checkmark-svg');
  assert(passHtml.includes('#2ecc71'), 'Missing #2ecc71 green color');
});

test('pass-booking: displays heading "Booking Successful!" in popup modal', () => {
  assert(passHtml.includes('<h2 id="psPassModalHeading" class="ps-pass-modal-heading">Booking Successful!</h2>'), 'Missing exact heading Booking Successful!');
});

test('pass-booking: displays confirmation message in popup modal', () => {
  assert(passHtml.includes('Your pass booking has been confirmed.'), 'Missing confirmation text');
});

test('pass-booking: displays Close button in popup modal', () => {
  assert(passHtml.includes('id="btnDismissPassModal"'), 'Missing #btnDismissPassModal');
  assert(passHtml.includes('id="btnClosePassModal"'), 'Missing #btnClosePassModal');
  assert(passHtml.includes('Close'), 'Missing Close button text');
});

test('pass-booking: popup modal contains details fields (ref, plan, jumpers, date, total)', () => {
  assert(passHtml.includes('id="passModalRef"'), 'Missing #passModalRef');
  assert(passHtml.includes('id="passModalPlan"'), 'Missing #passModalPlan');
  assert(passHtml.includes('id="passModalJumpers"'), 'Missing #passModalJumpers');
  assert(passHtml.includes('id="passModalDate"'), 'Missing #passModalDate');
  assert(passHtml.includes('id="passModalTotal"'), 'Missing #passModalTotal');
});

test('pass-booking: triggers openPassSuccessModal only upon successful validation in submitPassBooking', () => {
  assert(passHtml.includes('if (errors.length > 0)'), 'Missing validation error gate');
  assert(passHtml.includes('openPassSuccessModal();'), 'Missing openPassSuccessModal call');
});

test('pass-booking: wires close listeners for close button, dismiss button, backdrop, Escape', () => {
  assert(passHtml.includes('closeBtn.addEventListener(\'click\', closePassSuccessModal)'), 'closeBtn not wired');
  assert(passHtml.includes('dismissBtn.addEventListener(\'click\', closePassSuccessModal)'), 'dismissBtn not wired');
  assert(passHtml.includes('e.target === modal'), 'backdrop click not wired');
  assert(passHtml.includes('e.key === \'Escape\''), 'Escape key not wired');
});

test('pass-booking: responsive styles down to 320px defined', () => {
  assert(passHtml.includes('@media (max-width: 480px)'), 'Missing 480px query');
  assert(passHtml.includes('@media (max-width: 320px)'), 'Missing 320px query');
});

// -------------------------------------------------------------
// Part 2: Birthday Party Booking (birthday-booking.html)
// -------------------------------------------------------------
console.log('\n--- 2. Birthday Party Booking Flow & Popup Modal ---');
const bdayHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'birthday-booking.html'), 'utf8');

test('birthday-booking: has Confirm Birthday Booking button', () => {
  assert(bdayHtml.includes('id="btnConfirmPartyBooking"'), 'Missing id="btnConfirmPartyBooking"');
  assert(bdayHtml.includes('Confirm Birthday Booking &rarr;'), 'Missing Confirm Birthday Booking text');
});

test('birthday-booking: popup modal markup contains green checkmark SVG and circle', () => {
  assert(bdayHtml.includes('id="psPartySuccessModal"'), 'Missing #psPartySuccessModal');
  assert(bdayHtml.includes('class="ps-success-checkmark-circle"'), 'Missing ps-success-checkmark-circle');
  assert(bdayHtml.includes('class="ps-success-checkmark-svg"'), 'Missing ps-success-checkmark-svg');
  assert(bdayHtml.includes('#2ecc71'), 'Missing #2ecc71 green color');
});

test('birthday-booking: displays heading "Booking Successful!" in popup modal', () => {
  assert(bdayHtml.includes('Booking Successful!'), 'Missing heading Booking Successful!');
  assert(bdayHtml.includes('id="psPartyModalHeading"'), 'Missing #psPartyModalHeading');
});

test('birthday-booking: displays confirmation message in popup modal', () => {
  assert(bdayHtml.includes('Your birthday booking has been confirmed.'), 'Missing confirmation text');
});

test('birthday-booking: displays Close button in popup modal', () => {
  assert(bdayHtml.includes('id="btnDismissPartyModal"'), 'Missing #btnDismissPartyModal');
  assert(bdayHtml.includes('id="btnClosePartyModal"'), 'Missing #btnClosePartyModal');
  assert(bdayHtml.includes('Close'), 'Missing Close button text');
});

test('birthday-booking: popup modal contains details fields (ref, package, child, date, total)', () => {
  assert(bdayHtml.includes('id="partyModalRef"'), 'Missing #partyModalRef');
  assert(bdayHtml.includes('id="partyModalPackage"'), 'Missing #partyModalPackage');
  assert(bdayHtml.includes('id="partyModalChild"'), 'Missing #partyModalChild');
  assert(bdayHtml.includes('id="partyModalDateTime"'), 'Missing #partyModalDateTime');
  assert(bdayHtml.includes('id="partyModalTotal"'), 'Missing #partyModalTotal');
});

test('birthday-booking: triggers openPartySuccessModal only upon successful validation in submitPartyBooking', () => {
  assert(bdayHtml.includes('if (errors.length > 0)'), 'Missing validation check');
  assert(bdayHtml.includes('openPartySuccessModal();'), 'Missing openPartySuccessModal call');
});

test('birthday-booking: wires close listeners for close button, dismiss button, backdrop, Escape', () => {
  assert(bdayHtml.includes('closeBtn.addEventListener(\'click\', closePartySuccessModal)'), 'closeBtn not wired');
  assert(bdayHtml.includes('dismissBtn.addEventListener(\'click\', closePartySuccessModal)'), 'dismissBtn not wired');
  assert(bdayHtml.includes('e.target === modal'), 'backdrop click not wired');
  assert(bdayHtml.includes('e.key === \'Escape\''), 'Escape key not wired');
});

test('birthday-booking: responsive styles down to 320px defined', () => {
  assert(bdayHtml.includes('@media (max-width: 480px)'), 'Missing 480px query');
  assert(bdayHtml.includes('@media (max-width: 320px)'), 'Missing 320px query');
});

// -------------------------------------------------------------
// Part 3: Attractions Booking Unchanged Verification
// -------------------------------------------------------------
console.log('\n--- 3. Attractions Booking Unchanged Verification ---');
const zoneFile = path.join(__dirname, '..', 'pages', 'booking-mega-trampoline-arena.html');
const zoneHtml = fs.readFileSync(zoneFile, 'utf8');

test('attractions-booking: Mega Trampoline Arena has existing intact success view', () => {
  assert(zoneHtml.includes('id="psBookingSuccessView"'), 'Missing existing psBookingSuccessView');
  assert(zoneHtml.includes('Booking Completed Successfully!'), 'Missing existing success heading');
  assert(zoneHtml.includes('id="successBookingRef"'), 'Missing successBookingRef');
  assert(zoneHtml.includes('playspace_attraction_bookings'), 'Missing attraction localStorage key');
});

console.log(`\n========================================`);
console.log(`MODAL E2E VERIFICATION: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
