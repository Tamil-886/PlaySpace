/**
 * PlaySpace - Interactive Gallery & Lightbox Controller
 * 
 * Features:
 * - 21 Unique Gallery Collections corresponding to the 21 Attraction Zones.
 * - Each gallery displays its own unique set of exactly 3 relevant images.
 * - Individual Gallery View Modal displaying collection info and 3 curated photos.
 * - Full-Screen Lightbox with Next, Previous, and Close (X) buttons.
 * - Lightbox allows closing via Escape key and clicking outside the image.
 * - Next/Previous navigates through the 3 photos with counter (Photo 1 of 3).
 * - Smooth CSS transitions and accessible focus / keyboard handlers.
 * - Fully responsive on mobile, tablet, and desktop.
 */

(function () {
  'use strict';

  // 27 Bespoke Gallery Datasets (each with exactly 3 unique, relevant images)
  var GALLERY_COLLECTIONS = [
    {
      id: "mega-trampoline-arena",
      num: 1,
      title: "Mega Trampoline Arena",
      badge: "AGES 4+",
      category: "trampolines",
      desc: "Jump high, bounce freely, and enjoy energetic jumping challenges across our flagship court designed for jumpers of all ages.",
      images: [
        {
          src: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224655.jpg",
          title: "Mega Trampoline Arena - Main Attraction",
          caption: "High-flying leaps over the 70-bed interconnected trampoline matrix."
        },
        {
          src: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224641.jpg",
          title: "Open Flight Jumping",
          caption: "Kids practicing bounce techniques on padded tumble tracks."
        },
        {
          src: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224651.jpg",
          title: "Wall-Run Leaps",
          caption: "Spacious court layout featuring 45-degree rebound perimeter walls."
        }
      ]
    },
    {
      id: "ninja-warrior-course",
      num: 2,
      title: "Ninja Warrior Course",
      badge: "AGES 6 - 15 YEARS",
      category: "climbing",
      desc: "Climb, crawl, balance, and conquer exciting obstacle challenges that test your grip, speed, and agility.",
      images: [
        {
          src: "../assets/images/attractions/Ninja%20Warrior%20Course/Child_running_ninja_course_2K_20261013225811.jpg",
          title: "Ninja Warrior Course - Main Attraction",
          caption: "Jumpers tackling suspended ring grips over cushioned safety landing pads."
        },
        {
          src: "../assets/images/attractions/Ninja%20Warrior%20Course/Child_running_ninja_course_2K_20261013225830.jpg",
          title: "Warped Wall Sprint",
          caption: "Climbers testing their upper-body strength on the horizontal rope traverse."
        },
        {
          src: "../assets/images/attractions/Ninja%20Warrior%20Course/Ninja_warrior_course_for_children_2K_20261013225815.jpg",
          title: "Suspended Ring Traverse",
          caption: "Sprinting up the 10ft warped wall to strike the summit buzzer."
        }
      ]
    },
    {
      id: "adventure-climbing-zone",
      num: 3,
      title: "Adventure Climbing Zone",
      badge: "AGES 5 - 14 YEARS",
      category: "climbing",
      desc: "Explore climbing frames, fun pathways, and exciting elevated play structures with 100% fail-safe auto-belay descenders.",
      images: [
        {
          src: "../assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil%E2%80%A6_2K_20261013230351.jpg",
          title: "Adventure Climbing Zone - Main Attraction",
          caption: "Climbers ascending illuminated auto-belay spires in full safety harnesses."
        },
        {
          src: "../assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil%E2%80%A6_2K_20261013230359.jpg",
          title: "Auto-Belay High Tower Ascent",
          caption: "Reaching the summit and tapping the electronic finish buzzer."
        },
        {
          src: "../assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil%E2%80%A6_2K_20261013230406.jpg",
          title: "Timed Dual Speed Races",
          caption: "Feather-soft controlled magnetic descents back down to the padded landing floor."
        }
      ]
    },
    {
      id: "super-slide-mountain",
      num: 4,
      title: "Super Slide Mountain",
      badge: "AGES 3 - 12 YEARS",
      category: "softplay",
      desc: "Race down colorful slides and enjoy thrilling rides into the soft-play area with safe, padded deceleration lanes.",
      images: [
        {
          src: "../assets/images/attractions/Super%20Slide%20Mountain/Super_Slide_Mountain_2K_20261013231315.jpg",
          title: "Super Slide Mountain - Main Attraction",
          caption: "Four racing lanes lined up for adrenaline-pumping downhill races."
        },
        {
          src: "../assets/images/attractions/Super%20Slide%20Mountain/Super_Slide_Mountain_for_3_2K_20261013231319.jpg",
          title: "Quad Rainbow Racing",
          caption: "Cushioned deceleration runout bays ensuring gentle, giggly landings."
        },
        {
          src: "../assets/images/attractions/Super%20Slide%20Mountain/Super_Slide_Mountain_for_3_2K_20261013231327.jpg",
          title: "Enclosed Corkscrew Tube",
          caption: "Enclosed spiral speed tube providing 360 degrees of exciting twists."
        }
      ]
    },
    {
      id: "rainbow-ball-pit",
      num: 5,
      title: "Rainbow Ball Pit",
      badge: "AGES 1 - 6 YEARS",
      category: "softplay",
      desc: "Dive into a colorful ball pool filled with playful activities, sensory chutes, and sparkling clean surprises.",
      images: [
        {
          src: "../assets/images/attractions/Rainbow%20Ball%20Pit/Rainbow_Ball_Pit_2K_20261013231429.jpg",
          title: "Rainbow Ball Pit - Main Attraction",
          caption: "Thousands of clean rainbow balls creating an immersive sensory playground."
        },
        {
          src: "../assets/images/attractions/Rainbow%20Ball%20Pit/Rainbow_ball_pit_for_children_2K_20261013231412.jpg",
          title: "Pneumatic Vacuum Pipes",
          caption: "Toddlers exploring pneumatic vacuum tubes and colorful target games."
        },
        {
          src: "../assets/images/attractions/Rainbow%20Ball%20Pit/Rainbow_ball_pit_for_children_2K_20261013231423.jpg",
          title: "Tipping Bucket Splash",
          caption: "Deep cushioned ball pool providing gentle sensory pressure and endless giggles."
        }
      ]
    },
    {
      id: "sky-high-rope-adventure",
      num: 6,
      title: "Sky-High Rope Adventure",
      badge: "AGES 6 - 14 YEARS",
      category: "climbing",
      desc: "Test balance and coordination on exciting rope bridges and net obstacles with continuous overhead lifeline protection.",
      images: [
        {
          src: "../assets/images/attractions/Sky-High%20Rope%20Adventure/Child_climbing_rope_adventure_2K_20261013231646.jpg",
          title: "Sky-High Rope Adventure - Main Attraction",
          caption: "Young climbers traversing wobbling planks in full safety harnesses."
        },
        {
          src: "../assets/images/attractions/Sky-High%20Rope%20Adventure/Child_doing_rope_adventure_2K_20261013231642.jpg",
          title: "Wobble Plank Crossing",
          caption: "Overhead lifeline trolley system keeping participants 100% secure throughout."
        },
        {
          src: "../assets/images/attractions/Sky-High%20Rope%20Adventure/Child_on_rope_adventure_2K_20261013231652.jpg",
          title: "Zig-Zag Cable Traverse",
          caption: "Aerial bridge crossings providing panoramic bird's-eye views of the park."
        }
      ]
    },
    {
      id: "foam-pit-challenge",
      num: 7,
      title: "Foam Pit Challenge",
      badge: "AGES 5+",
      category: "trampolines",
      desc: "Jump into a soft foam landing zone and enjoy playful jumping challenges with zero-shock impact absorption.",
      images: [
        {
          src: "../assets/images/attractions/Foam%20Pit%20Challenge/Child_in_foam_pit_2K_20261013231811.jpg",
          title: "Foam Pit Challenge - Main Attraction",
          caption: "Jumper launching high into the deep bed of zero-shock foam cubes."
        },
        {
          src: "../assets/images/attractions/Foam%20Pit%20Challenge/Child_doing_foam_pit_challenge_2K_20261013231817.jpg",
          title: "Springboard Launch Flights",
          caption: "Olympic spring approach runway providing maximum vertical liftoff."
        },
        {
          src: "../assets/images/attractions/Foam%20Pit%20Challenge/Child_in_foam_pit_challenge_2K_20261013231823.jpg",
          title: "Cannonball Splashes",
          caption: "Padded gladiator balance beam spanning the center of the foam pit."
        }
      ]
    },
    {
      id: "laser-maze-mission",
      num: 8,
      title: "Laser Maze Mission",
      badge: "AGES 5+",
      category: "interactive",
      desc: "Navigate through a light-based maze and complete exciting secret agent missions with live countdown timers.",
      images: [
        {
          src: "../assets/images/attractions/Laser%20Maze%20Mission/Laser_Maze_Mission_age_5_2K_20261013231946.jpg",
          title: "Laser Maze Mission - Main Attraction",
          caption: "Glowing green laser grid crisscrossing the high-tech mission chamber."
        },
        {
          src: "../assets/images/attractions/Laser%20Maze%20Mission/Laser_Maze_Mission_age_5_2K_20261013231952.jpg",
          title: "Secret Agent Stealth Run",
          caption: "Secret agent crawling under low laser tripwires to reach the vault target."
        },
        {
          src: "../assets/images/attractions/Laser%20Maze%20Mission/Laser_Maze_Mission_age_5_2K_20261013232002.jpg",
          title: "Speed Rush Time Attack",
          caption: "Digital touch leaderboard displaying top agent mission completion times."
        }
      ]
    },
    {
      id: "interactive-play-arena",
      num: 9,
      title: "Interactive Play Arena",
      badge: "AGES 3+",
      category: "interactive",
      desc: "Play movement-based games with interactive lights, projections, and real-time motion-tracking video challenges.",
      images: [
        {
          src: "../assets/images/attractions/Interactive%20Play%20Arena/Interactive_play_arena_for_children_2K_20261013232047.jpg",
          title: "Interactive Play Arena - Main Attraction",
          caption: "ValoJump AR screen tracking a jumper's real-time movements inside the video game."
        },
        {
          src: "../assets/images/attractions/Interactive%20Play%20Arena/Interactive_play_arena_for_children_2K_20261013232054.jpg",
          title: "ValoJump AR Superhero Games",
          caption: "Interactive projection wall where kids throw soft balls at moving game targets."
        },
        {
          src: "../assets/images/attractions/Interactive%20Play%20Arena/Interactive_play_arena_for_children_2K_20261013232059.jpg",
          title: "Interactive Smash-Wall",
          caption: "Motion floor tiles lighting up under kids' footsteps in interactive dance games."
        }
      ]
    },
    {
      id: "little-explorers-zone",
      num: 10,
      title: "Little Explorers Zone",
      badge: "AGES 6 MONTHS – 3 YEARS",
      category: "toddlers",
      desc: "A gentle adventure space with mini slides, tunnels, and soft-play activities designed specially for toddlers.",
      images: [
        {
          src: "../assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233235.jpg",
          title: "Little Explorers Zone - Main Attraction",
          caption: "Gated toddler sanctuary featuring mini crawl ramps and soft sensory shapes."
        },
        {
          src: "../assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233240.jpg",
          title: "Gentle Foam Step Crawl",
          caption: "Tactile wall panels with spinning gears and sensory discovery boards."
        },
        {
          src: "../assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233246.jpg",
          title: "Mini Wavy Slide Fun",
          caption: "Low-height gentle foam slides providing safe first sliding adventures."
        }
      ]
    },
    {
      id: "cargo-net-climber",
      num: 11,
      title: "Cargo Net Climber",
      badge: "AGES 4 - 12 YEARS",
      category: "climbing",
      desc: "Climb through flexible net structures and discover new paths to explore high above the ground.",
      images: [
        {
          src: "../assets/images/attractions/Cargo%20Net%20Climber/Child_climbing_cargo_net_2K_20261013233720.jpg",
          title: "Cargo Net Climber - Main Attraction",
          caption: "Multi-tier cargo net climber with interconnected tubes and panoramic viewpoints."
        },
        {
          src: "../assets/images/attractions/Cargo%20Net%20Climber/Child_climbing_cargo_net_2K_20261013233725.jpg",
          title: "Horizontal Net Crawl",
          caption: "Kids scrambling through heavy-duty braided marine net tunnels."
        },
        {
          src: "../assets/images/attractions/Cargo%20Net%20Climber/Child_climbing_cargo_net_2K_20261013233735.jpg",
          title: "Inclined Web Ascent",
          caption: "Secure 3D rope climbing framework enclosed by fine-mesh safety netting."
        }
      ]
    },
    {
      id: "balance-bounce-trail",
      num: 12,
      title: "Balance & Bounce Trail",
      badge: "AGES 3 - 9 YEARS",
      category: "toddlers",
      desc: "Hop across stepping stones, balance on beams, and complete fun movement trails that build motor coordination.",
      images: [
        {
          src: "../assets/images/attractions/Balance%20%26%20Bounce%20Trail/Balance_%26_Bounce_Trail_2K_20261013233842.jpg",
          title: "Balance & Bounce Trail - Main Attraction",
          caption: "Colorful foam stepping stones challenging kids' balance and foot placement."
        },
        {
          src: "../assets/images/attractions/Balance%20%26%20Bounce%20Trail/Balance_and_Bounce_Trail_2K_20261013233837.jpg",
          title: "Stepping Stone Island Hop",
          caption: "Low-altitude wobble beams teaching balance without risk of falls."
        },
        {
          src: "../assets/images/attractions/Balance%20%26%20Bounce%20Trail/Balance_and_bounce_trail_2K_20261013233847.jpg",
          title: "Wobble Beam Walk",
          caption: "Agility trail lined with thick shock-absorbing floor matting."
        }
      ]
    },
    {
      id: "neon-glow-adventure",
      num: 13,
      title: "Neon Glow Adventure",
      badge: "AGES 4+",
      category: "interactive",
      desc: "Experience a colorful neon play zone with glowing lights, UV blacklight cannons, and exciting evening activities.",
      images: [
        {
          src: "../assets/images/attractions/Neon%20Glow%20Adventure/Neon_Glow_Adventure_for_kids_2K_20261013234014.jpg",
          title: "Neon Glow Adventure - Main Attraction",
          caption: "Blacklight illumination transforming the entire adventure arena into a glowing wonderland."
        },
        {
          src: "../assets/images/attractions/Neon%20Glow%20Adventure/Kids_neon_glow_adventure_2K_20261013234022.jpg",
          title: "Blacklight Play Experience",
          caption: "Vibrant neon play elements glowing brightly under UV blacklights."
        },
        {
          src: "../assets/images/attractions/Neon%20Glow%20Adventure/Neon_Glow_Adventure_for_kids_2K_20261013234017.jpg",
          title: "Glow Night Exploration",
          caption: "Jumpers glowing under commercial 365nm UV blacklight illumination."
        }
      ]
    },
    {
      id: "mini-sports-arena",
      num: 14,
      title: "Mini Sports Arena",
      badge: "AGES 4 - 14 YEARS",
      category: "trampolines",
      desc: "Enjoy mini basketball, target games, slam dunk runways, and friendly team competitions in an enclosed cage.",
      images: [
        {
          src: "../assets/images/attractions/Mini%20Sports%20Arena/Kids_playing_in_sports_arena_2K_20261013235314.jpg",
          title: "Mini Sports Arena - Main Attraction",
          caption: "Spring-assisted runway leading to regulation breakaway basketball slam dunk hoops."
        },
        {
          src: "../assets/images/attractions/Mini%20Sports%20Arena/Kids_playing_sports_arena_2K_20261013234224.jpg",
          title: "Multi-Sport Court Action",
          caption: "Kids practicing soccer shots and basketball layups in an enclosed padded arena."
        },
        {
          src: "../assets/images/attractions/Mini%20Sports%20Arena/Kids_playing_sports_arena_2K_20261013234228.jpg",
          title: "Target Challenge Games",
          caption: "Fully netted sports zone with target hoops and electronic score tracking."
        }
      ]
    },
    {
      id: "mystery-tunnel-quest",
      num: 15,
      title: "Mystery Tunnel Quest",
      badge: "AGES 3 - 10 YEARS",
      category: "toddlers",
      desc: "Crawl through winding tunnels and discover hidden routes in a playful maze filled with observation bubble domes.",
      images: [
        {
          src: "../assets/images/attractions/Mystery%20Tunnel%20Quest/Mystery_Tunnel_Quest_2K_20261014002606.jpg",
          title: "Mystery Tunnel Quest - Main Attraction",
          caption: "Padded winding crawl tunnels with warm LED glow path markers."
        },
        {
          src: "../assets/images/attractions/Mystery%20Tunnel%20Quest/Kids_exploring_mystery_tunnel_2K_20261014002737.jpg",
          title: "Subterranean Tunnel Crawl",
          caption: "Kids peeking through illuminated crawl passages and discovering secret exits."
        },
        {
          src: "../assets/images/attractions/Mystery%20Tunnel%20Quest/Kids_mystery_tunnel_quest_2K_20261014002727.jpg",
          title: "Bubble Window Peek-a-Boo",
          caption: "Clear acrylic bubble windows where kids peer outside during the adventure."
        }
      ]
    },
    {
      id: "spider-wall-climb",
      num: 16,
      title: "Spider Wall Climb",
      badge: "AGES 4 - 12 YEARS",
      category: "climbing",
      desc: "Climb a padded, age-appropriate climbing wall wearing special sticky suits that let you stick right to the vertical surface.",
      images: [
        {
          src: "../assets/images/attractions/Spider%20Wall%20Climb/Children_climbing_spider_wall_2K_20261014002844.jpg",
          title: "Spider Wall Climb - Main Attraction",
          caption: "Young jumpers sticking onto the padded Velcro Spider Wall in funny superhero poses."
        },
        {
          src: "../assets/images/attractions/Spider%20Wall%20Climb/Spider_Wall_Climb_age_4_2K_20261014002849.jpg",
          title: "Spider-Man Wall Stick",
          caption: "High-rebound launch trampoline propelling jumpers safely onto the wall surface."
        },
        {
          src: "../assets/images/attractions/Spider%20Wall%20Climb/Spider_Wall_Climb_Age_Range_2K_20261014002900.jpg",
          title: "Inverted Spider Poses",
          caption: "Thick cushioned safety landing mats ensuring soft, laughing landings."
        }
      ]
    },
    {
      id: "parkour-jump-zone",
      num: 17,
      title: "Parkour Jump Zone",
      badge: "AGES 6 - 15 YEARS",
      category: "trampolines",
      desc: "Navigate soft obstacles and jumping platforms designed to teach urban parkour and freerunning skills safely.",
      images: [
        {
          src: "../assets/images/attractions/Parkour%20Jump%20Zone/Parkour_Jump_Zone_2K_20261014003003.jpg",
          title: "Parkour Jump Zone - Main Attraction",
          caption: "High-density padded blocks and vault boxes designed for freestyle parkour leaps."
        },
        {
          src: "../assets/images/attractions/Parkour%20Jump%20Zone/Parkour_jump_zone_2K_20261014002956.jpg",
          title: "Speed Vault Practice",
          caption: "Jumpers navigating stepped platforms to build balance and agility."
        },
        {
          src: "../assets/images/attractions/Parkour%20Jump%20Zone/Parkour_jump_zone_2K_20261014003010.jpg",
          title: "Precision Rail Leaps",
          caption: "Reinforced foam obstacles allowing safe practice of acrobatic wall climbs and rolls."
        }
      ]
    },
    {
      id: "adventure-tower",
      num: 18,
      title: "Adventure Tower",
      badge: "AGES 4 - 14 YEARS",
      category: "climbing",
      desc: "Explore multi-level climbing and sliding structures with 3 tiers of vertical obstacles and lookout platforms.",
      images: [
        {
          src: "../assets/images/attractions/Adventure%20Tower/Adventure_Tower_for_Children_2K_20261014003202.jpg",
          title: "Adventure Tower - Main Attraction",
          caption: "Three-tier Adventure Tower featuring panoramic lookout balconies and spiral slides."
        },
        {
          src: "../assets/images/attractions/Adventure%20Tower/Adventure_Tower_for_4_years_2K_20261014003158.jpg",
          title: "Vertical Chimney Climb",
          caption: "Internal padded climb passages leading up through multiple levels of adventure."
        },
        {
          src: "../assets/images/attractions/Adventure%20Tower/Adventure_Tower_for_4_years_2K_20261014003206.jpg",
          title: "Summit Observation Deck",
          caption: "Elevated bridge connections offering panoramic bird's-eye views over the entire facility."
        }
      ]
    },
    {
      id: "volcano-climb",
      num: 19,
      title: "Volcano Climb",
      badge: "AGES 3 - 10 YEARS",
      category: "toddlers",
      desc: "Climb a themed soft-play mountain featuring realistic vinyl rock slopes, climbing ropes, and an exit slide.",
      images: [
        {
          src: "../assets/images/attractions/Volcano%20Climb/Volcano_climb_game_for_kids_2K_20261014003425.jpg",
          title: "Volcano Climb - Main Attraction",
          caption: "Themed volcano soft-play cone with climbing ropes and summit crater platform."
        },
        {
          src: "../assets/images/attractions/Volcano%20Climb/Volcano_climb_game_for_kids_2K_20261014003431.jpg",
          title: "Magma Slope Ascent",
          caption: "Kids using knotted ropes to pull themselves up the padded slopes."
        },
        {
          src: "../assets/images/attractions/Volcano%20Climb/Volcano_climb_game_for_kids_2K_20261014003528.jpg",
          title: "Crater Summit Lookout",
          caption: "Sliding down the exit ramp into cushioned floor padding below."
        }
      ]
    },
    {
      id: "wipeout-challenge",
      num: 20,
      title: "Wipeout Challenge",
      badge: "AGES 6+",
      category: "interactive",
      desc: "Test balance and timing on moving-style rotating obstacles in a thrilling last-one-standing challenge game.",
      images: [
        {
          src: "../assets/images/attractions/Wipeout%20Challenge/Wipeout_challenge_for_kids_2K_20261014003706.jpg",
          title: "Wipeout Challenge - Main Attraction",
          caption: "Padded rotating sweeper arm challenging jumpers standing on circular bounce pods."
        },
        {
          src: "../assets/images/attractions/Wipeout%20Challenge/Kids_wipeout_challenge_2K_20261014003648.jpg",
          title: "Jump Over the Sweeper Arm",
          caption: "Jumpers leaping and ducking in sync during a high-energy last-one-standing competition."
        },
        {
          src: "../assets/images/attractions/Wipeout%20Challenge/Kids_wipeout_challenge_2K_20261014003651.jpg",
          title: "Duck Under the High Arm",
          caption: "Thick air-cushioned surround floor catching every hilarious wipeout safely."
        }
      ]
    },
    {
      id: "airbag-jump-zone",
      num: 21,
      title: "Airbag Jump Zone",
      badge: "AGES 5+",
      category: "trampolines",
      desc: "Experience supervised jumps onto a purpose-designed commercial stunt landing airbag with dual pressure chambers.",
      images: [
        {
          src: "../assets/images/attractions/Airbag%20Jump%20Zone/Child_jumping_on_airbag_zone_2K_20261014010208.jpg",
          title: "Airbag Jump Zone - Main Attraction",
          caption: "Jumper launching high above the dual-chamber commercial stunt airbag."
        },
        {
          src: "../assets/images/attractions/Airbag%20Jump%20Zone/Child_jumping_on_airbag_2K_20261014010218.jpg",
          title: "Stunt Flight Leap",
          caption: "Elevated trampoline approach platform providing maximum vertical launch."
        },
        {
          src: "../assets/images/attractions/Airbag%20Jump%20Zone/Children_jumping_on_airbag_2K_20261014010234.jpg",
          title: "Padded Soft Landing",
          caption: "Ultra-smooth vinyl top sheet providing effortless deceleration and immediate exit."
        }
      ]
    }
  ];

  // Active state
  var currentGallery = null;
  var currentImageIndex = 0;

  // DOM Elements
  var galleryModal = null;
  var lightbox = null;

  // Initialize once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    setupModalAndLightboxDOM();
    bindGalleryCardClicks();
    bindCategoryFilters();
    bindGlobalKeyboardEvents();
  });

  /**
   * Build Modal & Lightbox elements if not present in DOM
   */
  function setupModalAndLightboxDOM() {
    // 1. Individual Gallery View Modal
    if (!document.getElementById('psGalleryViewModal')) {
      var modalHtml = [
        '<div class="ps-gallery-modal" id="psGalleryViewModal" role="dialog" aria-modal="true" aria-labelledby="psModalTitle">',
        '  <div class="ps-gallery-modal-dialog">',
        '    <div class="ps-gallery-modal-header">',
        '      <div class="ps-gallery-modal-header-text">',
        '        <span class="ps-badge" id="psModalBadge" style="background:#FFCC00;color:#000000;font-size:0.75rem;font-weight:900;">ATTRACTION ZONE</span>',
        '        <h3 class="ps-gallery-modal-title" id="psModalTitle">Gallery Title</h3>',
        '        <p class="ps-gallery-modal-desc" id="psModalDesc">Gallery Description</p>',
        '      </div>',
        '      <button type="button" class="ps-gallery-modal-close-btn" id="psModalClose" aria-label="Close Gallery View" title="Close (Esc)">✕</button>',
        '    </div>',
        '    <div class="ps-gallery-modal-body">',
        '      <div class="ps-gallery-modal-hint">',
        '        <span>3 Curated Photos in this Collection</span>',
        '        <span style="color:rgba(255,255,255,0.6);font-size:0.8rem;text-transform:none;">Click any photo to expand fullscreen</span>',
        '      </div>',
        '      <div class="ps-gallery-view-grid" id="psModalGrid"></div>',
        '    </div>',
        '    <div class="ps-gallery-modal-footer">',
        '      <button type="button" class="ps-btn ps-btn-outline ps-btn-sm" id="psModalBackBtn" style="border-color:rgba(255,255,255,0.3);color:#FFFFFF;">',
        '        ← Back to All Galleries',
        '      </button>',
        '      <a href="booking.html" class="ps-btn ps-btn-primary ps-btn-sm">',
        '        Book a Play Session ↗',
        '      </a>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\n');
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // 2. Fullscreen Lightbox Modal
    if (!document.getElementById('psLightboxModal')) {
      var lightboxHtml = [
        '<div class="ps-lightbox" id="psLightboxModal" role="dialog" aria-modal="true" aria-label="Image Lightbox">',
        '  <div class="ps-lightbox-topbar">',
        '    <div class="ps-lightbox-meta">',
        '      <span class="ps-lightbox-badge" id="psLightboxBadge">GALLERY</span>',
        '      <span class="ps-lightbox-counter" id="psLightboxCounter">Photo 1 of 3</span>',
        '    </div>',
        '    <button type="button" class="ps-lightbox-close-btn" id="psLightboxClose" aria-label="Close Lightbox" title="Close (Esc)">✕</button>',
        '  </div>',
        '  <button type="button" class="ps-lightbox-nav-btn ps-lightbox-nav-prev" id="psLightboxPrev" aria-label="Previous Image" title="Previous (Left Arrow)">',
        '    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>',
        '  </button>',
        '  <button type="button" class="ps-lightbox-nav-btn ps-lightbox-nav-next" id="psLightboxNext" aria-label="Next Image" title="Next (Right Arrow)">',
        '    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>',
        '  </button>',
        '  <div class="ps-lightbox-viewport" id="psLightboxViewport">',
        '    <div class="ps-lightbox-image-wrap">',
        '      <img src="" alt="" class="ps-lightbox-img" id="psLightboxImg">',
        '    </div>',
        '  </div>',
        '  <div class="ps-lightbox-bottombar">',
        '    <div class="ps-lightbox-caption" id="psLightboxCaption"></div>',
        '  </div>',
        '</div>'
      ].join('\n');
      document.body.insertAdjacentHTML('beforeend', lightboxHtml);
    }

    galleryModal = document.getElementById('psGalleryViewModal');
    lightbox = document.getElementById('psLightboxModal');

    // Bind Gallery Modal buttons
    document.getElementById('psModalClose').addEventListener('click', closeGalleryModal);
    document.getElementById('psModalBackBtn').addEventListener('click', closeGalleryModal);
    galleryModal.addEventListener('click', function (e) {
      if (e.target === galleryModal) closeGalleryModal();
    });

    // Bind Lightbox buttons
    document.getElementById('psLightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('psLightboxPrev').addEventListener('click', function (e) {
      e.stopPropagation();
      showPrevImage();
    });
    document.getElementById('psLightboxNext').addEventListener('click', function (e) {
      e.stopPropagation();
      showNextImage();
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.id === 'psLightboxViewport' || (e.target.classList && e.target.classList.contains('ps-lightbox-image-wrap'))) {
        closeLightbox();
      }
    });
  }

  /**
   * Bind click event on all 21 existing .ps-gallery-item cards
   */
  function bindGalleryCardClicks() {
    var cards = document.querySelectorAll('.ps-gallery-item');
    cards.forEach(function (card, index) {
      card.style.cursor = 'pointer';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      var itemData = GALLERY_COLLECTIONS[index];
      var titleText = itemData ? itemData.title : 'Attraction Zone';
      card.setAttribute('aria-label', 'View 3 photos of ' + titleText);

      var clickHandler = function (e) {
        e.preventDefault();
        var galleryId = card.getAttribute('data-gallery-id');
        var data = null;

        if (galleryId) {
          data = GALLERY_COLLECTIONS.find(function (g) { return g.id === galleryId; });
        }
        if (!data && GALLERY_COLLECTIONS[index]) {
          data = GALLERY_COLLECTIONS[index];
        }

        if (data) {
          openGalleryModal(data);
        }
      };

      card.addEventListener('click', clickHandler);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          clickHandler(e);
        }
      });
    });
  }

  /**
   * Open the Individual Gallery View Modal with exactly 3 photos
   */
  function openGalleryModal(galleryData) {
    currentGallery = galleryData;

    document.getElementById('psModalBadge').textContent = galleryData.badge || 'ATTRACTION ZONE';
    document.getElementById('psModalTitle').textContent = galleryData.title;
    document.getElementById('psModalDesc').textContent = galleryData.desc;

    var grid = document.getElementById('psModalGrid');
    grid.innerHTML = '';

    galleryData.images.forEach(function (img, idx) {
      var card = document.createElement('div');
      card.className = 'ps-gallery-view-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'View photo ' + (idx + 1) + ': ' + img.title);

      card.innerHTML = [
        '<div class="ps-gallery-view-thumb">',
        '  <img src="' + img.src + '" alt="' + (img.title || galleryData.title) + '" loading="lazy">',
        '  <div class="ps-gallery-view-zoom-hint">',
        '    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>',
        '    <span>Click to Expand</span>',
        '  </div>',
        '</div>'
      ].join('');

      card.addEventListener('click', function () {
        openLightbox(idx);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });

      grid.appendChild(card);
    });

    galleryModal.classList.add('active');
    document.body.classList.add('ps-modal-open');
    document.getElementById('psModalClose').focus();
  }

  /**
   * Close the Individual Gallery View Modal
   */
  function closeGalleryModal() {
    if (galleryModal) {
      galleryModal.classList.remove('active');
    }
    if (!lightbox || !lightbox.classList.contains('active')) {
      document.body.classList.remove('ps-modal-open');
    }
  }

  /**
   * Open the Full-Screen Lightbox for the clicked photo
   */
  function openLightbox(index) {
    if (!currentGallery || !currentGallery.images || !currentGallery.images[index]) return;
    currentImageIndex = index;
    updateLightboxContent();

    lightbox.classList.add('active');
    document.body.classList.add('ps-modal-open');
    document.getElementById('psLightboxClose').focus();
  }

  /**
   * Close the Full-Screen Lightbox
   */
  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
    }
    // Return focus to gallery modal if still open
    if (galleryModal && galleryModal.classList.contains('active')) {
      document.getElementById('psModalClose').focus();
    } else {
      document.body.classList.remove('ps-modal-open');
    }
  }

  /**
   * Update Lightbox Image and Meta
   */
  function updateLightboxContent() {
    if (!currentGallery || !currentGallery.images) return;
    var imgData = currentGallery.images[currentImageIndex];
    if (!imgData) return;

    var imgEl = document.getElementById('psLightboxImg');

    // Trigger smooth fade transition
    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.96)';

    setTimeout(function () {
      imgEl.src = imgData.src;
      imgEl.alt = imgData.title;
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    }, 120);

    document.getElementById('psLightboxBadge').textContent = currentGallery.title;
    document.getElementById('psLightboxCounter').textContent = 'Photo ' + (currentImageIndex + 1) + ' of ' + currentGallery.images.length;
    var captionEl = document.getElementById('psLightboxCaption');
    if (captionEl) {
      captionEl.textContent = imgData.title + (imgData.caption ? ' — ' + imgData.caption : '');
      captionEl.style.display = 'block';
    }
  }

  /**
   * Previous image in Lightbox (cycles within the 3 images of this gallery)
   */
  function showPrevImage() {
    if (!currentGallery || !currentGallery.images || currentGallery.images.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentGallery.images.length) % currentGallery.images.length;
    updateLightboxContent();
  }

  /**
   * Next image in Lightbox (cycles within the 3 images of this gallery)
   */
  function showNextImage() {
    if (!currentGallery || !currentGallery.images || currentGallery.images.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentGallery.images.length;
    updateLightboxContent();
  }

  /**
   * Global Keyboard Handling (Arrow keys, Escape)
   */
  function bindGlobalKeyboardEvents() {
    document.addEventListener('keydown', function (e) {
      // 1. Lightbox active: handle Arrows and Escape
      if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          showNextImage();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          showPrevImage();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeLightbox();
        }
        return;
      }

      // 2. Gallery Modal active: Escape closes it
      if (galleryModal && galleryModal.classList.contains('active')) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeGalleryModal();
        }
      }
    });
  }

  /**
   * Category Filter Tabs logic (preserves existing filter functionality)
   */
  function bindCategoryFilters() {
    var filterBtns = document.querySelectorAll('.ps-filter-btn');
    var items = document.querySelectorAll('.ps-gallery-item');
    if (filterBtns.length > 0 && items.length > 0) {
      filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          filterBtns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var filter = btn.getAttribute('data-filter');
          items.forEach(function (item) {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }
  }

  // Expose API for debugging if needed
  window.PlaySpaceGallery = {
    collections: GALLERY_COLLECTIONS,
    open: openGalleryModal,
    close: closeGalleryModal,
    openLightbox: openLightbox,
    closeLightbox: closeLightbox
  };
})();
