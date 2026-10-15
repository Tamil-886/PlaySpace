/**
 * PlaySpace - Navigation & Header Interactivity
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Sticky header scroll detection
  const header = document.querySelector('.ps-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.ps-mobile-toggle');
  const navMenu = document.querySelector('.ps-nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      }
    });

    // Mobile dropdown accordion
    const navItems = navMenu.querySelectorAll('.ps-nav-item');
    navItems.forEach(item => {
      const link = item.querySelector('.ps-nav-link');
      const dropdown = item.querySelector('.ps-dropdown-menu');
      if (dropdown && link) {
        link.addEventListener('click', function (e) {
          if (window.innerWidth <= 1180) {
            // If already open, let link navigate or toggle; toggle accordion
            e.preventDefault();
            item.classList.toggle('active');
          }
        });
      }
    });
  }

  // Highlight active link based on current page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.ps-nav-link, .ps-dropdown-item, .ps-sidebar-link, .ps-admin-link');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || href.endsWith('/' + currentPath))) {
      link.classList.add('active');
    }
  });
});
