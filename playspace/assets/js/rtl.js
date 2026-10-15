/**
 * PlaySpace - RTL (Right-to-Left) & LTR Switcher
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'playspace_direction';
  const DEFAULT_DIR = 'ltr';

  function getSavedDir() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_DIR;
  }

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(STORAGE_KEY, dir);
    updateLangButtons(dir);
  }

  function updateLangButtons(dir) {
    const langBtns = document.querySelectorAll('.ps-lang-toggle');
    langBtns.forEach(btn => {
      if (dir === 'rtl') {
        btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> <span>LTR</span>`;
        btn.setAttribute('title', 'Switch to Left-to-Right layout');
      } else {
        btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> <span>RTL</span>`;
        btn.setAttribute('title', 'Switch to Right-to-Left layout');
      }
    });
  }

  // Initial load
  const initialDir = getSavedDir();
  applyDir(initialDir);

  document.addEventListener('DOMContentLoaded', function () {
    updateLangButtons(getSavedDir());

    document.querySelectorAll('.ps-lang-toggle').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const currentDir = document.documentElement.getAttribute('dir') || DEFAULT_DIR;
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDir(newDir);
      });
    });
  });

  window.PlaySpaceRTL = {
    getDir: getSavedDir,
    setDir: applyDir
  };
})();
