/**
 * PlaySpace - Pass Wallet & Punch Pass Management
 */

(function () {
  'use strict';

  let currentPasses = [
    {
      id: 'pass_10_jump',
      name: '10-Session Punch Pass',
      totalPunches: 10,
      usedPunches: 4,
      expires: '2026-12-31',
      holder: 'Sarah Jenkins (Leo & Maya)'
    }
  ];

  function redeemPunch(passId) {
    const pass = currentPasses.find(p => p.id === passId);
    if (!pass) return;

    if (pass.usedPunches < pass.totalPunches) {
      pass.usedPunches++;
      if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
        window.PlaySpaceComponents.showToast(`Pass redeemed! ${pass.totalPunches - pass.usedPunches} jumps remaining.`);
      }
      renderPasses();
    } else {
      if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
        window.PlaySpaceComponents.showToast('All passes have been used. Please purchase a new pass.');
      }
    }
  }

  function renderPasses() {
    const container = document.getElementById('ps-passes-container');
    if (!container) return;

    container.innerHTML = currentPasses.map(pass => {
      const remaining = pass.totalPunches - pass.usedPunches;
      let punchHoles = '';
      for (let i = 1; i <= pass.totalPunches; i++) {
        const isUsed = i <= pass.usedPunches;
        punchHoles += `<div class="ps-punch-hole ${isUsed ? 'used' : ''}">${i}</div>`;
      }

      return `
        <div class="ps-pass-wallet-card">
          <div class="ps-flex-between">
            <span class="ps-badge">ACTIVE PASS</span>
            <span style="font-size:0.85rem; color:rgba(255,255,255,0.7);">Valid through ${pass.expires}</span>
          </div>
          <h3 style="color:#FFFFFF; margin-top:1rem; margin-bottom:0.25rem;">${pass.name}</h3>
          <p style="color:rgba(255,255,255,0.7); font-size:0.9rem;">Assigned to: ${pass.holder}</p>
          <div class="ps-punch-counter">
            ${punchHoles}
          </div>
          <div class="ps-flex-between" style="margin-top:1.5rem; border-top:1px solid rgba(255,255,255,0.15); padding-top:1rem;">
            <div>
              <strong style="color:#FFCC00; font-size:1.4rem;">${remaining}</strong>
              <span style="color:rgba(255,255,255,0.8); font-size:0.85rem; margin-left:6px;">Visits Remaining</span>
            </div>
            <button class="ps-btn ps-btn-primary ps-btn-sm" onclick="PlaySpacePasses.redeemPunch('${pass.id}')">
              Redeem Visit
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderPasses();
  });

  window.PlaySpacePasses = {
    redeemPunch: redeemPunch,
    renderPasses: renderPasses
  };
})();
