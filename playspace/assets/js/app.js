/**
 * PlaySpace - Master Application JavaScript
 * Strict 3-Color: Black (#000000), White (#FFFFFF), Yellow (#FFCC00)
 */

(function () {
  'use strict';

  // Demo Initial Data Setup
  const DEMO_USER_KEY = 'playspace_current_user';
  const DEFAULT_USER = {
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '(555) 234-5678',
    membership: 'VIP Family Pass',
    activePasses: 8,
    children: [
      { id: 'c1', name: 'Leo Jenkins', age: 7, waiverSigned: true, birthday: '2019-04-12' },
      { id: 'c2', name: 'Maya Jenkins', age: 4, waiverSigned: true, birthday: '2022-08-25' }
    ]
  };

  if (!localStorage.getItem(DEMO_USER_KEY)) {
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(DEFAULT_USER));
  }

  // Format Helpers
  const Utils = {
    formatCurrency: function (num) {
      return '$' + Number(num).toFixed(2);
    },
    formatDate: function (dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    getUser: function () {
      return JSON.parse(localStorage.getItem(DEMO_USER_KEY) || JSON.stringify(DEFAULT_USER));
    },
    saveUser: function (userObj) {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(userObj));
    }
  };

  // Header & Footer Dynamic Component Loader (Fallback for static files)
  function initSharedComponents() {
    // If a placeholder exists for header/footer, inject standard template
    const headerPlaceholder = document.getElementById('ps-global-header');
    if (headerPlaceholder && !headerPlaceholder.hasChildNodes()) {
      // Could render dynamically if required
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSharedComponents();
  });

  window.PlaySpaceApp = {
    Utils: Utils
  };
})();
