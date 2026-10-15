const fs = require('fs');
const path = require('path');
const { ROOT_DIR, ensureDir, getCommonScripts } = require('./build-base');

const PARENT_DIR = path.join(ROOT_DIR, 'parent');
ensureDir(PARENT_DIR);

function getParentSidebar(activeItem = 'dashboard') {
  const items = [
    { id: 'dashboard', label: 'Overview', href: 'dashboard.html', icon: '📊' },
    { id: 'children', label: 'Child Profiles & Waivers', href: 'children.html', icon: '👶' },
    { id: 'book-session', label: 'Book Jump Session', href: 'book-session.html', icon: '🎟️' },
    { id: 'my-bookings', label: 'My Bookings', href: 'my-bookings.html', icon: '📅' },
    { id: 'birthday-booking', label: 'Birthday Reservation', href: 'birthday-booking.html', icon: '🎂' },
    { id: 'my-passes', label: 'Punch Pass Wallet', href: 'my-passes.html', icon: '💳' },
    { id: 'purchase-pass', label: 'Buy Passes & Packs', href: 'purchase-pass.html', icon: '🛍️' },
    { id: 'order-history', label: 'Order History', href: 'order-history.html', icon: '🧾' },
    { id: 'payment-history', label: 'Payment Receipts', href: 'payment-history.html', icon: '💲' },
    { id: 'notifications', label: 'Notifications', href: 'notifications.html', icon: '🔔' },
    { id: 'profile', label: 'Parent Profile', href: 'profile.html', icon: '👤' },
    { id: 'settings', label: 'Account Settings', href: 'settings.html', icon: '⚙️' }
  ];

  const linksHtml = items.map(it => `
    <a href="${it.href}" class="ps-sidebar-link ${activeItem === it.id ? 'active' : ''}">
      <span>${it.icon}</span>
      <span>${it.label}</span>
    </a>
  `).join('');

  return `
  <aside class="ps-dash-sidebar">
    <nav class="ps-sidebar-nav">
      ${linksHtml}
    </nav>

    <div style="border-top: 1px solid rgba(255,255,255,0.12); padding-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="../index.html" class="ps-sidebar-link">
        <span>🏠</span> <span>Return to Main Website</span>
      </a>
      <a href="../pages/login.html" class="ps-sidebar-link" data-action-logout>
        <span>🚪</span> <span>Sign Out</span>
      </a>
    </div>
  </aside>
  `;
}

function parentWrapper(title, contentHtml, activeNav = 'dashboard', extraScripts = []) {
  const basePath = '../';
  return `<!DOCTYPE html>
<html lang="en" data-theme="light" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Parent Portal | PlaySpace</title>
  <link rel="icon" type="image/svg+xml" href="${basePath}assets/images/favicon/favicon.svg">
  <link rel="stylesheet" href="${basePath}assets/css/style.css">
</head>
<body>
  <!-- Top Navigation Bar for Parent Portal (No top bar, toggles inside navbar) -->
  <header class="ps-header">
    <div class="ps-container-fluid ps-navbar">
      <div class="ps-flex ps-items-center ps-gap-md">
        <a href="${basePath}index.html" class="ps-navbar-brand">
          <img src="${basePath}assets/images/brand/logo.svg" alt="PlaySpace Logo">
        </a>
        <span class="ps-badge ps-badge-yellow-outline" style="font-size: 0.75rem;">PARENT PORTAL</span>
      </div>

      <div class="ps-nav-actions">
        <!-- LTR / RTL toggle right in nav bar -->
        <button class="ps-lang-toggle" aria-label="Toggle Layout Direction">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          <span>RTL</span>
        </button>

        <!-- Dark Mode toggle right in nav bar -->
        <button class="ps-theme-toggle ps-btn-icon" aria-label="Toggle Theme">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>

        <a href="book-session.html" class="ps-btn ps-btn-primary ps-btn-sm">+ New Jump Booking</a>
        <a href="../pages/login.html" class="ps-btn ps-btn-outline ps-btn-sm" data-action-logout>Logout</a>
      </div>
    </div>
  </header>

  <div class="ps-dashboard-layout">
    ${getParentSidebar(activeNav)}
    <main class="ps-dash-content">
      ${contentHtml}
    </main>
  </div>

  ${getCommonScripts(basePath, extraScripts)}
</body>
</html>`;
}

// 1. dashboard.html
const dashboardHtml = parentWrapper(
  'Dashboard Overview',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;" id="psDashGreeting">Welcome Back, Sarah!</h2>
      <p class="text-muted" style="margin: 0;" id="psDashSubtitle">Here is a summary of your active passes and upcoming jump bookings.</p>
    </div>
    <a href="book-session.html" class="ps-btn ps-btn-primary">Book Next Session</a>
  </div>

  <div class="ps-stat-grid">
    <div class="ps-stat-card">
      <div class="stat-icon">🎟️</div>
      <div class="stat-val">7</div>
      <div class="stat-lbl">Remaining Jump Punches</div>
    </div>
    <div class="ps-stat-card">
      <div class="stat-icon">📅</div>
      <div class="stat-val">1</div>
      <div class="stat-lbl">Upcoming Session (Saturday)</div>
    </div>
    <div class="ps-stat-card">
      <div class="stat-icon">👶</div>
      <div class="stat-val">2</div>
      <div class="stat-lbl">Children (Waivers Signed)</div>
    </div>
    <div class="ps-stat-card">
      <div class="stat-icon">⭐</div>
      <div class="stat-val">450</div>
      <div class="stat-lbl">PlayPoints Earned</div>
    </div>
  </div>

  <div class="ps-grid ps-grid-2" style="margin-bottom: 2.5rem;">
    <!-- Active Pass Widget -->
    <div class="ps-pass-wallet-card">
      <div class="ps-flex-between">
        <span class="ps-badge">ACTIVE PASS</span>
        <span style="color: rgba(255,255,255,0.7); font-size: 0.85rem;">Expires Dec 31, 2026</span>
      </div>
      <h3 style="color: #FFFFFF; margin-top: 1rem; margin-bottom: 0.25rem;">10-Session Punch Pass</h3>
      <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">Leo &amp; Maya Jenkins</p>
      <div class="ps-punch-counter">
        <div class="ps-punch-hole used">1</div>
        <div class="ps-punch-hole used">2</div>
        <div class="ps-punch-hole used">3</div>
        <div class="ps-punch-hole">4</div>
        <div class="ps-punch-hole">5</div>
        <div class="ps-punch-hole">6</div>
        <div class="ps-punch-hole">7</div>
        <div class="ps-punch-hole">8</div>
        <div class="ps-punch-hole">9</div>
        <div class="ps-punch-hole">10</div>
      </div>
      <div class="ps-flex-between" style="border-top: 1px solid rgba(255,255,255,0.15); padding-top: 1rem;">
        <div>
          <span style="font-size: 1.3rem; font-weight: 900; color: #FFCC00;">7 Jumps</span>
          <span style="font-size: 0.85rem; color: rgba(255,255,255,0.8); margin-left: 6px;">Available</span>
        </div>
        <a href="my-passes.html" class="ps-btn ps-btn-primary ps-btn-sm">Open Wallet</a>
      </div>
    </div>

    <!-- Upcoming Booking Card -->
    <div class="ps-card" style="border: 2px solid var(--ps-border-color);">
      <div class="ps-flex-between" style="margin-bottom: 1rem;">
        <span class="ps-badge ps-badge-dark">UPCOMING RESERVATION</span>
        <span style="font-weight: 800; font-size: 0.85rem;">Ref #PS-9842</span>
      </div>
      <h4>Open Jump (90 Minutes)</h4>
      <p class="text-muted" style="font-size: 0.95rem; margin-bottom: 1.25rem;">
        📍 Saturday, Oct 17, 2026 • 10:00 AM – 11:30 AM<br>
        Jumpers: Leo Jenkins (7), Maya Jenkins (4) • 2 Grip Socks
      </p>
      <div class="ps-flex ps-gap-sm">
        <a href="booking-details.html" class="ps-btn ps-btn-dark ps-btn-sm">View QR Pass</a>
        <a href="invoice.html" class="ps-btn ps-btn-outline-dark ps-btn-sm">Print Invoice</a>
      </div>
    </div>
  </div>
  `,
  'dashboard',
  ['parent-dashboard.js']
);
fs.writeFileSync(path.join(PARENT_DIR, 'dashboard.html'), dashboardHtml, 'utf8');

// 2. children.html
const childrenHtml = parentWrapper(
  'Child Profiles & Waivers',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Child Profiles &amp; Safety Waivers</h2>
      <p class="text-muted" style="margin: 0;">Manage your linked children and verify annual safety waiver validity.</p>
    </div>
    <button class="ps-btn ps-btn-primary" data-modal-target="#ps-modal-add-child">+ Add Child Profile</button>
  </div>

  <div class="ps-grid ps-grid-2">
    <div class="ps-card" style="border: 2px solid var(--ps-border-color);">
      <div class="ps-flex-between">
        <span class="ps-badge">WAIVER ACTIVE</span>
        <span style="font-size: 0.8rem; color: var(--ps-text-muted);">Signed: Oct 2026</span>
      </div>
      <div class="ps-flex ps-items-center ps-gap-md" style="margin: 1.5rem 0;">
        <div class="ps-avatar-circle" style="width: 54px; height: 54px; font-size: 1.25rem;">LJ</div>
        <div>
          <h4 style="margin: 0;">Leo Jenkins</h4>
          <span class="text-muted">Age 7 • Born April 12, 2019</span>
        </div>
      </div>
      <div class="ps-flex-between" style="border-top: 1px solid var(--ps-border-color); padding-top: 1rem;">
        <span style="font-size: 0.85rem; font-weight: 700;">Waiver valid through Oct 2027</span>
        <button class="ps-btn ps-btn-outline-dark ps-btn-sm">Edit Profile</button>
      </div>
    </div>

    <div class="ps-card" style="border: 2px solid var(--ps-border-color);">
      <div class="ps-flex-between">
        <span class="ps-badge">WAIVER ACTIVE</span>
        <span style="font-size: 0.8rem; color: var(--ps-text-muted);">Signed: Oct 2026</span>
      </div>
      <div class="ps-flex ps-items-center ps-gap-md" style="margin: 1.5rem 0;">
        <div class="ps-avatar-circle" style="width: 54px; height: 54px; font-size: 1.25rem;">MJ</div>
        <div>
          <h4 style="margin: 0;">Maya Jenkins</h4>
          <span class="text-muted">Age 4 • Born August 25, 2022</span>
        </div>
      </div>
      <div class="ps-flex-between" style="border-top: 1px solid var(--ps-border-color); padding-top: 1rem;">
        <span style="font-size: 0.85rem; font-weight: 700;">Waiver valid through Oct 2027</span>
        <button class="ps-btn ps-btn-outline-dark ps-btn-sm">Edit Profile</button>
      </div>
    </div>
  </div>

  <!-- Add Child Modal -->
  <div class="ps-modal-overlay" id="ps-modal-add-child">
    <div class="ps-modal-box">
      <button class="ps-modal-close" data-modal-close>&times;</button>
      <h3>Add Child Profile</h3>
      <p class="text-muted">Link a child to your parent account and authorize digital safety coverage.</p>
      <form id="ps-add-child-form" style="margin-top: 1.5rem;">
        <div class="ps-form-group">
          <label class="ps-form-label">Child Full Name</label>
          <input type="text" id="child-name" class="ps-form-control" data-type="name" required placeholder="e.g. Liam Jenkins">
          <div class="ps-form-error">Child name must contain letters and spaces only.</div>
        </div>
        <div class="ps-form-group">
          <label class="ps-form-label">Date of Birth</label>
          <input type="date" id="child-dob" class="ps-form-control" required>
          <div class="ps-form-error">Date of birth is required.</div>
        </div>
        <div class="ps-form-group">
          <label class="ps-checkbox-label">
            <input type="checkbox" class="ps-checkbox" required checked>
            <span>I certify I am the parent/legal guardian and agree to the ASTM waiver.</span>
          </label>
        </div>
        <button type="submit" class="ps-btn ps-btn-primary ps-btn-block">Save Child Profile</button>
      </form>
    </div>
  </div>
  `,
  'children',
  ['parent-dashboard.js']
);
fs.writeFileSync(path.join(PARENT_DIR, 'children.html'), childrenHtml, 'utf8');

// 3. book-session.html (Complete Booking Wizard with Canvas Signature!)
const bookSessionHtml = parentWrapper(
  'Book Jump Session',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Book a Jump Session</h2>
      <p class="text-muted" style="margin: 0;">Select your timeslot, jumpers, and confirm safety waiver.</p>
    </div>
  </div>

  <div class="ps-wizard-steps">
    <div class="ps-wizard-step active" data-step-indicator="1">
      <div class="ps-step-num">1</div>
      <span class="ps-step-label">Time &amp; Date</span>
    </div>
    <div class="ps-wizard-step" data-step-indicator="2">
      <div class="ps-step-num">2</div>
      <span class="ps-step-label">Jumpers &amp; Socks</span>
    </div>
    <div class="ps-wizard-step" data-step-indicator="3">
      <div class="ps-step-num">3</div>
      <span class="ps-step-label">Safety Waiver</span>
    </div>
    <div class="ps-wizard-step" data-step-indicator="4">
      <div class="ps-step-num">4</div>
      <span class="ps-step-label">Confirmation</span>
    </div>
  </div>

  <div class="ps-booking-flow">
    <div>
      <!-- Step 1 Panel -->
      <div data-wizard-panel="1">
        <div class="ps-card" style="margin-bottom: 1.5rem;">
          <h4>Select Session Date &amp; Duration</h4>
          <div id="psAttractionHighlightBanner" style="display: none; background: rgba(255,204,0,0.15); border: 1px solid #FFCC00; border-radius: 8px; padding: 0.75rem 1rem; margin-top: 0.75rem; font-size: 0.95rem; color: var(--ps-text-main);"></div>
          
          <div class="ps-grid ps-grid-2" style="margin-top: 1rem;">
            <div class="ps-form-group">
              <label class="ps-form-label">Reservation Date</label>
              <input type="date" class="ps-form-control" value="2026-10-17">
            </div>
            <div class="ps-form-group">
              <label class="ps-form-label">Jump Duration</label>
              <select class="ps-form-control">
                <option>60 Minutes ($18)</option>
                <option selected>90 Minutes ($24)</option>
                <option>120 Minutes ($28)</option>
              </select>
            </div>
          </div>

          <div class="ps-form-group" style="margin-top: 1rem;">
            <label class="ps-form-label">Primary Attraction Zone (All-Inclusive Pass)</label>
            <select class="ps-form-control" id="psBookingAttractionSelect">
              <option value="all-park" selected>All Park Attractions (All-Inclusive Pass)</option>
              <option value="mega-trampoline-arena">Mega Trampoline Arena</option>
              <option value="ninja-warrior-course">Ninja Warrior Course</option>
              <option value="adventure-climbing-zone">Adventure Climbing Zone</option>
              <option value="super-slide-mountain">Super Slide Mountain</option>
              <option value="rainbow-ball-pit">Rainbow Ball Pit</option>
              <option value="sky-high-rope-adventure">Sky-High Rope Adventure</option>
              <option value="foam-pit-challenge">Foam Pit Challenge</option>
              <option value="laser-maze-mission">Laser Maze Mission</option>
              <option value="interactive-play-arena">Interactive Play Arena</option>
              <option value="little-explorers-zone">Little Explorers Zone</option>
              <option value="cargo-net-climber">Cargo Net Climber</option>
              <option value="balance-bounce-trail">Balance &amp; Bounce Trail</option>
              <option value="neon-glow-adventure">Neon Glow Adventure</option>
              <option value="mini-sports-arena">Mini Sports Arena</option>
              <option value="mystery-tunnel-quest">Mystery Tunnel Quest</option>
              <option value="spider-wall-climb">Spider Wall Climb</option>
              <option value="parkour-jump-zone">Parkour Jump Zone</option>
              <option value="adventure-tower">Adventure Tower</option>
              <option value="volcano-climb">Volcano Climb</option>
              <option value="wipeout-challenge">Wipeout Challenge</option>
              <option value="airbag-jump-zone">Airbag Jump Zone</option>
            </select>
          </div>

          <h5 style="margin-top: 1.5rem;">Available Time Slots (Saturday, Oct 17)</h5>
          <div class="ps-timeslot-grid">
            <button type="button" class="ps-timeslot-btn active">10:00 AM - 11:30 AM</button>
            <button type="button" class="ps-timeslot-btn">11:30 AM - 1:00 PM</button>
            <button type="button" class="ps-timeslot-btn">1:00 PM - 2:30 PM</button>
            <button type="button" class="ps-timeslot-btn">2:30 PM - 4:00 PM</button>
            <button type="button" class="ps-timeslot-btn">4:00 PM - 5:30 PM</button>
            <button type="button" class="ps-timeslot-btn">5:30 PM - 7:00 PM</button>
            <button type="button" class="ps-timeslot-btn">7:00 PM - 8:30 PM</button>
            <button type="button" class="ps-timeslot-btn disabled">8:30 PM (Sold Out)</button>
          </div>
        </div>
        <button type="button" class="ps-btn ps-btn-primary" data-wizard-next>Continue to Jumpers &rarr;</button>
      </div>

      <!-- Step 2 Panel -->
      <div data-wizard-panel="2" style="display: none;">
        <div class="ps-card" style="margin-bottom: 1.5rem;">
          <h4>Select Jumpers &amp; Grip Socks</h4>
          <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1.5rem;">
            <div class="ps-flex-between">
              <div>
                <h5 style="margin: 0;">Regular Jumpers (Ages 4+)</h5>
                <span class="text-muted" style="font-size: 0.85rem;">$18.00 each for 60-90 mins</span>
              </div>
              <div class="ps-counter" data-counter-type="jumpers" data-min="1" data-max="10">
                <button type="button" class="ps-counter-btn" data-counter-minus>-</button>
                <span class="ps-counter-value">2</span>
                <button type="button" class="ps-counter-btn" data-counter-plus>+</button>
              </div>
            </div>

            <div class="ps-flex-between">
              <div>
                <h5 style="margin: 0;">PlaySpace Grip Socks</h5>
                <span class="text-muted" style="font-size: 0.85rem;">$3.50 per pair (Yours to keep!)</span>
              </div>
              <div class="ps-counter" data-counter-type="socks" data-min="0" data-max="10">
                <button type="button" class="ps-counter-btn" data-counter-minus>-</button>
                <span class="ps-counter-value">2</span>
                <button type="button" class="ps-counter-btn" data-counter-plus>+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="ps-flex ps-gap-md">
          <button type="button" class="ps-btn ps-btn-outline-dark" data-wizard-prev>&larr; Back</button>
          <button type="button" class="ps-btn ps-btn-primary" data-wizard-next>Continue to Waiver &rarr;</button>
        </div>
      </div>

      <!-- Step 3 Panel -->
      <div data-wizard-panel="3" style="display: none;">
        <div class="ps-card" style="margin-bottom: 1.5rem;">
          <h4>Digital Safety Waiver &amp; Signature</h4>
          <p class="text-muted" style="font-size: 0.9rem;">
            Please sign below using your finger, stylus, or mouse to reaffirm safety coverage for Leo &amp; Maya Jenkins.
          </p>

          <div class="ps-signature-pad" style="margin: 1.5rem 0;">
            <canvas id="ps-signature-canvas"></canvas>
          </div>
          <button type="button" id="ps-clear-sig" class="ps-btn ps-btn-outline-dark ps-btn-sm">Clear Signature</button>

          <div class="ps-form-group" style="margin-top: 1.5rem;">
            <label class="ps-checkbox-label">
              <input type="checkbox" class="ps-checkbox" checked required>
              <span>I confirm all participants understand ASTM court safety rules.</span>
            </label>
          </div>
        </div>
        <div class="ps-flex ps-gap-md">
          <button type="button" class="ps-btn ps-btn-outline-dark" data-wizard-prev>&larr; Back</button>
          <button type="button" class="ps-btn ps-btn-primary" data-wizard-next>Review &amp; Pay &rarr;</button>
        </div>
      </div>

      <!-- Step 4 Panel -->
      <div data-wizard-panel="4" style="display: none;">
        <div class="ps-card" style="margin-bottom: 1.5rem;">
          <h4>Payment Confirmation</h4>
          <p class="text-muted">Select payment method to complete reservation.</p>
          <div style="border: 2px solid #FFCC00; border-radius: var(--ps-radius-lg); padding: 1.5rem; margin: 1.5rem 0; background: rgba(255,204,0,0.05);">
            <div class="ps-flex-between">
              <strong>Visa ending in 4242</strong>
              <span class="ps-badge">DEFAULT</span>
            </div>
            <span style="font-size: 0.85rem; color: var(--ps-text-muted);">Sarah Jenkins • Exp 08/28</span>
          </div>
          <button type="button" id="ps-btn-complete-booking" class="ps-btn ps-btn-primary ps-btn-block ps-btn-lg">
            Confirm &amp; Pay Reservation
          </button>
        </div>
        <button type="button" class="ps-btn ps-btn-outline-dark" data-wizard-prev>&larr; Back</button>
      </div>
    </div>

    <!-- Sticky Order Summary Sidebar -->
    <aside class="ps-order-summary">
      <h3 style="color: #FFFFFF; margin-bottom: 1.5rem;">Reservation Summary</h3>
      <div class="ps-summary-line">
        <span>Session Time:</span>
        <strong id="summary-slot-text" style="color: #FFFFFF;">10:00 AM - 11:30 AM</strong>
      </div>
      <div class="ps-summary-line">
        <span id="summary-jumpers-text">2 Jumpers</span>
        <span id="summary-jumpers-price">$36.00</span>
      </div>
      <div class="ps-summary-line">
        <span>2 Grip Socks</span>
        <span id="summary-socks-price">$7.00</span>
      </div>
      <div class="ps-summary-total">
        <span>Total Due:</span>
        <span class="price" id="summary-total-price">$43.00</span>
      </div>
    </aside>
  </div>
  `,
  'book-session',
  ['booking.js']
);
fs.writeFileSync(path.join(PARENT_DIR, 'book-session.html'), bookSessionHtml, 'utf8');

// 4. booking-details.html
const bookingDetailsHtml = parentWrapper(
  'Booking Details #PS-9842',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Reservation Pass #PS-9842</h2>
      <p class="text-muted" style="margin: 0;">Show this digital pass or QR code at reception to check-in.</p>
    </div>
    <a href="invoice.html" class="ps-btn ps-btn-outline-dark">Print Invoice</a>
  </div>

  <div class="ps-grid ps-grid-2">
    <div class="ps-card" style="background: #000000; color: #FFFFFF; border: 2px solid #FFCC00; text-align: center; padding: 3rem 2rem;">
      <span class="ps-badge">FAST GATE SCAN</span>
      <div style="background: #FFFFFF; padding: 1.5rem; display: inline-block; border-radius: 12px; margin: 2rem 0;">
        <!-- Simulated QR Code SVG -->
        <svg width="180" height="180" viewBox="0 0 100 100" fill="#000000">
          <rect width="100" height="100" fill="#FFFFFF"/>
          <rect x="10" y="10" width="25" height="25" fill="#000000"/>
          <rect x="15" y="15" width="15" height="15" fill="#FFFFFF"/>
          <rect x="18" y="18" width="9" height="9" fill="#000000"/>
          <rect x="65" y="10" width="25" height="25" fill="#000000"/>
          <rect x="70" y="15" width="15" height="15" fill="#FFFFFF"/>
          <rect x="73" y="18" width="9" height="9" fill="#000000"/>
          <rect x="10" y="65" width="25" height="25" fill="#000000"/>
          <rect x="15" y="70" width="15" height="15" fill="#FFFFFF"/>
          <rect x="18" y="73" width="9" height="9" fill="#000000"/>
          <rect x="45" y="15" width="10" height="10" fill="#000000"/>
          <rect x="45" y="45" width="20" height="20" fill="#000000"/>
          <rect x="70" y="70" width="15" height="15" fill="#000000"/>
        </svg>
      </div>
      <h3 style="color: #FFCC00; margin: 0;">#PS-9842</h3>
      <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-top: 0.5rem;">Valid on Oct 17, 2026 at 10:00 AM</p>
    </div>

    <div class="ps-card">
      <h4>Reservation Details</h4>
      <table class="ps-table" style="margin-top: 1rem;">
        <tr><th>Session Type</th><td>Open Jump (90 Minutes)</td></tr>
        <tr><th>Date &amp; Time</th><td>Saturday, Oct 17, 2026 • 10:00 AM – 11:30 AM</td></tr>
        <tr><th>Jumpers</th><td>Leo Jenkins (7), Maya Jenkins (4)</td></tr>
        <tr><th>Grip Socks</th><td>2 Pairs (Paid)</td></tr>
        <tr><th>Total Paid</th><td><strong>$43.00</strong> (Visa ****4242)</td></tr>
        <tr><th>Status</th><td><span class="ps-badge">CONFIRMED</span></td></tr>
      </table>

      <div style="margin-top: 2rem; display: flex; gap: 1rem;">
        <button class="ps-btn ps-btn-dark" onclick="window.print()">Print Pass</button>
        <button class="ps-btn ps-btn-outline-dark" data-action-cancel-booking>Cancel Booking</button>
      </div>
    </div>
  </div>
  `,
  'my-bookings',
  ['parent-dashboard.js']
);
fs.writeFileSync(path.join(PARENT_DIR, 'booking-details.html'), bookingDetailsHtml, 'utf8');

// 5. my-bookings.html
const myBookingsHtml = parentWrapper(
  'My Jump Bookings',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">My Jump Reservations</h2>
      <p class="text-muted" style="margin: 0;">Upcoming visits, check-in passes, and completed jump records.</p>
    </div>
    <a href="book-session.html" class="ps-btn ps-btn-primary">+ Book New Session</a>
  </div>

  <div class="ps-table-wrap">
    <table class="ps-table">
      <thead>
        <tr>
          <th>Reference</th>
          <th>Activity</th>
          <th>Date &amp; Slot</th>
          <th>Jumpers</th>
          <th>Total</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>#PS-9842</strong></td>
          <td>Open Jump (90m)</td>
          <td>Oct 17, 2026 • 10:00 AM</td>
          <td>Leo, Maya</td>
          <td>$43.00</td>
          <td><span class="ps-badge">CONFIRMED</span></td>
          <td><a href="booking-details.html" class="ps-btn ps-btn-dark ps-btn-sm">View Pass</a></td>
        </tr>
        <tr>
          <td><strong>#PS-9210</strong></td>
          <td>Toddler Lagoon</td>
          <td>Oct 03, 2026 • 9:30 AM</td>
          <td>Maya</td>
          <td>$12.00</td>
          <td><span class="ps-badge ps-badge-dark">COMPLETED</span></td>
          <td><a href="invoice.html" class="ps-btn ps-btn-outline-dark ps-btn-sm">Invoice</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  'my-bookings'
);
fs.writeFileSync(path.join(PARENT_DIR, 'my-bookings.html'), myBookingsHtml, 'utf8');

// 6. birthday-booking.html (Birthday Package Booking Wizard)
const birthdayBookingHtml = parentWrapper(
  'Birthday Reservation',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Customize Birthday Party</h2>
      <p class="text-muted" style="margin: 0;">Choose party package, private suite, guest counts, and catering.</p>
    </div>
  </div>

  <div class="ps-booking-flow">
    <div>
      <div class="ps-card" style="margin-bottom: 2rem;">
        <h4>1. Choose Party Package</h4>
        <div class="ps-grid ps-grid-3" style="margin-top: 1.25rem;">
          <div class="ps-pricing-card" data-party-package="Classic Bounce" data-package-price="299" data-included-kids="10" style="cursor: pointer;">
            <h5>Classic Bounce</h5>
            <div style="font-size: 1.8rem; font-weight: 900;">$299</div>
            <p style="font-size: 0.8rem;">10 Jumpers Included</p>
          </div>
          <div class="ps-pricing-card featured" data-party-package="VIP Glow Party" data-package-price="449" data-included-kids="12" style="cursor: pointer;">
            <h5 style="color: #FFFFFF;">VIP Glow Celebration</h5>
            <div style="font-size: 1.8rem; font-weight: 900; color: #FFCC00;">$449</div>
            <p style="font-size: 0.8rem; color: rgba(255,255,255,0.8);">12 Jumpers Included</p>
          </div>
          <div class="ps-pricing-card" data-party-package="Ultimate Takeover" data-package-price="699" data-included-kids="20" style="cursor: pointer;">
            <h5>Ultimate Takeover</h5>
            <div style="font-size: 1.8rem; font-weight: 900;">$699</div>
            <p style="font-size: 0.8rem;">20 Jumpers Included</p>
          </div>
        </div>
      </div>

      <div class="ps-card" style="margin-bottom: 2rem;">
        <h4>2. Party Room &amp; Date</h4>
        <div class="ps-grid ps-grid-2" style="margin-top: 1rem;">
          <div class="ps-form-group">
            <label class="ps-form-label">Party Date</label>
            <input type="date" class="ps-form-control" value="2026-11-07">
          </div>
          <div class="ps-form-group">
            <label class="ps-form-label">Private Celebration Suite</label>
            <select id="ps-party-room-select" class="ps-form-control">
              <option>Galaxy Neon Suite (Recommended for Glow)</option>
              <option>Jungle Safari Lounge</option>
              <option>Adventure Superhero Suite</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <aside class="ps-order-summary">
      <h3 style="color: #FFFFFF; margin-bottom: 1.5rem;">Party Estimate</h3>
      <div id="ps-party-breakdown">
        <!-- populated by birthday-booking.js -->
      </div>
      <div class="ps-summary-total">
        <span>Total Estimate:</span>
        <span class="price" id="ps-party-total">$449.00</span>
      </div>
      <a href="my-bookings.html" class="ps-btn ps-btn-primary ps-btn-block" style="margin-top: 1.5rem;">
        Reserve Party Suite ($100 Deposit)
      </a>
    </aside>
  </div>
  `,
  'birthday-booking',
  ['birthday-booking.js']
);
fs.writeFileSync(path.join(PARENT_DIR, 'birthday-booking.html'), birthdayBookingHtml, 'utf8');

// 7. my-passes.html
const myPassesHtml = parentWrapper(
  'Punch Pass Wallet',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Digital Punch Pass Wallet</h2>
      <p class="text-muted" style="margin: 0;">Track your remaining visits and redeem jump credits.</p>
    </div>
    <a href="purchase-pass.html" class="ps-btn ps-btn-primary">+ Purchase New Pass</a>
  </div>

  <div id="ps-passes-container" style="max-width: 600px;">
    <!-- Rendered dynamically by passes.js -->
  </div>
  `,
  'my-passes',
  ['passes.js']
);
fs.writeFileSync(path.join(PARENT_DIR, 'my-passes.html'), myPassesHtml, 'utf8');

// 8. purchase-pass.html
const purchasePassHtml = parentWrapper(
  'Purchase Passes & Packs',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Purchase Passes &amp; Bundles</h2>
      <p class="text-muted" style="margin: 0;">Instant credit activation in your digital parent wallet.</p>
    </div>
  </div>

  <div class="ps-grid ps-grid-3">
    <div class="ps-card">
      <span class="ps-badge">PUNCH PASS</span>
      <h3 style="margin-top: 1rem;">10-Jump Punch Pass</h3>
      <p class="text-muted">Save $40 on regular admission. Valid for 12 months.</p>
      <div style="font-size: 2.2rem; font-weight: 900; margin: 1rem 0;">$140.00</div>
      <a href="my-passes.html" class="ps-btn ps-btn-dark ps-btn-block">Buy 10-Pass</a>
    </div>

    <div class="ps-card featured" style="background: #000000; color: #FFFFFF; border: 2px solid #FFCC00;">
      <span class="ps-badge">BEST VALUE</span>
      <h3 style="margin-top: 1rem; color: #FFFFFF;">Monthly VIP Pass</h3>
      <p style="color: rgba(255,255,255,0.7);">Unlimited daily jumps + free socks + 15% cafe discount.</p>
      <div style="font-size: 2.2rem; font-weight: 900; color: #FFCC00; margin: 1rem 0;">$69.00 <span style="font-size: 1rem; color: #FFFFFF;">/mo</span></div>
      <a href="my-passes.html" class="ps-btn ps-btn-primary ps-btn-block">Start VIP Pass</a>
    </div>

    <div class="ps-card">
      <span class="ps-badge">TODDLER SPECIAL</span>
      <h3 style="margin-top: 1rem;">5-Visit Toddler Morning Pass</h3>
      <p class="text-muted">Weekday morning lagoon visits for little jumpers (0-4).</p>
      <div style="font-size: 2.2rem; font-weight: 900; margin: 1rem 0;">$55.00</div>
      <a href="my-passes.html" class="ps-btn ps-btn-dark ps-btn-block">Buy Toddler Pass</a>
    </div>
  </div>
  `,
  'purchase-pass'
);
fs.writeFileSync(path.join(PARENT_DIR, 'purchase-pass.html'), purchasePassHtml, 'utf8');

// 9. order-history.html
const orderHistoryHtml = parentWrapper(
  'Order History',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Order History</h2>
      <p class="text-muted" style="margin: 0;">All tickets, punch cards, and birthday transactions.</p>
    </div>
  </div>

  <div class="ps-table-wrap">
    <table class="ps-table">
      <thead>
        <tr>
          <th>Order #</th>
          <th>Item Purchased</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Receipt</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>ORD-8921</strong></td>
          <td>10-Session Family Punch Pass</td>
          <td>Oct 10, 2026</td>
          <td>$140.00</td>
          <td><a href="invoice.html" class="ps-btn ps-btn-outline-dark ps-btn-sm">Download</a></td>
        </tr>
        <tr>
          <td><strong>ORD-8540</strong></td>
          <td>2x 90m Jump Passes + 2x Grip Socks</td>
          <td>Oct 02, 2026</td>
          <td>$43.00</td>
          <td><a href="invoice.html" class="ps-btn ps-btn-outline-dark ps-btn-sm">Download</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  'order-history'
);
fs.writeFileSync(path.join(PARENT_DIR, 'order-history.html'), orderHistoryHtml, 'utf8');

// 10. payment-history.html
const paymentHistoryHtml = parentWrapper(
  'Payment Receipts',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Payment History &amp; Cards</h2>
      <p class="text-muted" style="margin: 0;">Billing receipts and stored payment methods.</p>
    </div>
  </div>

  <div class="ps-card" style="margin-bottom: 2rem;">
    <div class="ps-flex-between">
      <div>
        <h4 style="margin: 0;">Visa ending in 4242</h4>
        <span class="text-muted">Expires 08/2028 • Primary Card</span>
      </div>
      <button class="ps-btn ps-btn-outline-dark ps-btn-sm">Update Card</button>
    </div>
  </div>

  <div class="ps-table-wrap">
    <table class="ps-table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Method</th>
          <th>Date</th>
          <th>Status</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>TXN-984021</td>
          <td>Visa ****4242</td>
          <td>Oct 10, 2026</td>
          <td><span class="ps-badge">PAID</span></td>
          <td>$140.00</td>
        </tr>
        <tr>
          <td>TXN-981240</td>
          <td>Visa ****4242</td>
          <td>Oct 02, 2026</td>
          <td><span class="ps-badge">PAID</span></td>
          <td>$43.00</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  'payment-history'
);
fs.writeFileSync(path.join(PARENT_DIR, 'payment-history.html'), paymentHistoryHtml, 'utf8');

// 11. invoice.html (Printable Invoice!)
const invoiceHtml = parentWrapper(
  'Invoice Receipt #INV-9842',
  `
  <div class="ps-dash-header no-print">
    <div>
      <h2 style="margin: 0;">Tax Invoice #INV-9842</h2>
      <p class="text-muted" style="margin: 0;">Official receipt for your PlaySpace booking.</p>
    </div>
    <button class="ps-btn ps-btn-primary" onclick="window.print()">Print Invoice</button>
  </div>

  <div class="ps-card" style="padding: 3rem; border: 2px solid var(--ps-border-color); max-width: 820px; margin: 0 auto;">
    <div class="ps-flex-between" style="border-bottom: 2px solid var(--ps-yellow); padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <div>
        <img src="../assets/images/brand/logo-dark.svg" alt="PlaySpace Logo" class="ps-brand-logo-light ps-brand-logo-card" style="height: 48px;">
        <img src="../assets/images/brand/logo.svg" alt="PlaySpace Logo" class="ps-brand-logo-dark ps-brand-logo-card" style="height: 48px; display: none;">
        <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin-top: 0.5rem;">
          PlaySpace Entertainment Inc.<br>
          4500 Bounce Boulevard, Adventure City, AC 90210<br>
          Tax ID: 82-4910294-US
        </p>
      </div>
      <div style="text-align: right;">
        <h3 style="margin: 0;">INVOICE</h3>
        <p style="margin: 0; font-size: 0.9rem;"><strong>Invoice #:</strong> INV-9842<br><strong>Date:</strong> Oct 17, 2026</p>
      </div>
    </div>

    <div class="ps-grid ps-grid-2" style="margin-bottom: 2rem;">
      <div>
        <strong>Billed To:</strong><br>
        Sarah Jenkins<br>
        sarah.jenkins@example.com<br>
        (555) 234-5678
      </div>
      <div style="text-align: right;">
        <strong>Payment Method:</strong><br>
        Visa ending in 4242<br>
        Status: <span class="ps-badge">PAID IN FULL</span>
      </div>
    </div>

    <table class="ps-table" style="margin-bottom: 2rem;">
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>90-Minute Open Jump Session (Leo &amp; Maya)</td>
          <td>2</td>
          <td>$18.00</td>
          <td>$36.00</td>
        </tr>
        <tr>
          <td>PlaySpace Rubber Grip Socks</td>
          <td>2</td>
          <td>$3.50</td>
          <td>$7.00</td>
        </tr>
      </tbody>
    </table>

    <div style="text-align: right; border-top: 1px solid var(--ps-border-color); padding-top: 1rem;">
      <p style="margin: 0; font-size: 1.3rem;"><strong>Total Paid: <span style="color: #FFCC00;">$43.00</span></strong></p>
    </div>
  </div>
  `,
  'order-history'
);
fs.writeFileSync(path.join(PARENT_DIR, 'invoice.html'), invoiceHtml, 'utf8');

// 12. notifications.html
const notificationsHtml = parentWrapper(
  'Notifications Center',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Notifications &amp; Reminders</h2>
      <p class="text-muted" style="margin: 0;">Safety waiver notices, booking confirmations, and special rewards.</p>
    </div>
  </div>

  <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 780px;">
    <div class="ps-card" style="border-left: 4px solid var(--ps-yellow);">
      <div class="ps-flex-between">
        <strong>Session Confirmed: Saturday, Oct 17 at 10:00 AM</strong>
        <span style="font-size: 0.8rem; color: var(--ps-text-muted);">2 hours ago</span>
      </div>
      <p class="text-muted" style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">
        Your reservation #PS-9842 has been confirmed. Remember to arrive 15 minutes before your jump time!
      </p>
    </div>

    <div class="ps-card">
      <div class="ps-flex-between">
        <strong>Birthday Special Reward Unlocked!</strong>
        <span style="font-size: 0.8rem; color: var(--ps-text-muted);">3 days ago</span>
      </div>
      <p class="text-muted" style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">
        Leo turns 8 soon! Use reward coupon code <strong>LEOBDAY15</strong> to take 15% off any VIP Party Suite.
      </p>
    </div>
  </div>
  `,
  'notifications'
);
fs.writeFileSync(path.join(PARENT_DIR, 'notifications.html'), notificationsHtml, 'utf8');

// 13. profile.html
const profileHtml = parentWrapper(
  'Parent Profile',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Parent Profile</h2>
      <p class="text-muted" style="margin: 0;">Update your primary contact info and emergency numbers.</p>
    </div>
  </div>

  <div class="ps-card" style="max-width: 680px;">
    <form data-validate>
      <div class="ps-form-group">
        <label class="ps-form-label">Full Name</label>
        <input type="text" class="ps-form-control" data-type="name" value="Sarah Jenkins" required>
        <div class="ps-form-error">Name must contain letters and spaces only.</div>
      </div>
      <div class="ps-form-group">
        <label class="ps-form-label">Email Address</label>
        <input type="email" class="ps-form-control" data-type="email" value="sarah.jenkins@example.com" required>
        <div class="ps-form-error">Valid email with @ and domain required.</div>
      </div>
      <div class="ps-form-group">
        <label class="ps-form-label">Primary Mobile Phone</label>
        <input type="tel" class="ps-form-control" data-type="mobile" value="9876543210" placeholder="9876543210" maxlength="10" required>
        <div class="ps-form-error">Mobile number must contain exactly 10 digits.</div>
      </div>
      <div class="ps-form-group">
        <label class="ps-form-label">Emergency Contact Name &amp; Phone</label>
        <input type="text" class="ps-form-control" value="David Jenkins - (555) 987-6543" required>
      </div>
      <button type="submit" class="ps-btn ps-btn-primary">Save Profile Changes</button>
    </form>
  </div>
  `,
  'profile'
);
fs.writeFileSync(path.join(PARENT_DIR, 'profile.html'), profileHtml, 'utf8');

// 14. settings.html
const settingsHtml = parentWrapper(
  'Account Settings',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Account Settings</h2>
      <p class="text-muted" style="margin: 0;">Manage preferences, notifications, and security.</p>
    </div>
  </div>

  <div class="ps-card" style="max-width: 680px;">
    <h4>Notification Preferences</h4>
    <div style="display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0;">
      <label class="ps-checkbox-label">
        <input type="checkbox" class="ps-checkbox" checked>
        <span>Email me session booking receipts and QR passes</span>
      </label>
      <label class="ps-checkbox-label">
        <input type="checkbox" class="ps-checkbox" checked>
        <span>Send SMS reminder 2 hours before my jump session</span>
      </label>
      <label class="ps-checkbox-label">
        <input type="checkbox" class="ps-checkbox" checked>
        <span>Remind me when annual safety waivers are due for renewal</span>
      </label>
    </div>

    <h4 style="margin-top: 2rem;">Security</h4>
    <div class="ps-form-group" style="margin-top: 1rem;">
      <label class="ps-form-label">Change Password</label>
      <input type="password" class="ps-form-control" placeholder="Enter new password">
    </div>
    <button type="button" class="ps-btn ps-btn-dark">Update Password</button>
  </div>
  `,
  'settings'
);
fs.writeFileSync(path.join(PARENT_DIR, 'settings.html'), settingsHtml, 'utf8');

console.log('Built all 14 parent portal pages successfully');
