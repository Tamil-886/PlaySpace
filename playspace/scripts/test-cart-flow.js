const fs = require('fs');
const path = require('path');

const ROOT_DIR = fs.existsSync(path.resolve(__dirname, '..', 'pages'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..', 'playspace');

console.log('===============================================================');
console.log('--- Testing Centralized Add to Cart & Booking Flow Suite ---');
console.log('===============================================================');

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

// 1. Check pages/cart.html
const cartHtmlPath = path.join(ROOT_DIR, 'pages', 'cart.html');
assert(fs.existsSync(cartHtmlPath), 'pages/cart.html exists');

if (fs.existsSync(cartHtmlPath)) {
  const cartHtml = fs.readFileSync(cartHtmlPath, 'utf8');
  assert(cartHtml.includes('ps-header') && cartHtml.includes('ps-navbar'), 'cart.html contains standard PlaySpace header');
  assert(cartHtml.includes('class="ps-cart-toggle'), 'cart.html contains navbar cart toggle');
  assert(cartHtml.includes('class="ps-cart-badge'), 'cart.html contains navbar cart badge');
  assert(cartHtml.includes('ps-nav-auth-btn'), 'cart.html contains Sign In button in navbar');
  assert(cartHtml.includes('ps-theme-toggle'), 'cart.html contains theme toggle in navbar');
  assert(cartHtml.includes('ps-lang-toggle'), 'cart.html contains RTL toggle in navbar');
  assert(cartHtml.includes('Your Shopping Cart'), 'cart.html has page hero banner');
  assert(cartHtml.includes('id="psCartPageItemsContainer"'), 'cart.html contains dynamic items container');
  assert(cartHtml.includes('id="psCartPageItemCount"'), 'cart.html contains item counter element');
  assert(cartHtml.includes('id="psCartPageSubtotal"'), 'cart.html contains subtotal element');
  assert(cartHtml.includes('id="psCartPageDiscount"'), 'cart.html contains discount element');
  assert(cartHtml.includes('id="psCartPageTotal"'), 'cart.html contains total due element');
  assert(cartHtml.includes('id="psPromoInput"'), 'cart.html contains promo code input');
  assert(cartHtml.includes('id="psApplyPromoBtn"'), 'cart.html contains promo code apply button');
  assert(cartHtml.includes('id="psCartPageProceedBtn"'), 'cart.html contains Proceed to Booking button');
  assert(cartHtml.includes('href="booking.html"') || cartHtml.includes('href="../parent/book-session.html"'), 'Proceed button links to dedicated booking page');
  assert(cartHtml.includes('Continue Shopping'), 'cart.html contains Continue Shopping link');
  assert(cartHtml.includes('id="psCartPageClearBtn"'), 'cart.html contains Clear Cart button');
  assert(cartHtml.includes('ASTM F2970-20'), 'cart.html contains ASTM safety assurance');
  assert(cartHtml.includes('Demo Booking Checkout'), 'cart.html contains demo checkout notice');
  assert(cartHtml.includes('cart.js'), 'cart.html loads cart.js');
}

// 2. Check cart.js enhancements
const cartJsPath = path.join(ROOT_DIR, 'assets', 'js', 'cart.js');
assert(fs.existsSync(cartJsPath), 'assets/js/cart.js exists');
const cartJs = fs.readFileSync(cartJsPath, 'utf8');

assert(cartJs.includes('PLAYSPACE_CATALOG'), 'cart.js defines comprehensive PLAYSPACE_CATALOG');
assert(cartJs.includes('pass-60') && cartJs.includes('pass-90') && cartJs.includes('pass-120'), 'cart.js catalog includes jump passes');
assert(cartJs.includes('party-basic') && cartJs.includes('party-vip') && cartJs.includes('party-ultimate'), 'cart.js catalog includes birthday party packages');
assert(cartJs.includes('group-school') && cartJs.includes('group-lockin'), 'cart.js catalog includes group events');
assert(cartJs.includes('attraction-mega-trampoline-arena'), 'cart.js catalog includes attraction zones');
assert(cartJs.includes('existing.quantity +='), 'cart.js properly handles duplicates by incrementing quantity');
assert(cartJs.includes('renderCartPage'), 'cart.js defines renderCartPage method for cart.html');
assert(cartJs.includes('applyPromoCode'), 'cart.js supports promo code application');
assert(cartJs.includes('playspace_cart_items'), 'cart.js keeps legacy storage key in sync');
assert(cartJs.includes('View Full Cart Page'), 'cart.js drawer provides direct link to full Cart Page');
assert(cartJs.includes('onerror='), 'cart.js includes onerror fallback handler for cart page thumbnails');
assert(cartJs.includes('item.image = cat.image'), 'cart.js loadCart auto-heals missing or empty item images from catalog');

// Verify all catalog images exist on disk
const catalogImgRegex = /image:\s*['"]([^'"]+)['"]/g;
let catMatch;
let checkedImgCount = 0;
while ((catMatch = catalogImgRegex.exec(cartJs)) !== null) {
  const relPath = catMatch[1];
  const diskPath = path.join(ROOT_DIR, relPath);
  assert(fs.existsSync(diskPath), `Catalog image exists on disk: ${relPath}`);
  checkedImgCount++;
}
assert(checkedImgCount >= 15, `Checked all catalog images (${checkedImgCount} verified)`);

// 3. Check cart.css enhancements
const cartCssPath = path.join(ROOT_DIR, 'assets', 'css', 'cart.css');
const cartCss = fs.readFileSync(cartCssPath, 'utf8');
assert(cartCss.includes('.ps-cart-page-section'), 'cart.css styles .ps-cart-page-section');
assert(cartCss.includes('.ps-cart-page-layout'), 'cart.css defines 2-column .ps-cart-page-layout');
assert(cartCss.includes('.ps-cart-page-item'), 'cart.css styles .ps-cart-page-item');
assert(cartCss.includes('.ps-cart-summary-card'), 'cart.css styles sticky .ps-cart-summary-card');
assert(cartCss.includes('@media (max-width: 992px)'), 'cart.css contains responsive breakpoint for cart layout');
assert(cartCss.includes('[data-theme="dark"] .ps-cart-page-item'), 'cart.css supports dark mode for cart page items');
assert(cartCss.includes('[dir="rtl"] .ps-cart-page-remove-btn'), 'cart.css supports RTL layout for cart page');

// 4. Verify Direct Booking Buttons replaced with Add to Cart across project
const pricingPassesHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'pricing-passes.html'), 'utf8');
assert(pricingPassesHtml.includes('data-add-cart="pass-60"'), 'pricing-passes.html has Add to Cart for 60m pass');
assert(pricingPassesHtml.includes('data-add-cart="pass-90"'), 'pricing-passes.html has Add to Cart for 90m pass');
assert(pricingPassesHtml.includes('data-add-cart="pass-120"'), 'pricing-passes.html has Add to Cart for 120m pass');
assert(pricingPassesHtml.includes('data-add-cart="pass-allday"'), 'pricing-passes.html has Add to Cart for all-day pass');
assert(pricingPassesHtml.includes('data-add-cart="family-4"'), 'pricing-passes.html has Add to Cart for Family 4-pack');
assert(pricingPassesHtml.includes('data-add-cart="pass-toddler-single"'), 'pricing-passes.html has Add to Cart for toddler pass');
assert(pricingPassesHtml.includes('data-add-cart="party-basic"'), 'pricing-passes.html has Add to Cart for Basic party');
assert(pricingPassesHtml.includes('data-add-cart="party-vip"'), 'pricing-passes.html has Add to Cart for VIP party');

const birthdayPartiesHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'birthday-parties.html'), 'utf8');
assert(birthdayPartiesHtml.includes('data-add-cart="party-basic"'), 'birthday-parties.html has Add to Cart for Classic Bounce');
assert(birthdayPartiesHtml.includes('data-add-cart="party-vip"'), 'birthday-parties.html has Add to Cart for Glow VIP');
assert(birthdayPartiesHtml.includes('data-add-cart="party-ultimate"'), 'birthday-parties.html has Add to Cart for Ultimate Takeover');
assert(birthdayPartiesHtml.includes('data-add-cart="party-arcade-boost"'), 'birthday-parties.html has Add to Cart for Arcade boost');

const groupEventsHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'group-events.html'), 'utf8');
assert(groupEventsHtml.includes('data-add-cart="group-school"'), 'group-events.html has Add to Cart for school trips');
assert(groupEventsHtml.includes('data-add-cart="group-team"'), 'group-events.html has Add to Cart for sports teams');
assert(groupEventsHtml.includes('data-add-cart="group-lockin"'), 'group-events.html has Add to Cart for full arena lock-in');

const attractionsHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'attractions.html'), 'utf8');
const addCartAttractionsCount = (attractionsHtml.match(/ps-btn-add-cart/g) || []).length;
assert(addCartAttractionsCount >= 21, `attractions.html converted all 21 cards to Add to Cart (found ${addCartAttractionsCount})`);

const home1Html = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const home1AddCartCount = (home1Html.match(/ps-btn-add-cart/g) || []).length;
assert(home1AddCartCount >= 8, `index.html converted attraction and party cards to Add to Cart (found ${home1AddCartCount})`);

// 4b. Verify Individual Attraction Pages Hero Button converted to Add to Cart
const megaAttractionHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'attraction-mega-trampoline-arena.html'), 'utf8');
assert(megaAttractionHtml.includes('data-add-cart="attraction-mega-trampoline-arena"') && megaAttractionHtml.includes('Add to Cart 🛒'), 'attraction-mega-trampoline-arena.html Hero CTA converted to Add to Cart');

const ninjaAttractionHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'attraction-ninja-warrior-course.html'), 'utf8');
assert(ninjaAttractionHtml.includes('data-add-cart="attraction-ninja-warrior-course"') && ninjaAttractionHtml.includes('Add to Cart 🛒'), 'attraction-ninja-warrior-course.html Hero CTA converted to Add to Cart');

// 5. Check parent/book-session.html fields and flow
const bookSessionHtml = fs.readFileSync(path.join(ROOT_DIR, 'parent', 'book-session.html'), 'utf8');
assert(bookSessionHtml.includes('id="psBookingContactName"'), 'book-session.html collects Parent/Contact Name');
assert(bookSessionHtml.includes('id="psBookingEmail"'), 'book-session.html collects Email Address');
assert(bookSessionHtml.includes('id="psBookingPhone"'), 'book-session.html collects Phone Number');
assert(bookSessionHtml.includes('id="psBookingDateInput"'), 'book-session.html collects preferred date');
assert(bookSessionHtml.includes('ps-timeslot-btn'), 'book-session.html provides timeslot grid');
assert(bookSessionHtml.includes('data-counter-type="jumpers"'), 'book-session.html provides jumpers counter');
assert(bookSessionHtml.includes('data-counter-type="adults"'), 'book-session.html provides spectator adults counter');
assert(bookSessionHtml.includes('id="psBookingChildNames"'), 'book-session.html collects child names & ages');
assert(bookSessionHtml.includes('id="psBookingNotes"'), 'book-session.html collects special requirements/notes');
assert(bookSessionHtml.includes('ps-signature-canvas'), 'book-session.html provides safety waiver digital signature canvas');
assert(bookSessionHtml.includes('id="ps-btn-complete-booking"'), 'book-session.html contains Confirm Booking button');
assert(bookSessionHtml.includes('id="psBookingCartItemsList"'), 'book-session.html dynamically lists items from Cart');
assert(bookSessionHtml.includes('review-contact-text'), 'book-session.html has review table with contact details');
assert(bookSessionHtml.includes('review-items-text'), 'book-session.html has review table with cart items list');
assert(bookSessionHtml.includes('review-total-price'), 'book-session.html has review table with total price');

// 6. Check assets/js/booking.js
const bookingJs = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'js', 'booking.js'), 'utf8');
assert(bookingJs.includes('loadCartItems'), 'booking.js inspects and loads items from cart storage');
assert(bookingJs.includes('calculateTotals'), 'booking.js dynamically calculates subtotals & discounts');
assert(bookingJs.includes('updateReviewStep'), 'booking.js populates review step before confirmation');
assert(bookingJs.includes('playspace_last_booking'), 'booking.js saves confirmed booking to localStorage');
assert(bookingJs.includes('localStorage.removeItem(\'playspace_cart\')'), 'booking.js clears cart only upon successful confirmation');
assert(bookingJs.includes('booking-details.html?id='), 'booking.js redirects to confirmation page with booking ID');

// 7. Check parent/booking-details.html confirmation page
const bookingDetailsHtml = fs.readFileSync(path.join(ROOT_DIR, 'parent', 'booking-details.html'), 'utf8');
assert(bookingDetailsHtml.includes('psBookingHeading'), 'booking-details.html has dynamic heading for booking ID');
assert(bookingDetailsHtml.includes('detail-items-text'), 'booking-details.html displays booked items');
assert(bookingDetailsHtml.includes('detail-parent-text'), 'booking-details.html displays parent contact');
assert(bookingDetailsHtml.includes('playspace_last_booking'), 'booking-details.html reads last booking from localStorage');
assert(bookingDetailsHtml.includes('FRONTEND DEMO CONFIRMED'), 'booking-details.html explicitly indicates demo status');

console.log('===============================================================');
console.log(`Result: ${passed} passed, ${failed} failed.`);
console.log('===============================================================');

if (failed > 0) process.exit(1);
