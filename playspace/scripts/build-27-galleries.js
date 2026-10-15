const fs = require('fs');
const path = require('path');
const data = require('./attractions-data.js');
const zones = require('./extracted-27-zones.json');

// Local images mapping for the 10 zones with dedicated local folders
const localSets = {
  1: [
    '../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224655.jpg',
    '../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224641.jpg',
    '../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224651.jpg'
  ],
  2: [
    '../assets/images/attractions/Ninja%20Warrior%20Course/Child_running_ninja_course_2K_20261013225811.jpg',
    '../assets/images/attractions/Ninja%20Warrior%20Course/Child_running_ninja_course_2K_20261013225830.jpg',
    '../assets/images/attractions/Ninja%20Warrior%20Course/Ninja_warrior_course_for_children_2K_20261013225815.jpg'
  ],
  3: [
    '../assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil%E2%80%A6_2K_20261013230351.jpg',
    '../assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil%E2%80%A6_2K_20261013230359.jpg',
    '../assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil%E2%80%A6_2K_20261013230406.jpg'
  ],
  4: [
    'https://images.unsplash.com/photo-1750082828854-61333b7b9e95?auto=format&fit=crop&w=1200&q=80',
    '../assets/images/attractions/Super%20Slide%20Mountain/Super_Slide_Mountain_for_3_2K_20261013231319.jpg',
    '../assets/images/attractions/Super%20Slide%20Mountain/Super_Slide_Mountain_for_3_2K_20261013231327.jpg'
  ],
  5: [
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=80',
    '../assets/images/attractions/Rainbow%20Ball%20Pit/Rainbow_Ball_Pit_2K_20261013231429.jpg',
    '../assets/images/attractions/Rainbow%20Ball%20Pit/Rainbow_ball_pit_for_children_2K_20261013231412.jpg'
  ],
  6: [
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    '../assets/images/attractions/Sky-High%20Rope%20Adventure/Child_climbing_rope_adventure_2K_20261013231646.jpg',
    '../assets/images/attractions/Sky-High%20Rope%20Adventure/Child_doing_rope_adventure_2K_20261013231642.jpg'
  ],
  7: [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    '../assets/images/attractions/Foam%20Pit%20Challenge/Child_in_foam_pit_2K_20261013231811.jpg',
    '../assets/images/attractions/Foam%20Pit%20Challenge/Child_doing_foam_pit_challenge_2K_20261013231817.jpg'
  ],
  8: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    '../assets/images/attractions/Laser%20Maze%20Mission/Laser_Maze_Mission_age_5_2K_20261013231946.jpg',
    '../assets/images/attractions/Laser%20Maze%20Mission/Laser_Maze_Mission_age_5_2K_20261013231952.jpg'
  ],
  9: [
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    '../assets/images/attractions/Interactive%20Play%20Arena/Interactive_play_arena_for_children_2K_20261013232047.jpg',
    '../assets/images/attractions/Interactive%20Play%20Arena/Interactive_play_arena_for_children_2K_20261013232054.jpg'
  ],
  10: [
    'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=1200&q=80',
    '../assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233235.jpg',
    '../assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233240.jpg'
  ],
  23: [
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    '../assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233246.jpg',
    '../assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233259.jpg'
  ]
};

const collections = zones.map((z, idx) => {
  const az = data.ATTRACTION_ZONES.find(x => x.id === z.id || x.num === z.num);
  let images = [];

  if (localSets[z.num]) {
    images = localSets[z.num].map((url, i) => {
      const cap = (az && az.gallery && az.gallery[i]) ? az.gallery[i].caption : z.desc;
      const title = (i === 0) ? `${z.title} - Main Attraction` : (az && az.activities && az.activities[i - 1] ? az.activities[i - 1].title : `${z.title} Action View ${i + 1}`);
      return { src: url, title, caption: cap };
    });
  } else {
    // 1st image is always z.imgSrc from attractions.html
    images.push({
      src: z.imgSrc,
      title: `${z.title} - Main Attraction`,
      caption: (az && az.gallery && az.gallery[0]) ? az.gallery[0].caption : z.desc
    });

    if (az && az.gallery) {
      for (let gi = 0; gi < az.gallery.length && images.length < 3; gi++) {
        const g = az.gallery[gi];
        // Normalize url comparison
        const normG = g.url.replace(/&w=\d+/, '');
        const normZ = z.imgSrc.replace(/&w=\d+/, '');
        if (normG !== normZ && !images.some(im => im.src.replace(/&w=\d+/, '') === normG)) {
          const actTitle = (az.activities && az.activities[images.length - 1]) ? az.activities[images.length - 1].title : `${z.title} View ${images.length + 1}`;
          images.push({
            src: g.url,
            title: actTitle,
            caption: g.caption
          });
        }
      }
    }
  }

  return {
    id: z.id,
    num: z.num,
    title: z.title,
    badge: z.badge,
    category: z.category,
    desc: z.desc,
    images
  };
});

console.log('Total collections generated:', collections.length);
collections.forEach((c, idx) => {
  console.log(`${idx + 1}. ${c.title}: ${c.images.length} images`);
  if (c.images.length !== 3) {
    console.error('  ERROR: Does not have 3 images!', c);
  }
  const srcs = new Set(c.images.map(img => img.src));
  if (srcs.size !== 3) {
    console.error('  ERROR: Duplicate images within collection!', c.title);
  }
});

module.exports = { collections };
