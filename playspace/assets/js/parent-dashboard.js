/**
 * PlaySpace - Parent Dashboard Management
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // Add Child Form Submission
    const addChildForm = document.getElementById('ps-add-child-form');
    if (addChildForm) {
      addChildForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('child-name').value;
        const dob = document.getElementById('child-dob').value;

        if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
          window.PlaySpaceComponents.showToast(`Child profile created for ${name}! Waiver linked.`);
        }

        const modal = document.getElementById('ps-modal-add-child');
        if (modal) modal.classList.remove('active');
        addChildForm.reset();
      });
    }

    // Cancel Booking Action
    const cancelBtns = document.querySelectorAll('[data-action-cancel-booking]');
    cancelBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        if (confirm('Are you sure you want to cancel this jump session? Pass credit will be refunded.')) {
          const row = this.closest('tr');
          if (row) row.remove();
          if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
            window.PlaySpaceComponents.showToast('Booking cancelled. Credit refunded to wallet.');
          }
        }
      });
    });
  });
})();
