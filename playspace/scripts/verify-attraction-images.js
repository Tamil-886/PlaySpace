const fs = require('fs');
const path = require('path');
const { ATTRACTION_ZONES } = require('./attractions-data');

let missingHero = 0;
let missingSlug = 0;

ATTRACTION_ZONES.forEach(z => {
  const heroClean = path.join(__dirname, '..', decodeURIComponent(z.heroImage.replace(/^\.\.\//, '')));
  if (!fs.existsSync(heroClean)) {
    console.log('Hero missing for:', z.id, heroClean);
    missingHero++;
  } else {
    console.log(`✓ [${z.id}] Hero found: ${path.basename(heroClean)}`);
  }

  const slugPath = path.join(__dirname, '..', 'assets', 'images', 'attractions', `${z.id}.jpg`);
  if (!fs.existsSync(slugPath)) {
    console.log('Slug missing for:', z.id, slugPath);
    missingSlug++;
  }
});

console.log('Summary:');
console.log('Missing Hero images:', missingHero);
console.log('Missing Slug images:', missingSlug);
