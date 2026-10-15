const fs = require('fs');
const path = require('path');

const pagesDir = path.resolve(__dirname, '..', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => (f.startsWith('attraction-') && f.endsWith('.html')));

console.log(`Found ${files.length} attraction pages to process.`);

let totalHeroUpdated = 0;
let totalCardsUpdated = 0;

files.forEach(filename => {
  const filePath = path.join(pagesDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Derive slug
  let slug = filename.replace('attraction-', '').replace('.html', '');
  if (slug === 'details') {
    slug = 'details';
  }

  // 1. Replace Hero "Book This Zone" button
  // Matches any <a href="...attraction=..." ...> Book This Zone <svg...>...</svg> </a>
  const heroRegex = /<a\s+href="[^"]*booking\.html\?attraction=[^"]*"\s+class="ps-btn ps-btn-primary ps-btn-lg"[^>]*style="box-shadow: 0 4px 15px rgba\(255, 204, 0, 0\.4\);"[^>]*>\s*Book This Zone\s*<svg[^>]*>[\s\S]*?<\/svg>\s*<\/a>/gi;

  if (heroRegex.test(content)) {
    content = content.replace(heroRegex, `<button type="button" class="ps-btn ps-btn-primary ps-btn-lg ps-btn-add-cart" data-add-cart="attraction-${slug}" aria-label="Add to Cart - Book This Zone" style="box-shadow: 0 4px 15px rgba(255, 204, 0, 0.4);">
              Add to Cart 🛒
            </button>`);
    totalHeroUpdated++;
  } else {
    // Fallback regex for variations in spacing/quotes
    const fallbackHeroRegex = /<a[^>]*href="[^"]*(?:booking|book-session)\.html\?attraction=[^"]*"[^>]*class="[^"]*ps-btn[^"]*ps-btn-primary[^"]*"[^>]*>[\s\S]*?Book This Zone[\s\S]*?<\/a>/gi;
    if (fallbackHeroRegex.test(content)) {
      content = content.replace(fallbackHeroRegex, `<button type="button" class="ps-btn ps-btn-primary ps-btn-lg ps-btn-add-cart" data-add-cart="attraction-${slug}" aria-label="Add to Cart - Book This Zone" style="box-shadow: 0 4px 15px rgba(255, 204, 0, 0.4);">
              Add to Cart 🛒
            </button>`);
      totalHeroUpdated++;
    }
  }

  // 2. Replace related attractions "Book Slot" buttons with "Add to Cart 🛒"
  const slotRegex = /<a\s+href="[^"]*(?:booking|book-session)\.html\?attraction=([^"]+)"\s+class="ps-btn ps-btn-primary ps-btn-sm"[^>]*style="flex: 1; text-align: center;">Book Slot<\/a>/gi;
  content = content.replace(slotRegex, (match, relSlug) => {
    totalCardsUpdated++;
    return `<button type="button" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-add-cart" data-add-cart="attraction-${relSlug}" style="flex: 1; text-align: center;">Add to Cart 🛒</button>`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${filename}`);
  } else {
    console.log(`- No changes needed: ${filename}`);
  }
});

console.log('--------------------------------------------------');
console.log(`Completed: ${totalHeroUpdated} hero buttons updated, ${totalCardsUpdated} related card buttons updated.`);
