const fs = require('fs');
const path = require('path');

const galleryHtmlPath = path.join(__dirname, '../pages/gallery.html');
let html = fs.readFileSync(galleryHtmlPath, 'utf8');

const { ATTRACTION_ZONES } = require('./attractions-data');

// Load GALLERY_COLLECTIONS from gallery.js
const galleryJsCode = fs.readFileSync(path.join(__dirname, '../assets/js/gallery.js'), 'utf8');
const match = galleryJsCode.match(/var GALLERY_COLLECTIONS = (\[[\s\S]*?\]);\s*\n\s*\/\/ Active state/);
const collections = eval(match[1]);

console.log('Total ATTRACTION_ZONES:', ATTRACTION_ZONES.length);
console.log('Total GALLERY_COLLECTIONS:', collections.length);

let updatedCount = 0;

ATTRACTION_ZONES.forEach(zone => {
  const col = collections.find(c => c.id === zone.id);
  const correctImgSrc = col ? col.images[0].src : zone.heroImage;

  // Find the ps-gallery-item block for this zone
  const itemRegex = new RegExp(
    `(<div class="ps-gallery-item"[^>]*data-gallery-id="${zone.id}"[\\s\\S]*?<img src=")[^"]+(" alt="[^"]*"[^>]*>)`,
    'g'
  );

  if (itemRegex.test(html)) {
    html = html.replace(itemRegex, `$1${correctImgSrc}$2`);
    console.log(`✓ Updated [${zone.id}] -> ${correctImgSrc}`);
    updatedCount++;
  } else {
    console.warn(`⚠ Could not find gallery item block for: ${zone.id}`);
  }
});

fs.writeFileSync(galleryHtmlPath, html, 'utf8');
console.log(`\nSuccessfully updated ${updatedCount} gallery card images in gallery.html!`);
