const fs = require('fs');
const path = require('path');
const { ATTRACTION_ZONES } = require('./attractions-data');

const ROOT_DIR = fs.existsSync(path.resolve(__dirname, '..', 'pages'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..', 'playspace');
const PAGES_DIR = path.join(ROOT_DIR, 'pages');

const requiredSections = [
  { name: 'Navbar', check: (c) => c.includes('ps-header') && c.includes('ps-navbar') },
  { name: 'Breadcrumbs', check: (c) => c.includes('ps-breadcrumb') && c.includes('Home') },
  { name: 'Back to Attractions Link', check: (c) => c.includes('attractions.html') && c.includes('Back to All Attractions') },
  { name: 'Hero Section', check: (c) => c.includes('<h1') && (c.includes('Add to Cart') || c.includes('Book This Zone')) },
  { name: 'About the Attraction', check: (c) => c.includes('About the') },
  { name: 'Activities & Experiences', check: (c) => c.includes('Activities &amp; Experiences in this Zone') },
  { name: 'Unique Highlights & Features', check: (c) => c.includes('Unique Highlights &amp; Features') },
  { name: 'Recommended Age Group', check: (c) => c.includes('Recommended Age &amp; Requirements') && c.includes('Official Age Suitability') },
  { name: 'Specific Safety Guidelines', check: (c) => c.includes('Zone Safety Guidelines') },
  { name: 'Action Gallery Removed', check: (c) => !c.includes('ACTION GALLERY') },
  { name: 'Developmental Benefits', check: (c) => c.includes('Why Kids &amp; Parents Love This Zone') },
  { name: 'Attraction-Specific FAQs', check: (c) => c.includes('FAQs') && c.includes('Q.') },
  { name: 'Book This Zone Banner CTA', check: (c) => c.includes('Ready to Jump into') && c.includes('Book Your Play Session') },
  { name: 'Related Attractions', check: (c) => c.includes('Related Attractions You\'ll Love') && c.includes('View Details') },
  { name: 'Footer', check: (c) => c.includes('ps-footer') && c.includes('ASTM F2970-20 Certified') }
];

let failed = 0;

ATTRACTION_ZONES.forEach(zone => {
  const filename = `attraction-${zone.id}.html`;
  const filePath = path.join(PAGES_DIR, filename);

  if (!fs.existsSync(filePath)) {
    console.error(`MISSING FILE: ${filename}`);
    failed++;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  requiredSections.forEach(sec => {
    if (!sec.check(content)) {
      console.error(`[${filename}] Missing section: ${sec.name}`);
      failed++;
    }
  });
});

// Check attraction-details.html as well
const flagshipPath = path.join(PAGES_DIR, 'attraction-details.html');
if (!fs.existsSync(flagshipPath)) {
  console.error('MISSING FILE: attraction-details.html');
  failed++;
} else {
  const content = fs.readFileSync(flagshipPath, 'utf8');
  requiredSections.forEach(sec => {
    if (!sec.check(content)) {
      console.error(`[attraction-details.html] Missing section: ${sec.name}`);
      failed++;
    }
  });
}

if (failed === 0) {
  console.log(`ALL ${ATTRACTION_ZONES.length} individual attraction detail pages + attraction-details.html passed all 15 content & structure checks!`);
} else {
  console.error(`Found ${failed} structural or content failures across attraction pages.`);
}
