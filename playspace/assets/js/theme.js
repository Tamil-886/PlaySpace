/**
 * PlaySpace - Theme Switcher (Dark / Light Mode)
 * Strictly adheres to 3-Color Palette: #000000, #FFFFFF, #FFCC00
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'playspace_theme';
  const DEFAULT_THEME = 'light';

  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleButtons(theme);
    updateThemeLogos(theme);
  }

  function updateThemeLogos(theme) {
    document.querySelectorAll('.ps-brand-logo-card, .ps-brand-logo-adaptive').forEach(img => {
      if (img.classList.contains('ps-brand-logo-light') || img.classList.contains('ps-brand-logo-dark')) return;
      if (theme === 'dark') {
        img.src = img.src.replace('logo-dark.svg', 'logo.svg');
      } else {
        img.src = img.src.replace('logo.svg', 'logo-dark.svg');
      }
    });
  }

  function updateToggleButtons(theme) {
    const toggleBtns = document.querySelectorAll('.ps-theme-toggle');
    toggleBtns.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        btn.setAttribute('title', 'Switch to Light Mode');
        btn.setAttribute('aria-label', 'Switch to Light Mode');
      } else {
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        btn.setAttribute('title', 'Switch to Dark Mode');
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
      }
    });
  }

  // Initial load
  const initialTheme = getSavedTheme();
  applyTheme(initialTheme);

  document.addEventListener('DOMContentLoaded', function () {
    updateToggleButtons(getSavedTheme());

    document.querySelectorAll('.ps-theme-toggle').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    });
  });

  window.PlaySpaceTheme = {
    getTheme: getSavedTheme,
    setTheme: applyTheme
  };
})();
