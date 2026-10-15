/**
 * PlaySpace - Dedicated Jump Session Booking Flow
 * Handles:
 * - Standalone Jump Session Booking Form validation & total price calculation
 * - Dynamic timeslot selection & children counter
 * - Frontend demo booking confirmation with unique reference generation
 * - Data persistence in localStorage ('playspace_last_booking' and 'playspace_parent_bookings')
 * - Duplicate booking prevention and cart clearing
 */

(function () {
  'use strict';

  // State object
  const bookingState = {
    sessionTitle: '',
    date: '2026-10-17',
    timeSlot: '10:00 AM - 11:30 AM',
    durationVal: '90',
    durationText: '90 Minutes',
    ratePerChild: 24.00,
    childrenCount: 1,
    parentName: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '9876543210',
    totalPrice: 24.00,
    isSubmitted: false
  };

  const DURATION_RATES = {
    '60': { rate: 18.00, label: '60 Minutes' },
    '90': { rate: 24.00, label: '90 Minutes' },
    '120': { rate: 28.00, label: '120 Minutes' },
    'allday': { rate: 36.00, label: 'All-Day Unlimited' }
  };

  function calculateTotalPrice() {
    const rate = bookingState.ratePerChild || 24.00;
    const count = Math.max(1, parseInt(bookingState.childrenCount) || 1);
    const total = rate * count;
    bookingState.totalPrice = total;
    return total;
  }

  function updateSummaryDisplay() {
    calculateTotalPrice();

    const dateEl = document.getElementById('summaryDate');
    const slotEl = document.getElementById('summary-slot-text');
    const durationEl = document.getElementById('summaryDuration');
    const childrenCountEl = document.getElementById('summaryChildrenCount');
    const rateEl = document.getElementById('summaryRatePerChild');
    const totalEl = document.getElementById('summary-total-price');

    if (dateEl) {
      dateEl.textContent = formatDateNice(bookingState.date);
    }
    if (slotEl) {
      slotEl.textContent = bookingState.timeSlot;
    }
    if (durationEl) {
      durationEl.textContent = bookingState.durationText;
    }
    if (childrenCountEl) {
      const count = bookingState.childrenCount;
      childrenCountEl.textContent = `${count} ${count === 1 ? 'Child' : 'Children'}`;
    }
    if (rateEl) {
      rateEl.textContent = `$${bookingState.ratePerChild.toFixed(2)}`;
    }
    if (totalEl) {
      totalEl.textContent = `$${bookingState.totalPrice.toFixed(2)}`;
    }

    // Display session information if selected from a session or pricing card
    const sessionBanner = document.getElementById('psBookingSessionInfoBanner');
    const sessionNameEl = document.getElementById('psBookingSessionName');
    const sessionBadgeEl = document.getElementById('psBookingSessionBadge');
    const summarySessionLine = document.getElementById('summarySessionLine');
    const summarySessionText = document.getElementById('summarySessionText');

    if (bookingState.sessionTitle) {
      if (sessionBanner) sessionBanner.style.display = 'flex';
      if (sessionNameEl) sessionNameEl.textContent = bookingState.sessionTitle;
      if (sessionBadgeEl) sessionBadgeEl.textContent = `$${bookingState.ratePerChild.toFixed(2)} / child`;
      if (summarySessionLine) summarySessionLine.style.display = 'flex';
      if (summarySessionText) summarySessionText.textContent = bookingState.sessionTitle;
    }
  }

  function formatDateNice(dateString) {
    if (!dateString) return 'Oct 17, 2026';
    try {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }
    } catch (e) {}
    return dateString;
  }

  function showAlert(msg) {
    const alertBox = document.getElementById('psBookingValidationAlert');
    const alertMsg = document.getElementById('psBookingAlertMessage');
    if (alertBox && alertMsg) {
      alertMsg.textContent = msg;
      alertBox.style.display = 'block';
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      alert(msg);
    }
  }

  function hideAlert() {
    const alertBox = document.getElementById('psBookingValidationAlert');
    if (alertBox) {
      alertBox.style.display = 'none';
    }
  }

  function validateBookingForm() {
    hideAlert();

    const nameInput = document.getElementById('psBookingContactName');
    const emailInput = document.getElementById('psBookingEmail');
    const phoneInput = document.getElementById('psBookingPhone');
    const dateInput = document.getElementById('psBookingDateInput');
    const durationSelect = document.getElementById('psBookingDurationSelect');
    const timeSlotInput = document.getElementById('psBookingTimeSlot');
    const childrenInput = document.getElementById('psBookingChildrenInput');

    // Reset invalid classes
    [nameInput, emailInput, phoneInput, dateInput, durationSelect].forEach(input => {
      if (input) input.classList.remove('is-invalid');
    });

    const v = window.PlaySpaceValidation;

    // 1. Parent Name (Letters and spaces only)
    if (!nameInput) {
      showAlert('Parent or Guardian Name field is missing.');
      return false;
    }
    const nameVal = nameInput.value.trim();
    if (v) {
      const nameRes = v.validateName(nameVal, 'Parent or Guardian Name');
      if (!nameRes.valid) {
        nameInput.classList.add('is-invalid');
        nameInput.focus();
        showAlert(nameRes.message);
        return false;
      }
    } else {
      if (!nameVal || !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(nameVal)) {
        nameInput.classList.add('is-invalid');
        nameInput.focus();
        showAlert('Parent Name must contain letters and spaces only (numbers and symbols not allowed).');
        return false;
      }
    }

    // 2. Email Address (Valid format with @ and domain)
    if (!emailInput) {
      showAlert('Email Address field is missing.');
      return false;
    }
    const emailVal = emailInput.value.trim();
    if (v) {
      const emailRes = v.validateEmail(emailVal, 'Email Address');
      if (!emailRes.valid) {
        emailInput.classList.add('is-invalid');
        emailInput.focus();
        showAlert(emailRes.message);
        return false;
      }
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        emailInput.classList.add('is-invalid');
        emailInput.focus();
        showAlert('Please enter a valid Email Address (e.g. user@example.com).');
        return false;
      }
    }

    // 3. Phone Number (Exactly 10 digits)
    if (!phoneInput) {
      showAlert('Phone Number field is missing.');
      return false;
    }
    const phoneVal = phoneInput.value.trim();
    if (v) {
      const phoneRes = v.validateMobile(phoneVal, 'Phone Number');
      if (!phoneRes.valid) {
        phoneInput.classList.add('is-invalid');
        phoneInput.focus();
        showAlert(phoneRes.message);
        return false;
      }
    } else {
      const phoneDigits = phoneVal.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        phoneInput.classList.add('is-invalid');
        phoneInput.focus();
        showAlert('Phone Number must contain exactly 10 digits.');
        return false;
      }
    }

    // 4. Booking Date
    if (!dateInput || !dateInput.value) {
      if (dateInput) {
        dateInput.classList.add('is-invalid');
        dateInput.focus();
      }
      showAlert('Please select a valid Booking Date.');
      return false;
    }

    // 5. Session Duration
    if (!durationSelect || !durationSelect.value) {
      if (durationSelect) {
        durationSelect.classList.add('is-invalid');
        durationSelect.focus();
      }
      showAlert('Please select a Session Duration.');
      return false;
    }

    // 6. Time Slot
    if (!timeSlotInput || !timeSlotInput.value || timeSlotInput.value.trim() === '') {
      showAlert('Please select an Available Time Slot.');
      return false;
    }

    // 7. Number of Children
    const childrenVal = parseInt(childrenInput ? childrenInput.value : bookingState.childrenCount, 10) || 0;
    if (childrenVal < 1) {
      showAlert('Number of Children must be at least 1.');
      return false;
    }

    // Save validated state
    bookingState.parentName = nameVal;
    bookingState.email = emailVal;
    bookingState.phone = phoneVal.replace(/\D/g, '');
    bookingState.date = dateInput.value;
    bookingState.timeSlot = timeSlotInput.value.trim();
    bookingState.childrenCount = childrenVal;
    bookingState.durationVal = durationSelect.value;
    const durOpt = durationSelect.options[durationSelect.selectedIndex];
    bookingState.durationText = durOpt ? durOpt.text.split('(')[0].trim() : `${durationSelect.value} Minutes`;
    const rate = parseFloat(durOpt.getAttribute('data-rate')) || DURATION_RATES[durationSelect.value]?.rate || 24.00;
    bookingState.ratePerChild = rate;
    calculateTotalPrice();

    return true;
  }

  function handleBookingSubmission(e) {
    if (e) e.preventDefault();

    if (bookingState.isSubmitted) {
      console.warn('Booking submission already in progress.');
      return;
    }

    if (!validateBookingForm()) {
      return;
    }

    // Prevent duplicate submissions
    bookingState.isSubmitted = true;
    const submitBtn = document.getElementById('ps-btn-complete-booking');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Processing Booking...';
    }

    // Generate unique demo booking reference number
    const bookingId = 'PS-' + Math.floor(1000 + Math.random() * 9000);
    const confirmedBooking = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      sessionTitle: bookingState.sessionTitle || 'Jump Session',
      date: bookingState.date,
      timeSlot: bookingState.timeSlot,
      duration: bookingState.durationText,
      durationVal: bookingState.durationVal,
      ratePerChild: bookingState.ratePerChild,
      childrenCount: bookingState.childrenCount,
      parentName: bookingState.parentName,
      email: bookingState.email,
      phone: bookingState.phone,
      totalPrice: bookingState.totalPrice,
      totalPaid: bookingState.totalPrice,
      status: 'Confirmed (Demo)'
    };

    const sessionSchema = {
      parentName: { type: 'name', required: true, label: 'Parent Name' },
      email: { type: 'email', required: true, label: 'Email Address' },
      phone: { type: 'mobile', required: true, label: 'Phone Number' },
      date: { type: 'text', required: true, label: 'Booking Date' },
      childrenCount: { type: 'number', required: true, min: 1, max: 20, label: 'Children Count' }
    };

    // Save to localStorage with validation
    try {
      const v = window.PlaySpaceValidation;
      if (v && v.validateRecord) {
        const check = v.validateRecord(confirmedBooking, sessionSchema);
        if (!check.valid) {
          throw new Error('Security Validation Error: ' + check.errors.join('; '));
        }
      }

      localStorage.setItem('playspace_last_booking', JSON.stringify(confirmedBooking));

      // Append to parent bookings history
      const existingRaw = localStorage.getItem('playspace_parent_bookings');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      existing.unshift(confirmedBooking);
      localStorage.setItem('playspace_parent_bookings', JSON.stringify(existing));

      // Clear cart to prevent stale duplicate items
      localStorage.removeItem('playspace_cart');
      localStorage.removeItem('playspace_cart_items');
      sessionStorage.removeItem('playspace_checkout_cart');
    } catch (err) {
      console.error('Error writing booking to localStorage:', err);
      showAlert(err.message || 'Error saving booking.');
      bookingState.isSubmitted = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Confirm Booking &rarr;';
      }
      return;
    }

    // Reset any navbar cart badges to 0
    document.querySelectorAll('.ps-cart-badge').forEach(b => {
      b.textContent = '0';
      b.style.display = 'none';
    });

    // Populate the on-page success confirmation view
    const refEl = document.getElementById('successBookingRef');
    const nameEl = document.getElementById('successParentName');
    const emailEl = document.getElementById('successEmail');
    const phoneEl = document.getElementById('successPhone');
    const dateEl = document.getElementById('successDate');
    const slotEl = document.getElementById('successTimeSlot');
    const childrenEl = document.getElementById('successChildren');
    const durEl = document.getElementById('successDuration');
    const totalEl = document.getElementById('successTotal');
    const viewDetailsBtn = document.getElementById('psBtnSuccessViewDetails');
    const successSessionRow = document.getElementById('successSessionRow');
    const successSessionName = document.getElementById('successSessionName');

    if (refEl) refEl.textContent = '#' + bookingId;
    if (nameEl) nameEl.textContent = confirmedBooking.parentName;
    if (emailEl) emailEl.textContent = confirmedBooking.email;
    if (phoneEl) phoneEl.textContent = confirmedBooking.phone;
    if (dateEl) dateEl.textContent = formatDateNice(confirmedBooking.date);
    if (slotEl) slotEl.textContent = confirmedBooking.timeSlot;
    if (childrenEl) childrenEl.textContent = `${confirmedBooking.childrenCount} ${confirmedBooking.childrenCount === 1 ? 'Child' : 'Children'}`;
    if (durEl) durEl.textContent = confirmedBooking.duration;
    if (totalEl) totalEl.textContent = `$${confirmedBooking.totalPrice.toFixed(2)}`;
    if (bookingState.sessionTitle && successSessionRow && successSessionName) {
      successSessionRow.style.display = 'table-row';
      successSessionName.textContent = bookingState.sessionTitle;
    }
    if (viewDetailsBtn) viewDetailsBtn.href = `booking-confirmation.html?id=${bookingId}`;

    // Display clear success message view
    const formContainer = document.getElementById('psBookingFormContainer');
    const successView = document.getElementById('psBookingSuccessView');

    if (formContainer && successView) {
      formContainer.style.display = 'none';
      successView.style.display = 'block';
      window.scrollTo({ top: successView.offsetTop - 80, behavior: 'smooth' });
    }

    // Trigger toast notification if available
    if (window.PlaySpaceComponents && typeof window.PlaySpaceComponents.showToast === 'function') {
      window.PlaySpaceComponents.showToast('Jump Session Booking Completed Successfully!', 'success');
    }

    // Smoothly redirect to dedicated confirmation page
    setTimeout(() => {
      window.location.href = `booking-confirmation.html?id=${bookingId}`;
    }, 1200);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // 0. Parse URL Query Parameters from Book Slot buttons
    const urlParams = new URLSearchParams(window.location.search);
    const paramSession = urlParams.get('session');
    const paramTitle = urlParams.get('title') || urlParams.get('session_title') || urlParams.get('name');
    const paramPrice = urlParams.get('price') || urlParams.get('rate');
    const paramDuration = urlParams.get('duration') || urlParams.get('dur');
    const paramSlot = urlParams.get('slot') || urlParams.get('timeslot') || urlParams.get('time');
    const paramDate = urlParams.get('date');
    const paramChildren = urlParams.get('children') || urlParams.get('jumpers');

    // Determine session title if passed
    if (paramTitle || paramSession) {
      let resolvedTitle = paramTitle;
      if (!resolvedTitle) {
        if (paramSession === 'toddler') resolvedTitle = 'Toddler Gentle Morning';
        else if (paramSession === 'open-jump') resolvedTitle = 'Open Jump & Flight';
        else if (paramSession === 'ninja') resolvedTitle = 'Ninja Agility & Climbing';
        else if (paramSession === 'glow') resolvedTitle = 'Neon Blacklight Glow';
        else if (paramSession === 'family') resolvedTitle = 'Family Pizza & Bounce Package';
        else if (paramSession === 'sibling') resolvedTitle = 'Sibling Tiered Play Session';
        else resolvedTitle = paramSession.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      }
      bookingState.sessionTitle = resolvedTitle;
    }

    // Determine custom price if passed
    if (paramPrice) {
      const parsedPrice = parseFloat(paramPrice);
      if (!isNaN(parsedPrice) && parsedPrice > 0) {
        bookingState.ratePerChild = parsedPrice;
      }
    }

    // 1. Initial State from inputs & query params
    const dateInput = document.getElementById('psBookingDateInput');
    const durationSelect = document.getElementById('psBookingDurationSelect');
    const nameInput = document.getElementById('psBookingContactName');
    const emailInput = document.getElementById('psBookingEmail');
    const phoneInput = document.getElementById('psBookingPhone');
    const childrenValEl = document.getElementById('psCounterChildrenVal');
    const childrenHiddenInput = document.getElementById('psBookingChildrenInput');
    const form = document.getElementById('psJumpBookingForm');

    // Date setup
    if (dateInput) {
      if (paramDate) {
        dateInput.value = paramDate;
      } else if (!dateInput.value) {
        dateInput.value = '2026-10-17';
      }
      bookingState.date = dateInput.value;
      dateInput.addEventListener('change', function () {
        bookingState.date = this.value;
        updateSummaryDisplay();
      });
    }

    // Duration setup (auto-select or add passed duration)
    if (durationSelect) {
      if (paramDuration) {
        let matchedOpt = null;
        for (let i = 0; i < durationSelect.options.length; i++) {
          const opt = durationSelect.options[i];
          if (opt.value.toLowerCase() === paramDuration.toLowerCase() || opt.value === String(paramDuration)) {
            matchedOpt = opt;
            break;
          }
        }
        if (matchedOpt) {
          durationSelect.value = matchedOpt.value;
          bookingState.durationVal = matchedOpt.value;
          bookingState.durationText = matchedOpt.text.split('(')[0].trim();
          if (paramPrice && !isNaN(parseFloat(paramPrice))) {
            bookingState.ratePerChild = parseFloat(paramPrice);
            matchedOpt.setAttribute('data-rate', parseFloat(paramPrice).toFixed(2));
          } else {
            bookingState.ratePerChild = parseFloat(matchedOpt.getAttribute('data-rate')) || DURATION_RATES[matchedOpt.value]?.rate || 24.00;
          }
        } else {
          // Custom duration option (e.g. 180 min or all-access)
          const opt = document.createElement('option');
          opt.value = paramDuration;
          const rateVal = (paramPrice && !isNaN(parseFloat(paramPrice))) ? parseFloat(paramPrice) : 24.00;
          opt.setAttribute('data-rate', rateVal.toFixed(2));
          opt.textContent = `${paramDuration} Minutes ($${rateVal.toFixed(2)} per child)`;
          opt.selected = true;
          durationSelect.appendChild(opt);
          bookingState.durationVal = paramDuration;
          bookingState.durationText = `${paramDuration} Minutes`;
          bookingState.ratePerChild = rateVal;
        }
      } else {
        const selectedOpt = durationSelect.options[durationSelect.selectedIndex];
        if (selectedOpt) {
          bookingState.durationVal = durationSelect.value;
          bookingState.durationText = selectedOpt.text.split('(')[0].trim();
          if (!paramPrice) {
            bookingState.ratePerChild = parseFloat(selectedOpt.getAttribute('data-rate')) || 24.00;
          }
        }
      }

      durationSelect.addEventListener('change', function () {
        const opt = this.options[this.selectedIndex];
        bookingState.durationVal = this.value;
        bookingState.durationText = opt ? opt.text.split('(')[0].trim() : `${this.value} Minutes`;
        bookingState.ratePerChild = parseFloat(opt ? opt.getAttribute('data-rate') : null) || DURATION_RATES[this.value]?.rate || 24.00;
        updateSummaryDisplay();
      });

      // Replace the browser-specific native popup with a compact branded menu.
      const picker = document.createElement('div');
      picker.className = 'ps-duration-picker';
      durationSelect.parentNode.insertBefore(picker, durationSelect);
      picker.appendChild(durationSelect);

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'ps-duration-trigger';
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-label', 'Choose session duration');
      trigger.innerHTML = '<span class="ps-duration-current"></span><span class="ps-duration-chevron" aria-hidden="true"></span>';
      picker.appendChild(trigger);

      const menu = document.createElement('div');
      menu.className = 'ps-duration-menu';
      menu.setAttribute('role', 'listbox');
      menu.setAttribute('aria-label', 'Session duration options');
      picker.appendChild(menu);

      function closeDurationMenu(returnFocus) {
        picker.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        if (returnFocus) trigger.focus();
      }

      function renderDurationOptions() {
        menu.innerHTML = '';
        Array.from(durationSelect.options).forEach(function (option) {
          const item = document.createElement('button');
          item.type = 'button';
          item.className = 'ps-duration-option';
          item.setAttribute('role', 'option');
          item.setAttribute('aria-selected', option.value === durationSelect.value ? 'true' : 'false');
          const text = option.text.trim();
          const popular = /most popular/i.test(text);
          const title = text.replace(/\s*[•·-]?\s*Most Popular\s*/i, '').split('(')[0].trim();
          const price = (text.match(/\(([^)]+)\)/) || [])[1] || '';
          item.innerHTML = '<span class="ps-duration-option-copy"><span class="ps-duration-option-title"></span><span class="ps-duration-option-price"></span></span>' +
            (popular ? '<span class="ps-duration-popular">Most popular</span>' : '');
          item.querySelector('.ps-duration-option-title').textContent = title;
          item.querySelector('.ps-duration-option-price').textContent = price;
          item.addEventListener('click', function () {
            durationSelect.value = option.value;
            durationSelect.dispatchEvent(new Event('change', { bubbles: true }));
            closeDurationMenu(false);
            syncDurationPicker();
            trigger.focus();
          });
          menu.appendChild(item);
        });
      }

      function syncDurationPicker() {
        const selected = durationSelect.options[durationSelect.selectedIndex];
        trigger.querySelector('.ps-duration-current').textContent = selected ? selected.text.replace(/\s*[•·-]?\s*Most Popular\s*/i, '').trim() : 'Select a duration';
        renderDurationOptions();
      }

      trigger.addEventListener('click', function () {
        const open = !picker.classList.contains('is-open');
        picker.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', String(open));
        if (open) {
          const selectedItem = menu.querySelector('[aria-selected="true"]');
          if (selectedItem) selectedItem.focus();
        }
      });
      menu.addEventListener('keydown', function (event) {
        const items = Array.from(menu.querySelectorAll('.ps-duration-option'));
        const index = items.indexOf(document.activeElement);
        if (event.key === 'Escape') { event.preventDefault(); closeDurationMenu(true); }
        else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          const step = event.key === 'ArrowDown' ? 1 : -1;
          items[(index + step + items.length) % items.length].focus();
        }
      });
      document.addEventListener('click', function (event) {
        if (!picker.contains(event.target)) closeDurationMenu(false);
      });
      durationSelect.addEventListener('change', syncDurationPicker);
      syncDurationPicker();
    }

    // Children Stepper Counter
    const minusBtn = document.getElementById('psBtnMinusChildren');
    const plusBtn = document.getElementById('psBtnPlusChildren');

    if (paramChildren) {
      const parsedChildren = parseInt(paramChildren, 10);
      if (!isNaN(parsedChildren) && parsedChildren >= 1 && parsedChildren <= 20) {
        bookingState.childrenCount = parsedChildren;
        if (childrenValEl) childrenValEl.textContent = parsedChildren;
        if (childrenHiddenInput) childrenHiddenInput.value = parsedChildren;
      }
    }

    if (minusBtn && plusBtn && childrenValEl && childrenHiddenInput) {
      minusBtn.addEventListener('click', function () {
        let count = parseInt(childrenValEl.textContent) || 1;
        if (count > 1) {
          count--;
          childrenValEl.textContent = count;
          childrenHiddenInput.value = count;
          bookingState.childrenCount = count;
          updateSummaryDisplay();
        }
      });

      plusBtn.addEventListener('click', function () {
        let count = parseInt(childrenValEl.textContent) || 1;
        if (count < 20) {
          count++;
          childrenValEl.textContent = count;
          childrenHiddenInput.value = count;
          bookingState.childrenCount = count;
          updateSummaryDisplay();
        }
      });
    }

    // Time Slot Buttons & Grid
    const timeslotGrid = document.getElementById('psTimeslotGrid');
    const slotButtons = document.querySelectorAll('#psTimeslotGrid .ps-timeslot-btn:not(.disabled)');
    const slotHiddenInput = document.getElementById('psBookingTimeSlot');

    if (paramSlot) {
      const cleanParam = paramSlot.replace(/\s*[–—]\s*/g, ' - ').trim();
      let foundBtn = null;
      slotButtons.forEach(btn => {
        const slotVal = (btn.getAttribute('data-slot') || btn.textContent).replace(/\s*[–—]\s*/g, ' - ').trim();
        if (slotVal.toLowerCase() === cleanParam.toLowerCase() || slotVal.includes(cleanParam) || cleanParam.includes(slotVal)) {
          foundBtn = btn;
        }
      });

      if (foundBtn) {
        slotButtons.forEach(b => b.classList.remove('active'));
        foundBtn.classList.add('active');
        const slot = foundBtn.getAttribute('data-slot') || foundBtn.textContent.trim();
        bookingState.timeSlot = slot;
        if (slotHiddenInput) slotHiddenInput.value = slot;
      } else if (timeslotGrid) {
        // Create active slot button for custom timetable window
        slotButtons.forEach(b => b.classList.remove('active'));
        const newBtn = document.createElement('button');
        newBtn.type = 'button';
        newBtn.className = 'ps-timeslot-btn active';
        newBtn.setAttribute('data-slot', cleanParam);
        newBtn.textContent = cleanParam;
        timeslotGrid.insertBefore(newBtn, timeslotGrid.firstChild);
        newBtn.addEventListener('click', function () {
          document.querySelectorAll('#psTimeslotGrid .ps-timeslot-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          bookingState.timeSlot = cleanParam;
          if (slotHiddenInput) slotHiddenInput.value = cleanParam;
          updateSummaryDisplay();
        });
        bookingState.timeSlot = cleanParam;
        if (slotHiddenInput) slotHiddenInput.value = cleanParam;
      }
    }

    slotButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('#psTimeslotGrid .ps-timeslot-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const slot = this.getAttribute('data-slot') || this.textContent.trim();
        bookingState.timeSlot = slot;
        if (slotHiddenInput) slotHiddenInput.value = slot;
        updateSummaryDisplay();
      });
    });

    // Contact Inputs real-time update
    if (nameInput) {
      nameInput.addEventListener('input', function () {
        bookingState.parentName = this.value;
        this.classList.remove('is-invalid');
      });
    }
    if (emailInput) {
      emailInput.addEventListener('input', function () {
        bookingState.email = this.value;
        this.classList.remove('is-invalid');
      });
    }
    if (phoneInput) {
      phoneInput.addEventListener('input', function () {
        bookingState.phone = this.value;
        this.classList.remove('is-invalid');
      });
    }

    // Form Submission
    if (form) {
      form.addEventListener('submit', handleBookingSubmission);
    }

    const completeBtn = document.getElementById('ps-btn-complete-booking');
    if (completeBtn && form) {
      completeBtn.addEventListener('click', function (e) {
        if (form.checkValidity) {
          // Trigger form submit handler
          handleBookingSubmission(e);
        }
      });
    }

    // Initial summary render
    updateSummaryDisplay();
  });

  // Export helper for programmatic testing
  window.PlaySpaceBooking = {
    getState: () => ({ ...bookingState }),
    validate: validateBookingForm,
    submit: handleBookingSubmission,
    calculateTotal: calculateTotalPrice
  };

})();
