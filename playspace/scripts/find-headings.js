const fs = require('fs');
const path = require('path');

const files = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) walk(full);
    else if (f.name.endsWith('.html') || f.name.endsWith('.js')) files.push(full);
  }
}
walk('playspace');

const zonePhrases = new Set();
const patterns = [
  /class="[^"]*attraction[^"]*"[^>]*>([^<]+)/gi,
  /data-attraction="([^"]+)"/gi,
  /<h4>([^<]+(?:Arena|Zone|Course|Pit|Mountain|Trail|Tower|Climb|Quest|Maze|Zipline|Wall|Lagoon|Crater|Track|Beam|Cage|Sanctuary|Runways|Airbag))<\/h4>/gi,
  /<h3>([^<]+(?:Arena|Zone|Course|Pit|Mountain|Trail|Tower|Climb|Quest|Maze|Zipline|Wall|Lagoon|Crater|Track|Beam|Cage|Sanctuary|Runways|Airbag))<\/h3>/gi,
  /<h2>([^<]+(?:Arena|Zone|Course|Pit|Mountain|Trail|Tower|Climb|Quest|Maze|Zipline|Wall|Lagoon|Crater|Track|Beam|Cage|Sanctuary|Runways|Airbag))<\/h2>/gi
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  patterns.forEach(pat => {
    let m;
    while ((m = pat.exec(content)) !== null) {
      zonePhrases.add(m[1].trim());
    }
  });
});

console.log('Detected Zone Headings/Tags:');
console.log(Array.from(zonePhrases).sort());
