const fs = require('fs');
const path = require('path');

const galleryHtml = fs.readFileSync(path.join(__dirname, '../pages/gallery.html'), 'utf8');
const { ATTRACTION_ZONES } = require('./attractions-data');

// Extract all gallery items
const items = [];
const parts = galleryHtml.split('class="ps-gallery-item"');
for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  const idMatch = part.match(/data-gallery-id="([^"]+)"/);
  const catMatch = part.match(/data-category="([^"]+)"/);
  const srcMatch = part.match(/<img\s+src="([^"]+)"\s+alt="([^"]+)"/);
  const titleMatch = part.match(/<h4[^>]*>([^<]+)<\/h4>/);
  const descMatch = part.match(/<p[^>]*>([^<]+)<\/p>/);

  items.push({
    index: i,
    id: idMatch ? idMatch[1] : '',
    category: catMatch ? catMatch[1] : '',
    src: srcMatch ? srcMatch[1] : '',
    alt: srcMatch ? srcMatch[2] : '',
    title: titleMatch ? titleMatch[1] : '',
    desc: descMatch ? descMatch[1] : ''
  });
}

console.log(`Found ${items.length} gallery items in gallery.html:\n`);
items.forEach(it => {
  const isUnsplash = it.src.includes('unsplash');
  console.log(`${it.index}. [${it.id}] Title: "${it.title}" | Unsplash: ${isUnsplash ? 'YES' : 'NO'}`);
  console.log(`   src: ${it.src}`);
});

console.log('\n--- ATTRACTION_ZONES Reference (21 zones) ---');
ATTRACTION_ZONES.forEach((z, idx) => {
  console.log(`${idx + 1}. [${z.id}] "${z.title}" -> heroImage: ${z.heroImage}`);
});
