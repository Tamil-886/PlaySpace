/**
 * PlaySpace - Birthday Party Reservation Flow & Customizer
 */

(function () {
  'use strict';

  const partyState = {
    package: 'VIP Glow Party',
    basePrice: 449.00,
    includedKids: 12,
    totalKids: 14,
    extraKidRate: 24.00,
    room: 'Galaxy Neon Suite',
    pizzaCount: 3,
    pizzaPrice: 18.00,
    favorsCount: 14,
    favorPrice: 6.00
  };

  function calculateTotal() {
    let extraKids = Math.max(0, partyState.totalKids - partyState.includedKids);
    let extraKidsTotal = extraKids * partyState.extraKidRate;
    let foodTotal = (partyState.pizzaCount * partyState.pizzaPrice) + (partyState.favorsCount * partyState.favorPrice);
    let total = partyState.basePrice + extraKidsTotal + foodTotal;

    const totalEl = document.getElementById('ps-party-total');
    if (totalEl) totalEl.textContent = '$' + total.toFixed(2);

    const breakdownEl = document.getElementById('ps-party-breakdown');
    if (breakdownEl) {
      breakdownEl.innerHTML = `
        <div class="ps-summary-line"><span>${partyState.package} (Base ${partyState.includedKids} Kids)</span><span>$${partyState.basePrice.toFixed(2)}</span></div>
        <div class="ps-summary-line"><span>${extraKids} Extra Jumpers ($${partyState.extraKidRate} ea)</span><span>$${extraKidsTotal.toFixed(2)}</span></div>
        <div class="ps-summary-line"><span>Pizzas &amp; Party Favors</span><span>$${foodTotal.toFixed(2)}</span></div>
      `;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const packageCards = document.querySelectorAll('[data-party-package]');
    packageCards.forEach(card => {
      card.addEventListener('click', function () {
        packageCards.forEach(c => c.classList.remove('featured'));
        this.classList.add('featured');

        partyState.package = this.getAttribute('data-party-package');
        partyState.basePrice = parseFloat(this.getAttribute('data-package-price') || '449');
        partyState.includedKids = parseInt(this.getAttribute('data-included-kids') || '12', 10);
        calculateTotal();
      });
    });

    const roomSelect = document.getElementById('ps-party-room-select');
    if (roomSelect) {
      roomSelect.addEventListener('change', function () {
        partyState.room = this.value;
      });
    }

    calculateTotal();
  });

  window.PlaySpaceParty = {
    state: partyState,
    calculateTotal: calculateTotal
  };
})();
