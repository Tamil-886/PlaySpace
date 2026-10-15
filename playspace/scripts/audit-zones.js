const fs = require('fs');
const path = require('path');

const zoneMatches = new Set();
const attractionFiles = [];

function scan(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      scan(full);
    } else if (f.name.endsWith('.html') || f.name.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      
      // Look for data-attraction, attraction card titles, zone mentions
      const regex = /(Mega Trampoline Arena|Ninja Warrior Course|Adventure Climbing Zone|Super Slide Mountain|Rainbow Ball Pit|Sky-High Rope Adventure|Foam Pit Challenge|Laser Maze Mission|Interactive Play Arena|Little Explorers Zone|Cargo Net Climber|Balance & Bounce Trail|Neon Glow Adventure|Mini Sports Arena|Mystery Tunnel Quest|Spider Wall Climb|Parkour Jump Zone|Adventure Tower|Volcano Climb|Wipeout Challenge|Airbag Jump Zone|Mini Zipline Adventure|Treasure Hunt Zone|Trampoline Arena|Soft Play Zone|Ball Pit|Climbing Wall|Slides & Tunnels|Toddler Play Zone|Toddler Lagoon|Interactive Play Area|Sensory Zone|Pretend Play|Dodgeball Cage|Slam Dunk|Battle Beam|Tumble Track|Airbag|Glow Zone|VIP Party Room)/gi;
      
      let m;
      while ((m = regex.exec(content)) !== null) {
        zoneMatches.add(m[1].toLowerCase());
      }
    }
  }
}

scan('playspace');
scan('scripts');

console.log('--- AUDITED ZONE MENTIONS ---');
console.log(Array.from(zoneMatches).sort());
