const fs = require('fs');

const html = fs.readFileSync('playspace/pages/attractions.html', 'utf8');
const cards = [];
const reg = /<h3[^>]*>([^<]+)<\/h3>/g;
let m;
while ((m = reg.exec(html)) !== null) {
  cards.push(m[1].trim());
}
console.log('Attraction cards in attractions.html:', cards);

const links = [];
const linkReg = /href="([^"]*attraction[^"]*)"/g;
while ((m = linkReg.exec(html)) !== null) {
  links.push(m[1]);
}
console.log('Attraction links in attractions.html:', [...new Set(links)]);

const home1 = fs.readFileSync('playspace/index.html', 'utf8');
const home2 = fs.readFileSync('playspace/home-2.html', 'utf8');

function extractZones(content, label) {
  const titles = [];
  const r = /<h[34][^>]*>([^<]+)<\/h[34]>/g;
  let match;
  while ((match = r.exec(content)) !== null) {
    titles.push(match[1].trim());
  }
  console.log('Titles in ' + label + ':', titles);
}

extractZones(home1, 'index.html');
extractZones(home2, 'home-2.html');
