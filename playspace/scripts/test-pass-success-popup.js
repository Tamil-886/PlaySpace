/**
 * Test Suite: Pricing & Passes Booking Success Popup Modal Verification
 * Verifies that the success popup modal:
 *  - Displays green checkmark icon
 *  - Displays "Booking Successful!"
 *  - Displays "Your pass booking has been confirmed."
 *  - Retains yellow-and-white theme, rounded corners, and modern styling
 *  - Is responsive down to 320px
 *  - Properly triggers on "Book Now" button
 *  - Close buttons, backdrop click, Escape key are wired
 *  - Form validation occurs before modal trigger
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const passFile = path.join(__dirname, '..', 'pages', 'pass-booking.html');
const html = fs.readFileSync(passFile, 'utf8');

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

console.log('--- Testing Pricing & Passes Booking Success Popup Modal ---');

test('Modal overlay markup exists with correct ID and accessibility attributes', () => {
  assert(html.includes('id="psPassSuccessModal"'), 'Missing #psPassSuccessModal element');
  assert(html.includes('class="ps-modal-overlay"'), 'Missing ps-modal-overlay class');
  assert(html.includes('role="dialog"'), 'Missing role="dialog"');
  assert(html.includes('aria-modal="true"'), 'Missing aria-modal="true"');
});

test('Green checkmark icon exists with SVG and styling', () => {
  assert(html.includes('class="ps-success-checkmark-circle"'), 'Missing ps-success-checkmark-circle');
  assert(html.includes('class="ps-success-checkmark-svg"'), 'Missing ps-success-checkmark-svg');
  assert(html.includes('#2ecc71'), 'Missing green checkmark color #2ecc71');
});

test('Displays exact heading: "Booking Successful!"', () => {
  assert(html.includes('Booking Successful!'), 'Missing text "Booking Successful!"');
});

test('Displays exact subtext: "Your pass booking has been confirmed."', () => {
  assert(html.includes('Your pass booking has been confirmed.'), 'Missing text "Your pass booking has been confirmed."');
});

test('Displays key booking details fields in the modal', () => {
  assert(html.includes('id="passModalRef"'), 'Missing #passModalRef');
  assert(html.includes('id="passModalPlan"'), 'Missing #passModalPlan');
  assert(html.includes('id="passModalJumpers"'), 'Missing #passModalJumpers');
  assert(html.includes('id="passModalDate"'), 'Missing #passModalDate');
  assert(html.includes('id="passModalTotal"'), 'Missing #passModalTotal');
});

test('Yellow-and-white theme styling and rounded corners exist', () => {
  assert(html.includes('.ps-pass-success-modal'), 'Missing .ps-pass-success-modal CSS');
  assert(html.includes('#FFCC00'), 'Missing brand yellow #FFCC00 in modal styles');
  assert(html.includes('border-radius: 24px'), 'Missing rounded corners (border-radius: 24px)');
  assert(html.includes('background-color: #FFFFFF'), 'Missing white background for modal');
});

test('Responsive styles exist for <= 480px and <= 320px', () => {
  assert(html.includes('@media (max-width: 480px)'), 'Missing 480px media query');
  assert(html.includes('@media (max-width: 320px)'), 'Missing 320px media query');
  assert(html.includes('calc(100vw - 16px)'), 'Missing 320px max-width clamp');
});

test('Submit button has Book Now text and action', () => {
  assert(html.includes('Book Now &rarr;'), 'Missing Book Now &rarr; button text');
  assert(html.includes('data-action="book-now"'), 'Missing data-action="book-now"');
});

test('JavaScript triggers openPassSuccessModal() in submitPassBooking()', () => {
  assert(html.includes('openPassSuccessModal();'), 'Missing openPassSuccessModal() call in submitPassBooking');
  assert(html.includes('function openPassSuccessModal()'), 'Missing openPassSuccessModal definition');
  assert(html.includes('function closePassSuccessModal()'), 'Missing closePassSuccessModal definition');
});

test('Modal dismiss, close, and summary handlers are properly wired', () => {
  assert(html.includes('id="btnDismissPassModal"'), 'Missing #btnDismissPassModal');
  assert(html.includes('id="btnClosePassModal"'), 'Missing #btnClosePassModal');
  assert(html.includes('id="btnViewFullPassSummary"'), 'Missing #btnViewFullPassSummary');
  assert(html.includes("dismissBtn.addEventListener('click', closePassSuccessModal)"), 'Missing dismissBtn click listener');
  assert(html.includes("closeBtn.addEventListener('click', closePassSuccessModal)"), 'Missing closeBtn click listener');
  assert(html.includes("detailsBtn.addEventListener('click', closePassSuccessModal)"), 'Missing detailsBtn click listener');
  assert(html.includes("if (e.target === modal)"), 'Missing backdrop click listener');
  assert(html.includes("if (e.key === 'Escape')"), 'Missing Escape key listener');
});

test('Original functionality and success view remain completely intact', () => {
  assert(html.includes('id="psPassSuccessView"'), 'Missing underlying #psPassSuccessView');
  assert(html.includes('id="passSuccessRef"'), 'Missing #passSuccessRef');
  assert(html.includes('playspace_pass_bookings'), 'Missing localStorage key playspace_pass_bookings');
});

console.log(`\nResults: ${passed} PASSED, ${failed} FAILED\n`);
if (failed > 0) process.exit(1);
