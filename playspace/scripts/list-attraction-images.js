const fs = require('fs');
const path = require('path');

const attractionsHtml = fs.readFileSync(path.join(__dirname, '../playspace/pages/attractions.html'), 'utf8');

const regex = /<div class="ps-attraction-card"[\s\S]*?<img src="([^"]+)"[\s\S]*?<h3[^>]*>\s*(\d+\.\s*[^<]+)<\/h3>/g;
const matches = [...attractionsHtml.matchAll(regex)];

console.log('Total extracted from attractions.html:', matches.length);
matches.forEach((m, idx) => {
  console.log(`${idx + 1}. ${m[2].trim()} => ${m[1]}`);
});
