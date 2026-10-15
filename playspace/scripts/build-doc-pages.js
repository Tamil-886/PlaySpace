const fs = require('fs');
const path = require('path');
const { ROOT_DIR, ensureDir, getPublicHeader, getPublicFooter, getCommonScripts } = require('./build-base');

const DOC_DIR = path.join(ROOT_DIR, 'documentation');
ensureDir(DOC_DIR);

function getDocSidebar(activeItem = 'index') {
  const docs = [
    { id: 'index', label: '1. Overview & Architecture', href: 'index.html' },
    { id: 'installation', label: '2. Installation & Quickstart', href: 'installation.html' },
    { id: 'customization', label: '3. Customization Guide', href: 'customization.html' },
    { id: 'color-guide', label: '4. Strict 3-Color Palette', href: 'color-guide.html' },
    { id: 'responsive-guide', label: '5. Responsive & Breakpoints', href: 'responsive-guide.html' },
    { id: 'rtl-guide', label: '6. RTL & Localization', href: 'rtl-guide.html' },
    { id: 'credits', label: '7. Credits & Licensing', href: 'credits.html' }
  ];

  const linksHtml = docs.map(d => `
    <li>
      <a href="${d.href}" class="${activeItem === d.id ? 'active' : ''}" style="display: block; padding: 0.65rem 1rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem; ${activeItem === d.id ? 'background-color: #FFCC00; color: #000000;' : 'color: rgba(255,255,255,0.75);'}">
        ${d.label}
      </a>
    </li>
  `).join('');

  return `
  <aside style="background-color: #000000; border: 1px solid rgba(255,255,255,0.15); border-radius: var(--ps-radius-lg); padding: 1.5rem; height: fit-content;">
    <h5 style="color: #FFFFFF; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 0.75rem;">Documentation Index</h5>
    <ul style="display: flex; flex-direction: column; gap: 0.35rem;">
      ${linksHtml}
    </ul>
    <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.15);">
      <a href="../index.html" class="ps-btn ps-btn-outline ps-btn-sm ps-btn-block">&larr; Return to Website</a>
    </div>
  </aside>
  `;
}

function docWrapper(title, contentHtml, activeNav = 'index') {
  const basePath = '../';
  return `<!DOCTYPE html>
<html lang="en" data-theme="light" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — PlaySpace Documentation</title>
  <link rel="icon" type="image/svg+xml" href="${basePath}assets/images/favicon/favicon.svg">
  <link rel="stylesheet" href="${basePath}assets/css/style.css">
</head>
<body>
  ${getPublicHeader(basePath)}

  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>Documentation</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0;">PlaySpace — Developer Documentation</h1>
    </div>
  </section>

  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 2.5rem; align-items: start;">
        ${getDocSidebar(activeNav)}
        <article class="ps-card" style="padding: 2.5rem; border: 2px solid var(--ps-border-color);">
          ${contentHtml}
        </article>
      </div>
    </div>
  </section>

  ${getPublicFooter(basePath)}
  ${getCommonScripts(basePath)}
</body>
</html>`;
}

// 1. index.html
const docIndexHtml = docWrapper(
  'Documentation Overview',
  `
  <h2>1. Overview &amp; Architecture</h2>
  <p class="lead">
    Welcome to the official developer documentation for <strong>PlaySpace — Kids Indoor Trampoline &amp; Soft Play Center</strong> template.
  </p>
  <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--ps-border-color);">
  
  <h3>Key Features</h3>
  <ul style="display: flex; flex-direction: column; gap: 0.75rem; margin: 1rem 0;">
    <li><strong>Pure Vanilla Frontend:</strong> 100% HTML5, CSS3, and Vanilla JavaScript. Zero build tools, bundlers, npm dependencies, or backend frameworks required.</li>
    <li><strong>Strict 3-Color Visual Palette:</strong> Exclusively Black (#000000), White (#FFFFFF), and Yellow (#FFCC00) across both light and dark modes.</li>
    <li><strong>Integrated Navigation Bar:</strong> Clean layout with no top announcement bar. Dark Mode and LTR/RTL toggles fit seamlessly directly into the main navbar.</li>
    <li><strong>Complete Modular System:</strong> 15 structured CSS files and 16 clean JavaScript modules with clear responsibilities.</li>
    <li><strong>Dual Portals Included:</strong> Complete Parent Self-Service Portal (14 pages) and Admin Operations Console (13 pages).</li>
  </ul>
  `,
  'index'
);
fs.writeFileSync(path.join(DOC_DIR, 'index.html'), docIndexHtml, 'utf8');

// 2. installation.html
const docInstallHtml = docWrapper(
  'Installation Guide',
  `
  <h2>2. Installation &amp; Quickstart</h2>
  <p>
    PlaySpace is built without any complex toolchains. You do not need to install Node.js, Webpack, Vite, or npm packages to run the website.
  </p>
  <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--ps-border-color);">

  <h3>Running Locally</h3>
  <p>You can run this project in two simple ways:</p>
  <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
    <li>
      <strong>Direct File Opening:</strong><br>
      Double-click <code>playspace/index.html</code> in any web browser (Chrome, Edge, Firefox, Safari). All features, styles, and scripts will load immediately.
    </li>
    <li>
      <strong>Local Development Server (Recommended):</strong><br>
      In VS Code, install the <em>Live Server</em> extension and click "Go Live", or use Python:
      <pre style="background: #000000; color: #FFCC00; padding: 1rem; border-radius: 8px; margin-top: 0.5rem; overflow-x: auto;">python -m http.server 8000</pre>
    </li>
  </ol>
  `,
  'installation'
);
fs.writeFileSync(path.join(DOC_DIR, 'installation.html'), docInstallHtml, 'utf8');

// 3. customization.html
const docCustomizationHtml = docWrapper(
  'Customization Guide',
  `
  <h2>3. Customization Guide</h2>
  <p>Learn how to customize text, swap logo assets, adjust ticket pricing, and configure layouts.</p>
  <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--ps-border-color);">

  <h3>Replacing the Brand Logo</h3>
  <p>The brand logo is provided in SVG vector format for maximum sharpness at any resolution:</p>
  <ul>
    <li><code>assets/images/brand/logo.svg</code> (Primary White + Yellow on Black background)</li>
    <li><code>assets/images/brand/logo-dark.svg</code> (Black + Yellow on White background)</li>
    <li><code>assets/images/favicon/favicon.svg</code> (Browser favicon)</li>
  </ul>

  <h3 style="margin-top: 2rem;">Adjusting Ticket Pricing</h3>
  <p>All pricing rates are declared in CSS variables and JavaScript state arrays inside <code>assets/js/pricing.js</code> and <code>assets/js/booking.js</code>.</p>
  `,
  'customization'
);
fs.writeFileSync(path.join(DOC_DIR, 'customization.html'), docCustomizationHtml, 'utf8');

// 4. color-guide.html
const docColorHtml = docWrapper(
  'Strict 3-Color Palette Guide',
  `
  <h2>4. Strict 3-Color Palette Guide</h2>
  <p>
    PlaySpace adheres strictly to a high-contrast, premium 3-color design system:
  </p>
  <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--ps-border-color);">

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
    <div style="border: 2px solid var(--ps-border-color); border-radius: 12px; overflow: hidden;">
      <div style="height: 90px; background-color: #000000;"></div>
      <div style="padding: 1rem;">
        <strong>Black</strong><br>
        <code>#000000</code><br>
        <span style="font-size: 0.8rem; color: var(--ps-text-muted);">Navigation, footer, headers, dark sections</span>
      </div>
    </div>
    <div style="border: 2px solid var(--ps-border-color); border-radius: 12px; overflow: hidden;">
      <div style="height: 90px; background-color: #FFFFFF; border-bottom: 1px solid var(--ps-border-color);"></div>
      <div style="padding: 1rem;">
        <strong>White</strong><br>
        <code>#FFFFFF</code><br>
        <span style="font-size: 0.8rem; color: var(--ps-text-muted);">Content backgrounds, cards, readable text</span>
      </div>
    </div>
    <div style="border: 2px solid var(--ps-border-color); border-radius: 12px; overflow: hidden;">
      <div style="height: 90px; background-color: #FFCC00;"></div>
      <div style="padding: 1rem;">
        <strong>Yellow</strong><br>
        <code>#FFCC00</code><br>
        <span style="font-size: 0.8rem; color: var(--ps-text-muted);">Primary buttons, badges, highlights, active states</span>
      </div>
    </div>
  </div>

  <div class="ps-card" style="background: #000000; color: #FFFFFF; border: 2px solid #FFCC00;">
    <h4 style="color: #FFCC00;">Strict Rule Compliance:</h4>
    <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 0.95rem;">
      No other UI colors (such as blues, greens, purples, oranges, or greys) are allowed in the interface. Opacities of Black, White, and Yellow (e.g. <code>rgba(0,0,0,0.1)</code> or <code>rgba(255,255,255,0.15)</code>) are permitted only for subtle borders, backdrops, and shadows.
    </p>
  </div>
  `,
  'color-guide'
);
fs.writeFileSync(path.join(DOC_DIR, 'color-guide.html'), docColorHtml, 'utf8');

// 5. responsive-guide.html
const docResponsiveHtml = docWrapper(
  'Responsive Design Guide',
  `
  <h2>5. Responsive Design &amp; Breakpoints</h2>
  <p>PlaySpace is tested and optimized across mobile phones, tablets, laptops, and ultra-wide screens.</p>
  <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--ps-border-color);">

  <h3>Breakpoints</h3>
  <table class="ps-table">
    <thead>
      <tr><th>Device Target</th><th>Breakpoint</th><th>Layout Behavior</th></tr>
    </thead>
    <tbody>
      <tr><td>Mobile Small</td><td>&lt; 480px</td><td>Single column cards, full width action buttons</td></tr>
      <tr><td>Mobile / Tablet</td><td>&lt; 768px</td><td>2-column grid collapse, simplified stat badges</td></tr>
      <tr><td>Tablet / Laptop</td><td>&lt; 1024px</td><td>Drawer navigation bar with hamburger menu</td></tr>
      <tr><td>Desktop</td><td>&gt; 1200px</td><td>Max container 1240px with generous whitespace</td></tr>
    </tbody>
  </table>
  `,
  'responsive-guide'
);
fs.writeFileSync(path.join(DOC_DIR, 'responsive-guide.html'), docResponsiveHtml, 'utf8');

// 6. rtl-guide.html
const docRtlHtml = docWrapper(
  'RTL & Localization Guide',
  `
  <h2>6. RTL (Right-to-Left) &amp; Localization</h2>
  <p>PlaySpace includes full native Right-to-Left (RTL) layout support for Arabic, Hebrew, and Persian languages.</p>
  <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--ps-border-color);">

  <h3>How RTL Switching Works</h3>
  <p>
    Clicking the <strong>LTR / RTL</strong> button in the navigation bar applies <code>dir="rtl"</code> to the <code>&lt;html&gt;</code> element and persists the user preference in browser <code>localStorage</code> under the key <code>playspace_direction</code>.
  </p>
  <p>
    All stylesheets in <code>assets/css/rtl.css</code> automatically flip flex directions, text alignments, padding, and dropdown menus.
  </p>
  `,
  'rtl-guide'
);
fs.writeFileSync(path.join(DOC_DIR, 'rtl-guide.html'), docRtlHtml, 'utf8');

// 7. credits.html
const docCreditsHtml = docWrapper(
  'Credits & Licensing',
  `
  <h2>7. Credits &amp; Asset Attribution</h2>
  <p>All third-party resources, fonts, and photography used in the PlaySpace template are properly licensed for commercial and personal use.</p>
  <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--ps-border-color);">

  <table class="ps-table">
    <thead>
      <tr><th>Resource</th><th>Author / Source</th><th>License</th></tr>
    </thead>
    <tbody>
      <tr><td>Plus Jakarta Sans Font</td><td>Google Fonts / Tokotype</td><td>SIL Open Font License 1.1</td></tr>
      <tr><td>High-Res Photography</td><td>Unsplash (Kids &amp; Sports Photographers)</td><td>Unsplash Free Commercial License</td></tr>
      <tr><td>SVG Icons</td><td>Custom geometric SVG vectors</td><td>MIT License</td></tr>
      <tr><td>Canvas Charts Engine</td><td>Self-contained vanilla HTML5 Canvas</td><td>MIT License</td></tr>
    </tbody>
  </table>
  `,
  'credits'
);
fs.writeFileSync(path.join(DOC_DIR, 'credits.html'), docCreditsHtml, 'utf8');

console.log('Built all 7 documentation pages successfully');
