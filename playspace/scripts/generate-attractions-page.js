const fs = require('fs');
const path = require('path');
const { ROOT_DIR, getPublicHeader, getPublicFooter, getCommonScripts } = require('./build-base');
const { ATTRACTION_ZONES } = require('./attractions-data');

const PAGES_DIR = path.join(ROOT_DIR, 'pages');

function generateAttractionsPage() {
  const basePath = '../';

  const cardsHtml = ATTRACTION_ZONES.map(zone => {
    const cleanAge = zone.ageGroup.split('(')[0].trim();
    const shortBadge = (zone.ageFilterLabel || '').split('(')[0].trim();

    return `
      <!-- ${zone.num}. ${zone.title} -->
      <div class="ps-attraction-card" 
           data-attraction-category="${zone.category}" 
           data-min-age="${zone.minAge}" 
           data-max-age="${zone.maxAge}" 
           data-age-tags="${(zone.ageTags || []).join(' ')}"
           style="display: flex; flex-direction: column; height: 100%; border: 1px solid var(--ps-border-color); border-radius: var(--ps-radius-xl); overflow: hidden; background: var(--ps-bg-card); box-shadow: var(--ps-shadow-sm);">
        <div class="ps-attraction-thumb" style="position: relative; height: 220px; overflow: hidden; flex-shrink: 0;">
          <img src="${zone.heroImage}" alt="${zone.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="ps-attraction-body" style="padding: 1.25rem; display: flex; flex-direction: column; flex-grow: 1;">
          <div class="ps-attraction-specs" style="min-height: 38px; display: flex; align-items: center; flex-wrap: wrap; gap: 0.35rem 0.6rem; margin-bottom: 0.5rem; font-size: 0.8rem; font-weight: 700; color: var(--ps-text-muted);">
            <span>● ${zone.specs[0]}</span> <span>● ${zone.specs[1]}</span> <span>● ${zone.specs[2]}</span>
          </div>
          <h3 style="font-size: 1.3rem; margin: 0.25rem 0 0.5rem 0; color: var(--ps-text-main); min-height: 2.2rem; display: flex; align-items: center; line-height: 1.25;">
            ${zone.num}. ${zone.title}
          </h3>
          <p class="text-muted" style="font-size: 0.9rem; line-height: 1.5; margin-bottom: 0.85rem; min-height: 44px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${zone.description}
          </p>
          
          <!-- Age Suitability Badge with Filter Tag -->
          <div style="background: rgba(255,204,0,0.12); border-left: 3px solid #FFCC00; padding: 0.45rem 0.75rem; border-radius: 4px; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); margin-bottom: 0.75rem; min-height: 40px; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; box-sizing: border-box;">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">👶 <strong>Age Suitability:</strong> ${cleanAge}</span>
            <span style="font-size: 0.74rem; background: #000000; color: #FFCC00; padding: 2px 7px; border-radius: 4px; font-weight: 800; white-space: nowrap; flex-shrink: 0;">${shortBadge}</span>
          </div>

          <!-- Safety Information -->
          <div style="background: var(--ps-bg-surface-alt, rgba(0,0,0,0.03)); border: 1px solid var(--ps-border-color); border-radius: 6px; padding: 0.65rem 0.75rem; font-size: 0.8rem; color: var(--ps-text-muted); line-height: 1.45; min-height: 72px; display: flex; flex-direction: column; justify-content: center; box-sizing: border-box; margin-bottom: 0.85rem;">
            <strong style="color: var(--ps-text-main); display: block; margin-bottom: 0.2rem;">🛡️ Safety Information:</strong>
            <span style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${zone.safetyGuidelines[0]}</span>
          </div>

          <div class="ps-attraction-actions" style="margin-top: auto; padding-top: 0.85rem; border-top: 1px solid var(--ps-border-color); display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
            <div style="display: flex; gap: 0.5rem; width: 100%;">
              <a href="attraction-${zone.id}.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center;">View Details</a>
              <a href="booking-${zone.id}.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book This Zone</a>
            </div>
            <button type="button" class="ps-btn ps-btn-outline ps-btn-sm ps-btn-add-cart" data-add-cart="attraction-${zone.id}" data-name="${zone.title}" data-price="18.00" data-type="Zone Admission" data-icon="🤸" style="width: 100%; text-align: center; border: 2px solid #FFCC00; color: var(--ps-text-main); font-weight: 800; background: rgba(255, 204, 0, 0.1);">
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  const contentHtml = `
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>Attractions</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0 0 0.75rem 0;">Explore Our ${ATTRACTION_ZONES.length} Adventure Play Zones</h1>
      <p style="color: rgba(255, 255, 255, 0.85); font-size: 1.15rem; max-width: 820px; line-height: 1.6;">
        From high-flying Olympic trampoline beds, parkour zones, and ninja agility courses to multi-story adventure towers, zip lines, volcano climbs, and treasure hunts. Every single attraction has its own dedicated details page, certified safety monitors, and ASTM-compliant padding.
      </p>
    </div>
  </section>

  <section class="ps-section ps-section-white">
    <div class="ps-container">
      
      <!-- Interactive Dual Filter Control Center: Age & Activity Type -->
      <div class="ps-attractions-filter-panel" style="background: var(--ps-bg-card); border: 2px solid var(--ps-border-color); border-radius: var(--ps-radius-xl); padding: 1.5rem; margin-bottom: 2.5rem; box-shadow: var(--ps-shadow-sm);">
        
        <!-- Filter Header & Live Counter -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; padding-bottom: 1rem; border-bottom: 1px solid var(--ps-border-color); margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.25rem;">🎯</span>
            <div>
              <h4 style="margin: 0; font-size: 1.1rem; color: var(--ps-text-main);">Find the Perfect Play Zone</h4>
              <span class="text-muted" style="font-size: 0.82rem;">Filter by your child's age group or specific activity type</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--ps-text-main);">
              Showing <strong id="psFilterCount" style="color: #000; background: #FFCC00; padding: 2px 8px; border-radius: 4px;">${ATTRACTION_ZONES.length}</strong> of ${ATTRACTION_ZONES.length} Zones
            </span>
            <button type="button" id="psResetFiltersBtn" class="ps-btn ps-btn-outline-dark ps-btn-sm" style="display: none; padding: 0.35rem 0.85rem; font-size: 0.8rem; font-weight: 700;">
              ✕ Reset Filters
            </button>
          </div>
        </div>

        <!-- Row 1: Age Filters -->
        <div style="margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <span style="font-weight: 800; font-size: 0.88rem; color: var(--ps-text-main); display: flex; align-items: center; gap: 6px;">
              <span style="background: #FFCC00; color: #000000; border-radius: 4px; padding: 1px 7px; font-size: 0.75rem; font-weight: 900;">AGE FILTER</span>
              Filter by Age Group:
            </span>
            
            <!-- Redesigned Custom Exact Child Age Dropdown -->
            <div class="ps-custom-select-wrapper" style="position: relative; display: inline-block;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <label for="psExactAgeTrigger" style="font-size: 0.8rem; font-weight: 700; color: var(--ps-text-muted);">Exact Child Age:</label>
                
                <button type="button" 
                        id="psExactAgeTrigger" 
                        class="ps-custom-select-trigger" 
                        aria-haspopup="listbox" 
                        aria-expanded="false" 
                        style="display: inline-flex; align-items: center; justify-content: space-between; gap: 12px; min-width: 175px; padding: 0.45rem 1rem; font-size: 0.84rem; font-weight: 700; border-radius: 999px; border: 2px solid var(--ps-border-color); background: var(--ps-bg-main); color: var(--ps-text-main); cursor: pointer; transition: all 0.2s ease;">
                  <span id="psExactAgeTriggerText" style="display: flex; align-items: center; gap: 6px;">
                    <span>🎯</span> <span>Select Age...</span>
                  </span>
                  <svg id="psExactAgeTriggerArrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.2s ease; flex-shrink: 0; color: #FFCC00;">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>

              <!-- Hidden native select for standard event triggering and form support -->
              <select id="psExactAgeSelect" style="display: none;" aria-hidden="true">
                <option value="any">Select Age...</option>
                <option value="1">Age 1 (Toddler)</option>
                <option value="2">Age 2 (Toddler)</option>
                <option value="3">Age 3 (Toddler)</option>
                <option value="4">Age 4 (Junior)</option>
                <option value="5">Age 5 (Junior)</option>
                <option value="6">Age 6 (Junior)</option>
                <option value="7">Age 7 (Junior)</option>
                <option value="8">Age 8 (Big Kid)</option>
                <option value="9">Age 9 (Big Kid)</option>
                <option value="10">Age 10 (Big Kid)</option>
                <option value="11">Age 11 (Big Kid)</option>
                <option value="12">Age 12+ (Tweens &amp; Teens)</option>
              </select>

              <!-- Custom Dropdown Menu Panel -->
              <div id="psCustomAgeMenu" 
                   class="ps-custom-select-menu" 
                   role="listbox" 
                   style="display: none; position: absolute; top: calc(100% + 8px); right: 0; width: 260px; max-height: 380px; overflow-y: auto; background: var(--ps-bg-card); border: 2px solid #FFCC00; border-radius: var(--ps-radius-lg); box-shadow: 0 15px 35px rgba(0,0,0,0.3); z-index: 1000; padding: 0.5rem; text-align: left;">
                
                <div style="padding: 0.35rem 0.65rem 0.5rem 0.65rem; border-bottom: 1px solid var(--ps-border-color); display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--ps-text-muted); letter-spacing: 0.04em;">Filter by Exact Age</span>
                  <button type="button" id="psCustomAgeReset" style="background: none; border: none; font-size: 0.75rem; font-weight: 700; color: #FFCC00; cursor: pointer; padding: 0;">Show All</button>
                </div>

                <!-- Any Age Option -->
                <div class="ps-custom-age-item active" data-age-value="any" style="display: flex; align-items: center; justify-content: space-between; padding: 0.55rem 0.75rem; margin-top: 0.35rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>✨ All Ages (Reset)</span>
                  <span class="ps-age-check" style="color: #FFCC00; font-weight: 900;">✓</span>
                </div>

                <!-- Group 1: Toddlers (1-3) -->
                <div style="padding: 0.5rem 0.65rem 0.2rem 0.65rem; font-size: 0.7rem; font-weight: 800; color: var(--ps-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
                  🍼 Toddler Stage (0 – 3 yrs)
                </div>
                <div class="ps-custom-age-item" data-age-value="1" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 1 Year</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Toddler</span>
                </div>
                <div class="ps-custom-age-item" data-age-value="2" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 2 Years</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Toddler</span>
                </div>
                <div class="ps-custom-age-item" data-age-value="3" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 3 Years</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Toddler</span>
                </div>

                <!-- Group 2: Juniors (4-7) -->
                <div style="padding: 0.6rem 0.65rem 0.2rem 0.65rem; font-size: 0.7rem; font-weight: 800; color: var(--ps-text-muted); text-transform: uppercase; letter-spacing: 0.05em; border-top: 1px solid var(--ps-border-color); margin-top: 0.35rem;">
                  🧒 Junior Explorers (4 – 7 yrs)
                </div>
                <div class="ps-custom-age-item" data-age-value="4" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 4 Years</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Junior</span>
                </div>
                <div class="ps-custom-age-item" data-age-value="5" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 5 Years</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Junior</span>
                </div>
                <div class="ps-custom-age-item" data-age-value="6" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 6 Years</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Junior</span>
                </div>
                <div class="ps-custom-age-item" data-age-value="7" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 7 Years</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Junior</span>
                </div>

                <!-- Group 3: Big Kids & Tweens (8-12+) -->
                <div style="padding: 0.6rem 0.65rem 0.2rem 0.65rem; font-size: 0.7rem; font-weight: 800; color: var(--ps-text-muted); text-transform: uppercase; letter-spacing: 0.05em; border-top: 1px solid var(--ps-border-color); margin-top: 0.35rem;">
                  🏃 Big Kids &amp; Tweens (8 – 12+ yrs)
                </div>
                <div class="ps-custom-age-item" data-age-value="8" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 8 Years</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Big Kid</span>
                </div>
                <div class="ps-custom-age-item" data-age-value="9" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 9 Years</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Big Kid</span>
                </div>
                <div class="ps-custom-age-item" data-age-value="10" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 10 Years</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Big Kid</span>
                </div>
                <div class="ps-custom-age-item" data-age-value="11" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 11 Years</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Big Kid</span>
                </div>
                <div class="ps-custom-age-item" data-age-value="12" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; font-weight: 700; color: var(--ps-text-main); transition: background 0.15s ease;">
                  <span>Age 12+ Years</span>
                  <span style="font-size: 0.7rem; background: rgba(255,204,0,0.15); color: #FFCC00; padding: 2px 6px; border-radius: 4px; font-weight: 800;">Tweens/Teens</span>
                </div>

              </div>
            </div>
          </div>

          <div class="ps-age-filters" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <button type="button" class="ps-filter-btn active" data-age-filter="all">All Ages (${ATTRACTION_ZONES.length})</button>
            <button type="button" class="ps-filter-btn" data-age-filter="toddler">🍼 Toddlers (0 – 3 yrs)</button>
            <button type="button" class="ps-filter-btn" data-age-filter="junior">🧒 Juniors (4 – 7 yrs)</button>
            <button type="button" class="ps-filter-btn" data-age-filter="bigkids">🏃 Big Kids &amp; Tweens (8 – 12+ yrs)</button>
            <button type="button" class="ps-filter-btn" data-age-filter="family">👨‍👩‍👧 Family &amp; Open Jump (All Ages)</button>
          </div>
        </div>

        <!-- Row 2: Category Filters -->
        <div style="padding-top: 1rem; border-top: 1px solid var(--ps-border-color);">
          <span style="font-weight: 800; font-size: 0.88rem; color: var(--ps-text-main); display: flex; align-items: center; gap: 6px; margin-bottom: 0.75rem;">
            <span style="background: #000000; color: #FFCC00; border: 1px solid #FFCC00; border-radius: 4px; padding: 1px 7px; font-size: 0.75rem; font-weight: 900;">ZONE TYPE</span>
            Filter by Play Activity:
          </span>
          <div class="ps-category-filters" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <button type="button" class="ps-filter-btn active" data-category-filter="all">All Play Types</button>
            <button type="button" class="ps-filter-btn" data-category-filter="trampolines">Trampolines &amp; Sports</button>
            <button type="button" class="ps-filter-btn" data-category-filter="climbing">Climbing &amp; Ninja</button>
            <button type="button" class="ps-filter-btn" data-category-filter="softplay">Soft Play &amp; Mazes</button>
            <button type="button" class="ps-filter-btn" data-category-filter="toddlers">Toddler Sanctuary</button>
            <button type="button" class="ps-filter-btn" data-category-filter="interactive">Interactive &amp; Glow</button>
          </div>
        </div>

      </div>

      <!-- No Results Message -->
      <div id="psNoResultsMessage" style="display: none; text-align: center; padding: 4rem 1.5rem; background: var(--ps-bg-card); border: 2px dashed var(--ps-border-color); border-radius: var(--ps-radius-xl); margin-bottom: 2rem;">
        <div style="font-size: 3rem; margin-bottom: 0.75rem;">👶🔍</div>
        <h3 style="margin: 0 0 0.5rem 0;">No Attraction Zones Found</h3>
        <p class="text-muted" style="max-width: 500px; margin: 0 auto 1.5rem auto; font-size: 0.95rem; line-height: 1.5;">
          No play zones match this specific combination of age and activity type. Try selecting "All Ages" or click below to reset filters.
        </p>
        <button type="button" class="ps-btn ps-btn-primary" onclick="resetPlaySpaceFilters()">Reset All Filters</button>
      </div>

      <div class="ps-grid ps-grid-3" style="gap: 2rem;">
        ${cardsHtml}
      </div>
    </div>
  </section>

  <!-- Facility Safety Assurance Strip -->
  <section class="ps-section" style="background: var(--ps-bg-main); border-top: 1px solid var(--ps-border-color);">
    <div class="ps-container">
      <div class="ps-grid ps-grid-3" style="gap: 1.75rem;">
        <div class="ps-card" style="padding: 1.5rem; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🛡️</div>
          <h4 style="margin: 0 0 0.5rem 0;">ASTM Safety Certified</h4>
          <p class="text-muted" style="margin: 0; font-size: 0.88rem; line-height: 1.5;">Every trampoline mat, frame seam, and foam pit strictly adheres to ASTM F2970 &amp; F1918 standards.</p>
        </div>
        <div class="ps-card" style="padding: 1.5rem; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🧼</div>
          <h4 style="margin: 0 0 0.5rem 0;">Hospital-Grade Sanitation</h4>
          <p class="text-muted" style="margin: 0; font-size: 0.88rem; line-height: 1.5;">Commercial UV-C ball pit washers and continuous 120-minute facility disinfection cycles.</p>
        </div>
        <div class="ps-card" style="padding: 1.5rem; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">👨‍🏫</div>
          <h4 style="margin: 0 0 0.5rem 0;">Certified Court Marshals</h4>
          <p class="text-muted" style="margin: 0; font-size: 0.88rem; line-height: 1.5;">Red Cross CPR-certified jump marshals stationed on every active court during operating hours.</p>
        </div>
      </div>
    </div>
  </section>
  `;

  const fullHtml = `<!DOCTYPE html>
<html lang="en" data-theme="light" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Attractions &amp; Play Zones — PlaySpace</title>
  <meta name="description" content="Explore all ${ATTRACTION_ZONES.length} adventure play zones at PlaySpace: ${ATTRACTION_ZONES.map(z => z.title).join(', ')}.">
  <link rel="icon" type="image/svg+xml" href="${basePath}assets/images/favicon/favicon.svg">
  <link rel="stylesheet" href="${basePath}assets/css/style.css">
</head>
<body>
  ${getPublicHeader(basePath, 'attractions')}
  ${contentHtml}
  ${getPublicFooter(basePath)}
  ${getCommonScripts(basePath, ['attractions.js'])}
</body>
</html>`;

  fs.writeFileSync(path.join(PAGES_DIR, 'attractions.html'), fullHtml, 'utf8');
  console.log(`Successfully generated playspace/pages/attractions.html with all ${ATTRACTION_ZONES.length} attraction zones!`);
}

if (require.main === module) {
  generateAttractionsPage();
}

module.exports = {
  generateAttractionsPage
};
