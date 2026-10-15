const fs = require('fs');
const path = require('path');

const zones = require('./extracted-27-zones.json');

function slug(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// 1. Build GALLERY_COLLECTIONS JavaScript representation
const jsCollections = zones.map(z => {
  return `    {
      id: '${slug(z.title)}',
      num: ${z.num},
      title: ${JSON.stringify(z.title)},
      badge: ${JSON.stringify(z.badge)},
      category: '${z.category}',
      desc: ${JSON.stringify(z.desc)},
      images: [
        {
          src: '${z.imgSrc}',
          title: ${JSON.stringify(z.title)},
          caption: ${JSON.stringify(z.desc)}
        }
      ]
    }`;
}).join(',\n');

const galleryJsContent = `/**
 * PlaySpace - Interactive Gallery & Lightbox Controller
 * 
 * Features:
 * - 27 Unique Gallery Collections corresponding 100% to the 27 Attraction Zones.
 * - Exact same images and titles from Attractions page.
 * - Individual Gallery View Modal & Full-Screen Lightbox.
 * - Next/Previous arrows, Close (X), keyboard arrows (Left/Right), and Escape support.
 * - Category filter integration and smooth transitions.
 * - Seamless responsive behavior for mobile, tablet, and desktop.
 */

(function () {
  'use strict';

  // 27 Bespoke Gallery Datasets (each corresponds to one attraction zone from attractions.html)
  var GALLERY_COLLECTIONS = [
${jsCollections}
  ];

  // Active state
  var currentGallery = null;
  var currentImageIndex = 0;

  // DOM Elements
  var galleryModal = null;
  var lightbox = null;

  // Initialize once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    setupModalAndLightboxDOM();
    bindGalleryCardClicks();
    bindCategoryFilters();
    bindGlobalKeyboardEvents();
  });

  /**
   * Build Modal & Lightbox elements if not present in DOM
   */
  function setupModalAndLightboxDOM() {
    // 1. Individual Gallery View Modal
    if (!document.getElementById('psGalleryViewModal')) {
      var modalHtml = [
        '<div class="ps-gallery-modal" id="psGalleryViewModal" role="dialog" aria-modal="true" aria-labelledby="psModalTitle">',
        '  <div class="ps-gallery-modal-dialog">',
        '    <div class="ps-gallery-modal-header">',
        '      <div class="ps-gallery-modal-header-text">',
        '        <span class="ps-badge" id="psModalBadge" style="background:#FFCC00;color:#000000;font-size:0.75rem;font-weight:900;">ATTRACTION ZONE</span>',
        '        <h3 class="ps-gallery-modal-title" id="psModalTitle">Gallery Title</h3>',
        '        <p class="ps-gallery-modal-desc" id="psModalDesc">Gallery Description</p>',
        '      </div>',
        '      <button type="button" class="ps-gallery-modal-close-btn" id="psModalClose" aria-label="Close Gallery View" title="Close (Esc)">✕</button>',
        '    </div>',
        '    <div class="ps-gallery-modal-body">',
        '      <div class="ps-gallery-modal-hint">',
        '        <span>Attraction Zone Photo</span>',
        '        <span style="color:rgba(255,255,255,0.6);font-size:0.8rem;text-transform:none;">Click photo to expand fullscreen</span>',
        '      </div>',
        '      <div class="ps-gallery-view-grid" id="psModalGrid"></div>',
        '    </div>',
        '    <div class="ps-gallery-modal-footer">',
        '      <button type="button" class="ps-btn ps-btn-outline ps-btn-sm" id="psModalBackBtn" style="border-color:rgba(255,255,255,0.3);color:#FFFFFF;">',
        '        ← Back to All Galleries',
        '      </button>',
        '      <a href="../parent/book-session.html" class="ps-btn ps-btn-primary ps-btn-sm">',
        '        Book a Play Session ↗',
        '      </a>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\\n');
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // 2. Fullscreen Lightbox Modal
    if (!document.getElementById('psLightboxModal')) {
      var lightboxHtml = [
        '<div class="ps-lightbox" id="psLightboxModal" role="dialog" aria-modal="true" aria-label="Image Lightbox">',
        '  <div class="ps-lightbox-topbar">',
        '    <div class="ps-lightbox-meta">',
        '      <span class="ps-lightbox-badge" id="psLightboxBadge">ATTRACTION ZONE</span>',
        '      <span class="ps-lightbox-counter" id="psLightboxCounter">Photo 1 of 27</span>',
        '    </div>',
        '    <button type="button" class="ps-lightbox-close-btn" id="psLightboxClose" aria-label="Close Lightbox" title="Close (Esc)">✕</button>',
        '  </div>',
        '  <button type="button" class="ps-lightbox-nav-btn ps-lightbox-nav-prev" id="psLightboxPrev" aria-label="Previous Image" title="Previous (Left Arrow)">',
        '    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>',
        '  </button>',
        '  <button type="button" class="ps-lightbox-nav-btn ps-lightbox-nav-next" id="psLightboxNext" aria-label="Next Image" title="Next (Right Arrow)">',
        '    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>',
        '  </button>',
        '  <div class="ps-lightbox-viewport" id="psLightboxViewport">',
        '    <div class="ps-lightbox-image-wrap">',
        '      <img src="" alt="" class="ps-lightbox-img" id="psLightboxImg">',
        '    </div>',
        '  </div>',
        '  <div class="ps-lightbox-bottombar">',
        '    <div class="ps-lightbox-caption" id="psLightboxCaption">Image caption</div>',
        '  </div>',
        '</div>'
      ].join('\\n');
      document.body.insertAdjacentHTML('beforeend', lightboxHtml);
    }

    galleryModal = document.getElementById('psGalleryViewModal');
    lightbox = document.getElementById('psLightboxModal');

    // Bind Gallery Modal buttons
    document.getElementById('psModalClose').addEventListener('click', closeGalleryModal);
    document.getElementById('psModalBackBtn').addEventListener('click', closeGalleryModal);
    galleryModal.addEventListener('click', function (e) {
      if (e.target === galleryModal) closeGalleryModal();
    });

    // Bind Lightbox buttons
    document.getElementById('psLightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('psLightboxPrev').addEventListener('click', function (e) {
      e.stopPropagation();
      showPrevImage();
    });
    document.getElementById('psLightboxNext').addEventListener('click', function (e) {
      e.stopPropagation();
      showNextImage();
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.id === 'psLightboxViewport') closeLightbox();
    });
  }

  /**
   * Bind click event on all 27 existing .ps-gallery-item cards
   */
  function bindGalleryCardClicks() {
    var cards = document.querySelectorAll('.ps-gallery-item');
    cards.forEach(function (card, index) {
      card.style.cursor = 'pointer';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      var itemData = GALLERY_COLLECTIONS[index];
      var titleText = itemData ? itemData.title : 'Attraction Zone';
      card.setAttribute('aria-label', 'View photo of ' + titleText);

      var clickHandler = function (e) {
        e.preventDefault();
        var galleryId = card.getAttribute('data-gallery-id');
        var targetIndex = index;
        if (galleryId) {
          var foundIdx = GALLERY_COLLECTIONS.findIndex(function (g) { return g.id === galleryId; });
          if (foundIdx !== -1) targetIndex = foundIdx;
        }
        openLightbox(targetIndex);
      };

      card.addEventListener('click', clickHandler);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          clickHandler(e);
        }
      });
    });
  }

  /**
   * Open the Individual Gallery View Modal
   */
  function openGalleryModal(galleryData) {
    currentGallery = galleryData;
    var targetIndex = GALLERY_COLLECTIONS.indexOf(galleryData);
    if (targetIndex === -1) {
      targetIndex = GALLERY_COLLECTIONS.findIndex(function (g) { return g.id === galleryData.id; });
    }
    if (targetIndex !== -1) {
      openLightbox(targetIndex);
      return;
    }

    document.getElementById('psModalBadge').textContent = galleryData.badge || 'ATTRACTION ZONE';
    document.getElementById('psModalTitle').textContent = galleryData.title;
    document.getElementById('psModalDesc').textContent = galleryData.desc;

    var grid = document.getElementById('psModalGrid');
    grid.innerHTML = '';

    galleryData.images.forEach(function (img) {
      var card = document.createElement('div');
      card.className = 'ps-gallery-view-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'View photo: ' + img.title);

      card.innerHTML = [
        '<div class="ps-gallery-view-thumb">',
        '  <img src="' + img.src + '" alt="' + (img.title || 'Gallery image') + '" loading="lazy">',
        '  <div class="ps-gallery-view-zoom-hint">',
        '    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>',
        '    <span>Click to Expand</span>',
        '  </div>',
        '</div>'
      ].join('');

      card.addEventListener('click', function () {
        var foundIdx = GALLERY_COLLECTIONS.findIndex(function (g) { return g.id === galleryData.id; });
        openLightbox(foundIdx !== -1 ? foundIdx : 0);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var foundIdx = GALLERY_COLLECTIONS.findIndex(function (g) { return g.id === galleryData.id; });
          openLightbox(foundIdx !== -1 ? foundIdx : 0);
        }
      });

      grid.appendChild(card);
    });

    galleryModal.classList.add('active');
    document.body.classList.add('ps-modal-open');
    document.getElementById('psModalClose').focus();
  }

  /**
   * Close the Individual Gallery View Modal
   */
  function closeGalleryModal() {
    if (galleryModal) {
      galleryModal.classList.remove('active');
    }
    if (!lightbox || !lightbox.classList.contains('active')) {
      document.body.classList.remove('ps-modal-open');
    }
  }

  /**
   * Helper: Get active filtered indices
   */
  function getActiveIndices() {
    var activeBtn = document.querySelector('.ps-filter-btn.active');
    var filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    if (!filter || filter === 'all') {
      return GALLERY_COLLECTIONS.map(function (c, idx) { return idx; });
    }
    var indices = [];
    GALLERY_COLLECTIONS.forEach(function (c, idx) {
      if (c.category === filter) indices.push(idx);
    });
    return indices.length > 0 ? indices : GALLERY_COLLECTIONS.map(function (c, idx) { return idx; });
  }

  /**
   * Open the Full-Screen Lightbox
   */
  function openLightbox(index) {
    if (index < 0 || index >= GALLERY_COLLECTIONS.length) return;
    currentImageIndex = index;
    currentGallery = GALLERY_COLLECTIONS[currentImageIndex];
    updateLightboxContent();

    lightbox.classList.add('active');
    document.body.classList.add('ps-modal-open');
    document.getElementById('psLightboxClose').focus();
  }

  /**
   * Close the Full-Screen Lightbox
   */
  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
    }
    // Return focus to gallery modal if still open
    if (galleryModal && galleryModal.classList.contains('active')) {
      document.getElementById('psModalClose').focus();
    } else {
      document.body.classList.remove('ps-modal-open');
    }
  }

  /**
   * Update Lightbox Image and Meta
   */
  function updateLightboxContent() {
    if (!GALLERY_COLLECTIONS || GALLERY_COLLECTIONS.length === 0) return;
    var itemData = GALLERY_COLLECTIONS[currentImageIndex];
    if (!itemData) return;

    var imgEl = document.getElementById('psLightboxImg');
    var imgSrc = itemData.images && itemData.images[0] ? itemData.images[0].src : '';
    var imgTitle = itemData.title;

    // Trigger smooth fade transition
    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.96)';

    setTimeout(function () {
      imgEl.src = imgSrc;
      imgEl.alt = imgTitle;
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    }, 120);

    var activeIndices = getActiveIndices();
    var pos = activeIndices.indexOf(currentImageIndex);
    var counterText = (pos !== -1)
      ? 'Photo ' + (pos + 1) + ' of ' + activeIndices.length
      : 'Photo ' + (currentImageIndex + 1) + ' of ' + GALLERY_COLLECTIONS.length;

    document.getElementById('psLightboxBadge').textContent = itemData.badge || itemData.title;
    document.getElementById('psLightboxCounter').textContent = counterText;
    var captionEl = document.getElementById('psLightboxCaption');
    if (captionEl) {
      captionEl.textContent = itemData.title + (itemData.desc ? ' — ' + itemData.desc : '');
      captionEl.style.display = 'block';
    }
  }

  /**
   * Previous image in Lightbox
   */
  function showPrevImage() {
    var activeIndices = getActiveIndices();
    var pos = activeIndices.indexOf(currentImageIndex);
    if (pos === -1) {
      currentImageIndex = (currentImageIndex - 1 + GALLERY_COLLECTIONS.length) % GALLERY_COLLECTIONS.length;
    } else {
      var prevPos = (pos - 1 + activeIndices.length) % activeIndices.length;
      currentImageIndex = activeIndices[prevPos];
    }
    currentGallery = GALLERY_COLLECTIONS[currentImageIndex];
    updateLightboxContent();
  }

  /**
   * Next image in Lightbox
   */
  function showNextImage() {
    var activeIndices = getActiveIndices();
    var pos = activeIndices.indexOf(currentImageIndex);
    if (pos === -1) {
      currentImageIndex = (currentImageIndex + 1) % GALLERY_COLLECTIONS.length;
    } else {
      var nextPos = (pos + 1) % activeIndices.length;
      currentImageIndex = activeIndices[nextPos];
    }
    currentGallery = GALLERY_COLLECTIONS[currentImageIndex];
    updateLightboxContent();
  }

  /**
   * Global Keyboard Handling (Arrow keys, Escape)
   */
  function bindGlobalKeyboardEvents() {
    document.addEventListener('keydown', function (e) {
      // 1. Lightbox active: handle Arrows and Escape
      if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          showNextImage();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          showPrevImage();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeLightbox();
        }
        return;
      }

      // 2. Gallery Modal active: Escape closes it
      if (galleryModal && galleryModal.classList.contains('active')) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeGalleryModal();
        }
      }
    });
  }

  /**
   * Category Filter Tabs logic (preserves existing filter functionality)
   */
  function bindCategoryFilters() {
    var filterBtns = document.querySelectorAll('.ps-filter-btn');
    var items = document.querySelectorAll('.ps-gallery-item');
    if (filterBtns.length > 0 && items.length > 0) {
      filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          filterBtns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var filter = btn.getAttribute('data-filter');
          items.forEach(function (item) {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }
  }

  // Expose API for debugging if needed
  window.PlaySpaceGallery = {
    collections: GALLERY_COLLECTIONS,
    open: openGalleryModal,
    close: closeGalleryModal,
    openLightbox: openLightbox,
    closeLightbox: closeLightbox
  };
})();
`;

fs.writeFileSync(path.join(__dirname, '../playspace/assets/js/gallery.js'), galleryJsContent, 'utf8');
console.log('✅ Updated playspace/assets/js/gallery.js with 27 attraction zone collections');

// 2. Build HTML Grid representation
const gridItemsHtml = zones.map(z => {
  return `        <!-- ${z.num}. ${z.title} -->\n` +
    `        <div class="ps-gallery-item" data-category="${z.category}" data-gallery-id="${slug(z.title)}">\n` +
    `          <img src="${z.imgSrc}" alt="${z.title}" loading="lazy">\n` +
    `          <div class="ps-gallery-overlay">\n` +
    `            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">${z.badge}</span>\n` +
    `            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">${z.title}</h4>\n` +
    `            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">${z.desc}</p>\n` +
    `          </div>\n` +
    `        </div>`;
}).join('\n\n');

const filterTabsHtml = `      <!-- Filter Tabs -->
      <div class="ps-gallery-filters">
        <button type="button" class="ps-filter-btn active" data-filter="all">All Zones (27)</button>
        <button type="button" class="ps-filter-btn" data-filter="trampolines">Trampolines &amp; Sports (7)</button>
        <button type="button" class="ps-filter-btn" data-filter="climbing">Climbing &amp; Ninja (7)</button>
        <button type="button" class="ps-filter-btn" data-filter="softplay">Soft Play &amp; Mazes (3)</button>
        <button type="button" class="ps-filter-btn" data-filter="toddlers">Toddler Sanctuary (6)</button>
        <button type="button" class="ps-filter-btn" data-filter="interactive">Interactive &amp; Glow (4)</button>
      </div>`;

// Update playspace/pages/gallery.html
const galleryHtmlPath = path.join(__dirname, '../playspace/pages/gallery.html');
let galleryHtml = fs.readFileSync(galleryHtmlPath, 'utf8');

// Update banner stat "6 Action Zones" -> "27 Action Zones"
galleryHtml = galleryHtml.replace(/<div style="font-size: 1\.35rem; font-weight: 900; color: #FFFFFF;">\s*6 Action Zones\s*<\/div>/g, '<div style="font-size: 1.35rem; font-weight: 900; color: #FFFFFF;">27 Action Zones</div>');

// Replace Filter Tabs
const filterRegex = /<!-- Filter Tabs -->[\s\S]*?<\/div>/;
galleryHtml = galleryHtml.replace(filterRegex, filterTabsHtml);

// Replace Gallery Grid
const gridRegex = /<!-- \d+ High-Res Categorized Gallery Grid -->[\s\S]*?<div class="ps-gallery-grid">[\s\S]*?<\/div>(\s*<\/div>\s*<\/section>)/;
const replacementGrid = `<!-- 27 High-Res Categorized Gallery Grid -->\n      <div class="ps-gallery-grid">\n${gridItemsHtml}\n      </div>$1`;
galleryHtml = galleryHtml.replace(gridRegex, replacementGrid);

// Ensure lightbox caption is visible
galleryHtml = galleryHtml.replace(/<div class="ps-lightbox-caption" id="psLightboxCaption" style="display:none;"><\/div>/g, '<div class="ps-lightbox-caption" id="psLightboxCaption"></div>');

fs.writeFileSync(galleryHtmlPath, galleryHtml, 'utf8');
console.log('✅ Updated playspace/pages/gallery.html with 27 attraction zone items');

// 3. Update build-public-pages.js
const buildPath = path.join(__dirname, 'build-public-pages.js');
let buildContent = fs.readFileSync(buildPath, 'utf8');

buildContent = buildContent.replace(/<div style="font-size: 1\.35rem; font-weight: 900; color: #FFFFFF;">\s*6 Action Zones\s*<\/div>/g, '<div style="font-size: 1.35rem; font-weight: 900; color: #FFFFFF;">27 Action Zones</div>');
buildContent = buildContent.replace(filterRegex, filterTabsHtml);
buildContent = buildContent.replace(gridRegex, replacementGrid);
buildContent = buildContent.replace(/<div class="ps-lightbox-caption" id="psLightboxCaption" style="display:none;"><\/div>/g, '<div class="ps-lightbox-caption" id="psLightboxCaption"></div>');

fs.writeFileSync(buildPath, buildContent, 'utf8');
console.log('✅ Updated scripts/build-public-pages.js');
