/**
 * PlaySpace - Test Suite for Book Slot Navigation & Jump Session Booking Flow
 * Verifies:
 * 1. All "Book Slot" buttons navigate directly to the Jump Session Booking page (pages/booking.html or booking.html)
 * 2. No "Book Slot" button redirects users to Dashboard, Parent Dashboard, or parent/book-session.html
 * 3. Session details (session, title, price, duration, slot) are passed as query parameters
 * 4. Jump Session Booking page (pages/booking.html) has the required form inputs and displays session information
 * 5. Success heading is "Jump Session Booking Completed Successfully!" on both booking.html and booking-confirmation.html
 * 6. booking.js parses URL search parameters, populates session details, and generates a unique booking reference
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Starting Book Slot Navigation & Jump Session Flow Test Suite...\n');

const rootDir = path.resolve(__dirname, '..');
const pagesDir = path.join(rootDir, 'pages');

let totalTests = 0;
let passedTests = 0;

function runTest(desc, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${desc}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${desc}`);
    console.error(`     ${err.message}`);
  }
}

// 1. Verify "Book Slot" Buttons in home-2.html
runTest('home-2.html timetable contains 4 session cards linking directly to pages/booking.html', () => {
  const home2Html = fs.readFileSync(path.join(rootDir, 'home-2.html'), 'utf8');

  // Must not link to parent/book-session.html or dashboard
  assert(!home2Html.includes('parent/book-session.html'), 'home-2.html must not contain links to parent/book-session.html');
  assert(!home2Html.includes('parent/dashboard.html#booking'), 'home-2.html must not link to parent dashboard for booking');

  // Slot 1: Toddler Gentle Morning
  assert(
    home2Html.includes('pages/booking.html?session=toddler&title=Toddler+Gentle+Morning&price=12&duration=120&slot=09:00+AM+-+11:00+AM'),
    'Slot 1: Toddler Gentle Morning links to pages/booking.html with session, title, price=12, duration=120, slot'
  );

  // Slot 2: Open Jump & Flight
  assert(
    home2Html.includes('pages/booking.html?session=open-jump&title=Open+Jump+%26+Flight&price=18&duration=60&slot=11:00+AM+-+01:00+PM'),
    'Slot 2: Open Jump & Flight links to pages/booking.html with session, title, price=18, duration=60, slot'
  );

  // Slot 3: Ninja Agility & Climbing
  assert(
    home2Html.includes('pages/booking.html?session=ninja&title=Ninja+Agility+%26+Climbing&price=22&duration=90&slot=03:00+PM+-+04:30+PM'),
    'Slot 3: Ninja Agility & Climbing links to pages/booking.html with session, title, price=22, duration=90, slot'
  );

  // Slot 4: Neon Blacklight Glow
  assert(
    home2Html.includes('pages/booking.html?session=glow&title=Neon+Blacklight+Glow&price=25&duration=120&slot=07:00+PM+-+09:00+PM'),
    'Slot 4: Neon Blacklight Glow links to pages/booking.html with session, title, price=25, duration=120, slot'
  );

  // Toddler Lagoon feature card
  assert(
    home2Html.includes('pages/booking.html?session=toddler&title=Toddler+Time&price=12&duration=120&slot=09:00+AM+-+11:00+AM'),
    'Toddler Time card links to pages/booking.html with toddler parameters'
  );
});

// 2. Verify Hero CTA in index.html
runTest('index.html hero CTA links directly to pages/booking.html', () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  assert(!indexHtml.includes('parent/book-session.html'), 'index.html must not contain links to parent/book-session.html');
  assert(indexHtml.includes('href="pages/booking.html"'), 'index.html hero CTA points to pages/booking.html');
});

// 3. Verify Pricing & Session Cards in pricing-passes.html
runTest('pricing-passes.html session cards link directly to booking.html with parameters', () => {
  const pricingHtml = fs.readFileSync(path.join(pagesDir, 'pricing-passes.html'), 'utf8');

  // Must not link to parent/book-session.html
  assert(!pricingHtml.includes('../parent/book-session.html'), 'pricing-passes.html must not link to ../parent/book-session.html');

  // Toddler Time banner
  assert(
    pricingHtml.includes('booking.html?session=toddler&title=Toddler+Time&price=12&duration=120&slot=09:00+AM+-+11:00+AM'),
    'Toddler Time links to booking.html with toddler params'
  );

  // Family Pizza & Bounce
  assert(
    pricingHtml.includes('booking.html?session=family&title=Family+Pizza+%26+Bounce&price=79&duration=90'),
    'Family Pizza & Bounce links to booking.html with family params'
  );

  // Sibling Tiered Discount
  assert(
    pricingHtml.includes('booking.html?session=sibling&title=Sibling+Tiered+Discount&price=24&duration=90'),
    'Sibling Tiered Discount links to booking.html with sibling params'
  );

  // Weekend Neon Glow Night
  assert(
    pricingHtml.includes('booking.html?session=glow&title=Weekend+Neon+Glow+Night&price=89&duration=180&slot=06:00+PM+-+09:00+PM'),
    'Weekend Neon Glow Night links to booking.html with glow params'
  );

  // Comparison table single passes
  assert(pricingHtml.includes('booking.html?duration=60&price=18&title=1-Hour+Pass'), '1-Hour pass links to booking.html with 60min and $18');
  assert(pricingHtml.includes('booking.html?duration=120&price=28&title=2-Hour+Pass'), '2-Hour pass links to booking.html with 120min and $28');
  assert(pricingHtml.includes('booking.html?duration=allday&price=36&title=All-Day+Pass'), 'All-Day pass links to booking.html with allday and $36');
  assert(pricingHtml.includes('booking.html?session=family&title=Family+4-Pack&price=79&duration=90'), 'Family 4-Pack links to booking.html with family params');
});

// 4. Verify No Public Page Links to parent/book-session.html
runTest('No public page links to parent/book-session.html', () => {
  const publicFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
  publicFiles.push('../index.html', '../home-2.html');

  let badLinks = [];
  publicFiles.forEach(f => {
    const fullPath = path.resolve(pagesDir, f);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('book-session.html')) {
        badLinks.push(f);
      }
    }
  });

  assert.strictEqual(badLinks.length, 0, `Found public pages still linking to book-session.html: ${badLinks.join(', ')}`);
});

// 5. Verify Jump Session Booking Page (pages/booking.html) Structure & Fields
runTest('pages/booking.html contains required booking fields and session display elements', () => {
  const bookingHtml = fs.readFileSync(path.join(pagesDir, 'booking.html'), 'utf8');

  // Session display banner & summary
  assert(bookingHtml.includes('id="psBookingSessionInfoBanner"'), 'booking.html contains psBookingSessionInfoBanner');
  assert(bookingHtml.includes('id="psBookingSessionName"'), 'booking.html contains psBookingSessionName');
  assert(bookingHtml.includes('id="psBookingSessionBadge"'), 'booking.html contains psBookingSessionBadge');
  assert(bookingHtml.includes('id="summarySessionLine"'), 'booking.html contains summarySessionLine');
  assert(bookingHtml.includes('id="summarySessionText"'), 'booking.html contains summarySessionText');

  // Form input fields
  assert(bookingHtml.includes('id="psBookingDateInput"'), 'booking.html contains date input psBookingDateInput');
  assert(bookingHtml.includes('id="psBookingDurationSelect"'), 'booking.html contains duration select psBookingDurationSelect');
  assert(bookingHtml.includes('id="psBookingChildrenInput"'), 'booking.html contains children input psBookingChildrenInput');
  assert(bookingHtml.includes('id="psTimeslotGrid"'), 'booking.html contains timeslot grid psTimeslotGrid');
  assert(bookingHtml.includes('id="psBookingTimeSlot"'), 'booking.html contains hidden timeslot input psBookingTimeSlot');
  assert(bookingHtml.includes('id="psBookingContactName"'), 'booking.html contains parent name input psBookingContactName');
  assert(bookingHtml.includes('id="psBookingEmail"'), 'booking.html contains email input psBookingEmail');
  assert(bookingHtml.includes('id="psBookingPhone"'), 'booking.html contains phone input psBookingPhone');

  // Submit button
  assert(bookingHtml.includes('id="ps-btn-complete-booking"'), 'booking.html contains confirm booking button ps-btn-complete-booking');

  // Success view and reference
  assert(
    bookingHtml.includes('Jump Session Booking Completed Successfully!'),
    'booking.html contains exact heading "Jump Session Booking Completed Successfully!"'
  );
  assert(bookingHtml.includes('id="successBookingRef"'), 'booking.html contains unique booking reference id successBookingRef');
  assert(bookingHtml.includes('id="successSessionRow"'), 'booking.html contains successSessionRow');
  assert(bookingHtml.includes('id="successTotal"'), 'booking.html contains successTotal');
});

// 6. Verify Dedicated Confirmation Page (pages/booking-confirmation.html)
runTest('pages/booking-confirmation.html contains exact success heading and details', () => {
  const confHtml = fs.readFileSync(path.join(pagesDir, 'booking-confirmation.html'), 'utf8');

  assert(
    confHtml.includes('Jump Session Booking Completed Successfully!'),
    'booking-confirmation.html contains exact heading "Jump Session Booking Completed Successfully!"'
  );
  assert(confHtml.includes('id="confBookingId"'), 'booking-confirmation.html contains confBookingId');
  assert(confHtml.includes('id="confSessionRow"'), 'booking-confirmation.html contains confSessionRow');
  assert(confHtml.includes('id="confTotal"'), 'booking-confirmation.html contains confTotal');
});

// 7. Verify booking.js URL Parameter Handling & Logic
runTest('booking.js correctly parses URL search params and handles session selection', () => {
  const bookingJs = fs.readFileSync(path.join(rootDir, 'assets', 'js', 'booking.js'), 'utf8');

  // URL parsing
  assert(bookingJs.includes('new URLSearchParams(window.location.search)'), 'booking.js parses URL search parameters');
  assert(bookingJs.includes("urlParams.get('session')"), 'booking.js reads session param');
  assert(bookingJs.includes("urlParams.get('title')"), 'booking.js reads title param');
  assert(bookingJs.includes("urlParams.get('price')"), 'booking.js reads price param');
  assert(bookingJs.includes("urlParams.get('duration')"), 'booking.js reads duration param');
  assert(bookingJs.includes("urlParams.get('slot')"), 'booking.js reads slot param');

  // Session banner and summary update
  assert(bookingJs.includes('psBookingSessionInfoBanner'), 'booking.js updates psBookingSessionInfoBanner');
  assert(bookingJs.includes('summarySessionLine'), 'booking.js updates summarySessionLine');

  // Toast and confirmation
  assert(
    bookingJs.includes('Jump Session Booking Completed Successfully!'),
    'booking.js fires toast with "Jump Session Booking Completed Successfully!"'
  );
  assert(
    bookingJs.includes('successSessionRow'),
    'booking.js populates successSessionRow'
  );
  assert(
    !bookingJs.includes('parent/dashboard.html'),
    'booking.js must never redirect to parent/dashboard.html'
  );
});

console.log(`\n========================================`);
console.log(`Test Results: ${passedTests}/${totalTests} Passed (${Math.round((passedTests/totalTests)*100)}%)`);
console.log(`========================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
