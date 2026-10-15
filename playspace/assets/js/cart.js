/**
 * PlaySpace - Centralized Shopping Cart & Slide-Over Drawer
 * Handles Cart in Navbar, LocalStorage persistence, Full Cart Page, Promo Codes, and Booking Flow Handshake
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'playspace_cart';
  const STORAGE_KEY_LEGACY = 'playspace_cart_items';
  const PROMO_STORAGE_KEY = 'playspace_promo';

  // Comprehensive Catalog of Bookable PlaySpace Items
  const PLAYSPACE_CATALOG = {
    // Jump Passes
    'pass-60': {
      id: 'pass-60',
      name: '60-Minute Open Jump Pass',
      category: 'Jump Passes',
      type: 'Hourly Pass',
      price: 18.00,
      duration: '60 Minutes',
      icon: '🎟️',
      description: 'Full park access to trampolines, foam pits & ninja course for 60 minutes.',
      image: 'assets/images/attractions/mega-trampoline-arena.jpg'
    },
    'pass-90': {
      id: 'pass-90',
      name: '90-Minute Sweet Spot Pass',
      category: 'Jump Passes',
      type: 'Hourly Pass',
      price: 24.00,
      duration: '90 Minutes',
      icon: '🎟️',
      description: 'Our most popular session. 90 minutes of high-flying adventure with free grip socks.',
      image: 'assets/images/attractions/mega-trampoline-arena.jpg'
    },
    'pass-120': {
      id: 'pass-120',
      name: '2-Hour All-Access Pass',
      category: 'Jump Passes',
      type: 'Hourly Pass',
      price: 28.00,
      duration: '120 Minutes',
      icon: '⚡',
      description: 'Two full hours of unlimited jumping, ninja challenges, and climbing walls.',
      image: 'assets/images/attractions/ninja-warrior-course.jpg'
    },
    'pass-allday': {
      id: 'pass-allday',
      name: 'All-Day Unlimited Adventure Pass',
      category: 'Jump Passes',
      type: 'Unlimited Pass',
      price: 36.00,
      duration: 'All Day (In & Out)',
      icon: '🌟',
      description: 'Unlimited in-and-out park access for the entire day with VIP lounge access.',
      image: 'assets/images/attractions/adventure-tower.jpg'
    },
    'family-4': {
      id: 'family-4',
      name: 'Family 4-Pack & Pizza Feast',
      category: 'Bundles & Specials',
      type: 'Family Bundle',
      price: 79.00,
      duration: '90 Minutes',
      guests: 4,
      icon: '👨‍👩‍👧‍👦',
      description: '4x 90-minute all-access passes, 4 pairs of ASTM grip socks, and 1 large cheese pizza.',
      image: 'assets/images/attractions/mega-trampoline-arena.jpg'
    },
    'toddler-5': {
      id: 'toddler-5',
      name: '5-Visit Toddler Morning Pass',
      category: 'Specialty Passes',
      type: 'Toddler Special',
      price: 55.00,
      duration: 'Morning Session',
      guests: 1,
      icon: '🧸',
      description: 'Dedicated soft-play and toddler trampoline sessions for ages 5 & under.',
      image: 'assets/images/attractions/little-explorers-zone.jpg'
    },
    'pass-toddler-single': {
      id: 'pass-toddler-single',
      name: 'Toddler Play Morning Session',
      category: 'Specialty Passes',
      type: 'Toddler Special',
      price: 12.00,
      duration: '120 Minutes (Tue & Thu)',
      guests: 1,
      icon: '🧸',
      description: 'Dedicated soft-play court time for jumpers aged 5 & under. Parents jump free.',
      image: 'assets/images/attractions/little-explorers-zone.jpg'
    },
    'pass-5': {
      id: 'pass-5',
      name: '5-Session Jump Punch Pass',
      category: 'Multi-Visit Passes',
      type: 'Punch Pass',
      price: 75.00,
      duration: '5 x 60 Mins',
      icon: '💳',
      description: '5 flexible 60-minute jump passes. Transferable between siblings and valid 12 months.',
      image: 'assets/images/attractions/foam-pit-challenge.jpg'
    },
    'punch-10': {
      id: 'punch-10',
      name: 'VIP 10-Jump Punch Card',
      category: 'Multi-Visit Passes',
      type: 'Punch Pass',
      price: 140.00,
      duration: '10 x 90 Mins',
      icon: '💳',
      description: '10 sessions of 90-minute jumps. Save $100 off single admission rates.',
      image: 'assets/images/attractions/mega-trampoline-arena.jpg'
    },
    'pass-20': {
      id: 'pass-20',
      name: '20-Session Season Pack',
      category: 'Multi-Visit Passes',
      type: 'Season Pack',
      price: 250.00,
      duration: '20 x 90 Mins',
      icon: '💳',
      description: 'Ultimate value for regular jumpers. Priority line entry and 15% cafe discount.',
      image: 'assets/images/attractions/parkour-jump-zone.jpg'
    },
    'vip-monthly': {
      id: 'vip-monthly',
      name: 'Monthly VIP All-Access Membership',
      category: 'Memberships',
      type: 'Monthly Pass',
      price: 69.00,
      duration: 'Unlimited (30 Days)',
      icon: '👑',
      description: 'Unlimited daily jump sessions, free grip socks, 15% cafe discount, and fast check-in.',
      image: 'assets/images/attractions/mega-trampoline-arena.jpg'
    },
    'socks': {
      id: 'addon-socks',
      name: 'PlaySpace ASTM Grip Socks',
      category: 'Safety Gear',
      type: 'Required Gear',
      price: 3.50,
      icon: '🧦',
      description: 'Official safety grip socks with non-slip traction treads. Machine washable and reusable.',
      image: 'assets/images/attractions/foam-pit-challenge.jpg'
    },

    // Birthday Party Packages
    'party-basic': {
      id: 'party-basic',
      name: 'Classic Bounce Birthday Party',
      category: 'Birthday Parties',
      type: 'Party Package',
      price: 299.00,
      duration: '2 Hours (80m Jump + 40m Suite)',
      guests: 10,
      icon: '🎂',
      description: '10 Jumpers included, private party suite, dedicated host, grip socks, invitations & setup.',
      image: 'assets/images/attractions/rainbow-ball-pit.jpg'
    },
    'party-vip': {
      id: 'party-vip',
      name: 'Glow Adventure VIP Birthday Party',
      category: 'Birthday Parties',
      type: 'VIP Party Package',
      price: 449.00,
      duration: '2.5 Hours',
      guests: 15,
      icon: '✨',
      description: '15 Jumpers, UV glow accessories, 3 artisan pizzas, arcade cards & VIP suite coordinator.',
      image: 'assets/images/attractions/neon-glow-adventure.jpg'
    },
    'party-ultimate': {
      id: 'party-ultimate',
      name: 'Ultimate Arena Takeover VIP Party',
      category: 'Birthday Parties',
      type: 'Private Arena Takeover',
      price: 699.00,
      duration: '3 Hours',
      guests: 20,
      icon: '👑',
      description: '20 Jumpers, full park access, gourmet catering, custom birthday cake & 1-Month pass gift.',
      image: 'assets/images/attractions/sky-high-rope-adventure.jpg'
    },
    'party-arcade-boost': {
      id: 'party-arcade-boost',
      name: 'Party Arcade Token Power-Up',
      category: 'Party Add-Ons',
      type: 'Add-On',
      price: 60.00,
      guests: 10,
      icon: '🕹️',
      description: '$10 in arcade gameplay tokens for every guest in your party suite.',
      image: 'assets/images/attractions/interactive-play-arena.jpg'
    },
    'party-pizza-combo': {
      id: 'party-pizza-combo',
      name: 'Artisan Pizza & Refreshments Combo',
      category: 'Party Add-Ons',
      type: 'Catering Add-On',
      price: 45.00,
      icon: '🍕',
      description: '3 large hand-tossed artisan pizzas and 2 pitchers of refreshments.',
      image: 'assets/images/attractions/mini-sports-arena.jpg'
    },

    // Group Events
    'group-school': {
      id: 'group-school',
      name: 'School & Youth Camp Field Trip',
      category: 'Group Events',
      type: 'Field Trip',
      price: 14.00,
      duration: '2 Hours',
      guests: 15,
      icon: '🚌',
      description: 'Discounted field trip pricing for schools, daycares, and youth organizations (Min 15 jumpers).',
      image: 'assets/images/attractions/super-slide-mountain.jpg'
    },
    'group-team': {
      id: 'group-team',
      name: 'Sports Team Banquet & Jump Outing',
      category: 'Group Events',
      type: 'Team Event',
      price: 16.00,
      duration: '2 Hours',
      guests: 15,
      icon: '🏆',
      description: 'Celebrate your sports season victory with arena games, team podium photo & celebration space.',
      image: 'assets/images/attractions/ninja-warrior-course.jpg'
    },
    'group-lockin': {
      id: 'group-lockin',
      name: 'Overnight Arena Lock-In Private Takeover',
      category: 'Group Events',
      type: 'Exclusive Lock-In',
      price: 1250.00,
      duration: 'Overnight / 5 Hours',
      guests: 50,
      icon: '🔒',
      description: 'Exclusive private rental of the entire 35,000 sq ft facility for up to 100 participants.',
      image: 'assets/images/attractions/sky-high-rope-adventure.jpg'
    },
    'group-stem': {
      id: 'group-stem',
      name: 'STEM "Physics of Bouncing" Workshop',
      category: 'Group Events',
      type: 'STEM Workshop',
      price: 19.00,
      duration: '2.5 Hours',
      guests: 15,
      icon: '🔬',
      description: 'Curriculum-aligned physics and kinetic energy learning module followed by 90-min open jump.',
      image: 'assets/images/attractions/interactive-play-arena.jpg'
    },

    // Individual Attractions
    'attraction-mega-trampoline-arena': {
      id: 'attraction-mega-trampoline-arena',
      name: 'Mega Trampoline Arena',
      category: 'Attractions',
      type: 'Zone Admission',
      price: 18.00,
      duration: '90 Minutes',
      icon: '🤸',
      description: 'Full access to Mega Trampoline Arena plus all 21 attractions in the trampoline park.',
      image: 'assets/images/attractions/mega-trampoline-arena.jpg'
    }
  };

  // 21 Attractions Metadata Generator
  const ATTRACTION_NAMES = {
    'mega-trampoline-arena': 'Mega Trampoline Arena',
    'ninja-warrior-course': 'Ninja Warrior Course',
    'adventure-climbing-zone': 'Adventure Climbing Zone',
    'super-slide-mountain': 'Super Slide Mountain',
    'rainbow-ball-pit': 'Rainbow Ball Pit',
    'sky-high-rope-adventure': 'Sky-High Rope Adventure',
    'foam-pit-challenge': 'Foam Pit Challenge',
    'laser-maze-mission': 'Laser Maze Mission',
    'interactive-play-arena': 'Interactive Play Arena',
    'little-explorers-zone': 'Little Explorers Zone',
    'cargo-net-climber': 'Cargo Net Climber',
    'balance-bounce-trail': 'Balance & Bounce Trail',
    'neon-glow-adventure': 'Neon Glow Adventure',
    'mini-sports-arena': 'Mini Sports Arena',
    'mystery-tunnel-quest': 'Mystery Tunnel Quest',
    'spider-wall-climb': 'Spider Wall Climb',
    'parkour-jump-zone': 'Parkour Jump Zone',
    'adventure-tower': 'Adventure Tower',
    'volcano-climb': 'Volcano Climb',
    'wipeout-challenge': 'Wipeout Challenge',
    'airbag-jump-zone': 'Airbag Jump Zone',
    'details': 'Flagship Attraction Zone'
  };

  Object.keys(ATTRACTION_NAMES).forEach(slug => {
    const key = `attraction-${slug}`;
    if (!PLAYSPACE_CATALOG[key]) {
      PLAYSPACE_CATALOG[key] = {
        id: key,
        name: ATTRACTION_NAMES[slug],
        category: 'Attractions',
        type: 'Zone Admission',
        price: 18.00,
        duration: '90 Minutes',
        icon: '🤸',
        description: `Full access to ${ATTRACTION_NAMES[slug]} plus all 21 attractions in the trampoline park.`,
        image: `assets/images/attractions/${slug === 'details' ? 'mega-trampoline-arena' : slug}.jpg`
      };
    }
  });

  class CartManager {
    constructor() {
      this.items = this.loadCart();
      this.appliedPromo = this.loadPromo();
      this.initUI();
      this.bindEvents();
      this.updateBadges();
      this.renderDrawer();
      this.renderCartPage();
    }

    loadCart() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY_LEGACY);
        const parsed = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(parsed)) return [];
        return parsed.map(item => {
          if (item && item.id) {
            const isAttraction = item.id.startsWith('attraction-') || item.category === 'Attractions';
            const cat = PLAYSPACE_CATALOG[item.id] || {};
            if (isAttraction) {
              const slug = item.id.replace(/^attraction-/, '');
              if (!item.image || item.image === 'undefined' || item.image.trim() === '') {
                item.image = cat.image || `assets/images/attractions/${slug === 'details' ? 'mega-trampoline-arena' : slug}.jpg`;
              }
              if (!item.category) item.category = 'Attractions';
              if (!item.type) item.type = 'Zone Admission';
              if (!item.icon) item.icon = cat.icon || '🤸';
              if (!item.duration) item.duration = cat.duration || '90 Minutes';
              if (!item.name && ATTRACTION_NAMES[slug]) item.name = ATTRACTION_NAMES[slug];
              if (!item.price || isNaN(item.price)) item.price = cat.price || 18.00;
            } else if (PLAYSPACE_CATALOG[item.id]) {
              if (!item.image || item.image === 'undefined' || item.image.trim() === '') {
                item.image = cat.image;
              }
              if (!item.icon) {
                item.icon = cat.icon;
              }
              if (!item.category) {
                item.category = cat.category;
              }
            }
          }
          return item;
        });
      } catch (e) {
        console.error('Failed to parse cart storage:', e);
        return [];
      }
    }

    saveCart() {
      try {
        const json = JSON.stringify(this.items);
        localStorage.setItem(STORAGE_KEY, json);
        localStorage.setItem(STORAGE_KEY_LEGACY, json);
      } catch (e) {
        console.error('Failed to save cart storage:', e);
      }
      this.updateBadges();
      this.renderDrawer();
      this.renderCartPage();
    }

    loadPromo() {
      try {
        return sessionStorage.getItem(PROMO_STORAGE_KEY) || null;
      } catch (e) {
        return null;
      }
    }

    savePromo(code) {
      this.appliedPromo = code;
      try {
        if (code) {
          sessionStorage.setItem(PROMO_STORAGE_KEY, code);
        } else {
          sessionStorage.removeItem(PROMO_STORAGE_KEY);
        }
      } catch (e) {}
      this.renderDrawer();
      this.renderCartPage();
    }

    getBasePath() {
      const path = window.location.pathname.replace(/\\/g, '/');
      if (path.includes('/pages/') || path.includes('/parent/') || path.includes('/admin/') || path.includes('/documentation/')) {
        return '../';
      }
      return '';
    }

    getImageUrl(imgPath) {
      if (!imgPath) return '';
      if (imgPath.startsWith('http://') || imgPath.startsWith('https://') || imgPath.startsWith('data:')) return imgPath;
      const clean = imgPath.replace(/\\/g, '/').replace(/^(\.\.\/)+/, '').replace(/^\//, '');
      const base = this.getBasePath();
      return base + clean;
    }

    getCartPageUrl() {
      const path = window.location.pathname.replace(/\\/g, '/');
      if (path.includes('/pages/')) {
        return 'cart.html';
      }
      if (path.includes('/parent/') || path.includes('/admin/') || path.includes('/documentation/')) {
        return '../pages/cart.html';
      }
      return 'pages/cart.html';
    }

    getCheckoutUrl() {
      const path = window.location.pathname.replace(/\\/g, '/');
      if (path.includes('/pages/')) {
        return 'booking.html';
      }
      if (path.includes('/parent/') || path.includes('/admin/') || path.includes('/documentation/')) {
        return '../pages/booking.html';
      }
      return 'pages/booking.html';
    }

    getZoneBookingUrl(item) {
      const slug = (item.id || '').replace(/^attraction-/, '');
      const filename = slug === 'details' ? 'booking-attraction-details.html' : `booking-${slug}.html`;
      const path = window.location.pathname.replace(/\\/g, '/');
      let pathPrefix = 'pages/';
      if (path.includes('/pages/')) {
        pathPrefix = '';
      } else if (path.includes('/parent/') || path.includes('/admin/') || path.includes('/documentation/')) {
        pathPrefix = '../pages/';
      }
      const params = new URLSearchParams({
        fromCart: '1',
        cartId: item.id || '',
        name: item.name || '',
        qty: (item.quantity || 1).toString(),
        price: (item.price || 18.00).toFixed(2),
        duration: item.duration || '90 Minutes'
      });
      if (item.date) params.set('date', item.date);
      if (item.time) params.set('time', item.time);
      return `${pathPrefix}${filename}?${params.toString()}`;
    }

    initUI() {
      // 1. Ensure Cart Button exists in .ps-nav-actions
      this.ensureNavbarButton();

      // 2. Ensure Slide-over Drawer exists in DOM
      this.ensureDrawerDOM();
    }

    ensureNavbarButton() {
      let navBtn = document.querySelector('.ps-nav-actions .ps-cart-toggle');
      if (!navBtn) {
        const navActions = document.querySelector('.ps-nav-actions');
        if (navActions) {
          navBtn = document.createElement('button');
          navBtn.className = 'ps-cart-toggle ps-btn-icon position-relative';
          navBtn.setAttribute('type', 'button');
          navBtn.setAttribute('aria-label', 'Shopping Cart');
          navBtn.setAttribute('title', 'View Shopping Cart');
          const count = this.getTotalCount();
          navBtn.innerHTML = `
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span class="ps-cart-badge" style="display: ${count > 0 ? 'inline-flex' : 'none'};">${count}</span>
          `;

          // Insert before "Sign In" or "Book Jump" CTA or mobile toggle
          const ref = navActions.querySelector('.ps-nav-auth-btn') || navActions.querySelector('.ps-btn-primary') || navActions.querySelector('.ps-mobile-toggle');
          if (ref) {
            navActions.insertBefore(navBtn, ref);
          } else {
            navActions.appendChild(navBtn);
          }
        }
      }
    }

    ensureDrawerDOM() {
      if (document.getElementById('psCartDrawerOverlay')) return;

      const overlay = document.createElement('div');
      overlay.className = 'ps-cart-drawer-overlay';
      overlay.id = 'psCartDrawerOverlay';
      overlay.innerHTML = `
        <aside class="ps-cart-drawer" id="psCartDrawer" role="dialog" aria-modal="true" aria-label="Shopping Cart">
          <div class="ps-cart-drawer-header">
            <div class="ps-cart-header-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <h3>PlaySpace Cart</h3>
              <span class="badge-tag ps-cart-header-count" id="psDrawerItemCount">0 Items</span>
            </div>
            <button type="button" class="ps-cart-drawer-close" id="psCartDrawerClose" aria-label="Close Cart">&times;</button>
          </div>

          <div class="ps-cart-drawer-body" id="psCartDrawerBody">
            <!-- Dynamically populated -->
          </div>

          <div class="ps-cart-drawer-footer" id="psCartDrawerFooter">
            <div class="ps-cart-summary-line">
              <span>Subtotal:</span>
              <strong id="psCartSubtotal">$0.00</strong>
            </div>
            <div class="ps-cart-summary-line" id="psCartDiscountRow" style="display: none;">
              <span style="color: var(--ps-yellow);">15% Sibling / VIP Pass Discount:</span>
              <strong style="color: var(--ps-yellow);" id="psCartDiscount">-$0.00</strong>
            </div>
            <div class="ps-cart-summary-line" id="psCartDrawerPromoRow" style="display: none;">
              <span style="color: #4cd964;">Promo Discount:</span>
              <strong style="color: #4cd964;" id="psCartDrawerPromoDiscount">-$0.00</strong>
            </div>
            <div class="ps-cart-summary-total">
              <span>Estimated Total:</span>
              <span class="price" id="psCartTotal">$0.00</span>
            </div>
            <div class="ps-cart-drawer-actions">
              <a href="#" class="ps-btn ps-btn-primary ps-btn-block ps-btn-lg" id="psCartViewPageBtn">
                View Full Cart Page &rarr;
              </a>
              <button type="button" class="ps-btn ps-btn-outline ps-btn-block ps-btn-sm" id="psCartClearBtn" style="border-color: rgba(255,255,255,0.25); color: #FFFFFF;">
                Clear Cart
              </button>
            </div>
            <div class="ps-cart-security-badge">
              <span>🔒 256-Bit SSL Demo Checkout • Digital Passes &amp; Waivers Linked</span>
            </div>
          </div>
        </aside>
      `;
      document.body.appendChild(overlay);

      // Set correct link for View Full Cart Page
      const viewPageBtn = document.getElementById('psCartViewPageBtn');
      if (viewPageBtn) {
        viewPageBtn.href = this.getCartPageUrl();
      }
    }

    bindEvents() {
      // Toggle button in navbar
      document.addEventListener('click', (e) => {
        const toggle = e.target.closest('.ps-cart-toggle');
        if (toggle) {
          e.preventDefault();
          this.toggleCart();
          return;
        }

        // Close drawer button
        if (e.target.closest('#psCartDrawerClose')) {
          e.preventDefault();
          this.closeCart();
          return;
        }

        // Click on dark overlay outside drawer
        if (e.target.id === 'psCartDrawerOverlay') {
          this.closeCart();
          return;
        }

        // Quick add buttons
        const quickBtn = e.target.closest('[data-quick-key]');
        if (quickBtn) {
          e.preventDefault();
          const key = quickBtn.getAttribute('data-quick-key');
          if (PLAYSPACE_CATALOG[key]) {
            this.addItem(PLAYSPACE_CATALOG[key]);
          }
          return;
        }

        // Generic Add to Cart buttons
        const addCartBtn = e.target.closest('[data-add-cart], .ps-btn-add-cart');
        if (addCartBtn) {
          e.preventDefault();
          const rawId = addCartBtn.getAttribute('data-add-cart') || addCartBtn.getAttribute('data-id') || 'pass-90';
          const catalogItem = PLAYSPACE_CATALOG[rawId] || {};

          const item = {
            id: rawId,
            name: addCartBtn.getAttribute('data-name') || catalogItem.name || addCartBtn.textContent.replace(/[🛒+→←•]/g, '').trim() || 'PlaySpace Pass',
            price: parseFloat(addCartBtn.getAttribute('data-price')) || catalogItem.price || 18.00,
            type: addCartBtn.getAttribute('data-type') || catalogItem.type || 'Admission Pass',
            category: addCartBtn.getAttribute('data-category') || catalogItem.category || 'General Passes',
            icon: addCartBtn.getAttribute('data-icon') || catalogItem.icon || '🎟️',
            image: addCartBtn.getAttribute('data-image') || catalogItem.image || '',
            description: addCartBtn.getAttribute('data-description') || catalogItem.description || '',
            duration: addCartBtn.getAttribute('data-duration') || catalogItem.duration || '90 Minutes',
            guests: parseInt(addCartBtn.getAttribute('data-guests')) || catalogItem.guests || 1,
            date: addCartBtn.getAttribute('data-date') || '',
            time: addCartBtn.getAttribute('data-time') || ''
          };

          this.addItem(item);
          return;
        }

        // Quantity controls
        const qtyMinus = e.target.closest('[data-cart-minus]');
        if (qtyMinus) {
          e.preventDefault();
          const id = qtyMinus.getAttribute('data-cart-minus');
          this.updateQty(id, -1);
          return;
        }

        const qtyPlus = e.target.closest('[data-cart-plus]');
        if (qtyPlus) {
          e.preventDefault();
          const id = qtyPlus.getAttribute('data-cart-plus');
          this.updateQty(id, 1);
          return;
        }

        // Remove item
        const removeBtn = e.target.closest('[data-cart-remove]');
        if (removeBtn) {
          e.preventDefault();
          const id = removeBtn.getAttribute('data-cart-remove');
          this.removeItem(id);
          return;
        }

        // Clear cart buttons (drawer and cart page)
        if (e.target.id === 'psCartClearBtn' || e.target.id === 'psCartPageClearBtn') {
          e.preventDefault();
          this.clearCart();
          return;
        }

        // Proceed to Booking from Cart Page
        if (e.target.id === 'psCartPageProceedBtn') {
          e.preventDefault();
          this.handleCheckout();
          return;
        }

        // Promo code button on cart page
        if (e.target.id === 'psApplyPromoBtn') {
          e.preventDefault();
          this.applyPromoCode();
          return;
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeCart();
        }
      });

      // Sync across browser tabs
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY || e.key === STORAGE_KEY_LEGACY) {
          this.items = this.loadCart();
          this.updateBadges();
          this.renderDrawer();
          this.renderCartPage();
        }
      });
    }

    addItem(item) {
      // Normalize attraction items
      const isAttraction = (item.id && item.id.startsWith('attraction-')) || item.category === 'Attractions';
      if (isAttraction) {
        const slug = (item.id || '').replace(/^attraction-/, '');
        if (!item.category || item.category === 'General Passes' || item.category === 'Admission Pass') {
          item.category = 'Attractions';
        }
        if (!item.type || item.type === 'Admission Pass' || item.type === 'Pass') {
          item.type = 'Zone Admission';
        }
        if (!item.duration) {
          item.duration = '90 Minutes';
        }
        if (!item.image || item.image.trim() === '') {
          item.image = `assets/images/attractions/${slug === 'details' ? 'mega-trampoline-arena' : slug}.jpg`;
        }
        if ((!item.name || item.name === 'PlaySpace Pass') && ATTRACTION_NAMES[slug]) {
          item.name = ATTRACTION_NAMES[slug];
        }
        if (!item.price || isNaN(item.price)) {
          item.price = 18.00;
        }
      }

      const existing = this.items.find(i => i.id === item.id);
      let isUpdate = false;
      if (existing) {
        existing.quantity += (item.quantity || 1);
        if (!existing.image && item.image) existing.image = item.image;
        if (!existing.icon && item.icon) existing.icon = item.icon;
        if (isAttraction) {
          existing.category = 'Attractions';
          existing.type = 'Zone Admission';
          if (!existing.duration) existing.duration = item.duration || '90 Minutes';
        }
        isUpdate = true;
      } else {
        // Resolve from catalog if some metadata is missing
        const catalog = PLAYSPACE_CATALOG[item.id] || {};
        this.items.push({
          id: item.id,
          name: item.name || catalog.name || 'PlaySpace Pass',
          price: parseFloat(item.price) || catalog.price || 0,
          quantity: item.quantity || 1,
          category: item.category || catalog.category || 'Admission Pass',
          type: item.type || catalog.type || 'Pass',
          icon: item.icon || catalog.icon || '🎟️',
          image: item.image || catalog.image || '',
          description: item.description || catalog.description || '',
          duration: item.duration || catalog.duration || '90 Minutes',
          guests: item.guests || catalog.guests || 1,
          date: item.date || '',
          time: item.time || ''
        });
      }

      this.saveCart();
      this.bumpBadges();

      const toastMessage = isUpdate
        ? `✓ Updated "${item.name}" quantity (${existing.quantity}) in Cart!`
        : `✓ Added "${item.name}" to Cart!`;

      if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
        window.PlaySpaceComponents.showToast(toastMessage, 'success');
      }

      // If user is NOT already on the dedicated cart page, open drawer for instant feedback
      const isCartPage = window.location.pathname.includes('cart.html');
      if (!isCartPage) {
        this.openCart();
      }
    }

    removeItem(id) {
      const item = this.items.find(i => i.id === id);
      this.items = this.items.filter(i => i.id !== id);
      this.saveCart();

      if (item && window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
        window.PlaySpaceComponents.showToast(`Removed "${item.name}" from Cart.`, 'info');
      }
    }

    updateQty(id, delta) {
      const item = this.items.find(i => i.id === id);
      if (!item) return;

      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeItem(id);
      } else {
        this.saveCart();
      }
    }

    clearCart() {
      if (this.items.length === 0) return;
      this.items = [];
      this.saveCart();

      if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
        window.PlaySpaceComponents.showToast('PlaySpace Cart has been emptied.', 'info');
      }
    }

    getTotalCount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getTotals() {
      const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const totalCount = this.getTotalCount();

      // Sibling / VIP Multi-Ticket discount: 15% off when 2 or more passes/tickets are ordered
      let discount = 0;
      if (totalCount >= 2 && subtotal >= 30) {
        discount = subtotal * 0.15;
      }

      // Promo discount
      let promoDiscount = 0;
      if (this.appliedPromo) {
        const p = this.appliedPromo.toUpperCase();
        if (p === 'VIP10' || p === 'PLAY10') {
          promoDiscount = (subtotal - discount) * 0.10;
        } else if (p === 'SIBLING' || p === 'FAMILY') {
          promoDiscount = (subtotal - discount) * 0.15;
        }
      }

      const total = Math.max(0, subtotal - discount - promoDiscount);
      return { subtotal, discount, promoDiscount, total };
    }

    applyPromoCode() {
      const input = document.getElementById('psPromoInput');
      const msgEl = document.getElementById('psPromoMessage');
      if (!input) return;

      const code = input.value.trim().toUpperCase();
      if (!code) {
        if (msgEl) {
          msgEl.textContent = 'Please enter a promo code.';
          msgEl.style.color = '#ff4444';
          msgEl.style.display = 'block';
        }
        return;
      }

      if (code === 'VIP10' || code === 'PLAY10' || code === 'SIBLING' || code === 'FAMILY') {
        this.savePromo(code);
        if (msgEl) {
          msgEl.textContent = `✓ Promo "${code}" successfully applied!`;
          msgEl.style.color = '#4cd964';
          msgEl.style.display = 'block';
        }
        if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
          window.PlaySpaceComponents.showToast(`✓ Promo code ${code} applied!`, 'success');
        }
      } else {
        if (msgEl) {
          msgEl.textContent = 'Invalid promo code. Try VIP10 or SIBLING.';
          msgEl.style.color = '#ff4444';
          msgEl.style.display = 'block';
        }
      }
    }

    updateBadges() {
      const count = this.getTotalCount();
      document.querySelectorAll('.ps-cart-badge').forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
      });

      document.querySelectorAll('.ps-cart-badge-text').forEach(el => {
        el.textContent = count;
      });

      const headerCountEl = document.getElementById('psDrawerItemCount');
      if (headerCountEl) {
        headerCountEl.textContent = `${count} ${count === 1 ? 'Item' : 'Items'}`;
      }

      const pageCountEl = document.getElementById('psCartPageItemCount');
      if (pageCountEl) {
        pageCountEl.textContent = `${count} ${count === 1 ? 'Item' : 'Items'}`;
      }
    }

    bumpBadges() {
      document.querySelectorAll('.ps-cart-badge').forEach(badge => {
        badge.classList.remove('bump');
        void badge.offsetWidth; // trigger reflow
        badge.classList.add('bump');
      });
    }

    renderDrawer() {
      const bodyEl = document.getElementById('psCartDrawerBody');
      const footerEl = document.getElementById('psCartDrawerFooter');
      if (!bodyEl) return;

      if (this.items.length === 0) {
        bodyEl.innerHTML = `
          <div class="ps-cart-empty">
            <div class="ps-cart-empty-icon">🛒</div>
            <h4>Your Cart is Empty</h4>
            <p>Select your favorite trampoline passes, birthday packages, or grip socks to get started!</p>
            <a href="${this.getBasePath()}pages/pricing-passes.html" class="ps-btn ps-btn-primary ps-btn-sm" onclick="window.PlaySpaceCart.closeCart()">
              Browse Passes &amp; Pricing
            </a>
          </div>
        `;
        if (footerEl) footerEl.style.display = 'none';
        return;
      }

      if (footerEl) footerEl.style.display = 'flex';

      const { subtotal, discount, promoDiscount, total } = this.getTotals();

      // Render Item List
      let itemsHtml = '';
      this.items.forEach(item => {
        const itemLineTotal = (item.price * item.quantity).toFixed(2);
        const isAttraction = (item.id && item.id.startsWith('attraction-')) || item.category === 'Attractions';
        const bookingUrl = isAttraction ? this.getZoneBookingUrl(item) : '';

        itemsHtml += `
          <div class="ps-cart-item" data-cart-id="${item.id}">
            <div class="ps-cart-item-header">
              <div class="ps-cart-item-info">
                <div class="ps-cart-item-icon">${item.icon || '🎟️'}</div>
                <div class="ps-cart-item-details">
                  <strong>${item.name}</strong>
                  <span class="ps-cart-item-type">${item.type || 'Pass'} • $${item.price.toFixed(2)} each</span>
                </div>
              </div>
              <button type="button" class="ps-cart-item-remove" data-cart-remove="${item.id}" aria-label="Remove ${item.name}">&times;</button>
            </div>
            <div class="ps-cart-item-footer">
              <div class="ps-cart-qty-control">
                <button type="button" class="ps-cart-qty-btn" data-cart-minus="${item.id}" aria-label="Decrease quantity">&minus;</button>
                <span class="ps-cart-qty-value">${item.quantity}</span>
                <button type="button" class="ps-cart-qty-btn" data-cart-plus="${item.id}" aria-label="Increase quantity">&plus;</button>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                ${isAttraction ? `
                  <a href="${bookingUrl}" class="ps-btn ps-btn-primary ps-btn-xs ps-cart-drawer-book-btn" onclick="window.PlaySpaceCart.closeCart()" style="padding: 0.25rem 0.6rem; font-size: 0.75rem; font-weight: 800; text-decoration: none; border-radius: 4px; display: inline-flex; align-items: center;">
                    Book Now &rarr;
                  </a>
                ` : ''}
                <div class="ps-cart-item-price">$${itemLineTotal}</div>
              </div>
            </div>
          </div>
        `;
      });

      bodyEl.innerHTML = itemsHtml;

      // Update Summary Numbers
      const subtotalEl = document.getElementById('psCartSubtotal');
      const discountRow = document.getElementById('psCartDiscountRow');
      const discountEl = document.getElementById('psCartDiscount');
      const promoRow = document.getElementById('psCartDrawerPromoRow');
      const promoEl = document.getElementById('psCartDrawerPromoDiscount');
      const totalEl = document.getElementById('psCartTotal');

      if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

      if (discountRow && discountEl) {
        if (discount > 0) {
          discountRow.style.display = 'flex';
          discountEl.textContent = `-$${discount.toFixed(2)} (15% Multi-Ticket VIP)`;
        } else {
          discountRow.style.display = 'none';
        }
      }

      if (promoRow && promoEl) {
        if (promoDiscount > 0) {
          promoRow.style.display = 'flex';
          promoEl.textContent = `-$${promoDiscount.toFixed(2)}`;
        } else {
          promoRow.style.display = 'none';
        }
      }
    }

    renderCartPage() {
      const containerEl = document.getElementById('psCartPageItemsContainer');
      const bottomActionsEl = document.getElementById('psCartPageBottomActions');
      if (!containerEl) return;

      const { subtotal, discount, promoDiscount, total } = this.getTotals();

      if (this.items.length === 0) {
        containerEl.innerHTML = `
          <div class="ps-cart-empty-page" style="text-align: center; padding: 4rem 2rem; background: var(--ps-bg-card); border: 2px dashed var(--ps-border-color); border-radius: var(--ps-radius-xl);">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
            <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem; color: var(--ps-text-main);">Your Shopping Cart is Empty</h3>
            <p style="color: var(--ps-text-muted); max-width: 500px; margin: 0 auto 2rem auto; font-size: 1rem; line-height: 1.6;">
              Ready for high-flying fun? Explore our jump passes, birthday party packages, and world-class indoor play attractions to begin your reservation!
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="pricing-passes.html" class="ps-btn ps-btn-primary ps-btn-lg">
                🎟️ Explore Passes &amp; Pricing
              </a>
              <a href="attractions.html" class="ps-btn ps-btn-outline ps-btn-lg" style="border-color: var(--ps-border-color); color: var(--ps-text-main);">
                🏰 View All Attractions
              </a>
              <a href="birthday-parties.html" class="ps-btn ps-btn-dark ps-btn-lg">
                🎂 Birthday Packages
              </a>
            </div>
          </div>
        `;

        if (bottomActionsEl) bottomActionsEl.style.display = 'none';

        // Update Summary Card
        this.updateCartPageSummary({ subtotal: 0, discount: 0, promoDiscount: 0, total: 0, empty: true });
        return;
      }

      if (bottomActionsEl) bottomActionsEl.style.display = 'flex';

      // Render Item List for Cart Page
      let html = '<div class="ps-cart-page-list">';
      this.items.forEach(item => {
        const lineTotal = (item.price * item.quantity).toFixed(2);
        const imgUrl = item.image ? this.getImageUrl(item.image) : '';
        const itemIcon = item.icon || '🎟️';
        const isAttraction = (item.id && item.id.startsWith('attraction-')) || item.category === 'Attractions';
        const bookingUrl = isAttraction ? this.getZoneBookingUrl(item) : '';

        html += `
          <div class="ps-cart-page-item" data-cart-id="${item.id}">
            <div class="ps-cart-page-thumb">
              ${imgUrl
                ? `<img src="${imgUrl}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'; if(this.nextElementSibling){this.nextElementSibling.style.display='flex';}">
                   <div class="ps-cart-page-icon" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center;">${itemIcon}</div>`
                : `<div class="ps-cart-page-icon" style="display: flex; width: 100%; height: 100%; align-items: center; justify-content: center;">${itemIcon}</div>`
              }
            </div>

            <div class="ps-cart-page-details">
              <div class="ps-cart-page-badges">
                <span class="ps-badge" style="background: var(--ps-yellow); color: #000; font-size: 0.72rem; font-weight: 800;">${item.category || 'PlaySpace'}</span>
                <span class="ps-badge ps-badge-outline" style="font-size: 0.72rem;">${item.type || 'Admission'}</span>
                ${item.duration ? `<span class="ps-badge" style="background: rgba(255,255,255,0.1); color: var(--ps-text-main); font-size: 0.72rem;">⏱️ ${item.duration}</span>` : ''}
                ${item.guests && item.guests > 1 ? `<span class="ps-badge" style="background: rgba(255,255,255,0.1); color: var(--ps-text-main); font-size: 0.72rem;">👥 ${item.guests} Jumpers</span>` : ''}
              </div>

              <h4 class="ps-cart-page-title">${item.name}</h4>
              ${item.description ? `<p class="ps-cart-page-desc">${item.description}</p>` : ''}
              
              <div class="ps-cart-page-price-unit">
                $${item.price.toFixed(2)} each
              </div>
            </div>

            <div class="ps-cart-page-actions-col">
              <div class="ps-cart-page-qty-wrapper">
                <label style="font-size: 0.75rem; color: var(--ps-text-muted); font-weight: 700; text-transform: uppercase;">Quantity</label>
                <div class="ps-cart-qty-control">
                  <button type="button" class="ps-cart-qty-btn" data-cart-minus="${item.id}" aria-label="Decrease quantity">&minus;</button>
                  <span class="ps-cart-qty-value">${item.quantity}</span>
                  <button type="button" class="ps-cart-qty-btn" data-cart-plus="${item.id}" aria-label="Increase quantity">&plus;</button>
                </div>
              </div>

              <div class="ps-cart-page-item-total">
                <label style="font-size: 0.75rem; color: var(--ps-text-muted); font-weight: 700; text-transform: uppercase;">Subtotal</label>
                <span class="ps-cart-page-line-price">$${lineTotal}</span>
              </div>

              ${isAttraction ? `
                <a href="${bookingUrl}" class="ps-btn ps-btn-primary ps-btn-sm ps-cart-book-now-btn" style="font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 0.45rem 0.9rem; font-size: 0.85rem; width: 100%; text-decoration: none; box-sizing: border-box;">
                  Book Now &rarr;
                </a>
              ` : ''}

              <button type="button" class="ps-cart-page-remove-btn" data-cart-remove="${item.id}" title="Remove Item">
                🗑️ Remove
              </button>
            </div>
          </div>
        `;
      });
      html += '</div>';

      containerEl.innerHTML = html;
      this.updateCartPageSummary({ subtotal, discount, promoDiscount, total, empty: false });
    }

    updateCartPageSummary({ subtotal, discount, promoDiscount, total, empty }) {
      const subtotalEl = document.getElementById('psCartPageSubtotal');
      const discountRow = document.getElementById('psCartPageDiscountRow');
      const discountEl = document.getElementById('psCartPageDiscount');
      const promoRow = document.getElementById('psCartPagePromoRow');
      const promoEl = document.getElementById('psCartPagePromoDiscount');
      const promoCodeEl = document.getElementById('psAppliedPromoCode');
      const totalEl = document.getElementById('psCartPageTotal');
      const proceedBtn = document.getElementById('psCartPageProceedBtn');

      if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

      if (discountRow && discountEl) {
        if (discount > 0) {
          discountRow.style.display = 'flex';
          discountEl.textContent = `-$${discount.toFixed(2)}`;
        } else {
          discountRow.style.display = 'none';
        }
      }

      if (promoRow && promoEl) {
        if (promoDiscount > 0) {
          promoRow.style.display = 'flex';
          promoEl.textContent = `-$${promoDiscount.toFixed(2)}`;
          if (promoCodeEl) promoCodeEl.textContent = this.appliedPromo || 'VIP10';
        } else {
          promoRow.style.display = 'none';
        }
      }

      if (proceedBtn) {
        if (empty) {
          proceedBtn.classList.add('disabled');
          proceedBtn.style.pointerEvents = 'none';
          proceedBtn.style.opacity = '0.5';
          proceedBtn.removeAttribute('href');
          proceedBtn.innerHTML = 'Proceed to Booking &rarr;';
        } else {
          proceedBtn.classList.remove('disabled');
          proceedBtn.style.pointerEvents = 'auto';
          proceedBtn.style.opacity = '1';

          // Check if cart contains an attraction zone item
          const attractionItem = this.items.find(i => (i.id && i.id.startsWith('attraction-')) || i.category === 'Attractions');
          if (attractionItem) {
            proceedBtn.href = this.getZoneBookingUrl(attractionItem);
            proceedBtn.innerHTML = 'Proceed to Booking &rarr;';
          } else {
            proceedBtn.href = this.getCheckoutUrl();
            proceedBtn.innerHTML = 'Proceed to Booking &rarr;';
          }
        }
      }
    }

    openCart() {
      const overlay = document.getElementById('psCartDrawerOverlay');
      if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    closeCart() {
      const overlay = document.getElementById('psCartDrawerOverlay');
      if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    toggleCart() {
      const overlay = document.getElementById('psCartDrawerOverlay');
      if (overlay && overlay.classList.contains('active')) {
        this.closeCart();
      } else {
        this.openCart();
      }
    }

    handleCheckout() {
      if (this.items.length === 0) {
        if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
          window.PlaySpaceComponents.showToast('Please add items to your cart before proceeding to booking.', 'info');
        }
        return;
      }

      const totals = this.getTotals();
      sessionStorage.setItem('playspace_checkout_cart', JSON.stringify({
        items: this.items,
        totals: totals,
        promo: this.appliedPromo,
        timestamp: Date.now()
      }));

      this.closeCart();

      // Check if cart contains an attraction zone item
      const attractionItem = this.items.find(i => (i.id && i.id.startsWith('attraction-')) || i.category === 'Attractions');
      if (attractionItem) {
        const targetUrl = this.getZoneBookingUrl(attractionItem);
        window.location.href = targetUrl;
        return;
      }

      const targetUrl = this.getCheckoutUrl();
      window.location.href = targetUrl;
    }
  }

  // Initialize once DOM is ready
  function init() {
    window.PlaySpaceCart = new CartManager();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
