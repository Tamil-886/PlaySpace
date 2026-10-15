const fs = require('fs');
const path = require('path');

const files = [];
function findFiles(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) findFiles(p);
    else if (p.endsWith('.html') || p.endsWith('.js')) files.push(p);
  }
}
findFiles('playspace');
findFiles('scripts');

const keywords = [
  "Trampoline", "Soft Play", "Ninja", "Climbing", "Slide", "Ball Pit", 
  "Rope", "Foam", "Laser", "Interactive", "Toddler", "Explorer", 
  "Cargo", "Balance", "Glow", "Sports", "Tunnel", "Spider", 
  "Parkour", "Tower", "Volcano", "Wipeout", "Airbag", "Zipline", 
  "Treasure", "Sensory", "Pretend", "Dodgeball", "Slam Dunk", "Battle Beam", 
  "Tumble Track", "Warrior", "Lagoon", "Arena", "Zone"
];

const found = {};
keywords.forEach(kw => { found[kw] = new Set(); });

files.forEach(file => {
  const c = fs.readFileSync(file, 'utf8');
  keywords.forEach(kw => {
    const reg = new RegExp(`[A-Za-z0-9&\\s'-]{3,25}\\b${kw}\\b[A-Za-z0-9&\\s'-]{0,25}`, "gi");
    let m;
    while ((m = reg.exec(c)) !== null) {
      const matchText = m[0].trim().replace(/\s+/g, ' ');
      if (matchText.length > 4 && matchText.length < 50) {
        // filter out pure code/css
        if (!matchText.includes('<') && !matchText.includes('>') && !matchText.includes('{') && !matchText.includes('}') && !matchText.includes(';')) {
          found[kw].add(matchText);
        }
      }
    }
  });
});

const report = {};
for (const [kw, set] of Object.entries(found)) {
  report[kw] = Array.from(set).slice(0, 15);
}

fs.writeFileSync('scripts/zone_report.json', JSON.stringify(report, null, 2));
console.log('Report saved to scripts/zone_report.json');
