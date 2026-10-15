/**
 * PlaySpace - Client Authentication & Session Management
 */

(function () {
  'use strict';

  const AUTH_KEY = 'playspace_auth_session';

  function login(email, password) {
    let role = 'parent';
    let name = 'Sarah Jenkins';

    if (email && email.toLowerCase().includes('admin')) {
      role = 'admin';
      name = 'Admin Director';
    }

    const session = {
      isLoggedIn: true,
      email: email || 'sarah.jenkins@example.com',
      name: name,
      role: role,
      token: 'ps_token_' + Math.random().toString(36).substring(2)
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    updateNavbarAuth();
    return session;
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    const path = window.location.pathname.replace(/\\/g, '/');
    const isSub = path.includes('/pages/') || path.includes('/parent/') || path.includes('/admin/') || path.includes('/documentation/');
    window.location.href = isSub ? '../pages/login.html' : 'pages/login.html';
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function updateNavbarAuth() {
    const session = getSession();
    const authBtns = document.querySelectorAll('.ps-nav-auth-btn');
    const path = window.location.pathname.replace(/\\/g, '/');
    const isSub = path.includes('/pages/') || path.includes('/parent/') || path.includes('/admin/') || path.includes('/documentation/');
    const basePath = isSub ? '../' : '';

    authBtns.forEach(btn => {
      // Keep navbar auth controls visually neutral; account identity remains in
      // the authenticated dashboard and never appears in the navbar or tooltip.
      btn.textContent = 'Sign In';
      btn.href = basePath + 'pages/login.html';
      btn.classList.remove('logged-in');
      btn.removeAttribute('title');
    });

    // Personalize parent dashboard user profile if present
    const userNameEl = document.querySelector('.ps-user-info h6');
    const userRoleEl = document.querySelector('.ps-user-info span');
    const userAvatarEl = document.querySelector('.ps-dash-sidebar .ps-avatar-circle');
    const greetingEl = document.getElementById('psDashGreeting');
    const subtitleEl = document.getElementById('psDashSubtitle');

    if (userNameEl) {
      if (session && session.isLoggedIn) {
        userNameEl.textContent = session.name;
        if (userRoleEl) userRoleEl.textContent = session.role === 'admin' ? 'Facility Director' : 'VIP Family Pass Holder';
        if (userAvatarEl) {
          const initials = session.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
          userAvatarEl.textContent = initials || 'SJ';
        }
      } else {
        userNameEl.textContent = 'Sarah Jenkins';
        if (userRoleEl) userRoleEl.textContent = 'VIP Family Pass Holder';
      }
    }

    if (greetingEl) {
      if (session && session.isLoggedIn) {
        greetingEl.textContent = `Welcome Back, ${session.name.split(' ')[0]}!`;
        if (subtitleEl) subtitleEl.textContent = `Signed in as ${session.email} • Family pass status & upcoming bookings.`;
      } else {
        greetingEl.textContent = `Welcome Back, Sarah!`;
        if (subtitleEl) subtitleEl.textContent = `Here is a summary of your active passes and upcoming jump bookings.`;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateNavbarAuth();

    const loginForm = document.getElementById('ps-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const v = window.PlaySpaceValidation;
        if (v && !v.validateForm(this)) {
          return;
        }

        const emailEl = document.getElementById('login-email');
        const passEl = document.getElementById('login-password');
        const email = emailEl ? emailEl.value.trim() : '';
        const pass = passEl ? passEl.value.trim() : '';

        if (v) {
          const emailCheck = v.validateEmail(email, 'Email Address');
          if (!emailCheck.valid) {
            emailEl.classList.add('is-invalid');
            emailEl.focus();
            return;
          }
          if (!pass) {
            passEl.classList.add('is-invalid');
            passEl.focus();
            return;
          }
        }

        const session = login(email, pass);
        alert('Successfully Logged In!');
        if (window.PlaySpaceComponents && window.PlaySpaceComponents.showToast) {
          window.PlaySpaceComponents.showToast('Successfully Logged In!', 'success');
        }
      });
    }

    const logoutButtons = document.querySelectorAll('[data-action-logout]');
    logoutButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        logout();
      });
    });
  });

  window.PlaySpaceAuth = {
    login: login,
    logout: logout,
    getSession: getSession,
    updateNavbarAuth: updateNavbarAuth
  };
})();
