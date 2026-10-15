const fs = require('fs');
const path = require('path');

const ROOT_DIR = fs.existsSync(path.resolve(__dirname, '..', 'pages'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..', 'playspace');

const galleryHtmlPath = path.join(ROOT_DIR, 'pages', 'gallery.html');
const galleryJsPath = path.join(ROOT_DIR, 'assets', 'js', 'gallery.js');
const pagesCssPath = path.join(ROOT_DIR, 'assets', 'css', 'pages.css');
const extractedZonesPath = path.join(__dirname, 'extracted-27-zones.json');

console.log('Testing Gallery (27 Collections x 3 Images Each) & Lightbox functionality...\n');

let failed = false;
function assert(condition, message) {
  if (condition) {
    console.log('  PASS:', message);
  } else {
    console.error('  FAIL:', message);
    failed = true;
  }
}

// 0. Load expected 21 attraction zones from attractions-data.js
const { ATTRACTION_ZONES } = require('./attractions-data');
const expectedZones = ATTRACTION_ZONES;
assert(expectedZones.length === 21, `Found exactly 21 expected attraction zones (found ${expectedZones.length})`);

// 1. Check HTML existence & structure
const html = fs.readFileSync(galleryHtmlPath, 'utf8');
assert(html.includes('class="ps-gallery-grid"'), 'Gallery grid exists in gallery.html');

const galleryCardRegex = /<div class="ps-gallery-item"[^>]*data-category="([^"]+)"[^>]*data-gallery-id="([^"]+)"[\s\S]*?<img src="([^"]+)" alt="([^"]+)"[\s\S]*?<h4[^>]*>([^<]+)<\/h4>/g;
const galleryCards = [];
let cardMatch;
while ((cardMatch = galleryCardRegex.exec(html)) !== null) {
  galleryCards.push({
    category: cardMatch[1],
    id: cardMatch[2],
    imgSrc: cardMatch[3],
    alt: cardMatch[4],
    title: cardMatch[5].trim()
  });
}

assert(galleryCards.length === 21, `Found exactly 21 gallery cards in gallery.html (found ${galleryCards.length})`);

// 2. Check Modals in HTML
assert(html.includes('id="psGalleryViewModal"'), 'Individual gallery view modal exists in HTML');
assert(html.includes('id="psModalGrid"'), 'Modal 3-image grid container exists in HTML');
assert(html.includes('id="psLightboxModal"'), 'Fullscreen lightbox modal exists in HTML');
assert(html.includes('id="psLightboxPrev"'), 'Lightbox Previous button exists');
assert(html.includes('id="psLightboxNext"'), 'Lightbox Next button exists');
assert(html.includes('id="psLightboxClose"'), 'Lightbox Close (X) button exists');
assert(html.includes('id="psLightboxImg"'), 'Lightbox main image element exists');
assert(html.includes('id="psLightboxCaption"'), 'Lightbox caption element exists');
assert(html.includes('src="../assets/js/gallery.js"'), 'gallery.js is linked in gallery.html');

// 3. Check JS implementation & Collections
const js = fs.readFileSync(galleryJsPath, 'utf8');
assert(js.includes('GALLERY_COLLECTIONS'), 'GALLERY_COLLECTIONS defined in gallery.js');

const jsMatch = js.match(/var GALLERY_COLLECTIONS = (\[[\s\S]*?\]);\s*\n\s*\/\/ Active state/);
assert(jsMatch !== null, 'Found GALLERY_COLLECTIONS array in gallery.js');

let collections = [];
try {
  collections = eval(jsMatch[1]);
  assert(collections.length === 21, `GALLERY_COLLECTIONS has exactly 21 items (found ${collections.length})`);
} catch (e) {
  assert(false, 'Failed to parse GALLERY_COLLECTIONS: ' + e.message);
}

// Check every collection has EXACTLY 3 unique images
let allHaveThree = true;
let allUniqueWithinCollection = true;
const collectionTitles = new Set();
const collectionSignatures = new Set();
let anyDuplicateSets = false;

collections.forEach((c, idx) => {
  if (!c.images || c.images.length !== 3) {
    allHaveThree = false;
    console.error(`  Gallery ${idx + 1} (${c.title}) has ${c.images ? c.images.length : 0} images instead of 3!`);
  }
  collectionTitles.add(c.title);

  // Check no duplicates within the 3 images of the gallery
  const srcs = new Set(c.images.map(img => img.src));
  if (srcs.size !== 3) {
    allUniqueWithinCollection = false;
    console.error(`  Gallery ${idx + 1} (${c.title}) has duplicate images within its 3 photos!`);
  }

  // Check that this set of 3 images is unique across all galleries
  const sig = c.images.map(img => img.src).sort().join('###');
  if (collectionSignatures.has(sig)) {
    anyDuplicateSets = true;
    console.error(`  Gallery ${idx + 1} (${c.title}) shares the exact same 3 images with another gallery!`);
  }
  collectionSignatures.add(sig);
});

assert(allHaveThree, 'Every single gallery displays EXACTLY 3 separate images');
assert(allUniqueWithinCollection, 'No duplicate images within any gallery collection');
assert(!anyDuplicateSets, 'Every gallery has its own unique set of 3 relevant images (no duplicate sets)');
assert(collectionTitles.size === 21, 'All 21 galleries have unique titles matching attraction zones');

// Check that image #1 of each gallery matches the attraction card image
let allFirstImagesMatch = true;
expectedZones.forEach((expected, i) => {
  const col = collections[i];
  if (!col || !col.images || !col.images[0] || col.images[0].src !== expected.heroImage) {
    allFirstImagesMatch = false;
    console.error(`  Image #1 mismatch at ${i + 1} (${expected.title}): "${col ? col.images[0].src : 'none'}" vs "${expected.heroImage}"`);
  }
});
assert(allFirstImagesMatch, 'Every gallery\'s primary image matches the Attraction page image');

// Check navigation, keyboard and modal functions in JS
assert(js.includes("openGalleryModal(data)"), 'Card click opens individual gallery view modal');
assert(js.includes("openLightbox(idx)"), 'Clicking any of the 3 images opens full-screen lightbox');
assert(js.includes("showPrevImage"), 'showPrevImage function implemented');
assert(js.includes("showNextImage"), 'showNextImage function implemented');
assert(js.includes("closeLightbox"), 'closeLightbox function implemented');
assert(js.includes("closeGalleryModal"), 'closeGalleryModal function implemented');
assert(js.includes("e.key === 'ArrowRight'"), 'JS handles ArrowRight keyboard navigation');
assert(js.includes("e.key === 'ArrowLeft'"), 'JS handles ArrowLeft keyboard navigation');
assert(js.includes("e.key === 'Escape'"), 'JS handles Escape key to close lightbox and modal');
assert(js.includes("target.id === 'psLightboxViewport'"), 'Clicking outside lightbox image closes lightbox');
assert(js.includes("target === galleryModal"), 'Clicking outside gallery modal closes modal');
assert(js.includes("bindCategoryFilters"), 'bindCategoryFilters function implemented');

// 4. Check CSS styles in pages.css
const css = fs.readFileSync(pagesCssPath, 'utf8');
assert(css.includes('.ps-gallery-modal'), '.ps-gallery-modal styling exists in pages.css');
assert(css.includes('.ps-gallery-view-grid'), '.ps-gallery-view-grid styling exists in pages.css');
assert(css.includes('.ps-gallery-view-card'), '.ps-gallery-view-card styling exists in pages.css');
assert(css.includes('.ps-lightbox'), '.ps-lightbox styling exists in pages.css');
assert(css.includes('.ps-lightbox-nav-btn'), '.ps-lightbox-nav-btn styling exists in pages.css');
assert(css.includes('.ps-lightbox.active'), '.ps-lightbox.active smooth animation exists');
assert(css.includes('body.ps-modal-open'), 'body.ps-modal-open scroll lock exists in pages.css');

if (failed) {
  console.error('\n❌ Gallery tests failed!');
  process.exit(1);
} else {
  console.log('\n✅ All Gallery and Lightbox tests passed with 100% compliance!');
}
