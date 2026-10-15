/**
 * PlaySpace - 26 Attractions Data & Interactive Filter
 */

(function () {
  'use strict';

  const ATTRACTIONS = [
    {
      id: "mega-trampoline-arena",
      num: 1,
      title: "Mega Trampoline Arena",
      category: "trampolines",
      age: "Ages 4+ (All Ages & Adults Welcome)",
      image: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224655.jpg",
      description: "Jump high, bounce freely, and enjoy energetic jumping challenges across our 14,000 sq ft trampoline matrix.",
      specs: ["14,000 Sq Ft", "70+ Bounce Mats", "Angled Rebound Walls"],
      detailUrl: "attraction-mega-trampoline-arena.html",
      features: ["High-tension Olympic spring beds", "45-degree angled rebound walls", "Padded tumble runways", "Continuous court marshal monitoring"]
    },
    {
      id: "ninja-warrior-course",
      num: 2,
      title: "Ninja Warrior Course",
      category: "climbing",
      age: "Ages 6 - 15 Years (Min 44\")",
      image: "../assets/images/attractions/Ninja%20Warrior%20Course/Child_running_ninja_course_2K_20261013225811.jpg",
      description: "Climb, crawl, balance, and conquer exciting obstacle challenges inspired by real ninja warrior courses.",
      specs: ["10ft Warped Wall", "Ring Swings", "Quintuple Steps"],
      detailUrl: "attraction-ninja-warrior-course.html",
      features: ["Quintuple balance steps", "Suspended ring and rope swings", "Cargo net horizontal traverse", "Dual-height warped wall with buzzer"]
    },
    {
      id: "adventure-climbing-zone",
      num: 3,
      title: "Adventure Climbing Zone",
      category: "climbing",
      age: "Ages 5 - 14 Years",
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80",
      description: "Explore climbing frames, fun pathways, and exciting elevated play structures with certified auto-belay descenders.",
      specs: ["Auto-Belay Spires", "Themed Vertical Routes", "Soft Landing Mat"],
      detailUrl: "attraction-adventure-climbing-zone.html",
      features: ["Certified magnetic auto-belay descenders", "Ergonomic multi-texture holds", "Digital climb timers", "Varied beginner to advanced difficulty"]
    },
    {
      id: "super-slide-mountain",
      num: 4,
      title: "Super Slide Mountain",
      category: "toddlers",
      age: "Ages 3 - 12 Years",
      image: "https://images.unsplash.com/photo-1750082828854-61333b7b9e95?auto=format&fit=crop&w=1000&q=80",
      description: "Race down colorful slides and enjoy thrilling rides into the soft-play area with safe deceleration runout bays.",
      specs: ["4-Lane Racing Slides", "Spiral Speed Tubes", "Cushioned Runout"],
      detailUrl: "attraction-super-slide-mountain.html",
      features: ["Multi-color quadruple racing lanes", "360-degree enclosed tube slide", "High-density foam deceleration runout", "Anti-friction coated surfaces"]
    },
    {
      id: "rainbow-ball-pit",
      num: 5,
      title: "Rainbow Ball Pit",
      category: "toddlers",
      age: "Ages 1 - 6 Years",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80",
      description: "Dive into a colorful ball pool filled with 60,000+ sanitized balls, sensory vacuum chutes, and tipping buckets.",
      specs: ["60,000+ Clean Balls", "UV-C Sanitized Daily", "Sensory Chutes"],
      detailUrl: "attraction-rainbow-ball-pit.html",
      features: ["Anti-microbial sanitized balls", "Interactive pneumatic ball suction tubes", "Gentle padded pool entry steps", "Segregated shallow area for under 2s"]
    },
    {
      id: "sky-high-rope-adventure",
      num: 6,
      title: "Sky-High Rope Adventure",
      category: "climbing",
      age: "Ages 6 - 14 Years",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
      description: "Test balance and coordination on exciting rope bridges and net obstacles with continuous overhead lifeline protection.",
      specs: ["Suspension Bridges", "Wobble Planks", "Overhead Safety Line"],
      detailUrl: "attraction-sky-high-rope-adventure.html",
      features: ["Full-body harness system", "High-altitude net tunnels", "Swinging balance logs", "Certified high-ropes operator on duty"]
    },
    {
      id: "foam-pit-challenge",
      num: 7,
      title: "Foam Pit Challenge",
      category: "trampolines",
      age: "Ages 5+ (All Jumpers)",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80",
      description: "Jump into a 5-foot deep soft foam landing zone and enjoy playful jumping challenges with zero impact shock.",
      specs: ["5-Foot Foam Depth", "Launch Beds", "Zero-Shock Foam Blocks"],
      detailUrl: "attraction-foam-pit-challenge.html",
      features: ["Thousands of fire-retardant foam cubes", "Olympic launch bounce runways", "Padded side extraction decks", "Deep impact-absorbing sub-pit padding"]
    },
    {
      id: "laser-maze-mission",
      num: 8,
      title: "Laser Maze Mission",
      category: "interactive",
      age: "Ages 5+ (Solo & Team Play)",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
      description: "Navigate through a light-based maze and complete exciting secret agent missions against digital countdown timers.",
      specs: ["Dynamic Laser Grid", "Digital Countdown", "Secret Agent Theme"],
      detailUrl: "attraction-laser-maze-mission.html",
      features: ["High-tech green and red laser beams", "Touchless laser tripwire sensors", "Timed scoring leaderboard", "Multiple difficulty mission levels"]
    },
    {
      id: "interactive-play-arena",
      num: 9,
      title: "Interactive Play Arena",
      category: "interactive",
      age: "Ages 3+ (All Ages & Adults)",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80",
      description: "Play movement-based games with interactive lights, projections, and ValoJump augmented reality screens.",
      specs: ["Augmented Projection", "Motion Gaming Floor", "ValoJump Screen"],
      detailUrl: "attraction-interactive-play-arena.html",
      features: ["ValoJump AR game screens", "Motion-tracking floor projection games", "Smash-wall soft target arena", "Versus multiplayer arcade modes"]
    },
    {
      id: "little-explorers-zone",
      num: 10,
      title: "Little Explorers Zone",
      category: "toddlers",
      age: "Ages 6 Months – 3 Years",
      image: "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=1000&q=80",
      description: "A gentle adventure space with mini slides, tunnels, and soft-play activities exclusively for toddlers ages 0–3.",
      specs: ["Gated Safe Haven", "Mini Foam Steps", "Sensory Busy Boards"],
      detailUrl: "attraction-little-explorers-zone.html",
      features: ["Low-height foam crawl ramps", "Tactile sensory wall puzzles", "Gentle mini wavy slide", "Anti-microbial soft play flooring"]
    },
    {
      id: "cargo-net-climber",
      num: 11,
      title: "Cargo Net Climber",
      category: "climbing",
      age: "Ages 4 - 12 Years",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1000&q=80",
      description: "Climb through flexible net structures and discover new elevated pathways in a safe, fully netted 3D matrix.",
      specs: ["Braided Marine Rope", "Multi-Tier Tunnels", "Padded Enclosure"],
      detailUrl: "attraction-cargo-net-climber.html",
      features: ["Heavy-duty poly-braided climb nets", "Elevated net crawling chambers", "Lookout panoramic viewpoints", "Interconnected soft play access"]
    },
    {
      id: "balance-bounce-trail",
      num: 12,
      title: "Balance & Bounce Trail",
      category: "toddlers",
      age: "Ages 3 - 9 Years",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80",
      description: "Hop across stepping stones, balance on beams, and complete fun agility movement trails over thick safety mats.",
      specs: ["Foam Stepping Stones", "Wobble Beams", "Agility Obstacles"],
      detailUrl: "attraction-balance-bounce-trail.html",
      features: ["Color-coded stepping stone islands", "Suspended low-altitude wobble logs", "Soft foam hurdles and ramps", "Balance and motor coordination path"]
    },
    {
      id: "neon-glow-adventure",
      num: 13,
      title: "Neon Glow Adventure",
      category: "interactive",
      age: "Ages 4+ (Family Glow Experience)",
      image: "../assets/images/attractions/Neon%20Glow%20Adventure/Neon_Glow_Adventure_for_kids_2K_20261013234014.jpg",
      description: "Experience a colorful neon play zone with glowing UV lights, blacklight dodgeball, and exciting evening music.",
      specs: ["Blacklight Illumination", "Glow Trampoline Beds", "Neon Obstacles"],
      detailUrl: "attraction-neon-glow-adventure.html",
      features: ["Commercial 365nm UV blacklight cannons", "Glow-in-the-dark dodgeball arena", "Fluorescent foam pit cubes", "Dynamic music and light shows"]
    },
    {
      id: "mini-sports-arena",
      num: 14,
      title: "Mini Sports Arena",
      category: "trampolines",
      age: "Ages 4 - 14 Years",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80",
      description: "Enjoy spring-assisted slam dunk basketball, target games, and friendly team competitions in an enclosed cage.",
      specs: ["Slam Dunk Hoops", "Rebound Enclosure", "Digital Scoreboard"],
      detailUrl: "attraction-mini-sports-arena.html",
      features: ["Dual spring-loaded slam dunk approach tracks", "Adjustable height breakaway hoops", "Fully enclosed safety netting cage", "Electronic scoring target buzzers"]
    },
    {
      id: "mystery-tunnel-quest",
      num: 15,
      title: "Mystery Tunnel Quest",
      category: "toddlers",
      age: "Ages 3 - 10 Years",
      image: "../assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233246.jpg",
      description: "Crawl through winding tunnels and discover hidden routes and secret checkpoint stamps in a playful labyrinth.",
      specs: ["Winding Labyrinth", "Observation Windows", "Hidden Quest Rooms"],
      detailUrl: "attraction-mystery-tunnel-quest.html",
      features: ["Padded subterranean crawling maze", "Clear bubble observation domes", "Hidden treasure checkpoint stamps", "Soft-lit glow markers"]
    },
    {
      id: "spider-wall-climb",
      num: 16,
      title: "Spider Wall Climb",
      category: "climbing",
      age: "Ages 4 - 12 Years",
      image: "../assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil%E2%80%A6_2K_20261013230359.jpg",
      description: "Suit up in a Velcro Spider Suit, spring off a launch trampoline, and stick flat to the giant padded wall.",
      specs: ["Padded Velcro Wall", "Spider Suits", "Soft Crash Mat"],
      detailUrl: "attraction-spider-wall-climb.html",
      features: ["High-traction Velcro wall surface", "Kid-sized Spider sticky suits", "Thick zero-shock impact matting", "Trained court marshal assistance"]
    },
    {
      id: "parkour-jump-zone",
      num: 17,
      title: "Parkour Jump Zone",
      category: "trampolines",
      age: "Ages 6 - 15 Years",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
      description: "Navigate soft obstacles and jumping platforms designed to teach urban parkour and freerunning skills safely.",
      specs: ["Soft Vault Blocks", "Angled Plyo Boxes", "Precision Landing Pads"],
      detailUrl: "attraction-parkour-jump-zone.html",
      features: ["Modular high-density foam vault blocks", "Angled wall run platforms", "Precision footwork balance rails", "Progressive beginner-to-advanced agility lanes"]
    },
    {
      id: "adventure-tower",
      num: 18,
      title: "Adventure Tower",
      category: "climbing",
      age: "Ages 4 - 14 Years",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80",
      description: "Explore multi-level climbing and sliding structures with 3 tiers of vertical obstacles and lookout platforms.",
      specs: ["3-Tier Tower", "Panoramic Domes", "Spiral Slide Exit"],
      detailUrl: "attraction-adventure-tower.html",
      features: ["Three vertical adventure play tiers", "Enclosed 360-degree observation bubbles", "High-speed spiral slide egress", "Soft padded spiral staircase climbs"]
    },
    {
      id: "volcano-climb",
      num: 19,
      title: "Volcano Climb",
      category: "toddlers",
      age: "Ages 3 - 10 Years",
      image: "../assets/images/attractions/Volcano%20Climb/Volcano_climb_game_for_kids_2K_20261014003425.jpg",
      description: "Climb a themed soft-play mountain featuring realistic vinyl rock slopes, climbing ropes, and an exit crater slide.",
      specs: ["Padded Volcano Cone", "Rope Climber", "Crater Slide"],
      detailUrl: "attraction-volcano-climb.html",
      features: ["Vibrant neon magma-themed vinyl exterior", "Sturdy climbing ropes and handholds", "Summit observation landing deck", "Enclosed exit tube slide"]
    },
    {
      id: "wipeout-challenge",
      num: 20,
      title: "Wipeout Challenge",
      category: "interactive",
      age: "Ages 6+ (Jump & Duck Thrill)",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80",
      description: "Test balance and timing on moving-style rotating obstacles in a thrilling last-one-standing challenge game.",
      specs: ["Rotating Foam Arm", "8 Jump Pods", "Variable Speed Operator"],
      detailUrl: "attraction-wipeout-challenge.html",
      features: ["Dual-height soft foam rotating sweep arms", "8 individual air-cushioned jumper pods", "Operator-controlled safety speed dial", "Last-one-standing challenge games"]
    },
    {
      id: "airbag-jump-zone",
      num: 21,
      title: "Airbag Jump Zone",
      category: "trampolines",
      age: "Ages 5+ (All Jumpers)",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80",
      description: "Experience supervised jumps onto a purpose-designed commercial stunt landing airbag with dual pressure chambers.",
      specs: ["Stunt Airbag", "Dual Jump Runways", "Dual Pressure Chambers"],
      detailUrl: "attraction-airbag-jump-zone.html",
      features: ["Giant custom zero-gravity landing airbag", "Continuous air replenishment blowers", "Elevated Olympic jump runways", "Dedicated safety jump marshal"]
    },
    {
      id: "mini-zipline-adventure",
      num: 22,
      title: "Mini Zipline Adventure",
      category: "climbing",
      age: "Ages 4 - 12 Years (Max 110 lbs)",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
      description: "Enjoy a short, exhilarating ride on a properly installed children's zipline with staff-assisted launch and landing.",
      specs: ["60ft Flight Line", "Hydraulic Soft Brake", "Low-Altitude Cable"],
      detailUrl: "attraction-mini-zipline-adventure.html",
      features: ["Heavy-duty stainless steel aerial cable", "Smooth-glide bearing trolley", "Automatic progressive magnetic braking", "Soft foam landing zone"]
    },
    {
      id: "treasure-hunt-zone",
      num: 23,
      title: "Treasure Hunt Zone",
      category: "toddlers",
      age: "Ages 3 - 10 Years",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80",
      description: "Solve clues, crack riddles, and find hidden treasures around the play area on a fun, cooperative family quest.",
      specs: ["Clue Stations", "Passport Stamp Trail", "Mystery Secret Crannies"],
      detailUrl: "attraction-treasure-hunt-zone.html",
      features: ["Interactive clue riddle checkpoints", "Passport booklet with stamp rewards", "Themed tactile mystery treasure chests", "Fun family cooperative quest gameplay"]
    },
    {
      id: "soft-play-zone",
      num: 24,
      title: "Soft Play Zone",
      category: "toddlers",
      age: "Ages 2 - 8 Years",
      image: "https://images.unsplash.com/photo-1780932333368-4995b2e14174?auto=format&fit=crop&w=1000&q=80",
      description: "A multi-tier padded adventure maze with spiral slides, foam climbers, crawl-through tubes, and interactive bridges.",
      specs: ["Multi-Level Maze", "Foam Obstacles", "Bridges & Tunnels"],
      detailUrl: "attraction-soft-play-zone.html",
      features: ["Over 5,000 sq ft multi-tier soft play maze", "Closed-cell foam padded steel frames", "Twin spiral slide descents", "High-visibility safety mesh netting"]
    },
    {
      id: "extreme-dodgeball-arena",
      num: 25,
      title: "Extreme Dodgeball Arena",
      category: "trampolines",
      age: "Ages 6+ (Ages 6 - Adult)",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80",
      description: "Experience referee-bracketed dodgeball showdowns on high-tension sprung courts enclosed by rebound net walls.",
      specs: ["Sprung Trampoline Floor", "Refereed Matches", "No-Sting Foam Balls"],
      detailUrl: "attraction-extreme-dodgeball-arena.html",
      features: ["Custom welded steel cage with net walls", "45-degree rebound trampoline perimeter", "Non-sting 6-inch foam dodgeballs", "Digital scoreboards and referee marshals"]
    },
    {
      id: "toddler-soft-play-lagoon",
      num: 26,
      title: "Toddler Soft Play Lagoon",
      category: "toddlers",
      age: "Ages 0 - 4 Years (Strictly 4 & Under)",
      image: "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=1000&q=80",
      description: "A peaceful sensory paradise with soft ocean mounds, baby tunnels, and shallow ball pools exclusively for ages 0–4.",
      specs: ["Ages 0–4 Sanctuary", "Shallow Ball Lagoon", "Sensory Foam Mounds"],
      detailUrl: "attraction-toddler-soft-play-lagoon.html",
      features: ["Dedicated gated toddler-only sanctuary", "Shallow 12-inch sanitized ball pool", "Soft foam ocean-themed rolling mounds", "Gentle lullaby soundscape and nursing lounge"]
    },
    {
      id: "battle-beam-arena",
      num: 27,
      title: "Battle Beam Arena",
      category: "trampolines",
      age: "Ages 5 - 15 Years",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
      description: "Challenge friends to an epic, giggly balance joust on suspended padded beams over a deep, zero-shock foam cube pit.",
      specs: ["Suspended Padded Beam", "Soft Pugil Sticks", "Zero-Shock Foam Pit"],
      detailUrl: "attraction-battle-beam-arena.html",
      features: ["Steel core beam heavily encased in 4-inch EVA foam", "Lightweight soft vinyl-wrapped pugil sticks", "5-foot deep sanitized foam cube landing pit", "Court marshal referee supervision for safe 1-on-1 fun"]
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    const ageFilterButtons = document.querySelectorAll('[data-age-filter]');
    const categoryFilterButtons = document.querySelectorAll('[data-category-filter], [data-attraction-filter]');
    const exactAgeSelect = document.getElementById('psExactAgeSelect');
    const resetBtn = document.getElementById('psResetFiltersBtn');
    const countEl = document.getElementById('psFilterCount');
    const noResultsEl = document.getElementById('psNoResultsMessage');
    const attractionCards = document.querySelectorAll('.ps-attraction-card');

    let currentAgeFilter = 'all'; // 'all', 'toddler', 'junior', 'bigkids', 'family', or numeric '1', '2', etc.
    let currentCategoryFilter = 'all';

    function applyFilters() {
      let visibleCount = 0;

      attractionCards.forEach(card => {
        const cardCat = card.getAttribute('data-attraction-category') || '';
        const minAge = parseInt(card.getAttribute('data-min-age') || '0', 10);
        const maxAge = parseInt(card.getAttribute('data-max-age') || '99', 10);
        const ageTags = (card.getAttribute('data-age-tags') || '').split(' ');

        // 1. Check category match
        let matchesCategory = (currentCategoryFilter === 'all') || 
                              (cardCat.split(' ').includes(currentCategoryFilter)) || 
                              (cardCat === currentCategoryFilter);

        // 2. Check age match
        let matchesAge = true;
        if (currentAgeFilter === 'all') {
          matchesAge = true;
        } else if (!isNaN(parseInt(currentAgeFilter, 10))) {
          const exactAge = parseInt(currentAgeFilter, 10);
          matchesAge = (exactAge >= minAge && exactAge <= maxAge);
        } else {
          matchesAge = ageTags.includes(currentAgeFilter);
        }

        if (matchesCategory && matchesAge) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countEl) {
        countEl.textContent = visibleCount;
      }

      if (noResultsEl) {
        noResultsEl.style.display = visibleCount === 0 ? 'block' : 'none';
      }

      if (resetBtn) {
        const isFiltered = (currentAgeFilter !== 'all' || currentCategoryFilter !== 'all');
        resetBtn.style.display = isFiltered ? 'inline-flex' : 'none';
      }
    }

    // 1. Age Pills Click
    ageFilterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        ageFilterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentAgeFilter = this.getAttribute('data-age-filter') || 'all';
        if (exactAgeSelect) {
          exactAgeSelect.value = 'any';
        }
        applyFilters();
      });
    });

    // 2. Exact Age Selection (Custom Dropdown Component)
    const customAgeTrigger = document.getElementById('psExactAgeTrigger');
    const customAgeTriggerText = document.getElementById('psExactAgeTriggerText');
    const customAgeArrow = document.getElementById('psExactAgeTriggerArrow');
    const customAgeMenu = document.getElementById('psCustomAgeMenu');
    const customAgeItems = document.querySelectorAll('.ps-custom-age-item');
    const customAgeReset = document.getElementById('psCustomAgeReset');

    function toggleCustomMenu(open) {
      if (!customAgeMenu) return;
      const isOpen = (open !== undefined) ? open : (customAgeMenu.style.display !== 'block');
      customAgeMenu.style.display = isOpen ? 'block' : 'none';
      if (customAgeTrigger) {
        customAgeTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
      if (customAgeArrow) {
        customAgeArrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    }

    if (customAgeTrigger) {
      customAgeTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleCustomMenu();
      });
    }

    // Handle custom item selection
    customAgeItems.forEach(item => {
      item.addEventListener('click', function (e) {
        e.stopPropagation();
        const val = this.getAttribute('data-age-value') || 'any';
        const labelText = this.querySelector('span')?.textContent || 'Select Age...';
        
        // Update trigger text
        if (customAgeTriggerText) {
          if (val === 'any') {
            customAgeTriggerText.innerHTML = `<span>🎯</span> <span>Select Age...</span>`;
          } else {
            customAgeTriggerText.innerHTML = `<span>🎂</span> <span>${labelText}</span>`;
          }
        }

        // Update active class on items
        customAgeItems.forEach(i => {
          i.classList.remove('active');
          const check = i.querySelector('.ps-age-check');
          if (check) check.remove();
        });
        this.classList.add('active');
        if (!this.querySelector('.ps-age-check')) {
          const check = document.createElement('span');
          check.className = 'ps-age-check';
          check.style.color = '#FFCC00';
          check.style.fontWeight = '900';
          check.textContent = '✓';
          this.appendChild(check);
        }

        // Sync hidden select and trigger filters
        if (exactAgeSelect) {
          exactAgeSelect.value = val;
        }

        if (val === 'any') {
          currentAgeFilter = 'all';
          ageFilterButtons.forEach(b => {
            if (b.getAttribute('data-age-filter') === 'all') b.classList.add('active');
            else b.classList.remove('active');
          });
        } else {
          currentAgeFilter = val;
          ageFilterButtons.forEach(b => b.classList.remove('active'));
        }

        toggleCustomMenu(false);
        applyFilters();
      });
    });

    if (customAgeReset) {
      customAgeReset.addEventListener('click', function (e) {
        e.stopPropagation();
        if (customAgeTriggerText) {
          customAgeTriggerText.innerHTML = `<span>🎯</span> <span>Select Age...</span>`;
        }
        customAgeItems.forEach(i => {
          i.classList.remove('active');
          const check = i.querySelector('.ps-age-check');
          if (check) check.remove();
          if (i.getAttribute('data-age-value') === 'any') {
            i.classList.add('active');
            const check = document.createElement('span');
            check.className = 'ps-age-check';
            check.style.color = '#FFCC00';
            check.style.fontWeight = '900';
            check.textContent = '✓';
            i.appendChild(check);
          }
        });
        if (exactAgeSelect) exactAgeSelect.value = 'any';
        currentAgeFilter = 'all';
        ageFilterButtons.forEach(b => {
          if (b.getAttribute('data-age-filter') === 'all') b.classList.add('active');
          else b.classList.remove('active');
        });
        toggleCustomMenu(false);
        applyFilters();
      });
    }

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (customAgeMenu && !customAgeMenu.contains(e.target) && e.target !== customAgeTrigger) {
        toggleCustomMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && customAgeMenu && customAgeMenu.style.display === 'block') {
        toggleCustomMenu(false);
      }
    });

    // 3. Category Filter Buttons
    categoryFilterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        categoryFilterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCategoryFilter = this.getAttribute('data-category-filter') || this.getAttribute('data-attraction-filter') || 'all';
        applyFilters();
      });
    });

    // 4. Reset Filters Action
    window.resetPlaySpaceFilters = function () {
      currentAgeFilter = 'all';
      currentCategoryFilter = 'all';
      if (exactAgeSelect) exactAgeSelect.value = 'any';

      if (customAgeTriggerText) {
        customAgeTriggerText.innerHTML = `<span>🎯</span> <span>Select Age...</span>`;
      }
      customAgeItems.forEach(i => {
        i.classList.remove('active');
        const check = i.querySelector('.ps-age-check');
        if (check) check.remove();
        if (i.getAttribute('data-age-value') === 'any') {
          i.classList.add('active');
          const check = document.createElement('span');
          check.className = 'ps-age-check';
          check.style.color = '#FFCC00';
          check.style.fontWeight = '900';
          check.textContent = '✓';
          i.appendChild(check);
        }
      });
      toggleCustomMenu(false);

      ageFilterButtons.forEach(b => {
        if (b.getAttribute('data-age-filter') === 'all') b.classList.add('active');
        else b.classList.remove('active');
      });

      categoryFilterButtons.forEach(b => {
        const cat = b.getAttribute('data-category-filter') || b.getAttribute('data-attraction-filter');
        if (cat === 'all') b.classList.add('active');
        else b.classList.remove('active');
      });

      applyFilters();
    };

    if (resetBtn) {
      resetBtn.addEventListener('click', window.resetPlaySpaceFilters);
    }

    // Check URL parameters on page load, e.g. ?age=toddler or ?category=climbing
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlAge = urlParams.get('age');
      const urlCat = urlParams.get('category');

      if (urlAge) {
        currentAgeFilter = urlAge;
        ageFilterButtons.forEach(b => {
          if (b.getAttribute('data-age-filter') === urlAge) b.classList.add('active');
          else b.classList.remove('active');
        });
        if (exactAgeSelect && !isNaN(parseInt(urlAge, 10))) {
          exactAgeSelect.value = urlAge;
          const matchingItem = document.querySelector(`.ps-custom-age-item[data-age-value="${urlAge}"]`);
          if (matchingItem && customAgeTriggerText) {
            customAgeTriggerText.innerHTML = `<span>🎂</span> <span>${matchingItem.querySelector('span')?.textContent}</span>`;
            customAgeItems.forEach(i => i.classList.remove('active'));
            matchingItem.classList.add('active');
          }
        }
      }

      if (urlCat) {
        currentCategoryFilter = urlCat;
        categoryFilterButtons.forEach(b => {
          const cat = b.getAttribute('data-category-filter') || b.getAttribute('data-attraction-filter');
          if (cat === urlCat) b.classList.add('active');
          else b.classList.remove('active');
        });
      }

      if (urlAge || urlCat) {
        applyFilters();
      }
    } catch (e) {
      console.warn('Could not read filter params from URL', e);
    }
  });

  window.PlaySpaceAttractions = {
    data: ATTRACTIONS
  };
})();
