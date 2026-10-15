const fs = require('fs');
const path = require('path');

const files = [
  'playspace/index.html',
  'playspace/home-2.html',
  'playspace/pages/about.html',
  'playspace/pages/attractions.html',
  'playspace/pages/attraction-details.html',
  'playspace/pages/birthday-parties.html',
  'playspace/pages/birthday-details.html',
  'playspace/pages/group-events.html',
  'playspace/pages/pricing-passes.html',
  'playspace/pages/gallery.html',
  'playspace/pages/safety-guidelines.html',
  'playspace/pages/faq.html',
  'playspace/pages/testimonials.html',
  'playspace/pages/contact.html',
  'playspace/pages/blog.html',
  'playspace/pages/blog-details.html',
  'playspace/admin/attractions.html',
  'playspace/admin/schedule.html',
  'playspace/admin/dashboard.html',
  'playspace/parent/book-session.html',
  'playspace/parent/dashboard.html'
];

const zoneInventory = new Map();

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  
  // Search for phrases that look like attractions/zones
  const patterns = [
    /([A-Z][a-zA-Z0-9\s&'-]+(?:Arena|Course|Zone|Mountain|Pit|Adventure|Climber|Trail|Tower|Climb|Challenge|Quest|Maze|Zipline|Wall|Lagoon|Playground|Runway|Matrix|Crater))/g
  ];

  patterns.forEach(pat => {
    let m;
    while ((m = pat.exec(content)) !== null) {
      const match = m[1].trim().replace(/\s+/g, ' ');
      if (match.length > 5 && match.length < 45 && !match.includes('ASTM') && !match.includes('Every') && !match.includes('All') && !match.includes('Our') && !match.includes('Explore') && !match.includes('Check')) {
        if (!zoneInventory.has(match)) {
          zoneInventory.set(match, []);
        }
        zoneInventory.get(match).push(file);
      }
    }
  });
});

for (const [zone, fList] of zoneInventory.entries()) {
  console.log(`${zone} -> in ${fList.length} files (${fList.slice(0, 3).join(', ')})`);
}
