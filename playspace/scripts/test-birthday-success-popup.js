/**
 * Test Suite: Birthday Booking Success Popup Modal Verification
 * Verifies that the success popup modal:
 *  - Displays green checkmark icon
 *  - Displays "Successfully Booked!"
 *  - Displays "Your birthday booking has been confirmed."
 *  - Retains yellow-and-white theme, rounded corners, and modern styling
 *  - Is responsive down to 320px
 *  - Properly triggers on "Confirm Birthday Booking"
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const bdayFile = path.join(__dirname, '..', 'pages', 'birthday-booking.html');
const html = fs.readFileSync(bdayFile, 'utf8');

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

console.log('--- Testing Birthday Booking Success Popup Modal ---');

test('Modal overlay markup exists with correct ID and accessibility attributes', () => {
  assert(html.includes('id="psPartySuccessModal"'), 'Missing #psPartySuccessModal element');
  assert(html.includes('class="ps-modal-overlay"'), 'Missing ps-modal-overlay class');
  assert(html.includes('role="dialog"'), 'Missing role="dialog"');
  assert(html.includes('aria-modal="true"'), 'Missing aria-modal="true"');
});

test('Green checkmark icon exists with SVG and styling', () => {
  assert(html.includes('class="ps-success-checkmark-circle"'), 'Missing ps-success-checkmark-circle');
  assert(html.includes('class="ps-success-checkmark-svg"'), 'Missing ps-success-checkmark-svg');
  assert(html.includes('#2ecc71'), 'Missing green checkmark color #2ecc71');
});

test('Displays exact heading: "Successfully Booked!"', () => {
  assert(html.includes('Successfully Booked!'), 'Missing text "Successfully Booked!"');
});

test('Displays exact subtext: "Your birthday booking has been confirmed."', () => {
  assert(html.includes('Your birthday booking has been confirmed.'), 'Missing text "Your birthday booking has been confirmed."');
});

test('Displays key booking details fields in the modal', () => {
  assert(html.includes('id="partyModalRef"'), 'Missing #partyModalRef');
  assert(html.includes('id="partyModalPackage"'), 'Missing #partyModalPackage');
  assert(html.includes('id="partyModalChild"'), 'Missing #partyModalChild');
  assert(html.includes('id="partyModalDateTime"'), 'Missing #partyModalDateTime');
  assert(html.includes('id="partyModalTotal"'), 'Missing #partyModalTotal');
});

test('Yellow-and-white theme styling and rounded corners exist', () => {
  assert(html.includes('.ps-party-success-modal'), 'Missing .ps-party-success-modal CSS');
  assert(html.includes('#FFCC00'), 'Missing brand yellow #FFCC00 in modal styles');
  assert(html.includes('border-radius: 24px'), 'Missing rounded corners (border-radius: 24px)');
  assert(html.includes('background-color: #FFFFFF'), 'Missing white background for modal');
});

test('Responsive styles exist for <= 480px and <= 320px', () => {
  assert(html.includes('@media (max-width: 480px)'), 'Missing 480px media query');
  assert(html.includes('@media (max-width: 320px)'), 'Missing 320px media query');
  assert(html.includes('calc(100vw - 16px)'), 'Missing 320px max-width clamp');
});

test('JavaScript triggers openPartySuccessModal() in submitPartyBooking()', () => {
  assert(html.includes('openPartySuccessModal();'), 'Missing openPartySuccessModal() call in submitPartyBooking');
  assert(html.includes('function openPartySuccessModal()'), 'Missing openPartySuccessModal definition');
  assert(html.includes('function closePartySuccessModal()'), 'Missing closePartySuccessModal definition');
});

test('Modal dismiss and close handlers are properly wired', () => {
  assert(html.includes('id="btnDismissPartyModal"'), 'Missing #btnDismissPartyModal');
  assert(html.includes('id="btnViewFullPartySummary"'), 'Missing #btnViewFullPartySummary');
  assert(html.includes("dismissBtn.addEventListener('click', closePartySuccessModal)"), 'Missing dismissBtn click listener');
  assert(html.includes("detailsBtn.addEventListener('click', closePartySuccessModal)"), 'Missing detailsBtn click listener');
  assert(html.includes("if (e.target === modal)"), 'Missing backdrop click listener');
  assert(html.includes("if (e.key === 'Escape')"), 'Missing Escape key listener');
});

test('Original functionality and success view remain completely intact', () => {
  assert(html.includes('id="psPartySuccessView"'), 'Missing underlying #psPartySuccessView');
  assert(html.includes('id="partySuccessRef"'), 'Missing #partySuccessRef');
  assert(html.includes('playspace_birthday_bookings'), 'Missing localStorage key playspace_birthday_bookings');
});

console.log(`\nResults: ${passed} PASSED, ${failed} FAILED\n`);
if (failed > 0) process.exit(1);
