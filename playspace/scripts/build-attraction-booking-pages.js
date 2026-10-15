const fs = require('fs');
const path = require('path');
const { ROOT_DIR, ensureDir, getPublicHeader, getPublicFooter, getCommonScripts } = require('./build-base');
const { ATTRACTION_ZONES } = require('./attractions-data');

const PAGES_DIR = path.join(ROOT_DIR, 'pages');
ensureDir(PAGES_DIR);

function renderZoneBookingPage(zone) {
  const basePath = '../';

  const html = `<!DOCTYPE html>
<html lang="en" data-theme="light" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book ${zone.title} — PlaySpace Attractions</title>
  <meta name="description" content="Reserve your session at ${zone.title}. Choose your date, timeslot, session duration, and number of children.">
  <link rel="icon" type="image/svg+xml" href="${basePath}assets/images/favicon/favicon.svg">
  <link rel="stylesheet" href="${basePath}assets/css/style.css">
</head>
<body>
  
${getPublicHeader(basePath, 'attractions')}

  <!-- Breadcrumb & Top Bar -->
  <section class="ps-page-banner" style="padding: 2.5rem 0 2rem 0; background: #000000; border-bottom: 2px solid #FFCC00;">
    <div class="ps-container">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
        <div class="ps-breadcrumb">
          <a href="../index.html">Home</a> <span class="sep">/</span> <a href="attractions.html">Attractions</a> <span class="sep">/</span> <a href="attraction-${zone.id}.html">${zone.title}</a> <span class="sep">/</span> <span>Book This Zone</span>
        </div>
        <a href="attraction-${zone.id}.html" class="ps-btn ps-btn-outline ps-btn-sm" style="border-color: #FFCC00; color: #FFCC00; display: inline-flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to ${zone.title} Details
        </a>
      </div>
      <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.5rem;">
        <span class="badge-tag">ZONE ${zone.num} RESERVATION</span>
        <span class="ps-badge" style="background-color: #FFCC00; color: #000000; font-weight: 800;">${zone.categoryLabel.toUpperCase()}</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0; font-size: 2.2rem;">Book ${zone.title}</h1>
      <p style="color: rgba(255,255,255,0.85); font-size: 1.1rem; max-width: 740px; margin: 0.75rem 0 0 0; line-height: 1.6;">
        ${zone.tagline}
      </p>
    </div>
  </section>

  <!-- Standalone Booking Section -->
  <section class="ps-section ps-booking-section">
    <div class="ps-container">

      <!-- Form Validation Error Alert -->
      <div id="psBookingValidationAlert" class="ps-alert ps-alert-danger" style="display: none; background: #fff3f3; border: 2px solid #e74c3c; border-radius: var(--ps-radius-md); padding: 1rem 1.25rem; margin-bottom: 2rem; color: #c0392b; font-weight: 700; font-size: 0.95rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 1.4rem;">⚠️</span>
          <div id="psBookingAlertMessage">Please complete all required booking fields before confirming your reservation.</div>
        </div>
      </div>

      <!-- Successful Booking Confirmation View (displayed upon successful submit) -->
      <div id="psBookingSuccessView" style="display: none; max-width: 820px; margin: 0 auto; text-align: center;">
        <div class="ps-card" style="padding: 3rem 2rem; border: 2px solid var(--ps-yellow); box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 50%; background: var(--ps-yellow); color: #000; font-size: 2.5rem; margin-bottom: 1.25rem; font-weight: 900; box-shadow: 0 0 25px rgba(255, 204, 0, 0.4);">
            ✓
          </div>
          <h2 style="font-size: 2.2rem; margin: 0 0 0.75rem 0; color: var(--ps-text-main);">Booking Completed Successfully!</h2>
          <p style="font-size: 1.15rem; color: var(--ps-text-muted); max-width: 620px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
            Your booking for <strong>${zone.title}</strong> has been booked successfully. Thank you for choosing PLAYSPACE!
          </p>

          <div style="display: inline-block; background: rgba(255, 204, 0, 0.15); border: 1.5px solid var(--ps-yellow); padding: 0.5rem 1.25rem; border-radius: 20px; margin-bottom: 2rem;">
            <span style="font-size: 0.85rem; font-weight: 800; color: var(--ps-text-muted);">BOOKING REFERENCE: </span>
            <strong id="successBookingRef" style="font-size: 1.1rem; color: var(--ps-text-main); margin-left: 0.25rem;">#PS-ZONE-7429</strong>
          </div>

          <!-- Booking Details Table -->
          <div style="border: 1px solid var(--ps-border-color); border-radius: var(--ps-radius-lg); overflow: hidden; margin-bottom: 2rem; text-align: left;">
            <table class="ps-table" style="margin: 0; width: 100%;">
              <tbody>
                <tr>
                  <th style="width: 35%; background: var(--ps-bg-card);">Selected Zone</th>
                  <td id="successZoneName">
                    <div style="display: flex; align-items: center; gap: 0.85rem;">
                      <img id="successZoneImage" src="${zone.heroImage}" alt="${zone.title}" style="width: 70px; height: 50px; object-fit: cover; border-radius: 6px; border: 1.5px solid var(--ps-yellow); flex-shrink: 0;">
                      <div>
                        <strong>${zone.title}</strong>
                        <div style="font-size: 0.8rem; color: var(--ps-text-muted);">Zone ${zone.num} &bull; ${zone.categoryLabel}</div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th style="background: var(--ps-bg-card);">Parent Name</th>
                  <td id="successParentName">Sarah Jenkins</td>
                </tr>
                <tr>
                  <th style="background: var(--ps-bg-card);">Email Address</th>
                  <td id="successEmail">sarah.jenkins@example.com</td>
                </tr>
                <tr>
                  <th style="background: var(--ps-bg-card);">Phone Number</th>
                  <td id="successPhone">(555) 234-5678</td>
                </tr>
                <tr>
                  <th style="background: var(--ps-bg-card);">Booking Date</th>
                  <td id="successDate">Saturday, Oct 17, 2026</td>
                </tr>
                <tr>
                  <th style="background: var(--ps-bg-card);">Available Time Slot</th>
                  <td id="successTimeSlot">10:00 AM - 11:30 AM</td>
                </tr>
                <tr>
                  <th style="background: var(--ps-bg-card);">Number of Children</th>
                  <td id="successChildren">1 Child</td>
                </tr>
                <tr>
                  <th style="background: var(--ps-bg-card);">Session Duration</th>
                  <td id="successDuration">90 Minutes</td>
                </tr>
                <tr>
                  <th style="background: var(--ps-bg-card); font-size: 1.1rem;">Total Price</th>
                  <td><strong id="successTotal" style="font-size: 1.3rem; color: var(--ps-yellow);">$24.00</strong> <span style="font-size: 0.85rem; color: var(--ps-text-muted);">(Demo Checkout)</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="../index.html" class="ps-btn ps-btn-primary ps-btn-lg" style="font-weight: 800;">
              🏠 Back to Home
            </a>
            <a href="attractions.html" class="ps-btn ps-btn-outline ps-btn-lg ps-btn-explore-attractions" style="border-color: var(--ps-border-color); color: var(--ps-text-main);">
              🏰 Explore All 21 Attractions
            </a>
            <button type="button" class="ps-btn ps-btn-dark ps-btn-lg" onclick="window.print()">
              🖨️ Print Confirmation
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Context Notice (shown if navigating from Cart) -->
      <div id="psCartContextBanner" style="display: none; background: rgba(255, 204, 0, 0.12); border: 1.5px solid var(--ps-yellow); border-radius: var(--ps-radius-md); padding: 0.85rem 1.25rem; margin-bottom: 1.5rem; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <span style="font-size: 1.35rem;">🛒</span>
          <div>
            <strong style="color: var(--ps-text-main);">Completing Reservation from Cart:</strong>
            <span style="color: var(--ps-text-muted); font-size: 0.9rem;"> Your selected attraction zone and children count have been loaded below.</span>
          </div>
        </div>
        <a href="cart.html" class="ps-btn ps-btn-outline ps-btn-sm" style="border-color: var(--ps-yellow); color: var(--ps-text-main); font-weight: 700; font-size: 0.8rem; padding: 0.35rem 0.85rem;">
          &larr; Return to Cart
        </a>
      </div>

      <!-- Booking Form Container -->
      <div id="psBookingFormContainer">
        <!-- Selected Zone Preview Card -->
        <div class="ps-card" style="margin-bottom: 2rem; padding: 1.5rem; border: 2px solid var(--ps-border-color); display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
          <div style="width: 140px; height: 100px; border-radius: var(--ps-radius-md); overflow: hidden; flex-shrink: 0; border: 2px solid var(--ps-yellow);">
            <img src="${zone.heroImage}" alt="${zone.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
          </div>
          <div style="flex: 1; min-width: 240px;">
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.25rem; flex-wrap: wrap;">
              <span class="ps-badge" style="background: #000; color: #FFCC00; font-weight: 800; font-size: 0.72rem;">ZONE ${zone.num} OF ${ATTRACTION_ZONES.length}</span>
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--ps-text-muted);">👶 Age: ${zone.ageGroup.split('(')[0].trim()}</span>
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--ps-text-muted);">👟 Footwear: ${zone.footwear}</span>
            </div>
            <h3 style="margin: 0 0 0.35rem 0; font-size: 1.35rem; color: var(--ps-text-main);">${zone.title}</h3>
            <p style="margin: 0; font-size: 0.88rem; color: var(--ps-text-muted); line-height: 1.5;">${zone.description}</p>
          </div>
        </div>

        <form id="psZoneBookingForm" novalidate>
          <div class="ps-booking-flow">
            
            <!-- Left Column: Booking Form Fields -->
            <div class="ps-booking-form-col">

              <!-- Section 1: Session Details -->
              <div class="ps-card" style="margin-bottom: 1.5rem; padding: 2rem;">
                <h3 style="margin-top: 0; font-size: 1.35rem; color: var(--ps-text-main); border-bottom: 2px solid var(--ps-yellow); padding-bottom: 0.65rem;">
                  1. Zone Session Details
                </h3>

                <div class="ps-grid ps-grid-2" style="margin-top: 1.25rem; gap: 1.25rem;">
                  <!-- Booking Date -->
                  <div class="ps-form-group">
                    <label class="ps-form-label" for="psBookingDateInput">Booking Date *</label>
                    <input type="date" class="ps-form-control" id="psBookingDateInput" name="bookingDate" value="2026-10-17" required>
                    <small class="text-muted" style="margin-top: 0.35rem; display: block;">Select your preferred visit date</small>
                  </div>

                  <!-- Session Duration -->
                  <div class="ps-form-group">
                    <label class="ps-form-label" for="psBookingDurationSelect">Session Duration *</label>
                    <select class="ps-form-control" id="psBookingDurationSelect" name="sessionDuration" required>
                      <option value="60" data-rate="18.00">60 Minutes ($18.00 per child)</option>
                      <option value="90" data-rate="24.00" selected>90 Minutes ($24.00 per child) &bull; Most Popular</option>
                      <option value="120" data-rate="28.00">120 Minutes ($28.00 per child)</option>
                      <option value="allday" data-rate="36.00">All-Day Unlimited ($36.00 per child)</option>
                    </select>
                    <small class="text-muted" style="margin-top: 0.35rem; display: block;">Includes access to ${zone.title} &amp; entire park</small>
                  </div>
                </div>

                <!-- Number of Children -->
                <div class="ps-form-group" style="margin-top: 1.25rem; background: var(--ps-bg-card); padding: 1.25rem; border: 1.5px solid var(--ps-border-color); border-radius: var(--ps-radius-md);">
                  <div class="ps-flex-between" style="flex-wrap: wrap; gap: 0.75rem;">
                    <div>
                      <label class="ps-form-label" style="margin: 0; font-size: 1.05rem; font-weight: 800;">Number of Children *</label>
                      <span class="text-muted" style="font-size: 0.85rem; display: block; margin-top: 0.2rem;">Age-appropriate jumpers for this zone (${zone.ageGroup.split('(')[0].trim()})</span>
                    </div>
                    <div class="ps-counter" data-counter-type="jumpers" data-min="1" data-max="20">
                      <button type="button" class="ps-counter-btn" id="psBtnMinusChildren" aria-label="Decrease children">&minus;</button>
                      <span class="ps-counter-value" id="psCounterChildrenVal">1</span>
                      <button type="button" class="ps-counter-btn" id="psBtnPlusChildren" aria-label="Increase children">&plus;</button>
                      <input type="hidden" id="psBookingChildrenInput" name="childrenCount" value="1">
                    </div>
                  </div>
                </div>

                <!-- Available Time Slot -->
                <div class="ps-form-group" style="margin-top: 1.5rem;">
                  <label class="ps-form-label" style="font-size: 1.05rem; font-weight: 800;">Available Time Slot *</label>
                  <p class="text-muted" style="font-size: 0.88rem; margin: 0.25rem 0 0.85rem 0;">Click on your preferred zone entry window:</p>
                  <div class="ps-timeslot-grid" id="psTimeslotGrid">
                    <button type="button" class="ps-timeslot-btn active" data-slot="10:00 AM - 11:30 AM">10:00 AM - 11:30 AM</button>
                    <button type="button" class="ps-timeslot-btn" data-slot="11:30 AM - 1:00 PM">11:30 AM - 1:00 PM</button>
                    <button type="button" class="ps-timeslot-btn" data-slot="1:00 PM - 2:30 PM">1:00 PM - 2:30 PM</button>
                    <button type="button" class="ps-timeslot-btn" data-slot="2:30 PM - 4:00 PM">2:30 PM - 4:00 PM</button>
                    <button type="button" class="ps-timeslot-btn" data-slot="4:00 PM - 5:30 PM">4:00 PM - 5:30 PM</button>
                    <button type="button" class="ps-timeslot-btn" data-slot="5:30 PM - 7:00 PM">5:30 PM - 7:00 PM</button>
                    <button type="button" class="ps-timeslot-btn" data-slot="7:00 PM - 8:30 PM">7:00 PM - 8:30 PM</button>
                    <button type="button" class="ps-timeslot-btn disabled" data-slot="8:30 PM">8:30 PM (Sold Out)</button>
                  </div>
                  <input type="hidden" id="psBookingTimeSlot" name="timeSlot" value="10:00 AM - 11:30 AM" required>
                </div>
              </div>

              <!-- Section 2: Parent / Contact Information -->
              <div class="ps-card" style="margin-bottom: 1.5rem; padding: 2rem;">
                <h3 style="margin-top: 0; font-size: 1.35rem; color: var(--ps-text-main); border-bottom: 2px solid var(--ps-yellow); padding-bottom: 0.65rem;">
                  2. Parent / Contact Information
                </h3>
                <p class="text-muted" style="font-size: 0.92rem; margin-top: 0.35rem;">
                  Enter your contact details to receive your digital confirmation barcode and safety waiver link.
                </p>

                <div class="ps-grid ps-grid-3" style="margin-top: 1.25rem; gap: 1rem;">
                  <!-- Parent Name -->
                  <div class="ps-form-group">
                    <label class="ps-form-label" for="psBookingContactName">Parent Name *</label>
                    <input type="text" class="ps-form-control" id="psBookingContactName" name="parentName" data-type="name" placeholder="Full Name (e.g. Ranjith Kumar)" value="Sarah Jenkins" required>
                    <div class="ps-form-error">Name must contain letters and spaces only.</div>
                  </div>

                  <!-- Email Address -->
                  <div class="ps-form-group">
                    <label class="ps-form-label" for="psBookingEmail">Email Address *</label>
                    <input type="email" class="ps-form-control" id="psBookingEmail" name="email" data-type="email" placeholder="name@example.com" value="sarah.jenkins@example.com" required>
                    <div class="ps-form-error">Valid email with @ and domain required.</div>
                  </div>

                  <!-- Phone Number -->
                  <div class="ps-form-group">
                    <label class="ps-form-label" for="psBookingPhone">Phone Number *</label>
                    <input type="tel" class="ps-form-control" id="psBookingPhone" name="phone" data-type="mobile" placeholder="9876543210" maxlength="10" value="9876543210" required>
                    <div class="ps-form-error">Phone number must contain exactly 10 digits.</div>
                  </div>
                </div>

                <!-- Special Requests -->
                <div class="ps-form-group" style="margin-top: 1.25rem;">
                  <label class="ps-form-label" for="psBookingNotes">Special Requirements or Medical Notes (Optional)</label>
                  <textarea class="ps-form-control" id="psBookingNotes" name="notes" rows="2" placeholder="Any accessibility needs, sensory sensitivities, or instructions for court marshals..."></textarea>
                </div>
              </div>

            </div>

            <!-- Right Column: Sticky Summary & Total Price -->
            <div class="ps-booking-sidebar-col">
              <aside class="ps-order-summary">
                <h3 style="color: #FFFFFF; margin-top: 0; margin-bottom: 1.25rem; border-bottom: 2px solid var(--ps-yellow); padding-bottom: 0.65rem; font-size: 1.3rem;">
                  Booking Summary
                </h3>

                <div class="ps-summary-line">
                  <span>Selected Zone:</span>
                  <strong style="color: var(--ps-yellow);">${zone.title}</strong>
                </div>

                <div class="ps-summary-line">
                  <span>Booking Date:</span>
                  <strong id="summaryDate" style="color: #FFFFFF;">Oct 17, 2026</strong>
                </div>

                <div class="ps-summary-line">
                  <span>Time Slot:</span>
                  <strong id="summary-slot-text" style="color: #FFFFFF;">10:00 AM - 11:30 AM</strong>
                </div>

                <div class="ps-summary-line">
                  <span>Session Duration:</span>
                  <strong id="summaryDuration" style="color: #FFFFFF;">90 Minutes</strong>
                </div>

                <div class="ps-summary-line">
                  <span>Number of Children:</span>
                  <strong id="summaryChildrenCount" style="color: #FFFFFF;">1 Child</strong>
                </div>

                <div class="ps-summary-line">
                  <span>Rate per Child:</span>
                  <strong id="summaryRatePerChild" style="color: var(--ps-yellow);">$24.00</strong>
                </div>

                <div class="ps-summary-total">
                  <span>Total Price:</span>
                  <span class="price" id="summary-total-price">$24.00</span>
                </div>

                <!-- Confirm Booking Button -->
                <button type="submit" id="ps-btn-complete-booking" class="ps-btn ps-btn-primary ps-btn-block ps-btn-lg" style="font-weight: 800; font-size: 1.15rem; margin-top: 1.5rem; padding: 1rem; text-align: center; justify-content: center;">
                  Confirm Zone Booking &rarr;
                </button>

                <!-- Add to Cart Option -->
                <button type="button" class="ps-btn ps-btn-outline ps-btn-block ps-btn-add-cart" data-add-cart="attraction-${zone.id}" data-name="${zone.title}" data-price="18.00" data-type="Zone Admission" data-icon="🤸" style="margin-top: 0.75rem; border: 2px solid var(--ps-yellow); color: var(--ps-yellow); font-weight: 800; padding: 0.8rem; text-align: center; justify-content: center; background: rgba(0,0,0,0.3);">
                  Add This Zone to Cart 🛒
                </button>

                <div style="margin-top: 1.25rem; font-size: 0.82rem; color: rgba(255,255,255,0.7); line-height: 1.6; text-align: center; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 1rem;">
                  🔒 Instant Zone Reservation &bull; Demo Checkout<br>
                  🛡️ ASTM F2970-20 Certified Safety Standards<br>
                  🔄 Free 72-Hour Date Rescheduling
                </div>
              </aside>
            </div>

          </div>
        </form>
      </div>

    </div>
  </section>

${getPublicFooter(basePath)}

${getCommonScripts(basePath)}

  <!-- Zone Booking Interactive Logic -->
  <script>
    (function() {
      const zoneId = ${JSON.stringify(zone.id)};
      const zoneTitle = ${JSON.stringify(zone.title)};
      const zoneHeroImage = ${JSON.stringify(zone.heroImage)};

      const form = document.getElementById('psZoneBookingForm');
      const alertBox = document.getElementById('psBookingValidationAlert');
      const alertMsg = document.getElementById('psBookingAlertMessage');
      const successView = document.getElementById('psBookingSuccessView');
      const formContainer = document.getElementById('psBookingFormContainer');
      const cartBanner = document.getElementById('psCartContextBanner');

      const dateInput = document.getElementById('psBookingDateInput');
      const durationSelect = document.getElementById('psBookingDurationSelect');
      const childrenInput = document.getElementById('psBookingChildrenInput');
      const childrenVal = document.getElementById('psCounterChildrenVal');
      const btnMinus = document.getElementById('psBtnMinusChildren');
      const btnPlus = document.getElementById('psBtnPlusChildren');
      const timeSlotInput = document.getElementById('psBookingTimeSlot');
      const timeSlotBtns = document.querySelectorAll('.ps-timeslot-btn:not(.disabled)');

      const summaryDate = document.getElementById('summaryDate');
      const summarySlot = document.getElementById('summary-slot-text');
      const summaryDuration = document.getElementById('summaryDuration');
      const summaryChildren = document.getElementById('summaryChildrenCount');
      const summaryRate = document.getElementById('summaryRatePerChild');
      const summaryTotal = document.getElementById('summary-total-price');

      let currentRate = 24.00;
      let currentDurationText = '90 Minutes';
      let childrenCount = 1;
      let isSubmitting = false;

      // Ingest query parameters & cart state
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const fromCart = urlParams.get('fromCart');
        const qtyParam = parseInt(urlParams.get('qty'), 10);
        const durationParam = (urlParams.get('duration') || '').toLowerCase();
        const dateParam = urlParams.get('date');
        const slotParam = urlParams.get('time') || urlParams.get('slot');

        if (fromCart === '1' && cartBanner) {
          cartBanner.style.display = 'flex';
        }

        // Children quantity from URL or cart
        if (!isNaN(qtyParam) && qtyParam >= 1 && qtyParam <= 20) {
          childrenCount = qtyParam;
        } else {
          try {
            const cart = JSON.parse(localStorage.getItem('playspace_cart') || '[]');
            const cartItem = cart.find(i => i && (i.id === 'attraction-' + zoneId || i.id === zoneId));
            if (cartItem && cartItem.quantity >= 1) {
              childrenCount = Math.min(20, Math.max(1, cartItem.quantity));
            }
          } catch(e) {}
        }
        childrenVal.textContent = childrenCount;
        childrenInput.value = childrenCount;

        // Session duration from URL
        if (durationParam) {
          for (let i = 0; i < durationSelect.options.length; i++) {
            const opt = durationSelect.options[i];
            const optVal = opt.value.toLowerCase();
            const optText = opt.text.toLowerCase();
            if (durationParam.includes(optVal) || optText.includes(durationParam)) {
              durationSelect.selectedIndex = i;
              break;
            }
          }
        }

        // Date from URL
        if (dateParam && /^\\d{4}-\\d{2}-\\d{2}$/.test(dateParam)) {
          dateInput.value = dateParam;
        }

        // Time slot from URL
        if (slotParam) {
          timeSlotBtns.forEach(function(btn) {
            if (btn.getAttribute('data-slot') === slotParam) {
              timeSlotBtns.forEach(function(b) { b.classList.remove('active'); });
              btn.classList.add('active');
              timeSlotInput.value = slotParam;
            }
          });
        }
      } catch(e) {
        console.warn('Parameter parsing notice:', e);
      }

      function updatePricing() {
        const selectedOpt = durationSelect.options[durationSelect.selectedIndex];
        currentRate = parseFloat(selectedOpt.getAttribute('data-rate')) || 24.00;
        currentDurationText = selectedOpt.text.split('(')[0].trim();
        const total = (currentRate * childrenCount).toFixed(2);

        summaryDuration.textContent = currentDurationText;
        summaryChildren.textContent = childrenCount + (childrenCount === 1 ? ' Child' : ' Children');
        summaryRate.textContent = '$' + currentRate.toFixed(2);
        summaryTotal.textContent = '$' + total;

        if (dateInput.value) {
          try {
            const parts = dateInput.value.split('-');
            const d = new Date(parts[0], parts[1] - 1, parts[2]);
            summaryDate.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          } catch(e) {
            summaryDate.textContent = dateInput.value;
          }
        }
      }

      durationSelect.addEventListener('change', updatePricing);
      dateInput.addEventListener('change', updatePricing);

      btnMinus.addEventListener('click', function() {
        if (childrenCount > 1) {
          childrenCount--;
          childrenVal.textContent = childrenCount;
          childrenInput.value = childrenCount;
          updatePricing();
        }
      });

      btnPlus.addEventListener('click', function() {
        if (childrenCount < 20) {
          childrenCount++;
          childrenVal.textContent = childrenCount;
          childrenInput.value = childrenCount;
          updatePricing();
        }
      });

      timeSlotBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          timeSlotBtns.forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          const slot = btn.getAttribute('data-slot');
          timeSlotInput.value = slot;
          summarySlot.textContent = slot;
        });
      });

      updatePricing();

      // Form submission & validation
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (isSubmitting) return; // Prevent duplicate submissions

        alertBox.style.display = 'none';

        const v = window.PlaySpaceValidation;
        if (v && !v.validateForm(form)) {
          showAlert('Please correct the highlighted errors before confirming your reservation.');
          return;
        }

        const name = document.getElementById('psBookingContactName').value.trim();
        const email = document.getElementById('psBookingEmail').value.trim();
        const phone = document.getElementById('psBookingPhone').value.trim();
        const date = dateInput.value;
        const slot = timeSlotInput.value;

        if (v) {
          const nameCheck = v.validateName(name, 'Parent Name');
          if (!nameCheck.valid) {
            showAlert(nameCheck.message);
            document.getElementById('psBookingContactName').focus();
            return;
          }

          const emailCheck = v.validateEmail(email, 'Email Address');
          if (!emailCheck.valid) {
            showAlert(emailCheck.message);
            document.getElementById('psBookingEmail').focus();
            return;
          }

          const phoneCheck = v.validateMobile(phone, 'Phone Number');
          if (!phoneCheck.valid) {
            showAlert(phoneCheck.message);
            document.getElementById('psBookingPhone').focus();
            return;
          }
        } else {
          if (!name || !/^[A-Za-z\\s]+$/.test(name)) {
            showAlert('Parent Name must contain letters only.');
            return;
          }
          if (!email || !email.includes('@')) {
            showAlert('Please enter a valid email address.');
            return;
          }
          if (!phone || phone.replace(/\\D/g, '').length !== 10) {
            showAlert('Phone number must contain exactly 10 digits.');
            return;
          }
        }

        if (!date) {
          showAlert('Please select your preferred booking date.');
          dateInput.focus();
          return;
        }

        if (!slot) {
          showAlert('Please select an available time slot.');
          return;
        }

        // Lock form submission to prevent duplicate orders
        isSubmitting = true;
        const submitBtn = document.getElementById('ps-btn-complete-booking');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.7';
          submitBtn.style.cursor = 'not-allowed';
          submitBtn.textContent = 'Processing Booking...';
        }

        // Generate unique booking reference
        const bookingRef = '#PS-ZONE-' + Math.floor(1000 + Math.random() * 9000);
        const totalPrice = '$' + (currentRate * childrenCount).toFixed(2);

        // Populate success view
        document.getElementById('successBookingRef').textContent = bookingRef;
        document.getElementById('successParentName').textContent = name;
        document.getElementById('successEmail').textContent = email;
        document.getElementById('successPhone').textContent = phone;
        document.getElementById('successDate').textContent = summaryDate.textContent;
        document.getElementById('successTimeSlot').textContent = slot;
        document.getElementById('successChildren').textContent = childrenCount + (childrenCount === 1 ? ' Child' : ' Children');
        document.getElementById('successDuration').textContent = currentDurationText;
        document.getElementById('successTotal').textContent = totalPrice;

        // Save booking to localStorage with schema validation
        const bookingRecord = {
          id: bookingRef,
          category: 'Attraction Zone Booking',
          zoneId: zoneId,
          zoneTitle: zoneTitle,
          zoneImage: zoneHeroImage,
          parentName: name,
          email: email,
          phone: phone.replace(/\\D/g, ''),
          date: summaryDate.textContent,
          timeSlot: slot,
          children: childrenCount,
          duration: currentDurationText,
          totalPrice: totalPrice,
          createdAt: new Date().toISOString()
        };

        const attractionSchema = {
          parentName: { type: 'name', required: true, label: 'Parent Name' },
          email: { type: 'email', required: true, label: 'Email Address' },
          phone: { type: 'mobile', required: true, label: 'Phone Number' },
          children: { type: 'number', required: true, min: 1, max: 20, label: 'Children Count' }
        };

        try {
          if (v && v.saveToStorage) {
            v.saveToStorage('playspace_attraction_bookings', bookingRecord, attractionSchema);
          } else {
            const existing = JSON.parse(localStorage.getItem('playspace_attraction_bookings') || '[]');
            existing.unshift(bookingRecord);
            localStorage.setItem('playspace_attraction_bookings', JSON.stringify(existing));
            localStorage.setItem('playspace_last_booking', JSON.stringify(bookingRecord));
          }
        } catch(err) {
          console.error('Security Validation Error:', err);
          showAlert(err.message || 'Validation error while saving booking.');
          isSubmitting = false;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
            submitBtn.textContent = 'Confirm Booking →';
          }
          return;
        }

        // Transition to confirmation view
        if (cartBanner) cartBanner.style.display = 'none';
        formContainer.style.display = 'none';
        successView.style.display = 'block';
        window.scrollTo({ top: 150, behavior: 'smooth' });
      });

      function showAlert(msg) {
        alertMsg.textContent = msg;
        alertBox.style.display = 'block';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    })();
  </script>
</body>
</html>`;

  return html;
}

// Generate booking pages for all 21 zones
let created = 0;
ATTRACTION_ZONES.forEach(zone => {
  const filename = `booking-${zone.id}.html`;
  const filePath = path.join(PAGES_DIR, filename);
  fs.writeFileSync(filePath, renderZoneBookingPage(zone), 'utf8');
  created++;
});

// Also create booking-attraction-details.html pointing to flagship
const flagshipZone = ATTRACTION_ZONES[0];
fs.writeFileSync(
  path.join(PAGES_DIR, 'booking-attraction-details.html'),
  renderZoneBookingPage(flagshipZone),
  'utf8'
);
created++;

console.log(`✓ Successfully generated ${created} Attraction Zone Booking pages in pages/`);
