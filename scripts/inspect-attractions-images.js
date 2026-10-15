const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../playspace/pages/attractions.html'), 'utf8');

const regex = /<div class="ps-attraction-card"[^>]*>[\s\S]*?<img src="([^"]+)" alt="([^"]+)"[\s\S]*?<h3[^>]*>\s*(\d+)\.\s*([^<]+)<\/h3>/g;
let m;
let count = 0;
const cards = [];

while ((m = regex.exec(html)) !== null) {
  count++;
  cards.push({
    num: parseInt(m[3], 10),
    title: m[4].trim(),
    src: m[1],
    alt: m[2]
  });
  console.log(`${m[3]}. ${m[4]} --> ${m[1]}`);
}

console.log(`Total attraction cards found: ${count}`);
