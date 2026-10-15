# PlaySpace — Kids Indoor Trampoline & Soft Play Center

[![Theme: HTML5 / CSS3 / Vanilla JS](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-FFCC00.svg)](https://github.com)
[![Palette: Strict 3-Color](https://img.shields.io/badge/Palette-%23000000%20%7C%20%23FFFFFF%20%7C%20%23FFCC00-000000.svg)](documentation/color-guide.html)
[![RTL Supported](https://img.shields.io/badge/Layout-LTR%20%26%20RTL%20Ready-FFCC00.svg)](documentation/rtl-guide.html)

> **BIG ENERGY. BIG FUN.**  
> A premium, commercial-grade HTML5/CSS3/Vanilla JS website template and operations suite designed for indoor trampoline arenas, toddler soft play centers, and family adventure parks.

---

## 🎨 Strict 3-Color Visual Palette

PlaySpace strictly enforces a 3-color palette throughout the entire interface (in both Light and Dark modes):

- **Black:** `#000000` (Header, navigation, dark sections, footer, bold text)
- **White:** `#FFFFFF` (Content surfaces, cards, clean typography)
- **Yellow:** `#FFCC00` (Primary buttons, active states, badges, highlights, icons)

*Zero additional UI colors (no grey, blue, green, orange, or red). Opacity variations of the 3 approved colors are used only for subtle borders, backdrops, and shadows.*

---

## 🚀 Key Highlights & Architectural Features

1. **Pure Vanilla Frontend (Zero Build Tools):**
   - Built exclusively with semantic HTML5, modern CSS3 variables, and modular Vanilla JavaScript.
   - No React, Angular, Vue, Node.js, Webpack, or npm dependencies.
   - Simply double-click `index.html` in any browser to run instantly.

2. **Clean Navigation Bar (No Top Announcement Bar):**
   - Top announcement bar eliminated.
   - **Dark Mode Switcher** and **LTR / RTL Switcher** are seamlessly integrated directly inside the main navigation bar.

3. **Complete Scope (50+ Full HTML Pages):**
   - **Public Website (20 Pages):** 2 Homepages, Attractions catalog, Attraction details, Pricing & passes, Birthday party tiers, Party details, Group events, Safety rules, Gallery, Testimonials, FAQ accordion, Blog with live search, Blog details, Contact form, Login, Register, Forgot Password, 404, Coming Soon, Maintenance.
   - **Parent Self-Service Portal (14 Pages):** Overview dashboard, Child profiles & annual waiver tracker, 4-step booking wizard with canvas signature pad, Booking details with QR pass, My bookings, Birthday customizer, Punch pass digital wallet with hole-punch counters, Purchase passes, Order history, Payment receipts, Printable invoice, Notifications center, Profile, Settings.
   - **Admin Operations Console (13 Pages):** Live facility occupancy gauge (250 capacity limit), Hourly capacity utilization canvas chart, 7-day revenue trend chart, Live gate check-in desk, Court timetable schedule, Customer directory CRM, Birthday suites monitor, Pass ledger, Pricing tier editor, Daily attraction safety inspections, Inquiries inbox, Blog CMS, Park settings.
   - **Comprehensive Developer Documentation (7 Pages):** Complete setup, customization, strict color rules, responsive breakpoints, RTL guide, and credits.

4. **Modular Stylesheet Architecture (15 CSS Files):**
   - `variables.css`, `reset.css`, `typography.css`, `layout.css`, `components.css`, `style.css`, `pages.css`, `forms.css`, `booking.css`, `dashboard.css`, `admin.css`, `dark-mode.css`, `rtl.css`, `responsive.css`, `print.css`.

5. **Modular JavaScript Architecture (16 JS Files):**
   - `app.js`, `components.js`, `navigation.js`, `theme.js`, `rtl.js`, `validation.js`, `attractions.js`, `blog.js`, `pricing.js`, `authentication.js`, `booking.js`, `birthday-booking.js`, `passes.js`, `parent-dashboard.js`, `admin-dashboard.js`, `charts.js`.

---

## 📁 Project Structure

```
playspace/
│
├── index.html                  # Homepage 1 (High Energy Split Hero)
├── home-2.html                 # Homepage 2 (Centered Immersive Hero)
│
├── pages/                      # Public Website Pages
│   ├── about.html
│   ├── attractions.html
│   ├── attraction-details.html
│   ├── pricing-passes.html
│   ├── birthday-parties.html
│   ├── birthday-details.html
│   ├── group-events.html
│   ├── safety-guidelines.html
│   ├── gallery.html
│   ├── testimonials.html
│   ├── faq.html
│   ├── blog.html
│   ├── blog-details.html
│   ├── contact.html
│   ├── login.html
│   ├── register.html
│   ├── forgot-password.html
│   ├── 404.html
│   ├── coming-soon.html
│   └── maintenance.html
│
├── parent/                     # Parent Self-Service Portal
│   ├── dashboard.html
│   ├── children.html
│   ├── book-session.html
│   ├── booking-details.html
│   ├── my-bookings.html
│   ├── birthday-booking.html
│   ├── my-passes.html
│   ├── purchase-pass.html
│   ├── order-history.html
│   ├── payment-history.html
│   ├── invoice.html
│   ├── notifications.html
│   ├── profile.html
│   └── settings.html
│
├── admin/                      # Operations Admin Console
│   ├── dashboard.html
│   ├── bookings.html
│   ├── schedule.html
│   ├── customers.html
│   ├── birthday-events.html
│   ├── passes.html
│   ├── orders.html
│   ├── pricing.html
│   ├── attractions.html
│   ├── messages.html
│   ├── blog-management.html
│   ├── reports.html
│   └── settings.html
│
├── assets/
│   ├── css/                    # 15 Modular Stylesheets
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── typography.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── style.css
│   │   ├── pages.css
│   │   ├── forms.css
│   │   ├── booking.css
│   │   ├── dashboard.css
│   │   ├── admin.css
│   │   ├── dark-mode.css
│   │   ├── rtl.css
│   │   ├── responsive.css
│   │   └── print.css
│   │
│   ├── js/                     # 16 Modular JavaScript Files
│   │   ├── app.js
│   │   ├── components.js
│   │   ├── navigation.js
│   │   ├── theme.js
│   │   ├── rtl.js
│   │   ├── validation.js
│   │   ├── attractions.js
│   │   ├── blog.js
│   │   ├── pricing.js
│   │   ├── authentication.js
│   │   ├── booking.js
│   │   ├── birthday-booking.js
│   │   ├── passes.js
│   │   ├── parent-dashboard.js
│   │   ├── admin-dashboard.js
│   │   └── charts.js
│   │
│   └── images/                 # Brand & Media Folders
│       ├── brand/              # logo.svg, logo-dark.svg
│       ├── favicon/            # favicon.svg
│       ├── hero/
│       ├── attractions/
│       ├── birthdays/
│       ├── pricing/
│       ├── gallery/
│       ├── team/
│       ├── testimonials/
│       ├── blog/
│       └── ui/
│
├── documentation/              # Developer Documentation
│   ├── index.html
│   ├── installation.html
│   ├── customization.html
│   ├── color-guide.html
│   ├── responsive-guide.html
│   ├── rtl-guide.html
│   └── credits.html
│
├── README.md
├── LICENSE.txt
└── CHANGELOG.md
```

---

## ⚡ Quickstart

1. Clone or download the `playspace/` folder.
2. Open `playspace/index.html` in any modern web browser.
3. Test **Dark Mode** and **RTL Switching** via the controls directly inside the navigation bar.
4. Try the **Parent Portal** (`parent/dashboard.html`) to test punch card redemption and waiver signing.
5. Try the **Admin Console** (`admin/dashboard.html`) to test live facility occupancy adjustments (+1 / -1) and view canvas graphs.

---

## 📄 License

PlaySpace is distributed under the Standard Commercial & Personal Use License. See `LICENSE.txt` for details.
