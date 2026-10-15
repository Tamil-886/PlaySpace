const fs = require('fs');
const path = require('path');

const { collections } = require('./build-27-galleries.js');

const jsCollectionsStr = collections.map(c => {
  const imgsStr = c.images.map(img => {
    return `        {
          src: ${JSON.stringify(img.src)},
          title: ${JSON.stringify(img.title)},
          caption: ${JSON.stringify(img.caption)}
        }`;
  }).join(',\n');

  return `    {
      id: ${JSON.stringify(c.id)},
      num: ${c.num},
      title: ${JSON.stringify(c.title)},
      badge: ${JSON.stringify(c.badge)},
      category: ${JSON.stringify(c.category)},
      desc: ${JSON.stringify(c.desc)},
      images: [
${imgsStr}
      ]
    }`;
}).join(',\n');

const galleryJsContent = `/**
 * PlaySpace - Interactive Gallery & Lightbox Controller
 * 
 * Features:
 * - 27 Unique Gallery Collections corresponding to the 27 Attraction Zones.
 * - Each gallery displays its own unique set of exactly 3 relevant images.
 * - Individual Gallery View Modal displaying collection info and 3 curated photos.
 * - Full-Screen Lightbox with Next, Previous, and Close (X) buttons.
 * - Lightbox allows closing via Escape key and clicking outside the image.
 * - Next/Previous navigates through the 3 photos with counter (Photo 1 of 3).
 * - Smooth CSS transitions and accessible focus / keyboard handlers.
 * - Fully responsive on mobile, tablet, and desktop.
 */

(function () {
  'use strict';

  // 27 Bespoke Gallery Datasets (each with exactly 3 unique, relevant images)
  var GALLERY_COLLECTIONS = [
${jsCollectionsStr}
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
        '        <span>3 Curated Photos in this Collection</span>',
        '        <span style="color:rgba(255,255,255,0.6);font-size:0.8rem;text-transform:none;">Click any photo to expand fullscreen</span>',
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
        '      <span class="ps-lightbox-badge" id="psLightboxBadge">GALLERY</span>',
        '      <span class="ps-lightbox-counter" id="psLightboxCounter">Photo 1 of 3</span>',
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
        '    <div class="ps-lightbox-caption" id="psLightboxCaption"></div>',
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
      if (e.target === lightbox || e.target.id === 'psLightboxViewport' || (e.target.classList && e.target.classList.contains('ps-lightbox-image-wrap'))) {
        closeLightbox();
      }
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
      card.setAttribute('aria-label', 'View 3 photos of ' + titleText);

      var clickHandler = function (e) {
        e.preventDefault();
        var galleryId = card.getAttribute('data-gallery-id');
        var data = null;

        if (galleryId) {
          data = GALLERY_COLLECTIONS.find(function (g) { return g.id === galleryId; });
        }
        if (!data && GALLERY_COLLECTIONS[index]) {
          data = GALLERY_COLLECTIONS[index];
        }

        if (data) {
          openGalleryModal(data);
        }
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
   * Open the Individual Gallery View Modal with exactly 3 photos
   */
  function openGalleryModal(galleryData) {
    currentGallery = galleryData;

    document.getElementById('psModalBadge').textContent = galleryData.badge || 'ATTRACTION ZONE';
    document.getElementById('psModalTitle').textContent = galleryData.title;
    document.getElementById('psModalDesc').textContent = galleryData.desc;

    var grid = document.getElementById('psModalGrid');
    grid.innerHTML = '';

    galleryData.images.forEach(function (img, idx) {
      var card = document.createElement('div');
      card.className = 'ps-gallery-view-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'View photo ' + (idx + 1) + ': ' + img.title);

      card.innerHTML = [
        '<div class="ps-gallery-view-thumb">',
        '  <img src="' + img.src + '" alt="' + (img.title || galleryData.title) + '" loading="lazy">',
        '  <div class="ps-gallery-view-zoom-hint">',
        '    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>',
        '    <span>Click to Expand</span>',
        '  </div>',
        '</div>'
      ].join('');

      card.addEventListener('click', function () {
        openLightbox(idx);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
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
   * Open the Full-Screen Lightbox for the clicked photo
   */
  function openLightbox(index) {
    if (!currentGallery || !currentGallery.images || !currentGallery.images[index]) return;
    currentImageIndex = index;
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
    if (!currentGallery || !currentGallery.images) return;
    var imgData = currentGallery.images[currentImageIndex];
    if (!imgData) return;

    var imgEl = document.getElementById('psLightboxImg');

    // Trigger smooth fade transition
    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.96)';

    setTimeout(function () {
      imgEl.src = imgData.src;
      imgEl.alt = imgData.title;
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    }, 120);

    document.getElementById('psLightboxBadge').textContent = currentGallery.title;
    document.getElementById('psLightboxCounter').textContent = 'Photo ' + (currentImageIndex + 1) + ' of ' + currentGallery.images.length;
    var captionEl = document.getElementById('psLightboxCaption');
    if (captionEl) {
      captionEl.textContent = imgData.title + (imgData.caption ? ' — ' + imgData.caption : '');
      captionEl.style.display = 'block';
    }
  }

  /**
   * Previous image in Lightbox (cycles within the 3 images of this gallery)
   */
  function showPrevImage() {
    if (!currentGallery || !currentGallery.images || currentGallery.images.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentGallery.images.length) % currentGallery.images.length;
    updateLightboxContent();
  }

  /**
   * Next image in Lightbox (cycles within the 3 images of this gallery)
   */
  function showNextImage() {
    if (!currentGallery || !currentGallery.images || currentGallery.images.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentGallery.images.length;
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
console.log('✅ Updated playspace/assets/js/gallery.js with 27 unique 3-image collections');
