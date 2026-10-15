/**
 * PlaySpace - Admin Dashboard Facility Occupancy & Operations
 */

(function () {
  'use strict';

  let facilityOccupancy = {
    current: 184,
    capacity: 250
  };

  function updateOccupancyUI() {
    const currentEl = document.getElementById('occupancy-current');
    const capacityEl = document.getElementById('occupancy-capacity');
    const percentEl = document.getElementById('occupancy-percent');
    const fillEl = document.getElementById('occupancy-fill');

    if (!currentEl || !fillEl) return;

    const percent = Math.round((facilityOccupancy.current / facilityOccupancy.capacity) * 100);
    currentEl.textContent = facilityOccupancy.current;
    if (capacityEl) capacityEl.textContent = facilityOccupancy.capacity;
    if (percentEl) percentEl.textContent = percent + '%';
    fillEl.style.width = percent + '%';

    if (percent >= 90) {
      fillEl.style.backgroundColor = '#FFCC00';
      if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
        window.PlaySpaceComponents.showToast('Notice: Facility occupancy is over 90%!');
      }
    } else {
      fillEl.style.backgroundColor = '#FFCC00';
    }
  }

  function adjustOccupancy(delta) {
    facilityOccupancy.current = Math.max(0, Math.min(facilityOccupancy.capacity, facilityOccupancy.current + delta));
    updateOccupancyUI();
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateOccupancyUI();

    const checkInBtn = document.getElementById('admin-quick-checkin');
    const checkOutBtn = document.getElementById('admin-quick-checkout');

    if (checkInBtn) {
      checkInBtn.addEventListener('click', function () {
        adjustOccupancy(1);
        if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
          window.PlaySpaceComponents.showToast('Jumper checked in.');
        }
      });
    }

    if (checkOutBtn) {
      checkOutBtn.addEventListener('click', function () {
        adjustOccupancy(-1);
        if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
          window.PlaySpaceComponents.showToast('Jumper checked out.');
        }
      });
    }

    // Quick status pills in admin table
    document.querySelectorAll('[data-admin-status-btn]').forEach(btn => {
      btn.addEventListener('click', function () {
        const nextStatus = this.getAttribute('data-admin-status-btn');
        this.textContent = nextStatus;
        if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
          window.PlaySpaceComponents.showToast(`Booking marked as ${nextStatus}`);
        }
      });
    });
  });

  window.PlaySpaceAdmin = {
    adjustOccupancy: adjustOccupancy,
    getOccupancy: () => facilityOccupancy
  };
})();
