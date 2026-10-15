const fs = require('fs');
const path = require('path');
const { ROOT_DIR, ensureDir, getCommonScripts } = require('./build-base');
const { ATTRACTION_ZONES } = require('./attractions-data');

const ADMIN_DIR = path.join(ROOT_DIR, 'admin');
ensureDir(ADMIN_DIR);

function getAdminSidebar(activeItem = 'dashboard') {
  const categories = [
    {
      title: 'Operations',
      links: [
        { id: 'dashboard', label: 'Dashboard & Gauge', href: 'dashboard.html', icon: '📊' },
        { id: 'bookings', label: 'Live Check-In Desk', href: 'bookings.html', icon: '🎟️' },
        { id: 'schedule', label: 'Court Schedule', href: 'schedule.html', icon: '🗓️' },
        { id: 'birthday-events', label: 'Birthday Parties', href: 'birthday-events.html', icon: '🎂' },
        { id: 'attractions', label: 'Attraction Safety Status', href: 'attractions.html', icon: '🛡️' }
      ]
    },
    {
      title: 'CRM & Sales',
      links: [
        { id: 'customers', label: 'Customer Directory', href: 'customers.html', icon: '👥' },
        { id: 'passes', label: 'Passes & Members', href: 'passes.html', icon: '💳' },
        { id: 'orders', label: 'Orders & Cafe', href: 'orders.html', icon: '🛍️' },
        { id: 'reports', label: 'Revenue Reports', href: 'reports.html', icon: '📈' }
      ]
    },
    {
      title: 'Park Control',
      links: [
        { id: 'pricing', label: 'Pricing & Packages', href: 'pricing.html', icon: '💲' },
        { id: 'messages', label: 'Inquiries & Feedback', href: 'messages.html', icon: '✉️' },
        { id: 'blog-management', label: 'Blog CMS', href: 'blog-management.html', icon: '📝' },
        { id: 'settings', label: 'Park Settings', href: 'settings.html', icon: '⚙️' }
      ]
    }
  ];

  let navHtml = '';
  categories.forEach(cat => {
    navHtml += `<div class="ps-admin-nav-category">${cat.title}</div>`;
    cat.links.forEach(link => {
      navHtml += `
        <a href="${link.href}" class="ps-admin-link ${activeItem === link.id ? 'active' : ''}">
          <span>${link.icon}</span>
          <span>${link.label}</span>
        </a>
      `;
    });
  });

  return `
  <aside class="ps-admin-sidebar">
    <div class="ps-admin-brand">
      <a href="../index.html">
        <img src="../assets/images/brand/logo.svg" alt="PlaySpace Brand" style="height: 38px;">
      </a>
    </div>

    <nav class="ps-admin-nav">
      ${navHtml}
    </nav>

    <div style="border-top: 1px solid rgba(255,255,255,0.12); padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="../index.html" class="ps-admin-link">
        <span>🏠</span> <span>Public Website</span>
      </a>
      <a href="../pages/login.html" class="ps-admin-link" data-action-logout>
        <span>🚪</span> <span>Sign Out</span>
      </a>
    </div>
  </aside>
  `;
}

function adminWrapper(title, contentHtml, activeNav = 'dashboard', extraScripts = []) {
  const basePath = '../';
  return `<!DOCTYPE html>
<html lang="en" data-theme="light" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Admin Console | PlaySpace</title>
  <link rel="icon" type="image/svg+xml" href="${basePath}assets/images/favicon/favicon.svg">
  <link rel="stylesheet" href="${basePath}assets/css/style.css">
</head>
<body>
  <!-- Top Navigation Bar for Admin Dashboard (No top bar, toggles inside navbar) -->
  <header class="ps-header">
    <div class="ps-container-fluid ps-navbar">
      <div class="ps-flex ps-items-center ps-gap-md">
        <a href="${basePath}index.html" class="ps-navbar-brand">
          <img src="${basePath}assets/images/brand/logo.svg" alt="PlaySpace Logo">
        </a>
        <span class="ps-badge" style="font-size: 0.75rem;">ADMIN CONSOLE</span>
      </div>

      <div class="ps-nav-actions">
        <!-- Live quick occupancy badge in navbar -->
        <span class="ps-badge ps-badge-dark" style="font-size: 0.8rem; display: flex; align-items: center; gap: 6px;">
          <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background-color:#FFCC00;"></span>
          LIVE OCCUPANCY: <span id="nav-occupancy-count" style="color: #FFCC00; font-weight: 800;">184 / 250</span>
        </span>

        <!-- LTR / RTL toggle right in nav bar -->
        <button class="ps-lang-toggle" aria-label="Toggle Layout Direction">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          <span>RTL</span>
        </button>

        <!-- Dark Mode toggle right in nav bar -->
        <button class="ps-theme-toggle ps-btn-icon" aria-label="Toggle Theme">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>

        <a href="../pages/login.html" class="ps-btn ps-btn-outline ps-btn-sm" data-action-logout>Sign Out</a>
      </div>
    </div>
  </header>

  <div class="ps-admin-layout">
    ${getAdminSidebar(activeNav)}
    <main class="ps-dash-content">
      ${contentHtml}
    </main>
  </div>

  ${getCommonScripts(basePath, extraScripts)}
</body>
</html>`;
}

// 1. dashboard.html (Live Occupancy Gauge + Hourly Charts + Quick Checkin)
const dashboardHtml = adminWrapper(
  'Operations Dashboard',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Facility Operations &amp; Real-Time Capacity</h2>
      <p class="text-muted" style="margin: 0;">Live facility occupancy monitoring, quick gate pass check-in, and daily metrics.</p>
    </div>
    <div class="ps-flex ps-gap-sm">
      <button type="button" id="admin-quick-checkin" class="ps-btn ps-btn-primary">+ Quick Check-In (+1)</button>
      <button type="button" id="admin-quick-checkout" class="ps-btn ps-btn-outline-dark">- Check-Out (-1)</button>
    </div>
  </div>

  <!-- Live Occupancy Gauge Widget -->
  <div class="ps-occupancy-widget" style="margin-bottom: 2.5rem;">
    <div class="ps-flex-between">
      <div>
        <span class="ps-badge">LIVE COURT MONITOR</span>
        <h3 style="color: #FFFFFF; margin-top: 0.75rem; margin-bottom: 0.25rem;">Trampoline Arena &amp; Soft Play Occupancy</h3>
        <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin: 0;">ASTM safety threshold: Max 250 concurrent jumpers</p>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 2.8rem; font-weight: 900; color: #FFCC00; line-height: 1;">
          <span id="occupancy-current">184</span> <span style="font-size: 1.5rem; color: #FFFFFF;">/ <span id="occupancy-capacity">250</span></span>
        </div>
        <span class="ps-badge" id="occupancy-percent" style="margin-top: 0.5rem;">74% Full</span>
      </div>
    </div>

    <div class="ps-occupancy-meter">
      <div class="ps-occupancy-fill" id="occupancy-fill" style="width: 74%;"></div>
    </div>

    <div class="ps-flex-between" style="font-size: 0.85rem; color: rgba(255,255,255,0.75);">
      <span>Comfort Threshold: Optimal Jump Clearance</span>
      <span>66 Jumpers Remaining Before Full Capacity</span>
    </div>
  </div>

  <div class="ps-stat-grid">
    <div class="ps-stat-card">
      <div class="stat-icon">💲</div>
      <div class="stat-val">$5,420</div>
      <div class="stat-lbl">Today's Revenue</div>
    </div>
    <div class="ps-stat-card">
      <div class="stat-icon">🎟️</div>
      <div class="stat-val">342</div>
      <div class="stat-lbl">Total Jumpers Checked-In</div>
    </div>
    <div class="ps-stat-card">
      <div class="stat-icon">🎂</div>
      <div class="stat-val">4</div>
      <div class="stat-lbl">Birthday Parties Today</div>
    </div>
    <div class="ps-stat-card">
      <div class="stat-icon">🛡️</div>
      <div class="stat-val">100%</div>
      <div class="stat-lbl">Safety Audits Passed</div>
    </div>
  </div>

  <div class="ps-grid ps-grid-2" style="margin-bottom: 2.5rem;">
    <!-- Hourly Occupancy Curve Chart -->
    <div class="ps-card ps-card-dark">
      <div class="ps-flex-between" style="margin-bottom: 1rem;">
        <h4 style="color: #FFFFFF; margin: 0;">Hourly Jumper Volume</h4>
        <span class="ps-badge">TODAY</span>
      </div>
      <canvas id="admin-occupancy-chart"></canvas>
    </div>

    <!-- Weekly Revenue Chart -->
    <div class="ps-card ps-card-dark">
      <div class="ps-flex-between" style="margin-bottom: 1rem;">
        <h4 style="color: #FFFFFF; margin: 0;">7-Day Revenue Trend</h4>
        <span class="ps-badge">THIS WEEK</span>
      </div>
      <canvas id="admin-revenue-chart"></canvas>
    </div>
  </div>
  `,
  'dashboard',
  ['admin-dashboard.js', 'charts.js']
);
fs.writeFileSync(path.join(ADMIN_DIR, 'dashboard.html'), dashboardHtml, 'utf8');

// 2. bookings.html (Live Check-In Desk)
const bookingsHtml = adminWrapper(
  'Live Session Check-In Desk',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Live Gate Check-In Desk</h2>
      <p class="text-muted" style="margin: 0;">Scan tickets, issue grip socks, and verify waiver compliance.</p>
    </div>
  </div>

  <div class="ps-table-wrap">
    <table class="ps-table">
      <thead>
        <tr>
          <th>Ref #</th>
          <th>Parent / Guardian</th>
          <th>Jumpers</th>
          <th>Slot Time</th>
          <th>Socks</th>
          <th>Waiver</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>#PS-9842</strong></td>
          <td>Sarah Jenkins</td>
          <td>Leo (7), Maya (4)</td>
          <td>10:00 AM - 11:30 AM</td>
          <td>2 Pairs Paid</td>
          <td><span class="ps-badge">VERIFIED</span></td>
          <td><button class="ps-btn ps-btn-primary ps-btn-sm" data-admin-status-btn="Checked-In">Check In</button></td>
        </tr>
        <tr>
          <td><strong>#PS-9843</strong></td>
          <td>Michael Chang</td>
          <td>Ethan (9)</td>
          <td>10:00 AM - 11:30 AM</td>
          <td>Brought Own</td>
          <td><span class="ps-badge">VERIFIED</span></td>
          <td><button class="ps-btn ps-btn-primary ps-btn-sm" data-admin-status-btn="Checked-In">Check In</button></td>
        </tr>
        <tr>
          <td><strong>#PS-9844</strong></td>
          <td>Amanda Brooks</td>
          <td>Chloe (3) [Toddler]</td>
          <td>10:30 AM - 11:30 AM</td>
          <td>1 Pair Paid</td>
          <td><span class="ps-badge ps-badge-dark">PENDING</span></td>
          <td><button class="ps-btn ps-btn-outline-dark ps-btn-sm" data-admin-status-btn="Signed & Checked">Sign Waiver</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  'bookings',
  ['admin-dashboard.js']
);
fs.writeFileSync(path.join(ADMIN_DIR, 'bookings.html'), bookingsHtml, 'utf8');

// 3. schedule.html (7-day Facility Timetable)
const scheduleHtml = adminWrapper(
  'Court Schedule',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Court Timetable &amp; Allocations</h2>
      <p class="text-muted" style="margin: 0;">Weekly court programming, toddler hours, glow nights, and private buyouts.</p>
    </div>
  </div>

  <div class="ps-schedule-grid">
    <div class="ps-schedule-col">
      <div class="ps-schedule-header">Monday</div>
      <div class="ps-schedule-event"><strong>9am–11am:</strong> Toddler Morning</div>
      <div class="ps-schedule-event"><strong>11am–5pm:</strong> Open Jump</div>
      <div class="ps-schedule-event"><strong>5pm–8pm:</strong> Dodgeball League</div>
    </div>
    <div class="ps-schedule-col">
      <div class="ps-schedule-header">Tuesday</div>
      <div class="ps-schedule-event"><strong>9am–11am:</strong> Toddler Morning</div>
      <div class="ps-schedule-event"><strong>11am–8pm:</strong> Open Jump</div>
    </div>
    <div class="ps-schedule-col">
      <div class="ps-schedule-header">Wednesday</div>
      <div class="ps-schedule-event"><strong>9am–11am:</strong> Toddler Morning</div>
      <div class="ps-schedule-event"><strong>11am–8pm:</strong> Open Jump</div>
    </div>
    <div class="ps-schedule-col">
      <div class="ps-schedule-header">Thursday</div>
      <div class="ps-schedule-event"><strong>9am–11am:</strong> Toddler Morning</div>
      <div class="ps-schedule-event"><strong>11am–8pm:</strong> Open Jump</div>
    </div>
    <div class="ps-schedule-col">
      <div class="ps-schedule-header">Friday</div>
      <div class="ps-schedule-event"><strong>9am–11am:</strong> Toddler Morning</div>
      <div class="ps-schedule-event"><strong>11am–7pm:</strong> Open Jump</div>
      <div class="ps-schedule-event" style="background: rgba(255,204,0,0.35); border-left-color: #000000;"><strong>7pm–10pm:</strong> Neon Glow Night ⭐</div>
    </div>
    <div class="ps-schedule-col">
      <div class="ps-schedule-header">Saturday</div>
      <div class="ps-schedule-event"><strong>9am–12pm:</strong> Family Prime Time</div>
      <div class="ps-schedule-event"><strong>12pm–5pm:</strong> Party Rotations</div>
      <div class="ps-schedule-event" style="background: rgba(255,204,0,0.35); border-left-color: #000000;"><strong>7pm–10pm:</strong> Neon Glow Night ⭐</div>
    </div>
    <div class="ps-schedule-col">
      <div class="ps-schedule-header">Sunday</div>
      <div class="ps-schedule-event"><strong>10am–2pm:</strong> Family Open Jump</div>
      <div class="ps-schedule-event"><strong>2pm–7pm:</strong> Birthday Parties</div>
    </div>
  </div>
  `,
  'schedule'
);
fs.writeFileSync(path.join(ADMIN_DIR, 'schedule.html'), scheduleHtml, 'utf8');

// 4. customers.html (CRM table)
const customersHtml = adminWrapper(
  'Customer Directory',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Customer Directory &amp; Waivers</h2>
      <p class="text-muted" style="margin: 0;">Track parent profiles, registered children, and spending history.</p>
    </div>
  </div>

  <div class="ps-table-wrap">
    <table class="ps-table">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Contact</th>
          <th>Children Linked</th>
          <th>Waiver Status</th>
          <th>Total Spend</th>
          <th>Membership</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Sarah Jenkins</strong></td>
          <td>sarah.jenkins@example.com<br>(555) 234-5678</td>
          <td>Leo (7), Maya (4)</td>
          <td><span class="ps-badge">ACTIVE</span></td>
          <td>$680.00</td>
          <td>VIP Punch Pass</td>
        </tr>
        <tr>
          <td><strong>Marcus Davis</strong></td>
          <td>marcus.d@example.com<br>(555) 491-0294</td>
          <td>Noah (2)</td>
          <td><span class="ps-badge">ACTIVE</span></td>
          <td>$180.00</td>
          <td>Toddler Pass</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  'customers'
);
fs.writeFileSync(path.join(ADMIN_DIR, 'customers.html'), customersHtml, 'utf8');

// 5. birthday-events.html (Party Monitor)
const birthdayEventsHtml = adminWrapper(
  'Birthday Parties Monitor',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Birthday Party Suite Monitor</h2>
      <p class="text-muted" style="margin: 0;">Track active celebration rooms, party masters, and pizza delivery times.</p>
    </div>
  </div>

  <div class="ps-grid ps-grid-3">
    <div class="ps-card" style="border: 2px solid #FFCC00;">
      <div class="ps-flex-between">
        <span class="ps-badge">ROOM 1: GALAXY NEON</span>
        <span style="font-weight: 800;">11:30 AM - 1:30 PM</span>
      </div>
      <h4 style="margin: 1rem 0 0.5rem 0;">Leo Jenkins (Turning 8)</h4>
      <p class="text-muted" style="font-size: 0.85rem;">Package: VIP Glow Celebration • 15 Jumpers</p>
      <div style="background: rgba(0,0,0,0.04); padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin: 1rem 0;">
        Host: <strong>Tyler M.</strong> • Pizza Delivery: <strong>12:45 PM</strong>
      </div>
      <span class="ps-status-pill active">IN PROGRESS</span>
    </div>

    <div class="ps-card">
      <div class="ps-flex-between">
        <span class="ps-badge ps-badge-dark">ROOM 2: JUNGLE SAFARI</span>
        <span style="font-weight: 800;">2:00 PM - 4:00 PM</span>
      </div>
      <h4 style="margin: 1rem 0 0.5rem 0;">Sophia Martinez (Turning 5)</h4>
      <p class="text-muted" style="font-size: 0.85rem;">Package: Classic Bounce • 10 Jumpers</p>
      <div style="background: rgba(0,0,0,0.04); padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin: 1rem 0;">
        Host: <strong>Jessica K.</strong> • Pizza Delivery: <strong>3:15 PM</strong>
      </div>
      <span class="ps-status-pill inactive">PREPPING ROOM</span>
    </div>
  </div>
  `,
  'birthday-events'
);
fs.writeFileSync(path.join(ADMIN_DIR, 'birthday-events.html'), birthdayEventsHtml, 'utf8');

// 6. passes.html (Active Passes)
const passesHtml = adminWrapper(
  'Passes & Memberships',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Active Multi-Passes &amp; Memberships</h2>
      <p class="text-muted" style="margin: 0;">Punch pass redemption ledger and recurring memberships.</p>
    </div>
  </div>

  <div class="ps-table-wrap">
    <table class="ps-table">
      <thead>
        <tr>
          <th>Pass ID</th>
          <th>Holder Name</th>
          <th>Type</th>
          <th>Punches Used</th>
          <th>Remaining</th>
          <th>Expires</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>PASS-10-8421</td>
          <td>Sarah Jenkins</td>
          <td>10-Session Family Pass</td>
          <td>3 / 10</td>
          <td><strong>7 Left</strong></td>
          <td>Dec 31, 2026</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  'passes'
);
fs.writeFileSync(path.join(ADMIN_DIR, 'passes.html'), passesHtml, 'utf8');

// 7. orders.html (Orders & Cafe)
const ordersHtml = adminWrapper(
  'Orders & Concessions',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Store Orders &amp; Cafe Concessions</h2>
      <p class="text-muted" style="margin: 0;">All ticket sales, grip sock purchases, and café orders.</p>
    </div>
  </div>

  <div class="ps-table-wrap">
    <table class="ps-table">
      <thead>
        <tr>
          <th>Order #</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Amount</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ORD-9021</td>
          <td>Sarah Jenkins</td>
          <td>2x 90m Jump, 2x Grip Socks</td>
          <td>$43.00</td>
          <td>10:02 AM</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  'orders'
);
fs.writeFileSync(path.join(ADMIN_DIR, 'orders.html'), ordersHtml, 'utf8');

// 8. pricing.html (Price Manager)
const pricingAdminHtml = adminWrapper(
  'Pricing & Packages Manager',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Pricing &amp; Package Editor</h2>
      <p class="text-muted" style="margin: 0;">Adjust ticket rates, peak hours surcharges, and party packages.</p>
    </div>
    <button class="ps-btn ps-btn-primary">Save Pricing Changes</button>
  </div>

  <div class="ps-grid ps-grid-2">
    <div class="ps-card">
      <h4>Hourly Jump Ticket Tiers</h4>
      <div class="ps-form-group" style="margin-top: 1rem;">
        <label class="ps-form-label">60-Minute Rate ($)</label>
        <input type="number" class="ps-form-control" value="18">
      </div>
      <div class="ps-form-group">
        <label class="ps-form-label">90-Minute Rate ($)</label>
        <input type="number" class="ps-form-control" value="24">
      </div>
      <div class="ps-form-group">
        <label class="ps-form-label">120-Minute Rate ($)</label>
        <input type="number" class="ps-form-control" value="28">
      </div>
      <div class="ps-form-group">
        <label class="ps-form-label">PlaySpace Grip Socks ($)</label>
        <input type="number" step="0.5" class="ps-form-control" value="3.5">
      </div>
    </div>

    <div class="ps-card">
      <h4>Birthday Package Tiers</h4>
      <div class="ps-form-group" style="margin-top: 1rem;">
        <label class="ps-form-label">Classic Bounce Base ($)</label>
        <input type="number" class="ps-form-control" value="299">
      </div>
      <div class="ps-form-group">
        <label class="ps-form-label">VIP Glow Party Base ($)</label>
        <input type="number" class="ps-form-control" value="449">
      </div>
      <div class="ps-form-group">
        <label class="ps-form-label">Ultimate Takeover Base ($)</label>
        <input type="number" class="ps-form-control" value="699">
      </div>
    </div>
  </div>
  `,
  'pricing'
);
fs.writeFileSync(path.join(ADMIN_DIR, 'pricing.html'), pricingAdminHtml, 'utf8');

// 9. attractions.html (Attraction Status)
const attractionsAdminHtml = adminWrapper(
  'Attraction Safety Status',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Attraction Status &amp; Daily Inspections</h2>
      <p class="text-muted" style="margin: 0;">Verify daily ASTM spring audits, airbag PSI checks, and monitor court status.</p>
    </div>
  </div>

  <div class="ps-table-wrap">
    <table class="ps-table">
      <thead>
        <tr>
          <th>Attraction Zone</th>
          <th>Max Capacity</th>
          <th>Daily Inspection</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${ATTRACTION_ZONES.map((z, idx) => `
        <tr>
          <td><strong>${z.title}</strong></td>
          <td>${z.specs[0] || '40 Jumpers'}</td>
          <td>Passed (8:${(idx * 3 % 60).toString().padStart(2, '0')} AM by Marshal #${(idx % 4) + 1})</td>
          <td><span class="ps-badge">OPERATIONAL</span></td>
          <td><button class="ps-btn ps-btn-outline-dark ps-btn-sm">Log Check</button></td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  `,
  'attractions'
);
fs.writeFileSync(path.join(ADMIN_DIR, 'attractions.html'), attractionsAdminHtml, 'utf8');

// 10. messages.html (Customer Inquiries)
const messagesHtml = adminWrapper(
  'Inquiries & Feedback',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Guest Messages &amp; Group Inquiries</h2>
      <p class="text-muted" style="margin: 0;">Inbound party questions, school field trip requests, and feedback.</p>
    </div>
  </div>

  <div class="ps-table-wrap">
    <table class="ps-table">
      <thead>
        <tr>
          <th>Sender</th>
          <th>Subject</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Principal Robert Taylor</strong> (Lincoln Elementary)</td>
          <td>Field Trip for 85 Students in November</td>
          <td>Oct 12, 2026</td>
          <td><span class="ps-badge">NEW</span></td>
          <td><button class="ps-btn ps-btn-primary ps-btn-sm">Reply</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  'messages'
);
fs.writeFileSync(path.join(ADMIN_DIR, 'messages.html'), messagesHtml, 'utf8');

// 11. blog-management.html (CMS)
const blogManagementHtml = adminWrapper(
  'Blog CMS Manager',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Blog CMS &amp; Article Manager</h2>
      <p class="text-muted" style="margin: 0;">Publish and update parenting guides and news updates.</p>
    </div>
    <button class="ps-btn ps-btn-primary">+ Add New Post</button>
  </div>

  <div class="ps-table-wrap">
    <table class="ps-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Author</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Top Benefits of Trampoline Play for Kids</strong></td>
          <td><span class="ps-badge" style="background:#FFCC00;color:#000;">Play &amp; Activities</span></td>
          <td>Coach Alex Reynolds</td>
          <td><span class="ps-badge" style="background:#28a745;color:#fff;">PUBLISHED</span></td>
          <td><a href="../pages/blog-details.html?id=top-benefits-trampoline-play-kids" class="ps-btn ps-btn-outline-dark ps-btn-sm" target="_blank">View</a></td>
        </tr>
        <tr>
          <td><strong>Why Indoor Play Is Great for Growing Kids</strong></td>
          <td><span class="ps-badge" style="background:#FFCC00;color:#000;">Parenting Tips</span></td>
          <td>Dr. Elena Vance</td>
          <td><span class="ps-badge" style="background:#28a745;color:#fff;">PUBLISHED</span></td>
          <td><a href="../pages/blog-details.html?id=why-indoor-play-is-great-for-growing-kids" class="ps-btn ps-btn-outline-dark ps-btn-sm" target="_blank">View</a></td>
        </tr>
        <tr>
          <td><strong>How to Plan the Perfect Kids' Birthday Party</strong></td>
          <td><span class="ps-badge" style="background:#FFCC00;color:#000;">Birthday Party Ideas</span></td>
          <td>Samantha Clarke</td>
          <td><span class="ps-badge" style="background:#28a745;color:#fff;">PUBLISHED</span></td>
          <td><a href="../pages/blog-details.html?id=how-to-plan-perfect-kids-birthday-party" class="ps-btn ps-btn-outline-dark ps-btn-sm" target="_blank">View</a></td>
        </tr>
        <tr>
          <td><strong>Essential Indoor Playground Safety Tips</strong></td>
          <td><span class="ps-badge" style="background:#FFCC00;color:#000;">Safety &amp; Wellness</span></td>
          <td>Marcus Miller</td>
          <td><span class="ps-badge" style="background:#28a745;color:#fff;">PUBLISHED</span></td>
          <td><a href="../pages/blog-details.html?id=essential-indoor-playground-safety-tips" class="ps-btn ps-btn-outline-dark ps-btn-sm" target="_blank">View</a></td>
        </tr>
        <tr>
          <td><strong>Fun Indoor Activities for Toddlers</strong></td>
          <td><span class="ps-badge" style="background:#FFCC00;color:#000;">Play &amp; Activities</span></td>
          <td>Chloe Bennett</td>
          <td><span class="ps-badge" style="background:#28a745;color:#fff;">PUBLISHED</span></td>
          <td><a href="../pages/blog-details.html?id=fun-indoor-activities-for-toddlers" class="ps-btn ps-btn-outline-dark ps-btn-sm" target="_blank">View</a></td>
        </tr>
        <tr>
          <td><strong>Planning an Exciting School Field Trip</strong></td>
          <td><span class="ps-badge" style="background:#FFCC00;color:#000;">Events &amp; Updates</span></td>
          <td>David Martinez</td>
          <td><span class="ps-badge" style="background:#28a745;color:#fff;">PUBLISHED</span></td>
          <td><a href="../pages/blog-details.html?id=planning-exciting-school-field-trip" class="ps-btn ps-btn-outline-dark ps-btn-sm" target="_blank">View</a></td>
        </tr>
        <tr>
          <td><strong>Meet the Most Exciting Adventure Zones at PLAYSPACE</strong></td>
          <td><span class="ps-badge" style="background:#FFCC00;color:#000;">Indoor Adventures</span></td>
          <td>Coach Tyler Brooks</td>
          <td><span class="ps-badge" style="background:#28a745;color:#fff;">PUBLISHED</span></td>
          <td><a href="../pages/blog-details.html?id=meet-most-exciting-adventure-zones-at-playspace" class="ps-btn ps-btn-outline-dark ps-btn-sm" target="_blank">View</a></td>
        </tr>
        <tr>
          <td><strong>Five Ways to Make Family Playtime More Memorable</strong></td>
          <td><span class="ps-badge" style="background:#FFCC00;color:#000;">Parenting Tips</span></td>
          <td>Jessica Taylor</td>
          <td><span class="ps-badge" style="background:#28a745;color:#fff;">PUBLISHED</span></td>
          <td><a href="../pages/blog-details.html?id=five-ways-to-make-family-playtime-more-memorable" class="ps-btn ps-btn-outline-dark ps-btn-sm" target="_blank">View</a></td>
        </tr>
        <tr>
          <td><strong>The Magic of Neon Glow Nights: What Parents &amp; Kids Can Expect</strong></td>
          <td><span class="ps-badge" style="background:#FFCC00;color:#000;">Events &amp; Updates</span></td>
          <td>Coach Maya Lin</td>
          <td><span class="ps-badge" style="background:#28a745;color:#fff;">PUBLISHED</span></td>
          <td><a href="../pages/blog-details.html?id=the-magic-of-neon-glow-nights" class="ps-btn ps-btn-outline-dark ps-btn-sm" target="_blank">View</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  'blog-management'
);
fs.writeFileSync(path.join(ADMIN_DIR, 'blog-management.html'), blogManagementHtml, 'utf8');

// 12. reports.html (Financial Analytics)
const reportsHtml = adminWrapper(
  'Revenue & Occupancy Reports',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Financial Reports &amp; Analytics</h2>
      <p class="text-muted" style="margin: 0;">Monthly revenue breakdown, ticket volume, and peak hour utilization.</p>
    </div>
    <button class="ps-btn ps-btn-outline-dark" onclick="window.print()">Export PDF</button>
  </div>

  <div class="ps-grid ps-grid-2">
    <div class="ps-card ps-card-dark">
      <h4 style="color: #FFFFFF;">Weekly Revenue Velocity</h4>
      <canvas id="admin-revenue-chart"></canvas>
    </div>
    <div class="ps-card ps-card-dark">
      <h4 style="color: #FFFFFF;">Hourly Capacity Utilization</h4>
      <canvas id="admin-occupancy-chart"></canvas>
    </div>
  </div>
  `,
  'reports',
  ['charts.js']
);
fs.writeFileSync(path.join(ADMIN_DIR, 'reports.html'), reportsHtml, 'utf8');

// 13. settings.html (Admin Park Settings)
const settingsAdminHtml = adminWrapper(
  'Park Settings',
  `
  <div class="ps-dash-header">
    <div>
      <h2 style="margin: 0;">Park Settings &amp; Capacity Caps</h2>
      <p class="text-muted" style="margin: 0;">Manage operating hours, maximum court capacity, and waiver terms.</p>
    </div>
  </div>

  <div class="ps-card" style="max-width: 680px;">
    <div class="ps-form-group">
      <label class="ps-form-label">Maximum Facility Capacity (Jumpers)</label>
      <input type="number" class="ps-form-control" value="250">
    </div>
    <div class="ps-form-group">
      <label class="ps-form-label">Warning Capacity Threshold (%)</label>
      <input type="number" class="ps-form-control" value="90">
    </div>
    <button type="button" class="ps-btn ps-btn-primary">Update Configuration</button>
  </div>
  `,
  'settings'
);
fs.writeFileSync(path.join(ADMIN_DIR, 'settings.html'), settingsAdminHtml, 'utf8');

console.log('Built all 13 admin console pages successfully');
