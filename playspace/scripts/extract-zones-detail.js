const fs = require('fs');
const path = require('path');

const attractionsHtml = fs.readFileSync(path.join(__dirname, '../playspace/pages/attractions.html'), 'utf8');

// Match each attraction card block
const cardRegex = /<div class="ps-attraction-card"[^>]*data-attraction-category="([^"]+)"[\s\S]*?<div class="ps-attraction-thumb"[^>]*>[\s\S]*?<img src="([^"]+)" alt="([^"]+)"[\s\S]*?<span class="ps-badge ps-attraction-badge"[^>]*>([\s\S]*?)<\/span>[\s\S]*?<h3[^>]*>\s*(\d+)\.\s*([^<]+)<\/h3>[\s\S]*?<p class="text-muted"[^>]*>([\s\S]*?)<\/p>/g;

const items = [];
let match;
while ((match = cardRegex.exec(attractionsHtml)) !== null) {
  items.push({
    category: match[1],
    imgSrc: match[2],
    imgAlt: match[3],
    badge: match[4].trim(),
    num: parseInt(match[5], 10),
    title: match[6].trim(),
    desc: match[7].trim()
  });
}

console.log('Total zones extracted:', items.length);
fs.writeFileSync(path.join(__dirname, 'extracted-27-zones.json'), JSON.stringify(items, null, 2), 'utf8');
console.log('Wrote extracted-27-zones.json');
