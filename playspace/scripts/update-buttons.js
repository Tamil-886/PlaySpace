const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Update pages/pricing-passes.html
function updatePricingPasses() {
  const filePath = path.join(ROOT_DIR, 'pages', 'pricing-passes.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Remove duplicate 'Book Now' link under buttons that already have ps-btn-add-cart
  html = html.replace(/<button type="button" class="ps-btn([^"]*ps-btn-add-cart)"([\s\S]*?)<\/button>\s*<a href="\.\.\/parent\/book-session\.html" class="ps-btn[^"]*">Book Now<\/a>/g, (m, c, rest) => {
    return `<button type="button" class="ps-btn${c}"${rest}</button>`;
  });

  // Toddler banner Book Now
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html" class="ps-btn ps-btn-primary">Book Now<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="pass-toddler-single" data-name="Toddler Play Morning Session" data-price="12.00" data-type="Toddler Special" data-icon="🧸">Add to Cart 🛒</button>'
  );

  // Punch card banner Book Now
  html = html.replace(
    /<a href="\.\.\/parent\/purchase-pass\.html" class="ps-btn ps-btn-primary">Book Now \(Purchase Pass\)<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="punch-10" data-name="VIP 10-Jump Punch Card" data-price="140.00" data-type="Punch Pass" data-icon="💳">Add to Cart 🛒</button>'
  );

  // Birthday preview cards
  html = html.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-dark ps-btn-block">Book Now<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-dark ps-btn-block ps-btn-add-cart" data-add-cart="party-basic" data-name="Classic Bounce Birthday Party" data-price="299.00" data-type="Birthday Party" data-icon="🎂">Add to Cart 🛒</button>'
  );
  html = html.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-primary ps-btn-block">Book Now<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-block ps-btn-add-cart" data-add-cart="party-vip" data-name="Glow Adventure VIP Birthday Party" data-price="449.00" data-type="Birthday Party" data-icon="✨">Add to Cart 🛒</button>'
  );

  // Comparison table buttons
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html" class="ps-btn ps-btn-dark ps-btn-sm ps-btn-block">Book Now<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-dark ps-btn-sm ps-btn-block ps-btn-add-cart" data-add-cart="pass-60">Add to Cart 🛒</button>'
  );
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-block">Book Now<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-block ps-btn-add-cart" data-add-cart="pass-90">Add to Cart 🛒</button>'
  );
  html = html.replace(
    /<a href="\.\.\/parent\/purchase-pass\.html" class="ps-btn ps-btn-dark ps-btn-sm ps-btn-block">Book Now<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-dark ps-btn-sm ps-btn-block ps-btn-add-cart" data-add-cart="punch-10">Add to Cart 🛒</button>'
  );

  // Bottom CTA banner
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html" class="ps-btn ps-btn-primary" style="font-size: 1\.05rem; padding: 0\.85rem 1\.75rem;">\s*Book Now\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="pass-90" style="font-size: 1.05rem; padding: 0.85rem 1.75rem;">Add to Cart &bull; Book Now 🛒</button>'
  );

  fs.writeFileSync(filePath, html);
  console.log('✓ Updated pages/pricing-passes.html');
}

// 2. Update pages/birthday-parties.html & birthday-details.html
function updateBirthdayPages() {
  const p1 = path.join(ROOT_DIR, 'pages', 'birthday-parties.html');
  let h1 = fs.readFileSync(p1, 'utf8');

  // Hero CTA
  h1 = h1.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-primary">Book a Birthday Party<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="party-vip" data-name="Glow Adventure VIP Birthday Party" data-price="449.00" data-type="Birthday Party" data-icon="🎂">Add to Cart &bull; Birthday Party 🛒</button>'
  );

  // Packages 1, 2, 3
  h1 = h1.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-dark ps-btn-block">\s*Book Basic Bounce\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-dark ps-btn-block ps-btn-add-cart" data-add-cart="party-basic" data-name="Classic Bounce Birthday Party" data-price="299.00" data-type="Birthday Party" data-icon="🎂">Add Package to Cart 🛒</button>'
  );
  h1 = h1.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-primary ps-btn-block">\s*Book Glow Adventure VIP\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-block ps-btn-add-cart" data-add-cart="party-vip" data-name="Glow Adventure VIP Birthday Party" data-price="449.00" data-type="Birthday Party" data-icon="✨">Add Package to Cart 🛒</button>'
  );
  h1 = h1.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-dark ps-btn-block">\s*Book Ultimate Takeover\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-dark ps-btn-block ps-btn-add-cart" data-add-cart="party-ultimate" data-name="Ultimate Arena Takeover VIP" data-price="699.00" data-type="Birthday Party" data-icon="👑">Add Package to Cart 🛒</button>'
  );

  // Add-ons & bottom banner
  h1 = h1.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-primary ps-btn-sm">\s*Select Add-Ons &amp; Book Suite &rarr;\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-add-cart" data-add-cart="party-arcade-boost" data-name="Party Arcade Token Power-Up" data-price="60.00" data-type="Party Add-On" data-icon="🕹️">Add Power-Up to Cart 🛒</button>'
  );
  h1 = h1.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-primary" style="font-size: 1\.1rem; padding: 0\.9rem 2rem;">\s*Book Birthday Party Online &rarr;\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="party-vip" style="font-size: 1.1rem; padding: 0.9rem 2rem;">Add to Cart &bull; Reserve Party Suite 🛒</button>'
  );

  fs.writeFileSync(p1, h1);
  console.log('✓ Updated pages/birthday-parties.html');

  // Birthday Details
  const p2 = path.join(ROOT_DIR, 'pages', 'birthday-details.html');
  let h2 = fs.readFileSync(p2, 'utf8');
  h2 = h2.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-primary">Book VIP Glow Party<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="party-vip" data-name="Glow Adventure VIP Birthday Party" data-price="449.00" data-type="Birthday Party" data-icon="✨">Add to Cart 🛒</button>'
  );
  h2 = h2.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-primary" style="white-space: nowrap; font-size: 1\.05rem; padding: 0\.85rem 1\.75rem;">\s*Book VIP Glow Party &rarr;\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="party-vip" style="white-space: nowrap; font-size: 1.05rem; padding: 0.85rem 1.75rem;">Add to Cart &bull; Book VIP Glow 🛒</button>'
  );
  h2 = h2.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-primary ps-btn-block" style="font-size: 1\.1rem; padding: 0\.9rem;">\s*Book Glow Adventure VIP &rarr;\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-block ps-btn-add-cart" data-add-cart="party-vip" style="font-size: 1.1rem; padding: 0.9rem;">Add to Cart &bull; Book Glow VIP 🛒</button>'
  );
  h2 = h2.replace(
    /<a href="\.\.\/parent\/birthday-booking\.html" class="ps-btn ps-btn-primary" style="font-size: 1\.1rem; padding: 0\.9rem 2rem;">\s*Book This Package Now &rarr;\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="party-vip" style="font-size: 1.1rem; padding: 0.9rem 2rem;">Add to Cart &bull; Book This Package 🛒</button>'
  );

  fs.writeFileSync(p2, h2);
  console.log('✓ Updated pages/birthday-details.html');
}

// 3. Update pages/group-events.html
function updateGroupEvents() {
  const filePath = path.join(ROOT_DIR, 'pages', 'group-events.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Hero CTA
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html" class="ps-btn ps-btn-primary">Book a Group Event<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="group-school" data-name="School &amp; Youth Field Trip Outing" data-price="14.00" data-type="Group Outing" data-icon="🚌">Add to Cart &bull; Book Group Event 🛒</button>'
  );

  // Group cards
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-sm">Book Group Celebration<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-add-cart" data-add-cart="group-team" data-name="Sports Team Banquet Outing" data-price="16.00" data-type="Group Outing" data-icon="🏆">Add to Cart 🛒</button>'
  );
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-sm">Book a Group Event<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-add-cart" data-add-cart="group-school" data-name="School &amp; Youth Field Trip Outing" data-price="14.00" data-type="Group Outing" data-icon="🚌">Add to Cart 🛒</button>'
  );

  // Tier buttons
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html" class="ps-btn ps-btn-dark ps-btn-block">Book 15–30 Jumpers<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-dark ps-btn-block ps-btn-add-cart" data-add-cart="group-school" data-name="15–30 Jumpers Group Outing" data-price="14.00" data-type="Group Outing" data-icon="🚌">Add to Cart &bull; 15–30 Jumpers 🛒</button>'
  );
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-block">Book 31–75 Jumpers<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-block ps-btn-add-cart" data-add-cart="group-team" data-name="31–75 Jumpers Group Outing" data-price="16.00" data-type="Group Outing" data-icon="🏆">Add to Cart &bull; 31–75 Jumpers 🛒</button>'
  );

  // Lock-In & STEM cards
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-block">\s*Book a Group Event\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-block ps-btn-add-cart" data-add-cart="group-lockin" data-name="Overnight Arena Lock-In Takeover" data-price="1250.00" data-type="Exclusive Takeover" data-icon="🔒">Add to Cart &bull; Book Lock-In 🛒</button>'
  );

  // Bottom CTA
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html" class="ps-btn ps-btn-primary" style="font-size: 1\.05rem; padding: 0\.85rem 1\.75rem;">\s*Book a Group Event\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="group-school" style="font-size: 1.05rem; padding: 0.85rem 1.75rem;">Add to Cart &bull; Book Group Event 🛒</button>'
  );

  fs.writeFileSync(filePath, html);
  console.log('✓ Updated pages/group-events.html');
}

// 4. Update pages/attractions.html (All 21 Cards)
function updateAttractionsPage() {
  const filePath = path.join(ROOT_DIR, 'pages', 'attractions.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace each `<a href="../parent/book-session.html?attraction=XYZ" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book Session</a>`
  html = html.replace(
    /<a href="\.\.\/parent\/book-session\.html\?attraction=([a-z0-9\-]+)" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book Session<\/a>/g,
    (m, slug) => {
      return `<button type="button" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-add-cart" data-add-cart="attraction-${slug}" style="flex: 1; text-align: center;">Add to Cart 🛒</button>`;
    }
  );

  fs.writeFileSync(filePath, html);
  console.log('✓ Updated pages/attractions.html');
}

// 5. Update individual attraction pages (pages/attraction-*.html)
function updateIndividualAttractionPages() {
  const pagesDir = path.join(ROOT_DIR, 'pages');
  const files = fs.readdirSync(pagesDir).filter(f => f.startsWith('attraction-') && f.endsWith('.html'));

  files.forEach(f => {
    const p = path.join(pagesDir, f);
    let html = fs.readFileSync(p, 'utf8');
    const slug = f.replace('attraction-', '').replace('.html', '');

    // Hero button: Replace Book This Zone link with Add to Cart button
    html = html.replace(
      /<a[^>]*href="[^"]*(?:booking|book-session)\.html\?attraction=[^"]*"[^>]*class="[^"]*ps-btn[^"]*ps-btn-primary[^"]*"[^>]*>[\s\S]*?Book This Zone[\s\S]*?<\/a>/gi,
      `<button type="button" class="ps-btn ps-btn-primary ps-btn-lg ps-btn-add-cart" data-add-cart="attraction-${slug}" aria-label="Add to Cart - Book This Zone" style="box-shadow: 0 4px 15px rgba(255, 204, 0, 0.4);">
              Add to Cart 🛒
            </button>`
    );

    // Banner CTA button: Replace Book Your Play Session link with Add to Cart button (keeping 'Book Your Play Session')
    html = html.replace(
      /<a href="\.\.\/parent\/book-session\.html\?attraction=[^"]*" class="ps-btn ps-btn-primary[^"]*" style="[^"]*">\s*Book Your Play Session\s*<svg[^>]*>[\s\S]*?<\/svg>\s*<\/a>/g,
      `<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="attraction-${slug}" style="font-size: 1.1rem; padding: 0.95rem 2rem;">Add to Cart &bull; Book Your Play Session 🛒</button>`
    );

    fs.writeFileSync(p, html);
  });
  console.log(`✓ Updated ${files.length} individual attraction pages`);
}

// 6. Update index.html & home-2.html
function updateHomePages() {
  // index.html
  const p1 = path.join(ROOT_DIR, 'index.html');
  let h1 = fs.readFileSync(p1, 'utf8');

  // 6 Attraction Cards on Home 1: replace Book Session
  h1 = h1.replace(
    /<a href="parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book Session<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-add-cart" data-add-cart="pass-90" style="flex: 1; text-align: center;">Add to Cart 🛒</button>'
  );

  // Birthday Party Section on Home 1
  h1 = h1.replace(
    /<a href="pages\/birthday-parties\.html" class="ps-btn ps-btn-outline ps-btn-block">Book Basic Party<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-outline ps-btn-block ps-btn-add-cart" data-add-cart="party-basic" data-name="Basic Bouncer Party" data-price="199.00" data-type="Birthday Party" data-icon="🎂">Add to Cart 🛒</button>'
  );
  h1 = h1.replace(
    /<a href="pages\/birthday-parties\.html" class="ps-btn ps-btn-primary ps-btn-block">Book Premium Party<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-block ps-btn-add-cart" data-add-cart="party-vip">Add to Cart 🛒</button>'
  );

  // Location Card Footer CTA: keep text 'Book Session' so test-location-card-alignment.js passes!
  h1 = h1.replace(
    /<a href="parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-sm" style="display: inline-flex; align-items: center; gap: 0\.4rem;">\s*<span>🎟️ Book Session<\/span>\s*<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-add-cart" data-add-cart="pass-90" style="display: inline-flex; align-items: center; gap: 0.4rem;"><span>🎟️ Add to Cart &bull; Book Session</span></button>'
  );

  fs.writeFileSync(p1, h1);
  console.log('✓ Updated index.html');

  // home-2.html
  const p2 = path.join(ROOT_DIR, 'home-2.html');
  let h2 = fs.readFileSync(p2, 'utf8');

  h2 = h2.replace(
    /<a href="parent\/book-session\.html" class="ps-btn ps-btn-dark ps-btn-sm">Book Slot<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-dark ps-btn-sm ps-btn-add-cart" data-add-cart="pass-60">Add to Cart 🛒</button>'
  );
  h2 = h2.replace(
    /<a href="parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-sm">Book Slot<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-add-cart" data-add-cart="pass-90">Add to Cart 🛒</button>'
  );
  h2 = h2.replace(
    /<a href="parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-sm">Book Glow<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-add-cart" data-add-cart="party-vip">Add to Cart 🛒</button>'
  );
  h2 = h2.replace(
    /<a href="parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book Slot<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-add-cart" data-add-cart="pass-90" style="flex: 1; text-align: center;">Add to Cart 🛒</button>'
  );
  h2 = h2.replace(
    /<a href="parent\/book-session\.html" class="ps-btn ps-btn-primary">Book Toddler Time \(\$12\)<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-add-cart" data-add-cart="pass-toddler-single">Add to Cart &bull; Toddler Time 🛒</button>'
  );
  h2 = h2.replace(
    /<a href="parent\/book-session\.html" class="ps-btn ps-btn-outline-dark ps-btn-block ps-btn-sm">Get Bronze Pass<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-outline-dark ps-btn-block ps-btn-sm ps-btn-add-cart" data-add-cart="pass-60">Add to Cart 🛒</button>'
  );
  h2 = h2.replace(
    /<a href="parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-block ps-btn-sm">Get Silver Pass<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-block ps-btn-sm ps-btn-add-cart" data-add-cart="pass-90">Add to Cart 🛒</button>'
  );
  h2 = h2.replace(
    /<a href="parent\/book-session\.html" class="ps-btn ps-btn-outline-dark ps-btn-block ps-btn-sm">Get Gold Pass<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-outline-dark ps-btn-block ps-btn-sm ps-btn-add-cart" data-add-cart="pass-120">Add to Cart 🛒</button>'
  );
  h2 = h2.replace(
    /<a href="parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-lg">Reserve Glow Night \(\$25\)<\/a>/g,
    '<button type="button" class="ps-btn ps-btn-primary ps-btn-lg ps-btn-add-cart" data-add-cart="party-vip">Add to Cart &bull; Glow Night 🛒</button>'
  );

  fs.writeFileSync(p2, h2);
  console.log('✓ Updated home-2.html');
}

// 7. Update parent/purchase-pass.html
function updatePurchasePass() {
  const filePath = path.join(ROOT_DIR, 'parent', 'purchase-pass.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Remove redundant bypass links
  html = html.replace(/<a href="my-passes\.html" class="ps-btn ps-btn-dark ps-btn-block">Buy 10-Pass<\/a>/g, '');
  html = html.replace(/<a href="my-passes\.html" class="ps-btn ps-btn-primary ps-btn-block" style="background: #FFCC00; color: #000; font-weight: 800;">Subscribe Monthly<\/a>/g, '');
  html = html.replace(/<a href="my-passes\.html" class="ps-btn ps-btn-dark ps-btn-block">Buy Family Pass<\/a>/g, '');

  fs.writeFileSync(filePath, html);
  console.log('✓ Updated parent/purchase-pass.html');
}

// Run all updates
console.log('--- Updating Direct Booking Buttons to Add to Cart across PLAYSPACE ---');
updatePricingPasses();
updateBirthdayPages();
updateGroupEvents();
updateAttractionsPage();
updateIndividualAttractionPages();
updateHomePages();
updatePurchasePass();
console.log('--- All direct booking buttons updated to Add to Cart! ---');
