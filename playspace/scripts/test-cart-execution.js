/**
 * PlaySpace - Cart Execution & Add to Cart End-to-End Test Suite
 */

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

console.log('--- Comprehensive Add to Cart Verification Suite ---');
let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) {
    console.log('  PASS: ' + msg);
    passed++;
  } else {
    console.error('  FAIL: ' + msg);
    failed++;
  }
}

// 1. Verify JS Syntax of cart.js
try {
  cp.execSync('node -c playspace/assets/js/cart.js');
  assert(true, 'cart.js syntax is valid with zero errors');
} catch (e) {
  assert(false, 'cart.js has syntax error: ' + e.message);
}

// 2. Mock environment to test cart.js functionality
const storage = {};
const session = {};
let toastMsg = null;
let toastType = null;

global.window = {
  location: { pathname: '/pages/attractions.html', href: '' },
  addEventListener: () => {},
  PlaySpaceComponents: {
    showToast: (m, t) => { toastMsg = m; toastType = t; }
  }
};

const domListeners = {};
global.document = {
  readyState: 'complete',
  querySelector: (sel) => {
    if (sel.includes('.ps-nav-actions')) return { appendChild: () => {}, insertBefore: () => {} };
    return null;
  },
  querySelectorAll: () => [],
  getElementById: (id) => null,
  addEventListener: (evt, fn) => {
    domListeners[evt] = fn;
  },
  createElement: (tag) => ({
    setAttribute: () => {},
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} },
    style: {}
  }),
  body: {
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} }
  }
};

global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = v; },
  removeItem: (k) => { delete storage[k]; }
};

global.sessionStorage = {
  getItem: (k) => session[k] || null,
  setItem: (k, v) => { session[k] = v; },
  removeItem: (k) => { delete session[k]; }
};

global.URLSearchParams = require('url').URLSearchParams;

const cartCode = fs.readFileSync('playspace/assets/js/cart.js', 'utf8');
eval(cartCode);

assert(typeof window.PlaySpaceCart === 'object' && window.PlaySpaceCart !== null, 'window.PlaySpaceCart is instantiated');

// 3. Test Add to Cart for all 21 attractions
const ATTRACTION_SLUGS = [
  'mega-trampoline-arena', 'ninja-warrior-course', 'adventure-climbing-zone',
  'super-slide-mountain', 'rainbow-ball-pit', 'sky-high-rope-adventure',
  'foam-pit-challenge', 'laser-maze-mission', 'interactive-play-arena',
  'little-explorers-zone', 'cargo-net-climber', 'balance-bounce-trail',
  'neon-glow-adventure', 'mini-sports-arena', 'mystery-tunnel-quest',
  'spider-wall-climb', 'parkour-jump-zone', 'adventure-tower',
  'volcano-climb', 'wipeout-challenge', 'airbag-jump-zone'
];

window.PlaySpaceCart.clearCart();
assert(window.PlaySpaceCart.getTotalCount() === 0, 'Cart starts empty');

ATTRACTION_SLUGS.forEach(slug => {
  window.PlaySpaceCart.addItem({ id: 'attraction-' + slug });
});

assert(window.PlaySpaceCart.getTotalCount() === 21, 'All 21 attraction zones successfully added to cart (count: 21)');
const stored = JSON.parse(storage['playspace_cart']);
assert(Array.isArray(stored) && stored.length === 21, 'Cart items persisted to localStorage playspace_cart (length: 21)');

// 4. Test quantity increment on duplicate add
window.PlaySpaceCart.addItem({ id: 'attraction-mega-trampoline-arena' });
assert(window.PlaySpaceCart.getTotalCount() === 22, 'Adding existing item increments quantity to 22');
const megaItem = window.PlaySpaceCart.items.find(i => i.id === 'attraction-mega-trampoline-arena');
assert(megaItem && megaItem.quantity === 2, 'Mega Trampoline Arena quantity is 2');

// 5. Test booking URL resolution
const url = window.PlaySpaceCart.getZoneBookingUrl(megaItem);
assert(url.includes('booking-mega-trampoline-arena.html'), 'Zone booking URL resolves to dedicated booking page');
assert(url.includes('fromCart=1'), 'Zone booking URL includes fromCart=1 param');
assert(url.includes('qty=2'), 'Zone booking URL passes qty=2 matching cart quantity');

// 6. Test item quantity reduction & removal
window.PlaySpaceCart.updateQty('attraction-mega-trampoline-arena', -1);
assert(megaItem.quantity === 1, 'Quantity decrements back to 1');
window.PlaySpaceCart.removeItem('attraction-mega-trampoline-arena');
assert(window.PlaySpaceCart.getTotalCount() === 20, 'Item successfully removed from cart (count: 20)');

console.log('\nResult: ' + passed + ' passed, ' + failed + ' failed.');
if (failed > 0) process.exit(1);
