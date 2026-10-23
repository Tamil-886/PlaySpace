/**
 * Automated Verification: About Page Certified Staff Alignment at 1024px & General Viewports
 */
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  FAIL: ${testName}`);
    failed++;
  }
}

console.log('--- Verifying About Page Staff & Facility Alignment ---');

const aboutPath = path.join(__dirname, '../pages/about.html');
const aboutHtml = fs.readFileSync(aboutPath, 'utf8');

const pagesCssPath = path.join(__dirname, '../assets/css/pages.css');
const pagesCss = fs.readFileSync(pagesCssPath, 'utf8');

const respCssPath = path.join(__dirname, '../assets/css/responsive.css');
const respCss = fs.readFileSync(respCssPath, 'utf8');

const buildPath = path.join(__dirname, 'build-public-pages.js');
const buildJs = fs.readFileSync(buildPath, 'utf8');

// 1. Check about.html has dedicated staff card classes
assert(aboutHtml.includes('ps-about-staff-grid'), 'about.html has ps-about-staff-grid');
assert(aboutHtml.includes('ps-about-staff-card'), 'about.html has ps-about-staff-card');
assert(aboutHtml.includes('ps-about-staff-icon'), 'about.html has ps-about-staff-icon');
assert(aboutHtml.includes('ps-about-staff-header'), 'about.html has ps-about-staff-header');
assert(aboutHtml.includes('ps-about-staff-title'), 'about.html has ps-about-staff-title');
assert(aboutHtml.includes('ps-about-staff-subtitle'), 'about.html has ps-about-staff-subtitle');

// 2. Check icon circular preservation (flex-shrink: 0, min-width, min-height)
assert(pagesCss.includes('flex-shrink: 0'), 'pages.css enforces flex-shrink: 0 on staff icon');
assert(pagesCss.includes('min-width: 48px'), 'pages.css enforces min-width: 48px on staff icon');
assert(aboutHtml.includes('min-width: 48px'), 'about.html inline styles enforce min-width: 48px');

// 3. Check subtitle nowrap prevention to avoid awkward 2-line wrap
assert(pagesCss.includes('white-space: nowrap'), 'pages.css has white-space: nowrap for staff subtitle');
assert(aboutHtml.includes('white-space: nowrap'), 'about.html has white-space: nowrap for staff subtitle');

// 4. Check locked title min-height for uniform paragraph baseline
assert(pagesCss.includes('min-height: 2.85rem'), 'pages.css locks min-height: 2.85rem on staff title');
assert(pagesCss.includes('min-height: 4.5rem'), 'pages.css locks min-height: 4.5rem on staff header');

// 5. Check responsive.css has 1024px specific rules
assert(respCss.includes('.ps-about-staff-grid'), 'responsive.css styles .ps-about-staff-grid at 1024px');
assert(respCss.includes('.ps-about-staff-icon'), 'responsive.css styles .ps-about-staff-icon at 1024px');
assert(respCss.includes('.ps-about-staff-subtitle'), 'responsive.css styles .ps-about-staff-subtitle at 1024px');

// 6. Check facility feature cards alignment
assert(aboutHtml.includes('ps-facility-card'), 'about.html includes ps-facility-card');
assert(pagesCss.includes('.ps-facility-card strong'), 'pages.css styles .ps-facility-card strong with min-height');

// 7. Check build-public-pages.js synchronization
assert(buildJs.includes('ps-about-staff-grid'), 'build-public-pages.js contains ps-about-staff-grid');
assert(buildJs.includes('ps-about-staff-card'), 'build-public-pages.js contains ps-about-staff-card');
assert(buildJs.includes('ps-facility-card'), 'build-public-pages.js contains ps-facility-card');

console.log('===============================================================');
console.log(`Result: ${passed} passed, ${failed} failed.`);
console.log('===============================================================');

if (failed > 0) process.exit(1);
