/**
 * PlaySpace - Interactive UI Components
 * Accordions, Tabs, Modals, Quantity Counters, Toasts
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // Accordion Toggle
    const accordionHeaders = document.querySelectorAll('.ps-accordion-header');
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function () {
        const item = this.closest('.ps-accordion-item');
        const parent = item.parentElement;

        // Optionally close other items in the same accordion group
        if (parent.dataset.behavior === 'single') {
          parent.querySelectorAll('.ps-accordion-item').forEach(other => {
            if (other !== item) other.classList.remove('active');
          });
        }
        item.classList.toggle('active');
      });
    });

    // Tab Switching
    const tabContainers = document.querySelectorAll('[data-tabs]');
    tabContainers.forEach(container => {
      const buttons = container.querySelectorAll('.ps-tab-btn');
      const tabsGroup = container.getAttribute('data-tabs');
      const contents = document.querySelectorAll(`[data-tab-content="${tabsGroup}"]`);

      buttons.forEach(btn => {
        btn.addEventListener('click', function () {
          const targetTab = this.getAttribute('data-target');

          buttons.forEach(b => b.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));

          this.classList.add('active');
          const targetEl = document.querySelector(`[data-tab-id="${targetTab}"]`);
          if (targetEl) targetEl.classList.add('active');
        });
      });
    });

    // Modals
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal-target');
        const modal = document.querySelector(modalId);
        if (modal) modal.classList.add('active');
      });
    });

    const modalCloses = document.querySelectorAll('.ps-modal-close, [data-modal-close]');
    modalCloses.forEach(btn => {
      btn.addEventListener('click', function () {
        const modal = this.closest('.ps-modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });

    document.querySelectorAll('.ps-modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', function (e) {
        if (e.target === this) {
          this.classList.remove('active');
        }
      });
    });

    // Counters (+ / -)
    const counters = document.querySelectorAll('.ps-counter');
    counters.forEach(counter => {
      const minusBtn = counter.querySelector('[data-counter-minus]');
      const plusBtn = counter.querySelector('[data-counter-plus]');
      const valueEl = counter.querySelector('.ps-counter-value');
      const min = parseInt(counter.dataset.min || '0', 10);
      const max = parseInt(counter.dataset.max || '50', 10);

      if (minusBtn && plusBtn && valueEl) {
        minusBtn.addEventListener('click', function () {
          let val = parseInt(valueEl.textContent, 10);
          if (val > min) {
            val--;
            valueEl.textContent = val;
            counter.dispatchEvent(new CustomEvent('counterChange', { detail: { value: val } }));
          }
        });

        plusBtn.addEventListener('click', function () {
          let val = parseInt(valueEl.textContent, 10);
          if (val < max) {
            val++;
            valueEl.textContent = val;
            counter.dispatchEvent(new CustomEvent('counterChange', { detail: { value: val } }));
          }
        });
      }
    });

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('psBackToTop');
    if (backToTopBtn) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add('is-visible');
        } else {
          backToTopBtn.classList.remove('is-visible');
        }
      }, { passive: true });

      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Footer VIP Newsletter Submission
    const footerNewsletter = document.getElementById('psFooterNewsletterForm');
    if (footerNewsletter) {
      footerNewsletter.addEventListener('submit', function (e) {
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
          showToast('🎉 VIP Squad code 15OFF sent to ' + emailInput.value.trim() + '!', 'success');
          this.reset();
        }
      });
    }
  });

  // Global Toast Alert Mechanism (strictly #000000, #FFFFFF, #FFCC00)
  function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('ps-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'ps-toast-container';
      toastContainer.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
      `;
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      background-color: #000000;
      color: #FFFFFF;
      border: 2px solid #FFCC00;
      border-radius: 10px;
      padding: 14px 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 12px;
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.3s ease;
    `;
    toast.innerHTML = `
      <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background-color:#FFCC00;"></span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  window.PlaySpaceComponents = {
    showToast: showToast
  };
})();
