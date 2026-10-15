const fs = require('fs');
const path = require('path');
const { ROOT_DIR, ensureDir, getPublicHeader, getPublicFooter, getCommonScripts } = require('./build-base');
const { ATTRACTION_ZONES } = require('./attractions-data');

const PAGES_DIR = path.join(ROOT_DIR, 'pages');
ensureDir(PAGES_DIR);

function renderIndividualDetailsPage(zone) {
  const basePath = '../';

  // Find related attraction objects
  const relatedZones = zone.related.map(relId => {
    return ATTRACTION_ZONES.find(z => z.id === relId) || ATTRACTION_ZONES[0];
  });

  const contentHtml = `
  <!-- Breadcrumb & Top Bar -->
  <section class="ps-page-banner" style="padding: 2rem 0 1.5rem 0; background: #000000; border-bottom: 2px solid #FFCC00;">
    <div class="ps-container">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div class="ps-breadcrumb">
          <a href="../index.html">Home</a> <span class="sep">/</span> <a href="attractions.html">Attractions</a> <span class="sep">/</span> <span>${zone.title}</span>
        </div>
        <a href="attractions.html" class="ps-btn ps-btn-outline ps-btn-sm" style="border-color: #FFCC00; color: #FFCC00; display: inline-flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to All Attractions
        </a>
      </div>
    </div>
  </section>

  <!-- 1. Hero Section -->
  <section class="ps-section ps-section-dark" style="padding-top: 3rem; padding-bottom: 3.5rem;">
    <div class="ps-container">
      <div class="ps-grid ps-grid-2 ps-items-center" style="gap: 3.5rem;">
        <div>
          <div style="display: flex; gap: 0.6rem; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap;">
            <span class="badge-tag">ZONE ${zone.num} OF ${ATTRACTION_ZONES.length}</span>
            <span class="ps-badge" style="background-color: #FFCC00; color: #000000; font-weight: 800;">${zone.categoryLabel.toUpperCase()}</span>
          </div>

          <h1 style="color: #FFFFFF; font-size: 2.6rem; line-height: 1.15; margin: 0 0 1rem 0;">
            ${zone.title}
          </h1>

          <p style="color: #FFCC00; font-size: 1.2rem; font-weight: 700; line-height: 1.4; margin-bottom: 1rem;">
            ${zone.tagline}
          </p>

          <p style="color: rgba(255, 255, 255, 0.85); font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem;">
            ${zone.description}
          </p>

          <!-- Specs Badges -->
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2rem;">
            ${zone.specs.map(spec => `
              <div style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 204, 0, 0.4); padding: 0.5rem 1rem; border-radius: 8px; color: #FFFFFF; font-size: 0.9rem; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                <span style="color: #FFCC00;">●</span> ${spec}
              </div>
            `).join('')}
          </div>

          <!-- Hero CTAs -->
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="booking-${zone.id}.html" class="ps-btn ps-btn-primary ps-btn-lg" style="box-shadow: 0 4px 15px rgba(255, 204, 0, 0.4); text-decoration: none;">
              Book This Zone
            </a>
            <button type="button" class="ps-btn ps-btn-outline ps-btn-lg ps-btn-add-cart" data-add-cart="attraction-${zone.id}" data-name="${zone.title}" data-price="18.00" data-type="Zone Admission" data-icon="🤸" style="border: 2px solid #FFCC00; color: #FFCC00; font-weight: 800; background: rgba(0,0,0,0.5);">
              Add to Cart 🛒
            </button>
            <a href="pricing-passes.html" class="ps-btn ps-btn-outline ps-btn-lg" style="border-color: #FFFFFF; color: #FFFFFF;">
              View Pricing &amp; Passes
            </a>
          </div>
        </div>

        <div>
          <div style="position: relative; border-radius: var(--ps-radius-xl); overflow: hidden; border: 3px solid #FFCC00; box-shadow: 0 15px 35px rgba(0,0,0,0.6);">
            <img src="${zone.heroImage}" alt="${zone.title} at PlaySpace" style="width: 100%; height: 420px; object-fit: cover; display: block;">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); padding: 1.5rem 1.25rem 1rem 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <span style="color: #FFCC00; font-size: 0.8rem; font-weight: 800; text-transform: uppercase;">Footwear Requirement</span>
                  <div style="color: #FFFFFF; font-size: 0.95rem; font-weight: 700;">👟 ${zone.footwear}</div>
                </div>
                <span class="ps-badge ps-badge-dark" style="background: #000000; border: 1px solid #FFCC00; color: #FFCC00;">
                  ASTM SAFETY COMPLIANT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. About the Attraction -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-grid ps-grid-2 ps-items-center" style="gap: 3.5rem;">
        <div>
          <span class="badge-tag">ENGINEERED FOR ADVENTURE</span>
          <h2 style="margin-top: 0.5rem; margin-bottom: 1.25rem; font-size: 2.2rem;">
            About the ${zone.title}
          </h2>
          <div style="color: var(--ps-text-muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem;">
            ${zone.about}
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1.5rem;">
            <div style="background: var(--ps-bg-card); border: 1px solid var(--ps-border-color); padding: 1rem; border-radius: 8px;">
              <div style="color: #FFCC00; font-size: 1.5rem; font-weight: 900; line-height: 1;">100%</div>
              <div style="color: var(--ps-text-main); font-size: 0.85rem; font-weight: 700; margin-top: 4px;">Padded Safety Coverage</div>
            </div>
            <div style="background: var(--ps-bg-card); border: 1px solid var(--ps-border-color); padding: 1rem; border-radius: 8px;">
              <div style="color: #FFCC00; font-size: 1.5rem; font-weight: 900; line-height: 1;">ASTM</div>
              <div style="color: var(--ps-text-main); font-size: 0.85rem; font-weight: 700; margin-top: 4px;">F2970 / F1918 Certified</div>
            </div>
          </div>
        </div>

        <div>
          <!-- Feature Highlights Card -->
          <div class="ps-card" style="border: 2px solid var(--ps-border-color); padding: 2rem; background: var(--ps-bg-card); box-shadow: var(--ps-shadow-md);">
            <h3 style="margin-top: 0; margin-bottom: 1.25rem; font-size: 1.4rem; color: var(--ps-text-main); display: flex; align-items: center; gap: 8px;">
              <span style="color: #FFCC00;">★</span> Unique Highlights &amp; Features
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem;">
              ${zone.features.map(feat => `
                <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.95rem; line-height: 1.5; color: var(--ps-text-main);">
                  <span style="color: #000000; background: #FFCC00; border-radius: 50%; width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 900; flex-shrink: 0; margin-top: 2px;">✔</span>
                  <span>${feat}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Activities & Experiences Available -->
  <section class="ps-section" style="background: var(--ps-bg-main); border-top: 1px solid var(--ps-border-color); border-bottom: 1px solid var(--ps-border-color);">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">WHAT YOU CAN DO</span>
        <h2 style="margin-top: 0.5rem;">Activities &amp; Experiences in this Zone</h2>
        <p class="text-muted" style="max-width: 680px; margin: 0 auto;">
          From beginner drills to exhilarating advanced challenges, discover every activity waiting for you inside the ${zone.title}.
        </p>
      </div>

      <div class="ps-grid ps-grid-2" style="gap: 1.75rem;">
        ${zone.activities.map((act, idx) => `
          <div class="ps-card" style="padding: 1.75rem; border: 1px solid var(--ps-border-color); display: flex; gap: 1.25rem; align-items: flex-start;">
            <div style="background: #000000; color: #FFCC00; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 900; flex-shrink: 0; border: 2px solid #FFCC00;">
              0${idx + 1}
            </div>
            <div>
              <h4 style="margin: 0 0 0.5rem 0; font-size: 1.15rem; color: var(--ps-text-main);">${act.title}</h4>
              <p class="text-muted" style="margin: 0; font-size: 0.95rem; line-height: 1.6;">${act.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 4. Recommended Age Group & Venue Policies -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-grid ps-grid-2 ps-items-center" style="gap: 3.5rem;">
        <div>
          <span class="badge-tag">VENUE POLICIES</span>
          <h2 style="margin-top: 0.5rem; margin-bottom: 1rem;">Recommended Age &amp; Requirements</h2>
          <p class="text-muted" style="line-height: 1.6; margin-bottom: 1.5rem;">
            To ensure safe, exhilarating play for everyone, PlaySpace strictly enforces zone-specific safety boundaries, age brackets, and supervisor-to-child ratios.
          </p>

          <div style="background: rgba(255, 204, 0, 0.12); border-left: 5px solid #FFCC00; padding: 1.25rem 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: #000000;">Official Age Suitability</div>
            <div style="font-size: 1.35rem; font-weight: 900; color: #000000; margin-top: 2px;">👶 ${zone.ageGroup}</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
              <strong style="color: var(--ps-text-main); min-width: 130px; font-size: 0.92rem;">Age Limit:</strong>
              <span class="text-muted" style="font-size: 0.92rem;">${zone.agePolicy.minimumAge}</span>
            </div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
              <strong style="color: var(--ps-text-main); min-width: 130px; font-size: 0.92rem;">Height / Weight:</strong>
              <span class="text-muted" style="font-size: 0.92rem;">${zone.agePolicy.heightWeight}</span>
            </div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
              <strong style="color: var(--ps-text-main); min-width: 130px; font-size: 0.92rem;">Supervision:</strong>
              <span class="text-muted" style="font-size: 0.92rem;">${zone.agePolicy.supervision}</span>
            </div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
              <strong style="color: var(--ps-text-main); min-width: 130px; font-size: 0.92rem;">Required Gear:</strong>
              <span class="text-muted" style="font-size: 0.92rem;">${zone.agePolicy.equipment}</span>
            </div>
          </div>
        </div>

        <div>
          <!-- Safety Rules Box -->
          <div style="background: #000000; border-radius: var(--ps-radius-xl); padding: 2.25rem; border: 2px solid #FFCC00; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1.25rem;">
              <span style="font-size: 1.5rem;">🛡️</span>
              <h3 style="color: #FFFFFF; margin: 0; font-size: 1.35rem;">Zone Safety Guidelines</h3>
            </div>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.85rem;">
              ${zone.safetyGuidelines.map((rule, idx) => `
                <li style="display: flex; align-items: flex-start; gap: 10px; color: rgba(255, 255, 255, 0.9); font-size: 0.92rem; line-height: 1.5;">
                  <span style="color: #FFCC00; font-weight: 900; font-size: 0.95rem; min-width: 18px;">${idx + 1}.</span>
                  <span>${rule}</span>
                </li>
              `).join('')}
            </ul>
            <div style="margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <span style="color: rgba(255,255,255,0.6); font-size: 0.8rem;">Signed digital waiver required for all participants.</span>
              <a href="safety-guidelines.html" style="color: #FFCC00; font-size: 0.85rem; font-weight: 700; text-decoration: underline;">Full Safety Rules &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Developmental Benefits & Reasons Kids Enjoy It -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">GROWTH &amp; WELLNESS</span>
        <h2 style="margin-top: 0.5rem;">Why Kids &amp; Parents Love This Zone</h2>
        <p class="text-muted" style="max-width: 680px; margin: 0 auto;">
          Active play at PlaySpace is intentionally engineered to nurture physical fitness, spatial confidence, and social joy.
        </p>
      </div>

      <div class="ps-grid ps-grid-4" style="gap: 1.5rem;">
        ${zone.benefits.map(b => `
          <div class="ps-card" style="padding: 1.5rem; border: 1px solid var(--ps-border-color); text-align: center; border-radius: 12px; background: var(--ps-bg-card);">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(255,204,0,0.18); color: #000000; display: inline-flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: 1rem;">
              ✨
            </div>
            <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--ps-text-main);">${b.title}</h4>
            <p class="text-muted" style="margin: 0; font-size: 0.88rem; line-height: 1.5;">${b.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 7. Attraction-Specific FAQs -->
  <section class="ps-section" style="background: var(--ps-bg-main); border-top: 1px solid var(--ps-border-color);">
    <div class="ps-container" style="max-width: 900px;">
      <div class="ps-section-header text-center">
        <span class="badge-tag">FREQUENTLY ASKED QUESTIONS</span>
        <h2 style="margin-top: 0.5rem;">${zone.title} FAQs</h2>
        <p class="text-muted">Common questions about visiting, gear, and booking this attraction zone.</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${zone.faqs.map(faq => `
          <div class="ps-card" style="padding: 1.5rem; border: 1px solid var(--ps-border-color); background: var(--ps-bg-card);">
            <h4 style="margin: 0 0 0.6rem 0; color: var(--ps-text-main); font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
              <span style="color: #FFCC00; font-weight: 900;">Q.</span> ${faq.q}
            </h4>
            <p class="text-muted" style="margin: 0; font-size: 0.95rem; line-height: 1.6; padding-left: 1.5rem;">
              ${faq.a}
            </p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 8. Book This Zone CTA Banner -->
  <section class="ps-section" style="background: #000000; border-top: 3px solid #FFCC00; border-bottom: 3px solid #FFCC00; padding: 4rem 0;">
    <div class="ps-container text-center">
      <span class="badge-tag" style="background: #FFCC00; color: #000000;">INSTANT ONLINE RESERVATION</span>
      <h2 style="color: #FFFFFF; font-size: 2.4rem; margin: 0.75rem 0 1rem 0;">
        Ready to Jump into the ${zone.title}?
      </h2>
      <p style="color: rgba(255,255,255,0.85); font-size: 1.15rem; max-width: 700px; margin: 0 auto 2rem auto; line-height: 1.6;">
        Every standard PlaySpace jump pass grants all-inclusive access to this zone and all 25 other adventure attractions across our 35,000 sq ft park!
      </p>

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="booking-${zone.id}.html" class="ps-btn ps-btn-primary" style="font-size: 1.1rem; padding: 0.95rem 2rem; text-decoration: none;">Book This Zone &bull; Book Your Play Session</a>
        <button type="button" class="ps-btn ps-btn-outline ps-btn-lg ps-btn-add-cart" data-add-cart="attraction-${zone.id}" data-name="${zone.title}" data-price="18.00" data-type="Zone Admission" data-icon="🤸" style="border: 2px solid #FFCC00; color: #FFCC00; font-size: 1.1rem; padding: 0.95rem 2rem; font-weight: 800; background: rgba(0,0,0,0.5);">
          Add to Cart 🛒
        </button>
        <a href="birthday-parties.html" class="ps-btn ps-btn-outline ps-btn-lg" style="border-color: #FFCC00; color: #FFCC00;">
          Plan a Birthday Party Here
        </a>
      </div>
    </div>
  </section>

  <!-- 9. Related Attractions -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-flex-between" style="margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="badge-tag">MORE ADVENTURE</span>
          <h2 style="margin: 0.25rem 0 0 0;">Related Attractions You'll Love</h2>
        </div>
        <a href="attractions.html" class="ps-btn ps-btn-outline-dark ps-btn-sm">
          View All ${ATTRACTION_ZONES.length} Attractions &rarr;
        </a>
      </div>

      <div class="ps-grid ps-grid-3" style="gap: 2rem;">
        ${relatedZones.map(rel => `
          <div class="ps-attraction-card" style="border: 1px solid var(--ps-border-color); border-radius: var(--ps-radius-xl); overflow: hidden; background: var(--ps-bg-card); display: flex; flex-direction: column;">
            <div class="ps-attraction-thumb" style="position: relative; height: 210px; overflow: hidden;">
              <img src="${rel.heroImage}" alt="${rel.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="ps-attraction-body" style="padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1;">
              <div class="ps-attraction-specs" style="color: var(--ps-text-muted); font-size: 0.8rem; margin-bottom: 0.5rem; font-weight: 700;">
                <span>● ${rel.specs[0]}</span> <span>● ${rel.specs[1]}</span>
              </div>
              <h4 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; color: var(--ps-text-main);">${rel.title}</h4>
              <p class="text-muted" style="font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.25rem; flex-grow: 1;">
                ${rel.description}
              </p>
              <div class="ps-attraction-actions" style="margin-top: auto; padding-top: 0.85rem; border-top: 1px solid var(--ps-border-color); display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
                <div style="display: flex; gap: 0.5rem; width: 100%;">
                  <a href="attraction-${rel.id}.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center;">View Details</a>
                  <a href="booking-${rel.id}.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book This Zone</a>
                </div>
                <button type="button" class="ps-btn ps-btn-outline ps-btn-sm ps-btn-add-cart" data-add-cart="attraction-${rel.id}" data-name="${rel.title}" data-price="18.00" data-type="Zone Admission" data-icon="🤸" style="width: 100%; text-align: center; border: 2px solid #FFCC00; color: var(--ps-text-main); font-weight: 800; background: rgba(255, 204, 0, 0.1);">
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;

  return `<!DOCTYPE html>
<html lang="en" data-theme="light" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${zone.title} — PlaySpace Attractions</title>
  <meta name="description" content="${zone.description} Full details, safety rules, age suitability, and online booking for ${zone.title} at PlaySpace.">
  <link rel="icon" type="image/svg+xml" href="${basePath}assets/images/favicon/favicon.svg">
  <link rel="stylesheet" href="${basePath}assets/css/style.css">
</head>
<body>
  ${getPublicHeader(basePath, 'attractions')}
  ${contentHtml}
  ${getPublicFooter(basePath)}
  ${getCommonScripts(basePath, [])}
</body>
</html>`;
}

function buildIndividualAttractions() {
  // Generate all individual pages
  ATTRACTION_ZONES.forEach(zone => {
    const filename = `attraction-${zone.id}.html`;
    const htmlContent = renderIndividualDetailsPage(zone);
    fs.writeFileSync(path.join(PAGES_DIR, filename), htmlContent, 'utf8');
    console.log(`Generated: pages/${filename}`);
  });

  // Also generate/update attraction-details.html (the flagship Trampoline Arena page + directory of all zones)
  const megaTrampolineZone = ATTRACTION_ZONES[0];
  const flagshipHtml = renderIndividualDetailsPage(megaTrampolineZone);
  fs.writeFileSync(path.join(PAGES_DIR, 'attraction-details.html'), flagshipHtml, 'utf8');
  console.log('Generated: pages/attraction-details.html (Flagship Details)');

  console.log(`Successfully generated ${ATTRACTION_ZONES.length} individual attraction details pages + attraction-details.html!`);
}

if (require.main === module) {
  buildIndividualAttractions();
}

module.exports = {
  buildIndividualAttractions,
  renderIndividualDetailsPage
};
