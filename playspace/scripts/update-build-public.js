const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'build-public-pages.js');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const startIndex = lines.findIndex(l => l.includes('// 2. attractions.html'));
const endIndex = lines.findIndex(l => l.includes("fs.writeFileSync(path.join(PAGES_DIR, 'attraction-details.html')"));

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = [
    '// 2. attractions.html & 3. Individual Attraction Details Pages + attraction-details.html',
    "const { generateAttractionsPage } = require('./generate-attractions-page');",
    "const { buildIndividualAttractions } = require('./build-individual-attractions');",
    '',
    'generateAttractionsPage();',
    'buildIndividualAttractions();'
  ];

  const newLines = [
    ...lines.slice(0, startIndex),
    ...replacement,
    ...lines.slice(endIndex + 1)
  ];

  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log(`Successfully streamlined build-public-pages.js! Replaced lines ${startIndex + 1} to ${endIndex + 1}.`);
} else {
  console.error('Could not find start or end index:', startIndex, endIndex);
}
