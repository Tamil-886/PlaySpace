/**
 * PlaySpace - Pricing Calculation, Pass Switcher & Interactive Calculator
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Hourly vs Membership Pricing Toggles
    const periodToggles = document.querySelectorAll('[data-pricing-toggle]');
    const priceElements = document.querySelectorAll('[data-price-hourly]');

    periodToggles.forEach(toggle => {
      toggle.addEventListener('click', function () {
        periodToggles.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const mode = this.getAttribute('data-pricing-toggle'); // 'hourly' or 'membership'

        priceElements.forEach(el => {
          if (mode === 'membership') {
            const memPrice = el.getAttribute('data-price-membership');
            if (memPrice) el.textContent = '$' + memPrice;
          } else {
            const hrPrice = el.getAttribute('data-price-hourly');
            if (hrPrice) el.textContent = '$' + hrPrice;
          }
        });
      });
    });

    // 2. Interactive Pass vs Walk-In Savings Calculator
    const calcPills = document.querySelectorAll('[data-calc-visits]');
    const walkinCostEl = document.getElementById('calc-walkin-cost');
    const passCostEl = document.getElementById('calc-pass-cost');
    const savingsEl = document.getElementById('calc-savings-amount');
    const badgeEl = document.getElementById('calc-savings-badge');

    calcPills.forEach(pill => {
      pill.addEventListener('click', function () {
        calcPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');

        const visits = parseInt(this.getAttribute('data-calc-visits') || '10', 10);
        let walkinPricePerVisit = 18.00;
        let walkinTotal = visits * walkinPricePerVisit;
        let passTotal = 0;
        let savings = 0;

        if (visits === 5) {
          passTotal = 75.00; // $15 / visit
        } else if (visits === 10) {
          passTotal = 140.00; // $14 / visit
        } else if (visits === 20) {
          passTotal = 250.00; // $12.50 / visit
        } else {
          passTotal = visits * 14.00;
        }

        savings = walkinTotal - passTotal;

        if (walkinCostEl) walkinCostEl.textContent = '$' + walkinTotal.toFixed(2);
        if (passCostEl) passCostEl.textContent = '$' + passTotal.toFixed(2);
        if (savingsEl) savingsEl.textContent = '$' + savings.toFixed(2);
        if (badgeEl) badgeEl.textContent = 'Save ' + Math.round((savings / walkinTotal) * 100) + '%';
      });
    });

    // 3. VIP Newsletter & Discount Club Subscription
    const newsletterForms = document.querySelectorAll('[data-newsletter-form]');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput) {
          const v = window.PlaySpaceValidation;
          if (v) {
            const check = v.validateEmail(emailInput.value, 'Email Address');
            if (!check.valid) {
              emailInput.classList.add('is-invalid');
              emailInput.focus();
              return;
            }
          }
          if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
            window.PlaySpaceComponents.showToast('Welcome to PlaySpace VIP Club! Check email for your 20% discount code.');
          }
          this.reset();
        }
      });
    });
  });
})();
