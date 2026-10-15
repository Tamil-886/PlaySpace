const fs = require('fs');
const path = require('path');
const { ROOT_DIR, ensureDir, getPublicHeader, getPublicFooter, getCommonScripts } = require('./build-base');

function buildHomepages() {
  ensureDir(ROOT_DIR);

  // =========================================================================
  // 1. index.html (Homepage 1 - High Energy Flagship Arena)
  // =========================================================================
  const indexHtml = `<!DOCTYPE html>
<html lang="en" data-theme="light" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlaySpace — Jump, Play &amp; Make Happy Memories!</title>
  <meta name="description" content="PlaySpace is the premier kids indoor trampoline &amp; soft play center. Jump, play, and make happy memories with 35,000 sq ft of safe, active family adventure.">
  <link rel="icon" type="image/svg+xml" href="assets/images/favicon/favicon.svg">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  ${getPublicHeader('', 'home')}

  <!-- 1. Hero Banner with Kids' Indoor Play Area Image -->
  <section class="ps-hero ps-home1-hero">
    <div class="ps-container">
      <div class="ps-hero-split">
        <div>
          <div class="ps-hero-badge">
            <span class="badge-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              RATED #1 INDOOR FAMILY ADVENTURE &amp; TRAMPOLINE CENTER
            </span>
          </div>

          <!-- Exact Requested Heading -->
          <h1 class="ps-hero-title">
            Jump, Play &amp; <span style="color: #FFCC00;">Make Happy Memories!</span>
          </h1>

          <p class="ps-hero-subtitle">
            Welcome to PLAYSPACE — a fun-filled indoor playground where kids can jump, climb, explore, and enjoy exciting adventures in a safe and friendly environment. Create happy memories with family and friends!
          </p>

          <!-- Requested CTA Buttons -->
          <div class="ps-hero-actions">
            <a href="pages/booking.html" class="ps-btn ps-btn-primary ps-btn-lg">
              Book Your Play Session
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
            <a href="pages/attractions.html" class="ps-btn ps-btn-outline ps-btn-lg">
              Explore All Play Zones
            </a>
          </div>

          <!-- Hero Trust Metrics Grid -->
          <div class="ps-hero-stats-grid">
            <div class="ps-hero-stat-item">
              <div class="ps-hero-stat-val" style="color: #FFCC00;">35,000+</div>
              <div class="ps-hero-stat-desc">Sq. Ft. Facility</div>
            </div>
            <div class="ps-hero-stat-item">
              <div class="ps-hero-stat-val" style="color: #FFFFFF;">8+</div>
              <div class="ps-hero-stat-desc">Adventure Zones</div>
            </div>
            <div class="ps-hero-stat-item">
              <div class="ps-hero-stat-val" style="color: #FFCC00;">100%</div>
              <div class="ps-hero-stat-desc">ASTM Padded Safety</div>
            </div>
          </div>
        </div>

        <!-- Kids' Indoor Play Area Image Wrap -->
        <div class="ps-hero-image-wrap">
          <img src="assets/images/Kids_indoor_trampoline_play_center_2K_20261013150818.jpg" alt="Kids indoor trampoline and soft play center at PlaySpace" class="ps-hero-img-main">
        </div>
      </div>
    </div>
  </section>

  <!-- Live Arena Capacity & Today's Schedule -->
  <section class="ps-section ps-section-white" style="padding-top: 1.5rem; padding-bottom: 2.25rem;">
    <div class="ps-container">
      <div style="background-color: #000000; color: #FFFFFF; border-radius: var(--ps-radius-xl); padding: 2.5rem; border: 2px solid #FFCC00;" class="ps-occupancy-banner-grid">
        <div>
          <div class="badge-tag" style="margin-bottom: 1rem;">LIVE ARENA STATUS</div>
          <h2 style="color: #FFFFFF; margin-bottom: 0.75rem;">Real-Time Facility Capacity</h2>
          <p style="color: rgba(255,255,255,0.8); margin-bottom: 1.5rem; font-size: 1.05rem;">
            We strictly enforce a 250-jumper safety cap to guarantee plenty of runway clearance, zero cross-jumper collisions, and maximum active fun for every child.
          </p>
          <div class="ps-occupancy-meter" style="height: 22px;">
            <div class="ps-occupancy-fill" style="width: 74%;"></div>
          </div>
          <div class="ps-flex-between" style="font-size: 0.95rem; font-weight: 800; margin-top: 0.75rem;">
            <span style="color: #FFCC00;">184 Current Jumpers on Court</span>
            <span style="color: rgba(255,255,255,0.75);">250 Max Safety Limit (Walk-Ins Welcome!)</span>
          </div>
        </div>

        <div style="border-left: 1px solid rgba(255,255,255,0.15); padding-left: 2.5rem;">
          <h4 style="color: #FFFFFF; margin-bottom: 1.25rem;">Today's Arena Schedule</h4>
          <ul style="display: flex; flex-direction: column; gap: 0.85rem;">
            <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; font-size: 0.9rem;">
              <span style="color: rgba(255,255,255,0.8);">Toddler Lagoon (0–4):</span>
              <strong style="color: #FFCC00;">9:00 AM – 11:00 AM</strong>
            </li>
            <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; font-size: 0.9rem;">
              <span style="color: rgba(255,255,255,0.8);">All-Ages Open Jump:</span>
              <strong style="color: #FFFFFF;">11:00 AM – 7:00 PM</strong>
            </li>
            <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; font-size: 0.9rem;">
              <span style="color: rgba(255,255,255,0.8);">Friday Neon Glow Night:</span>
              <strong style="color: #FFCC00;">7:00 PM – 10:00 PM</strong>
            </li>
          </ul>
          <a href="pages/safety-guidelines.html" class="ps-btn ps-btn-outline ps-btn-sm ps-btn-block" style="margin-top: 1.25rem;">
            Read Safety Standards &amp; Waiver
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. Popular Play Zones Preview -->
  <section class="ps-section" style="background-color: var(--ps-bg-main); border-top: 1px solid var(--ps-border-color);">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">EXCITING ATTRACTIONS</span>
        <h2 style="margin-top: 0.75rem;">Popular Play Zones Preview</h2>
        <p class="text-muted">
          Every ticket grants all-inclusive access to all courts, foam pits, multi-tier climbing towers, and obstacle courses.
        </p>
      </div>

      <div class="ps-grid ps-grid-3" style="gap: 2rem;">
        <!-- Zone 1: Trampoline Arena -->
        <div class="ps-attraction-card">
          <div class="ps-attraction-thumb">
            <img src="assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224655.jpg" alt="Trampoline Arena">
          </div>
          <div class="ps-attraction-body">
            <div class="ps-attraction-specs">
              <span>● 12,000 Sq Ft</span><span>● 60+ Mats</span><span>● Angled Walls</span>
            </div>
            <h4>Trampoline Arena</h4>
            <p class="text-muted" style="font-size: 0.92rem; line-height: 1.5; margin-bottom: 1.25rem; flex-grow: 1;">
              Olympic-grade interconnected spring beds, tumble tracks, and 45-degree rebound walls for unbounded aerial freedom.
            </p>
            <div class="ps-attraction-actions" style="display: flex; gap: 0.5rem; margin-top: auto;">
              <a href="pages/attraction-mega-trampoline-arena.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center;">View Details</a>
              <a href="pages/booking-mega-trampoline-arena.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book This Zone</a>
            </div>
          </div>
        </div>

        <!-- Zone 2: Soft Play Zone -->
        <div class="ps-attraction-card">
          <div class="ps-attraction-thumb">
            <img src="assets/images/attractions/Interactive%20Play%20Arena/Interactive_play_arena_for_children_2K_20261013232047.jpg" alt="Soft Play Zone">
          </div>
          <div class="ps-attraction-body">
            <div class="ps-attraction-specs">
              <span>● Multi-Level Maze</span><span>● Foam Obstacles</span><span>● Bridges</span>
            </div>
            <h4>Soft Play Zone</h4>
            <p class="text-muted" style="font-size: 0.92rem; line-height: 1.5; margin-bottom: 1.25rem; flex-grow: 1;">
              A multi-tier padded adventure maze with spiral slides, foam climbers, crawl-through tubes, and interactive bridges.
            </p>
            <div class="ps-attraction-actions" style="display: flex; gap: 0.5rem; margin-top: auto;">
              <a href="pages/attraction-soft-play-zone.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center;">View Details</a>
              <a href="pages/booking-interactive-play-arena.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book This Zone</a>
            </div>
          </div>
        </div>

        <!-- Zone 3: Ball Pit -->
        <div class="ps-attraction-card">
          <div class="ps-attraction-thumb">
            <img src="assets/images/attractions/Rainbow%20Ball%20Pit/Rainbow_Ball_Pit_2K_20261013231429.jpg" alt="Ball Pit">
          </div>
          <div class="ps-attraction-body">
            <div class="ps-attraction-specs">
              <span>● 50,000+ Balls</span><span>● UV-C Sanitized</span><span>● Sensory Fun</span>
            </div>
            <h4>Sanitized Ball Pit</h4>
            <p class="text-muted" style="font-size: 0.92rem; line-height: 1.5; margin-bottom: 1.25rem; flex-grow: 1;">
              Deep sensory ball pool continuously sanitized via automated UV-C machine, with interactive ball chutes and drops.
            </p>
            <div class="ps-attraction-actions" style="display: flex; gap: 0.5rem; margin-top: auto;">
              <a href="pages/attraction-rainbow-ball-pit.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center;">View Details</a>
              <a href="pages/booking-rainbow-ball-pit.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book This Zone</a>
            </div>
          </div>
        </div>

        <!-- Zone 4: Climbing Wall -->
        <div class="ps-attraction-card">
          <div class="ps-attraction-thumb">
            <img src="assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil%E2%80%A6_2K_20261013230406.jpg" alt="Climbing Wall">
          </div>
          <div class="ps-attraction-body">
            <div class="ps-attraction-specs">
              <span>● Auto-Belay</span><span>● Themed Routes</span><span>● Soft Fall Mat</span>
            </div>
            <h4>Clip 'n Climb Wall</h4>
            <p class="text-muted" style="font-size: 0.92rem; line-height: 1.5; margin-bottom: 1.25rem; flex-grow: 1;">
              Vertical climbing towers equipped with certified hydraulic auto-belay descenders for 100% fail-safe climbing fun.
            </p>
            <div class="ps-attraction-actions" style="display: flex; gap: 0.5rem; margin-top: auto;">
              <a href="pages/attraction-adventure-climbing-zone.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center;">View Details</a>
              <a href="pages/booking-adventure-climbing-zone.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book This Zone</a>
            </div>
          </div>
        </div>

        <!-- Zone 5: Ninja Obstacle Course -->
        <div class="ps-attraction-card">
          <div class="ps-attraction-thumb">
            <img src="assets/images/attractions/Ninja%20Warrior%20Course/Child_running_ninja_course_2K_20261013225811.jpg" alt="Ninja Obstacle Course">
          </div>
          <div class="ps-attraction-body">
            <div class="ps-attraction-specs">
              <span>● Warped Wall</span><span>● Ring Swings</span><span>● Balance Beams</span>
            </div>
            <h4>Ninja Obstacle Course</h4>
            <p class="text-muted" style="font-size: 0.92rem; line-height: 1.5; margin-bottom: 1.25rem; flex-grow: 1;">
              Conquer balance beams, ring swings, quintuple steps, cargo net climbs, and the iconic warped wall challenge.
            </p>
            <div class="ps-attraction-actions" style="display: flex; gap: 0.5rem; margin-top: auto;">
              <a href="pages/attraction-ninja-warrior-course.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center;">View Details</a>
              <a href="pages/booking-ninja-warrior-course.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book This Zone</a>
            </div>
          </div>
        </div>

        <!-- Zone 6: Toddler Play Zone -->
        <div class="ps-attraction-card">
          <div class="ps-attraction-thumb">
            <img src="assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233235.jpg" alt="Toddler Play Zone">
          </div>
          <div class="ps-attraction-body">
            <div class="ps-attraction-specs">
              <span>● Gated Sanctuary</span><span>● Low Foam Steps</span><span>● 100% Safe</span>
            </div>
            <h4>Toddler Play Zone</h4>
            <p class="text-muted" style="font-size: 0.92rem; line-height: 1.5; margin-bottom: 1.25rem; flex-grow: 1;">
              Dedicated safe haven exclusively for little ones ages 0–3, with soft crawling mats, sensory toys, and zero big-kid access.
            </p>
            <div class="ps-attraction-actions" style="display: flex; gap: 0.5rem; margin-top: auto;">
              <a href="pages/attraction-little-explorers-zone.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center;">View Details</a>
              <a href="pages/booking-little-explorers-zone.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center;">Book This Zone</a>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center" style="margin-top: 3rem;">
        <a href="pages/attractions.html" class="ps-btn ps-btn-outline-dark ps-btn-lg">
          View All 21 Play Zones &amp; Attraction Details &rarr;
        </a>
      </div>
    </div>
  </section>

  <!-- 3. Why Choose PLAYSPACE? -->
  <section class="ps-section ps-section-white" style="border-top: 1px solid var(--ps-border-color);">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">THE PLAYSPACE ADVANTAGE</span>
        <h2 style="margin-top: 0.75rem;">Why Choose PLAYSPACE?</h2>
        <p class="text-muted">
          Engineered by parents and athletic coaches for exhilarating movement, spotless hygiene, and effortless parent peace of mind.
        </p>
      </div>

      <div class="ps-grid ps-grid-3">
        <!-- 1 -->
        <div class="ps-feature-box">
          <div class="ps-feature-icon">🛡️</div>
          <h4>ASTM F2970 Safety Certified</h4>
          <p>
            Custom-welded steel sub-frames, impact-absorbing safety netting, and 2-inch commercial foam pads protecting every single spring and frame.
          </p>
        </div>

        <!-- 2 -->
        <div class="ps-feature-box">
          <div class="ps-feature-icon">👶</div>
          <h4>Segregated Toddler Sanctuaries</h4>
          <p>
            Completely segregated from older kids. Toddlers (ages 0–3) explore foam climbers, ball pools, and sensory tunnels in total peace.
          </p>
        </div>

        <!-- 3 -->
        <div class="ps-feature-box">
          <div class="ps-feature-icon">🏅</div>
          <h4>Certified Court Jump Patrol</h4>
          <p>
            Every court is actively supervised by CPR and Pediatric First-Aid certified team monitors trained to prevent double-bouncing and rough play.
          </p>
        </div>

        <!-- 4 -->
        <div class="ps-feature-box">
          <div class="ps-feature-icon">✨</div>
          <h4>Hospital-Grade Cleanliness</h4>
          <p>
            Continuous antimicrobial electrostatic fogging, HEPA air scrubbers, and daily commercial UV-C wash cycles for all play apparatus.
          </p>
        </div>

        <!-- 5 -->
        <div class="ps-feature-box">
          <div class="ps-feature-icon">☕</div>
          <h4>Parent Lounge &amp; PlayCafé</h4>
          <p>
            Spectators enter 100% free! Enjoy comfortable 360° viewing lounges with fast fiber Wi-Fi, charging docks, and artisan coffee.
          </p>
        </div>

        <!-- 6 -->
        <div class="ps-feature-box">
          <div class="ps-feature-icon">⚡</div>
          <h4>All-Inclusive Passes &amp; Fast Entry</h4>
          <p>
            Sign digital safety waivers online once for the entire year, reserve jump slots in 2 clicks, and scan right at the gate with zero lines.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Birthday Party Highlights -->
  <section class="ps-section ps-section-dark">
    <div class="ps-container">
      <div class="ps-section-header text-center" style="max-width: 760px; margin: 0 auto 3rem auto;">
        <span class="badge-tag">STRESS-FREE CELEBRATIONS</span>
        <h2 style="color: #FFFFFF; margin-top: 0.75rem;">Birthday Party Highlights</h2>
        <p style="color: rgba(255,255,255,0.75); font-size: 1.05rem;">
          Give your child an unforgettable birthday celebration while we take care of 100% of the planning, setup, hosting, and cleanup!
        </p>
      </div>

      <!-- Packages Grid -->
      <div class="ps-grid ps-grid-3" style="gap: 2rem;">
        <!-- Package 1: Basic -->
        <div class="ps-card ps-card-dark" style="background: #111111; border: 1px solid #222222; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="color: #FFCC00; font-size: 0.8rem; font-weight: 800; letter-spacing: 1px;">POPULAR ESSENTIAL</span>
            <h3 style="color: #FFFFFF; font-size: 1.5rem; margin: 0.5rem 0;">Basic Bouncer Party</h3>
            <div style="font-size: 1.8rem; font-weight: 900; color: #FFFFFF; margin-bottom: 1rem;">$199 <span style="font-size: 0.9rem; font-weight: 400; color: rgba(255,255,255,0.6);">/ up to 10 guests</span></div>
            <ul style="color: rgba(255,255,255,0.8); list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
              <li>✔ 90 Min Jump Time + 45 Min Private Party Room</li>
              <li>✔ Dedicated Energetic Party Host</li>
              <li>✔ PlaySpace Grip Socks for All Jumpers</li>
              <li>✔ Digital Party Invitations &amp; Thank You Cards</li>
            </ul>
          </div>
          <div style="margin-top: 1.5rem;">
            <a href="pages/birthday-booking.html?package=party-basic" class="ps-btn ps-btn-outline ps-btn-block">Book Birthday Party</a>
          </div>
        </div>

        <!-- Package 2: Premium -->
        <div class="ps-card ps-card-dark" style="background: #111111; border: 2px solid #FFCC00; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: visible;">
          <div>
            <span style="color: #FFCC00; font-size: 0.8rem; font-weight: 800; letter-spacing: 1px;">COMPLETE EXPERIENCE</span>
            <h3 style="color: #FFFFFF; font-size: 1.5rem; margin: 0.5rem 0;">Premium Adventure Party</h3>
            <div style="font-size: 1.8rem; font-weight: 900; color: #FFCC00; margin-bottom: 1rem;">$299 <span style="font-size: 0.9rem; font-weight: 400; color: rgba(255,255,255,0.6);">/ up to 15 guests</span></div>
            <ul style="color: rgba(255,255,255,0.8); list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
              <li>✔ 120 Min Jump Time + 45 Min Private Party Room</li>
              <li>✔ Dedicated Party Host + Setup &amp; Full Cleanup</li>
              <li>✔ Fresh Artisan Pizzas &amp; 100% Fruit Juice Boxes</li>
              <li>✔ Grip Socks + VIP Party Favor Bags for Kids</li>
            </ul>
          </div>
          <div style="margin-top: 1.5rem;">
            <a href="pages/birthday-booking.html?package=party-vip" class="ps-btn ps-btn-primary ps-btn-block">Book Birthday Party</a>
          </div>
        </div>

        <!-- Package 3: VIP Glow -->
        <div class="ps-card ps-card-dark" style="background: #111111; border: 1px solid #222222; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="color: #FFCC00; font-size: 0.8rem; font-weight: 800; letter-spacing: 1px;">ULTIMATE LUXURY</span>
            <h3 style="color: #FFFFFF; font-size: 1.5rem; margin: 0.5rem 0;">VIP Neon Glow Party</h3>
            <div style="font-size: 1.8rem; font-weight: 900; color: #FFFFFF; margin-bottom: 1rem;">$449 <span style="font-size: 0.9rem; font-weight: 400; color: rgba(255,255,255,0.6);">/ up to 20 guests</span></div>
            <ul style="color: rgba(255,255,255,0.8); list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
              <li>✔ Exclusive VIP Glow Room + Blacklight Ambiance</li>
              <li>✔ Neon Face Paint, Glow Bracelets &amp; Accessories</li>
              <li>✔ Dedicated Senior Party Host &amp; Special Kids' Meal</li>
              <li>✔ Premium Photo Backdrop + Free Gift for Birthday Kid</li>
            </ul>
          </div>
          <div style="margin-top: 1.5rem;">
            <a href="pages/birthday-booking.html?package=party-ultimate" class="ps-btn ps-btn-outline ps-btn-block">Book Birthday Party</a>
          </div>
        </div>
      </div>

      <!-- Highlights Banner Strip -->
      <div style="background: rgba(255,204,0,0.1); border: 1px solid #FFCC00; border-radius: 12px; padding: 1.5rem 2rem; margin-top: 2.5rem; display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <span style="color: #FFFFFF; font-size: 0.95rem; font-weight: 700;">🎂 Private Party Suites</span>
        <span style="color: #FFFFFF; font-size: 0.95rem; font-weight: 700;">🎈 Dedicated Host</span>
        <span style="color: #FFFFFF; font-size: 0.95rem; font-weight: 700;">🍕 Pizza &amp; Drinks Included</span>
        <span style="color: #FFFFFF; font-size: 0.95rem; font-weight: 700;">🧹 100% Zero-Cleanup for Parents</span>
      </div>
    </div>
  </section>

  <!-- 5. Safety and Cleanliness Features -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center" style="max-width: 760px; margin: 0 auto 3.5rem auto;">
        <span class="badge-tag">NON-NEGOTIABLE STANDARDS</span>
        <h2 style="margin-top: 0.75rem; font-size: 2.25rem;">Safety and Cleanliness Features</h2>
        <p class="text-muted" style="line-height: 1.6; font-size: 1.05rem;">
          At PLAYSPACE, safety and hygiene are engineered into every single corner of our facility so you can relax with 100% confidence while your kids play freely.
        </p>
      </div>

      <div class="ps-grid ps-grid-2" style="gap: 2.5rem; align-items: stretch;">
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div class="ps-safety-feature-item" style="background: var(--ps-bg-surface-alt, #F8F9FA); border: 1px solid var(--ps-border-color); border-left: 3px solid #FFCC00; padding: 1.25rem; border-radius: 8px;">
              <strong style="font-size: 1.05rem; display: block; color: var(--ps-text-main);">🛡️ ASTM F2970 Engineered Padding</strong>
              <p class="text-muted" style="font-size: 0.9rem; margin: 0.25rem 0 0 0; line-height: 1.5;">
                2-inch seamless commercial foam pads cover all springs and steel framing with zero exposed pinch points and high-tension safety netting.
              </p>
            </div>

            <div class="ps-safety-feature-item" style="background: var(--ps-bg-surface-alt, #F8F9FA); border: 1px solid var(--ps-border-color); border-left: 3px solid #FFCC00; padding: 1.25rem; border-radius: 8px;">
              <strong style="font-size: 1.05rem; display: block; color: var(--ps-text-main);">✨ Hospital-Grade Daily &amp; Midday Sanitation</strong>
              <p class="text-muted" style="font-size: 0.9rem; margin: 0.25rem 0 0 0; line-height: 1.5;">
                Nightly antimicrobial electrostatic fogging, automated UV-C ball washing, and 30-minute rotation sanitizing cycles on all play surfaces.
              </p>
            </div>

            <div class="ps-safety-feature-item" style="background: var(--ps-bg-surface-alt, #F8F9FA); border: 1px solid var(--ps-border-color); border-left: 3px solid #FFCC00; padding: 1.25rem; border-radius: 8px;">
              <strong style="font-size: 1.05rem; display: block; color: var(--ps-text-main);">👀 Certified Jump Patrol &amp; Capacity Caps</strong>
              <p class="text-muted" style="font-size: 0.9rem; margin: 0.25rem 0 0 0; line-height: 1.5;">
                Red Cross CPR/Pediatric First-Aid certified safety monitors enforce 1-child-per-mat rules, prevent collisions, and safeguard toddler areas.
              </p>
            </div>
          </div>

          <div style="margin-top: 1.5rem;">
            <a href="pages/safety-guidelines.html" class="ps-btn ps-btn-dark ps-btn-block" style="text-align: center;">Read Full Safety Protocols &rarr;</a>
          </div>
        </div>

        <div style="display: flex;">
          <div style="background: #000000; color: #FFFFFF; border: 2px solid #333333; border-radius: var(--ps-radius-xl); padding: 2.25rem; box-shadow: var(--ps-shadow-lg); width: 100%; display: flex; flex-direction: column; justify-content: space-between;">
            <h4 style="color: #FFCC00; margin-top: 0; font-size: 1.35rem; border-bottom: 1px solid #222; padding-bottom: 0.75rem;">
              Daily Facility Safety Checklist
            </h4>
            <div style="display: flex; flex-direction: column; gap: 1.15rem; margin-top: 1.25rem;">
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="background: #FFCC00; color: #000; font-weight: 800; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.85rem;">✓</span>
                <div>
                  <strong style="color: #FFFFFF; font-size: 0.95rem;">Pre-Opening 40-Point Audit:</strong>
                  <p style="color: rgba(255,255,255,0.65); font-size: 0.85rem; margin: 0.15rem 0 0 0;">Technicians verify springs, cables, anchor bolts, and nets before doors open.</p>
                </div>
              </div>
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="background: #FFCC00; color: #000; font-weight: 800; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.85rem;">✓</span>
                <div>
                  <strong style="color: #FFFFFF; font-size: 0.95rem;">Mandatory Grip Sock Traction:</strong>
                  <p style="color: rgba(255,255,255,0.65); font-size: 0.85rem; margin: 0.15rem 0 0 0;">Certified rubberized grip socks required for all jumpers on vinyl beds.</p>
                </div>
              </div>
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="background: #FFCC00; color: #000; font-weight: 800; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.85rem;">✓</span>
                <div>
                  <strong style="color: #FFFFFF; font-size: 0.95rem;">Automated HEPA Air Exchange:</strong>
                  <p style="color: rgba(255,255,255,0.65); font-size: 0.85rem; margin: 0.15rem 0 0 0;">100% fresh, filtered air circulated 6 times every hour.</p>
                </div>
              </div>
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="background: #FFCC00; color: #000; font-weight: 800; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.85rem;">✓</span>
                <div>
                  <strong style="color: #FFFFFF; font-size: 0.95rem;">Continuous 32-Camera Surveillance:</strong>
                  <p style="color: rgba(255,255,255,0.65); font-size: 0.85rem; margin: 0.15rem 0 0 0;">High-definition cameras continuously monitor all play courts and entry gates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. Parent Testimonials -->
  <section class="ps-section" style="background-color: var(--ps-bg-main); border-top: 1px solid var(--ps-border-color);">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">REAL REVIEWS FROM REAL FAMILIES</span>
        <h2 style="margin-top: 0.75rem;">Parent Testimonials</h2>
        <p class="text-muted">Trusted by over 25,000 local families with a 4.9 out of 5 stars average trust rating.</p>
      </div>

      <div class="ps-grid ps-grid-3">
        <!-- Review 1 -->
        <div class="ps-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="color: #FFCC00; font-size: 1.25rem; margin-bottom: 0.75rem;">★★★★★</div>
            <p style="font-weight: 500; font-style: italic; margin-bottom: 1.5rem; line-height: 1.6;">
              "We celebrated our son’s 7th birthday here and it was by far the easiest party we’ve ever hosted. The party host took care of everything from pizza distribution to keeping the kids entertained!"
            </p>
          </div>
          <div class="ps-flex ps-items-center ps-gap-md" style="margin-top: auto;">
            <img class="ps-avatar-circle" src="assets/images/blog/Making_family_playtime_memorable_2K_20261014015513.jpg" alt="Sarah Jenkins" loading="lazy" decoding="async" style="width: 44px; height: 44px; flex: 0 0 44px; object-fit: cover; object-position: 57% 50%;">
            <div>
              <h5 style="margin: 0; font-size: 0.95rem;">Sarah Jenkins</h5>
              <span style="font-size: 0.8rem; color: var(--ps-text-muted);">Mom of Leo (7) &amp; Maya (4)</span>
            </div>
          </div>
        </div>

        <!-- Review 2 -->
        <div class="ps-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="color: #FFCC00; font-size: 1.25rem; margin-bottom: 0.75rem;">★★★★★</div>
            <p style="font-weight: 500; font-style: italic; margin-bottom: 1.5rem; line-height: 1.6;">
              "The separate Toddler Play Zone is an absolute lifesaver. My 2-year-old had a blast without getting knocked over by older kids. Spotless, brightly lit, and wonderfully attentive staff."
            </p>
          </div>
          <div class="ps-flex ps-items-center ps-gap-md" style="margin-top: auto;">
            <img class="ps-avatar-circle" src="assets/images/blog/Parents_and_kids_experiencing_ne…_2K_20261014015508.jpg" alt="Marcus Davis" loading="lazy" decoding="async" style="width: 44px; height: 44px; flex: 0 0 44px; object-fit: cover; object-position: 69% 49%;">
            <div>
              <h5 style="margin: 0; font-size: 0.95rem;">Marcus Davis</h5>
              <span style="font-size: 0.8rem; color: var(--ps-text-muted);">Dad of Noah (2)</span>
            </div>
          </div>
        </div>

        <!-- Review 3 -->
        <div class="ps-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="color: #FFCC00; font-size: 1.25rem; margin-bottom: 0.75rem;">★★★★★</div>
            <p style="font-weight: 500; font-style: italic; margin-bottom: 1.5rem; line-height: 1.6;">
              "The 10-jump pass is phenomenal value. We visit almost every Saturday morning before the peak rush. The online parent portal makes checking in effortless, and the facility is genuinely immaculate."
            </p>
          </div>
          <div class="ps-flex ps-items-center ps-gap-md" style="margin-top: auto;">
            <img class="ps-avatar-circle" src="assets/images/team/Early_childhood_specialist_profile_2K_20261014105351.jpg" alt="Emily Watson" loading="lazy" decoding="async" style="width: 44px; height: 44px; flex: 0 0 44px; object-fit: cover; object-position: 59% 32%;">
            <div>
              <h5 style="margin: 0; font-size: 0.95rem;">Emily Watson</h5>
              <span style="font-size: 0.8rem; color: var(--ps-text-muted);">PlaySpace Member (2 Kids)</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- 7. Location, Opening Hours and Inquiries -->
  <section class="ps-section ps-section-white" style="border-top: 1px solid var(--ps-border-color);">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">PLAN YOUR VISIT</span>
        <h2 style="margin-top: 0.75rem;">Location, Opening Hours &amp; Contact</h2>
        <p class="text-muted">Conveniently situated with free parking and high-energy family fun 7 days a week.</p>
      </div>

      <div class="ps-card" style="background-color: var(--ps-bg-card); border: 2px solid var(--ps-border-color); padding: 2.5rem;">
        <div class="ps-grid ps-grid-3" style="gap: 2rem; align-items: stretch;">
          <!-- Location -->
          <div style="display: flex; flex-direction: column;">
            <h4 style="margin-bottom: 0.85rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1.15rem;">
              <span>📍</span> Facility Location
            </h4>
            <p class="text-muted" style="margin: 0; font-size: 0.95rem; line-height: 1.65;">
              <strong>PLAYSPACE Adventure Park</strong><br>
              4500 Bounce Boulevard<br>
              Adventure City, AC 90210<br>
              <span style="font-size: 0.85rem; color: var(--ps-text-muted);">Highway 101, Exit 42 • Main Concourse</span>
            </p>
          </div>

          <!-- Opening Hours -->
          <div style="display: flex; flex-direction: column;">
            <h4 style="margin-bottom: 0.85rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1.15rem;">
              <span>🕒</span> Opening Hours
            </h4>
            <p class="text-muted" style="margin: 0; font-size: 0.95rem; line-height: 1.65;">
              <strong>Mon – Thu:</strong> 10:00 AM – 8:00 PM<br>
              <strong>Fri – Sat:</strong> 9:00 AM – 10:00 PM<br>
              <strong>Sunday:</strong> 10:00 AM – 7:00 PM<br>
              <em style="font-size: 0.85rem; color: var(--ps-text-muted);">Toddler Time: Mon–Fri 9:00 – 11:00 AM</em>
            </p>
          </div>

          <!-- Inquiries & Hotlines -->
          <div style="display: flex; flex-direction: column;">
            <h4 style="margin-bottom: 0.85rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1.15rem;">
              <span>📞</span> Inquiries &amp; Hotlines
            </h4>
            <p class="text-muted" style="margin: 0; font-size: 0.95rem; line-height: 1.65;">
              Front Desk: <strong>(555) 839-PLAY</strong><br>
              Direct Line: <strong>(555) 839-7529</strong><br>
              Party Hotline: <strong>(555) 839-PARTY</strong><br>
              Email: <strong>jump@playspacepark.com</strong>
            </p>
          </div>
        </div>

        <!-- Aligned Card Footer: Highlights & Unified Actions -->
        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--ps-border-color); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
            <span class="badge-tag" style="font-size: 0.78rem; padding: 0.35rem 0.85rem;">
              🅿️ Free 300-Vehicle Parking Lot
            </span>
            <span class="badge-tag badge-tag-dark" style="font-size: 0.78rem; padding: 0.35rem 0.85rem;">
              ✨ Glow Night: Fri &amp; Sat 7–10 PM
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <a href="pages/contact.html" class="ps-btn ps-btn-dark ps-btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem; border: 1px solid var(--ps-border-color);">
              <span>📍 Get Directions</span>
            </a>
            <a href="pages/pass-booking.html?pass=pass-90" class="ps-btn ps-btn-primary ps-btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
              <span>🎟️ Book This Pass</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 8. Footer -->
  ${getPublicFooter('')}
  ${getCommonScripts('', ['pricing.js'])}
</body>
</html>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'index.html'), indexHtml, 'utf8');

  // =========================================================================
  // 2. home-2.html (Homepage 2 - Adventure & Glow Night Edition)
  // =========================================================================
  const home2Html = `<!DOCTYPE html>
<html lang="en" data-theme="light" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlaySpace — Urban Adventure &amp; Glow Arena (Homepage 2)</title>
  <meta name="description" content="High-flying urban adventure park featuring Olympic trampolines, auto-belay climbing spires, ninja agility trials, and neon laser glow nights.">
  <link rel="icon" type="image/svg+xml" href="assets/images/favicon/favicon.svg">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  ${getPublicHeader('', 'home')}

  <!-- Hero 2 - Centered Immersive Action Hero -->
  <section class="ps-hero" style="text-align: center; padding: 6.5rem 0 5.5rem 0; background-color: #000000;">
    <div class="ps-container">
      <div style="max-width: 960px; margin: 0 auto;">
        <span class="badge-tag" style="margin-bottom: 1.5rem;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          URBAN ADVENTURE &amp; GLOW ARENA
        </span>
        <h1 class="ps-hero-title" style="font-size: clamp(2.8rem, 6vw, 4.6rem); margin-bottom: 1.5rem;">
          WHERE KIDS DEFY GRAVITY &amp; <span style="color: #FFCC00;">UNLEASH PURE ENERGY.</span>
        </h1>
        <p class="ps-hero-subtitle" style="margin: 0 auto 2.5rem auto; font-size: 1.3rem;">
          35,000 square feet of high-tension trampoline runways, auto-belay vertical climbing towers, tactical ninja obstacle courses, and toddler sensory sanctuaries.
        </p>
        <div style="display: flex; justify-content: center; gap: 1.25rem; flex-wrap: wrap;">
          <a href="pages/booking.html" class="ps-btn ps-btn-primary ps-btn-lg">
            Book Jump Session
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </a>
          <a href="#timetable" class="ps-btn ps-btn-outline ps-btn-lg">
            Today's Arena Schedule
          </a>
        </div>

        <!-- Quick Flight Duration Selector -->
        <div class="ps-duration-pill-group">
          <a href="pages/booking.html" class="ps-duration-pill">
            <span>⏱️ 60-Min Flight</span>
            <strong class="ps-pill-price">$18</strong>
          </a>
          <a href="pages/booking.html" class="ps-duration-pill active">
            <span>⚡ 90-Min Power Pass</span>
            <strong class="ps-pill-price">$24</strong>
          </a>
          <a href="pages/booking.html" class="ps-duration-pill">
            <span>✨ 120-Min Glow Pass</span>
            <strong class="ps-pill-price">$28</strong>
          </a>
          <a href="pages/booking.html" class="ps-duration-pill">
            <span>⭐ All-Day Unlimited</span>
            <strong class="ps-pill-price">$38</strong>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Live Stats Ribbon -->
  <section style="background-color: #000000; border-bottom: 2px solid #FFCC00; padding: 1.5rem 0; color: #FFFFFF;">
    <div class="ps-container">
      <div class="ps-home2-stats-grid">
        <div>
          <div style="font-size: 2.2rem; font-weight: 900; color: #FFCC00;">35,000</div>
          <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: rgba(255,255,255,0.75);">Total Sq Footage</div>
        </div>
        <div>
          <div style="font-size: 2.2rem; font-weight: 900; color: #FFFFFF;">60+</div>
          <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: rgba(255,255,255,0.75);">Connected Trampolines</div>
        </div>
        <div>
          <div style="font-size: 2.2rem; font-weight: 900; color: #FFCC00;">8</div>
          <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: rgba(255,255,255,0.75);">Climbing Towers</div>
        </div>
        <div>
          <div style="font-size: 2.2rem; font-weight: 900; color: #FFFFFF;">250 Max</div>
          <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: rgba(255,255,255,0.75);">Court Safety Limit</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Today's Live Arena Timetable (Unique to Home 2) -->
  <section id="timetable" class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">TODAY'S ARENA SCHEDULE</span>
        <h2 style="margin-top: 0.75rem;">Real-Time Daily Court Programme &amp; Timetable</h2>
        <p class="text-muted">Live court capacity updates, age-specific programming blocks, and upcoming session slots.</p>
      </div>

      <div class="ps-timetable-grid">
        <!-- Slot 1 -->
        <div class="ps-timetable-card">
          <div class="ps-flex-between" style="margin-bottom: 0.75rem;">
            <span class="ps-badge">AGES 0–4 ONLY</span>
            <span class="ps-badge ps-badge-dark" style="background-color: #000000; color: #FFCC00; border: 1px solid #FFCC00;">OPEN NOW</span>
          </div>
          <div style="font-size: 1.25rem; font-weight: 900; margin-bottom: 0.35rem;">09:00 AM – 11:00 AM</div>
          <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Toddler Gentle Morning</h4>
          <p class="text-muted" style="font-size: 0.88rem; flex-grow: 1;">
            Soft ambient lighting and lullaby tunes. Segregated toddler lagoon access with complimentary adult entry.
          </p>
          <div class="ps-flex-between" style="border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 1rem;">
            <div>
              <span style="font-size: 1.2rem; font-weight: 900;">$12</span>
              <span class="text-muted" style="font-size: 0.8rem;">/ toddler</span>
            </div>
            <a href="pages/booking.html?session=toddler&title=Toddler+Gentle+Morning&price=12&duration=120&slot=09:00+AM+-+11:00+AM" class="ps-btn ps-btn-dark ps-btn-sm">Book Slot</a>
          </div>
        </div>

        <!-- Slot 2 -->
        <div class="ps-timetable-card">
          <div class="ps-flex-between" style="margin-bottom: 0.75rem;">
            <span class="ps-badge">ALL AGES</span>
            <span class="ps-badge" style="background-color: #FFCC00; color: #000000;">FILLING FAST</span>
          </div>
          <div style="font-size: 1.25rem; font-weight: 900; margin-bottom: 0.35rem;">11:00 AM – 03:00 PM</div>
          <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Open Jump &amp; Flight</h4>
          <p class="text-muted" style="font-size: 0.88rem; flex-grow: 1;">
            Parkwide access to 60+ trampolines, basketball slam dunk runways, stunt airbag drop, and battle beam.
          </p>
          <div class="ps-flex-between" style="border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 1rem;">
            <div>
              <span style="font-size: 1.2rem; font-weight: 900;">$18</span>
              <span class="text-muted" style="font-size: 0.8rem;">/ 60 min</span>
            </div>
            <a href="pages/booking.html?session=open-jump&title=Open+Jump+%26+Flight&price=18&duration=60&slot=11:00+AM+-+01:00+PM" class="ps-btn ps-btn-primary ps-btn-sm">Book Slot</a>
          </div>
        </div>

        <!-- Slot 3 -->
        <div class="ps-timetable-card">
          <div class="ps-flex-between" style="margin-bottom: 0.75rem;">
            <span class="ps-badge">AGES 6+</span>
            <span class="ps-badge ps-badge-dark">UPCOMING</span>
          </div>
          <div style="font-size: 1.25rem; font-weight: 900; margin-bottom: 0.35rem;">03:00 PM – 06:30 PM</div>
          <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Ninja Agility &amp; Climbing</h4>
          <p class="text-muted" style="font-size: 0.88rem; flex-grow: 1;">
            Timed warped wall runs, obstacle matrix, and 8 vertical climbing towers with certified safety marshals.
          </p>
          <div class="ps-flex-between" style="border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 1rem;">
            <div>
              <span style="font-size: 1.2rem; font-weight: 900;">$22</span>
              <span class="text-muted" style="font-size: 0.8rem;">/ 90 min</span>
            </div>
            <a href="pages/booking.html?session=ninja&title=Ninja+Agility+%26+Climbing&price=22&duration=90&slot=03:00+PM+-+04:30+PM" class="ps-btn ps-btn-dark ps-btn-sm">Book Slot</a>
          </div>
        </div>

        <!-- Slot 4 -->
        <div class="ps-timetable-card" style="border-color: #FFCC00;">
          <div class="ps-flex-between" style="margin-bottom: 0.75rem;">
            <span class="ps-badge">AGES 8+ &amp; TEENS</span>
            <span class="ps-badge" style="background-color: #FFCC00; color: #000000;">POPULAR</span>
          </div>
          <div style="font-size: 1.25rem; font-weight: 900; margin-bottom: 0.35rem;">07:00 PM – 10:00 PM</div>
          <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Neon Blacklight Glow</h4>
          <p class="text-muted" style="font-size: 0.88rem; flex-grow: 1;">
            Arena mainlights off, UV blacklights on! Live guest DJ, laser shows, glow face paint, and neon dodgeball.
          </p>
          <div class="ps-flex-between" style="border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 1rem;">
            <div>
              <span style="font-size: 1.2rem; font-weight: 900;">$25</span>
              <span class="text-muted" style="font-size: 0.8rem;">/ all-access</span>
            </div>
            <a href="pages/booking.html?session=glow&title=Neon+Blacklight+Glow&price=25&duration=120&slot=07:00+PM+-+09:00+PM" class="ps-btn ps-btn-primary ps-btn-sm">Book Glow</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 4 Specialty Adventure Arenas (Deep-Dive Cards) -->
  <section class="ps-section" style="background-color: var(--ps-bg-main); border-top: 1px solid var(--ps-border-color);">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">SPECIALTY ADVENTURE ZONES</span>
        <h2 style="margin-top: 0.75rem;">Engineered for High-Adrenaline Agility</h2>
        <p class="text-muted">Take a closer look at our four signature arena zones engineered for maximum kinetic thrill and verified safety.</p>
      </div>

      <div class="ps-grid ps-grid-2">
        <!-- Zone 1 -->
        <div class="ps-card" style="display: flex; flex-direction: column; height: 100%;">
          <div class="ps-card-media" style="height: 240px; position: relative;">
            <img src="assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224636.jpg" alt="The Olympic Freestyle Bounce &amp; Wall Runway" style="width: 100%; height: 100%; object-fit: cover; display: block;">
            <span class="ps-badge" style="position: absolute; top: 16px; left: 16px;">MAIN ATTRACTION</span>
          </div>
          <div class="ps-card-body" style="padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1;">
            <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: var(--ps-text-muted); margin-bottom: 0.35rem; min-height: 1.25rem; display: flex; align-items: center;">
              8.5m Clearance • 60+ Connected Springbeds
            </div>
            <h3 style="margin-top: 0; margin-bottom: 0.75rem; font-size: 1.35rem; line-height: 1.25; min-height: 3.4rem; display: flex; align-items: flex-start;">The Olympic Freestyle Bounce &amp; Wall Runway</h3>
            <p class="text-muted" style="font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.25rem; min-height: 4.5rem;">
              Custom welded steel frames with impact-absorbing continuous net walls. Practice aerial twists, tumble passes, and spring-assisted slam dunks on 10ft regulation basketball hoops.
            </p>
            <div style="display: flex; gap: 0.75rem 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; font-size: 0.85rem; font-weight: 700; min-height: 44px; align-items: center;">
              <span>🛡️ ASTM F2970 Certified</span>
              <span>👟 Grip Socks Required</span>
              <span>⚖️ Max Weight 260 lbs</span>
            </div>
            <div class="ps-attraction-actions" style="margin-top: auto; display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
              <div style="display: flex; gap: 0.5rem; width: 100%;">
                <a href="pages/attraction-mega-trampoline-arena.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center; justify-content: center;">View Details</a>
                <a href="pages/booking-mega-trampoline-arena.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center; justify-content: center;">Book This Zone</a>
              </div>
              <button type="button" class="ps-btn ps-btn-outline ps-btn-sm ps-btn-add-cart" data-add-cart="attraction-mega-trampoline-arena" data-name="Mega Trampoline Arena" data-price="18.00" data-type="Zone Admission" data-icon="🤸" style="width: 100%; text-align: center; justify-content: center; border: 2px solid #FFCC00; color: var(--ps-text-main); font-weight: 800; background: rgba(255, 204, 0, 0.1);">
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>

        <!-- Zone 2 -->
        <div class="ps-card" style="display: flex; flex-direction: column; height: 100%;">
          <div class="ps-card-media" style="height: 240px; position: relative;">
            <img src="assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil…_2K_20261013230406.jpg" alt="Clip ’n Climb Vertical Sky Towers" style="width: 100%; height: 100%; object-fit: cover; display: block;">
          </div>
          <div class="ps-card-body" style="padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1;">
            <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: var(--ps-text-muted); margin-bottom: 0.35rem; min-height: 1.25rem; display: flex; align-items: center;">
              8 Themed Vertical Towers • 24ft Peak
            </div>
            <h3 style="margin-top: 0; margin-bottom: 0.75rem; font-size: 1.35rem; line-height: 1.25; min-height: 3.4rem; display: flex; align-items: flex-start;">Clip ’n Climb Vertical Sky Towers</h3>
            <p class="text-muted" style="font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.25rem; min-height: 4.5rem;">
              Equipped with world-class hydraulic auto-belay brake systems. Climb vertical spires, illuminated tetris walls, and timed dual race towers with automated, feather-soft descents.
            </p>
            <div style="display: flex; gap: 0.75rem 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; font-size: 0.85rem; font-weight: 700; min-height: 44px; align-items: center;">
              <span>🧗 Auto-Belay Hydraulic</span>
              <span>📏 Min Height: 40 Inches</span>
              <span>👨‍🏫 Certified Belay Instructors</span>
            </div>
            <div class="ps-attraction-actions" style="margin-top: auto; display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
              <div style="display: flex; gap: 0.5rem; width: 100%;">
                <a href="pages/attraction-adventure-climbing-zone.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center; justify-content: center;">View Details</a>
                <a href="pages/booking-adventure-climbing-zone.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center; justify-content: center;">Book This Zone</a>
              </div>
              <button type="button" class="ps-btn ps-btn-outline ps-btn-sm ps-btn-add-cart" data-add-cart="attraction-adventure-climbing-zone" data-name="Adventure Climbing Zone" data-price="18.00" data-type="Zone Admission" data-icon="🧗" style="width: 100%; text-align: center; justify-content: center; border: 2px solid #FFCC00; color: var(--ps-text-main); font-weight: 800; background: rgba(255, 204, 0, 0.1);">
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>

        <!-- Zone 3 -->
        <div class="ps-card" style="display: flex; flex-direction: column; height: 100%;">
          <div class="ps-card-media" style="height: 240px; position: relative;">
            <img src="assets/images/attractions/Ninja%20Warrior%20Course/Ninja_warrior_course_for_children_2K_20261013225815.jpg" alt="The Multi-Tier Ninja Warrior Matrix" style="width: 100%; height: 100%; object-fit: cover; display: block;">
            <span class="ps-badge" style="position: absolute; top: 16px; left: 16px;">AGILITY TRIALS</span>
          </div>
          <div class="ps-card-body" style="padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1;">
            <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: var(--ps-text-muted); margin-bottom: 0.35rem; min-height: 1.25rem; display: flex; align-items: center;">
              3 Difficulty Lanes • Dual Warped Walls
            </div>
            <h3 style="margin-top: 0; margin-bottom: 0.75rem; font-size: 1.35rem; line-height: 1.25; min-height: 3.4rem; display: flex; align-items: flex-start;">The Multi-Tier Ninja Warrior Matrix</h3>
            <p class="text-muted" style="font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.25rem; min-height: 4.5rem;">
              Test balance, grip stamina, and core agility across hanging cargo webs, suspended ring bridges, tilting balance beams, and authentic 8ft &amp; 10ft curved warped running walls.
            </p>
            <div style="display: flex; gap: 0.75rem 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; font-size: 0.85rem; font-weight: 700; min-height: 44px; align-items: center;">
              <span>⏱️ Timed Trial Sensors</span>
              <span>🎽 Ages 6+ Years</span>
              <span>🏅 Leaderboard Competitions</span>
            </div>
            <div class="ps-attraction-actions" style="margin-top: auto; display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
              <div style="display: flex; gap: 0.5rem; width: 100%;">
                <a href="pages/attraction-ninja-warrior-course.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center; justify-content: center;">View Details</a>
                <a href="pages/booking-ninja-warrior-course.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center; justify-content: center;">Book This Zone</a>
              </div>
              <button type="button" class="ps-btn ps-btn-outline ps-btn-sm ps-btn-add-cart" data-add-cart="attraction-ninja-warrior-course" data-name="Ninja Warrior Course" data-price="18.00" data-type="Zone Admission" data-icon="🥷" style="width: 100%; text-align: center; justify-content: center; border: 2px solid #FFCC00; color: var(--ps-text-main); font-weight: 800; background: rgba(255, 204, 0, 0.1);">
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>

        <!-- Zone 4 -->
        <div class="ps-card" style="display: flex; flex-direction: column; height: 100%;">
          <div class="ps-card-media" style="height: 240px; position: relative;">
            <img src="assets/images/attractions/Airbag%20Jump%20Zone/Children_jumping_on_airbag_2K_20261014010234.jpg" alt="Zero-Gravity Stunt Airbag Crater" style="width: 100%; height: 100%; object-fit: cover; display: block;">
            <span class="ps-badge" style="position: absolute; top: 16px; left: 16px;">ZERO GRAVITY</span>
          </div>
          <div class="ps-card-body" style="padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1;">
            <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: var(--ps-text-muted); margin-bottom: 0.35rem; min-height: 1.25rem; display: flex; align-items: center;">
              Dual 3m &amp; 5m Decks • Safe Deceleration
            </div>
            <h3 style="margin-top: 0; margin-bottom: 0.75rem; font-size: 1.35rem; line-height: 1.25; min-height: 3.4rem; display: flex; align-items: flex-start;">Zero-Gravity Stunt Airbag Crater</h3>
            <p class="text-muted" style="font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.25rem; min-height: 4.5rem;">
              Sprint down dedicated high-rebound tramp runways and launch into our medical-grade stunt air cushion. Built to safely absorb backflips, aerial twists, and high-altitude drops.
            </p>
            <div style="display: flex; gap: 0.75rem 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; font-size: 0.85rem; font-weight: 700; min-height: 44px; align-items: center;">
              <span>☁️ Medical-Grade Cushion</span>
              <span>1️⃣ 1 Jumper At A Time Flow</span>
              <span>✨ Continuous Airflow Scrubber</span>
            </div>
            <div class="ps-attraction-actions" style="margin-top: auto; display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
              <div style="display: flex; gap: 0.5rem; width: 100%;">
                <a href="pages/attraction-airbag-jump-zone.html" class="ps-btn ps-btn-dark ps-btn-sm" style="flex: 1; text-align: center; justify-content: center;">View Details</a>
                <a href="pages/booking-airbag-jump-zone.html" class="ps-btn ps-btn-primary ps-btn-sm" style="flex: 1; text-align: center; justify-content: center;">Book This Zone</a>
              </div>
              <button type="button" class="ps-btn ps-btn-outline ps-btn-sm ps-btn-add-cart" data-add-cart="attraction-airbag-jump-zone" data-name="Airbag Jump Zone" data-price="18.00" data-type="Zone Admission" data-icon="☁️" style="width: 100%; text-align: center; justify-content: center; border: 2px solid #FFCC00; color: var(--ps-text-main); font-weight: 800; background: rgba(255, 204, 0, 0.1);">
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Dedicated Toddler Lagoon & Sensory Haven (0-4 Years) -->
  <section class="ps-section ps-section-white" style="border-top: 1px solid var(--ps-border-color);">
    <div class="ps-container">
      <div class="ps-grid ps-grid-2 ps-items-center">
        <div>
          <span class="badge-tag">AGES 0–4 SANCTUARY</span>
          <h2 style="margin-top: 0.75rem; margin-bottom: 1rem;">The Toddler Lagoon: Safe Play for Little Explorers</h2>
          <p class="text-muted" style="font-size: 1.05rem; line-height: 1.6;">
            We believe toddlers deserve their own gentle, protected realm. Completely segregated from older jumpers, the Toddler Lagoon provides sensory wonder, tactile exploration, and zero collision worries.
          </p>
          <ul style="display: flex; flex-direction: column; gap: 0.85rem; margin: 1.75rem 0;">
            <li style="display: flex; gap: 0.65rem; font-weight: 600;">
              <span class="ps-check-icon">✔</span>
              <span><strong>Segregated Security Gate:</strong> Big kids (5+) are strictly not permitted in the toddler zone.</span>
            </li>
            <li style="display: flex; gap: 0.65rem; font-weight: 600;">
              <span class="ps-check-icon">✔</span>
              <span><strong>Hospital-Grade Hygiene:</strong> Daily commercial wash cycles and electrostatic fogging for all ball pits and vinyl climbers.</span>
            </li>
            <li style="display: flex; gap: 0.65rem; font-weight: 600;">
              <span class="ps-check-icon">✔</span>
              <span><strong>Parent Espresso Observation Bar:</strong> Sip artisan espresso and enjoy high-speed Wi-Fi while keeping direct eye contact with your child.</span>
            </li>
            <li style="display: flex; gap: 0.65rem; font-weight: 600;">
              <span class="ps-check-icon">✔</span>
              <span><strong>Free Adult Supervisor Entry:</strong> Non-jumping parents and guardians enter 100% free of charge.</span>
            </li>
          </ul>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="pages/booking.html?session=toddler&title=Toddler+Time&price=12&duration=120&slot=09:00+AM+-+11:00+AM" class="ps-btn ps-btn-primary">Book Toddler Time ($12)</a>
            <a href="pages/attraction-toddler-soft-play-lagoon.html" class="ps-btn ps-btn-outline-dark">View Zone Details</a>
          </div>
        </div>

        <div>
          <img src="assets/images/Toddler_Lagoon_safe_play_2K_20261014104620.jpg" alt="The Toddler Lagoon: Safe Play for Little Explorers" style="border-radius: var(--ps-radius-xl); border: 2px solid var(--ps-border-color); width: 100%; box-shadow: 0 15px 35px rgba(0,0,0,0.1);">
        </div>
      </div>
    </div>
  </section>

  <!-- 4 Pass & Membership Tiers (Distinct to Home 2) -->
  <section class="ps-section ps-section-dark">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">VALUE PASS TIERS</span>
        <h2 style="color: #FFFFFF; margin-top: 0.75rem;">Choose the Flight Pass That Fits Your Family</h2>
        <p style="color: rgba(255,255,255,0.75);">
          Transparent pricing with zero hidden fees. All passes grant access to all courts, climbing towers, and stunt pads.
        </p>
      </div>

      <div class="ps-grid ps-grid-4">
        <!-- Pass 1 -->
        <div class="ps-pricing-card">
          <span class="ps-badge ps-badge-dark">STANDARD</span>
          <h3 style="margin-top: 1rem; margin-bottom: 0;">Bronze Flight</h3>
          <p style="color: rgba(0,0,0,0.6); font-size: 0.85rem;">Single open jump visit</p>
          <div class="ps-price-amount">$18</div>
          <p style="font-size: 0.8rem; font-weight: 700; color: rgba(0,0,0,0.7);">60 Minutes Court Time</p>
          <ul class="ps-pricing-features" style="font-size: 0.85rem; margin: 1.25rem 0;">
            <li><span class="ps-check-icon">✔</span> Full Park Access</li>
            <li><span class="ps-check-icon">✔</span> Airbag &amp; Ninja Course</li>
            <li><span class="ps-check-icon">✔</span> Free Parent Lounge</li>
            <li><span class="ps-check-icon">✔</span> Digital Locker Access</li>
          </ul>
          <a href="pages/pass-booking.html?pass=pass-60" class="ps-btn ps-btn-outline-dark ps-btn-block ps-btn-sm" style="text-align: center;">Book This Pass</a>
        </div>

        <!-- Pass 2 - Featured -->
        <div class="ps-pricing-card featured" style="position: relative; overflow: visible;">
          <span class="ps-badge">BEST VALUE</span>
          <h3 style="margin-top: 1rem; margin-bottom: 0; color: #FFFFFF;">Silver Power Pass</h3>
          <p style="color: rgba(255,255,255,0.7); font-size: 0.85rem;">Double the jump time &amp; perks</p>
          <div class="ps-price-amount" style="color: #FFCC00;">$26</div>
          <p style="font-size: 0.8rem; font-weight: 700; color: rgba(255,255,255,0.85);">120 Minutes All-Court Time</p>
          <ul class="ps-pricing-features" style="font-size: 0.85rem; margin: 1.25rem 0;">
            <li><span class="ps-check-icon">✔</span> All-Zone Arena Access</li>
            <li><span class="ps-check-icon">✔</span> Free Grip Socks Included</li>
            <li><span class="ps-check-icon">✔</span> $5 Café Snack Voucher</li>
            <li><span class="ps-check-icon">✔</span> Clip 'n Climb Towers</li>
          </ul>
          <a href="pages/pass-booking.html?pass=pass-120" class="ps-btn ps-btn-primary ps-btn-block ps-btn-sm" style="text-align: center;">Book This Pass</a>
        </div>

        <!-- Pass 3 -->
        <div class="ps-pricing-card">
          <span class="ps-badge ps-badge-dark">FULL DAY</span>
          <h3 style="margin-top: 1rem; margin-bottom: 0;">Gold Weekend</h3>
          <p style="color: rgba(0,0,0,0.6); font-size: 0.85rem;">Unlimited jump &amp; re-entry</p>
          <div class="ps-price-amount">$38</div>
          <p style="font-size: 0.8rem; font-weight: 700; color: rgba(0,0,0,0.7);">Full Day All-Access</p>
          <ul class="ps-pricing-features" style="font-size: 0.85rem; margin: 1.25rem 0;">
            <li><span class="ps-check-icon">✔</span> Unlimited Same-Day Re-Entry</li>
            <li><span class="ps-check-icon">✔</span> Friday/Sat Glow Night Included</li>
            <li><span class="ps-check-icon">✔</span> 15% Café Food Discount</li>
            <li><span class="ps-check-icon">✔</span> Grip Socks Included</li>
          </ul>
          <a href="pages/pass-booking.html?pass=pass-allday" class="ps-btn ps-btn-outline-dark ps-btn-block ps-btn-sm" style="text-align: center;">Book This Pass</a>
        </div>

        <!-- Pass 4 -->
        <div class="ps-pricing-card">
          <span class="ps-badge ps-badge-dark">VIP MEMBER</span>
          <h3 style="margin-top: 1rem; margin-bottom: 0;">VIP Black Club</h3>
          <p style="color: rgba(0,0,0,0.6); font-size: 0.85rem;">Monthly auto-renew membership</p>
          <div class="ps-price-amount">$69<span style="font-size: 1rem; font-weight: 700;">/mo</span></div>
          <p style="font-size: 0.8rem; font-weight: 700; color: rgba(0,0,0,0.7);">Daily 90-Min Sessions</p>
          <ul class="ps-pricing-features" style="font-size: 0.85rem; margin: 1.25rem 0;">
            <li><span class="ps-check-icon">✔</span> Daily Jump Access (30 Days)</li>
            <li><span class="ps-check-icon">✔</span> Express Fast-Gate QR Entry</li>
            <li><span class="ps-check-icon">✔</span> 15% Off All Birthday Parties</li>
            <li><span class="ps-check-icon">✔</span> 1 Free Guest Pass Monthly</li>
          </ul>
          <a href="pages/pass-booking.html?pass=pass-allday" class="ps-btn ps-btn-outline-dark ps-btn-block ps-btn-sm" style="text-align: center;">Book This Pass</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Large Group Excursions & Corporate Buyouts (Unique to Home 2) -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-grid ps-grid-2 ps-items-center">
        <div>
          <span class="badge-tag">FIELD TRIPS &amp; CORPORATE</span>
          <h2 style="margin-top: 0.75rem; margin-bottom: 1rem;">Large Group Adventures, School Excursions &amp; Buyouts</h2>
          <p class="text-muted" style="font-size: 1.05rem;">
            Whether you are hosting an elementary school celebration, church youth excursion, sports award banquet, or corporate team-building event, PlaySpace delivers hassle-free group events for 20 to 300 jumpers.
          </p>
          <div class="ps-grid ps-grid-2" style="gap: 1rem; margin: 1.5rem 0;">
            <div style="background: rgba(0,0,0,0.03); padding: 1rem; border-radius: var(--ps-radius-md); border: 1px solid var(--ps-border-color);">
              <h5 style="margin: 0 0 0.25rem 0;">🏆 Dodgeball Tournaments</h5>
              <p class="text-muted" style="font-size: 0.85rem; margin: 0;">Custom tournament brackets with dedicated referee staff.</p>
            </div>
            <div style="background: rgba(0,0,0,0.03); padding: 1rem; border-radius: var(--ps-radius-md); border: 1px solid var(--ps-border-color);">
              <h5 style="margin: 0 0 0.25rem 0;">🍕 Turnkey Catering</h5>
              <p class="text-muted" style="font-size: 0.85rem; margin: 0;">Hot artisan pizza, cold drinks, smoothies, and dietary options.</p>
            </div>
            <div style="background: rgba(0,0,0,0.03); padding: 1rem; border-radius: var(--ps-radius-md); border: 1px solid var(--ps-border-color);">
              <h5 style="margin: 0 0 0.25rem 0;">🔒 Private Arena Buyouts</h5>
              <p class="text-muted" style="font-size: 0.85rem; margin: 0;">Reserve the entire 35,000 sq ft facility exclusively for your team.</p>
            </div>
            <div style="background: rgba(0,0,0,0.03); padding: 1rem; border-radius: var(--ps-radius-md); border: 1px solid var(--ps-border-color);">
              <h5 style="margin: 0 0 0.25rem 0;">📜 School Safety Compliant</h5>
              <p class="text-muted" style="font-size: 0.85rem; margin: 0;">Certificate of insurance and liability documentation provided.</p>
            </div>
          </div>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="pages/group-events.html" class="ps-btn ps-btn-dark">Group Packages &amp; Pricing</a>
            <a href="pages/contact.html" class="ps-btn ps-btn-outline-dark">Contact Group Concierge</a>
          </div>
        </div>

        <div>
          <img src="assets/images/Planning_group_adventures_and_sc…_2K_20261014105017.jpg" alt="Large Group Adventures, School Excursions &amp; Buyouts" style="border-radius: var(--ps-radius-xl); border: 2px solid var(--ps-border-color); width: 100%; box-shadow: 0 15px 35px rgba(0,0,0,0.1);">
        </div>
      </div>
    </div>
  </section>

  <!-- Meet Our Certified Jump Patrol Staff (Unique to Home 2) -->
  <section class="ps-section" style="background-color: var(--ps-bg-main); border-top: 1px solid var(--ps-border-color);">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">OUR SAFETY SPECIALISTS</span>
        <h2 style="margin-top: 0.75rem;">Meet the Certified Jump Patrol &amp; Safety Masters</h2>
        <p class="text-muted">Every court is actively monitored by CPR and First-Aid certified team monitors trained to ensure respectful play and total safety.</p>
      </div>

      <div class="ps-grid ps-grid-3">
        <!-- Staff 1 -->
        <div class="ps-staff-card">
          <div class="ps-staff-thumb">
            <img src="assets/images/team/Trampoline_operations_and_CPR_ce…_2K_20261014105255.jpg" alt="Marcus Vance - Head Court Director">
            <span class="ps-badge" style="position: absolute; bottom: 12px; left: 12px;">HEAD COURT DIRECTOR</span>
          </div>
          <div class="ps-staff-body">
            <h4 style="margin: 0 0 0.25rem 0;">Marcus Vance</h4>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--ps-text-muted); margin-bottom: 0.75rem;">8 Years Trampoline Operations • CPR/AED Certified</span>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1;">
              "Court safety is our absolute priority. Every bolt, safety pad, and net is rigorously inspected at 7:00 AM each morning before our doors open."
            </p>
          </div>
        </div>

        <!-- Staff 2 -->
        <div class="ps-staff-card">
          <div class="ps-staff-thumb">
            <img src="assets/images/team/Early_childhood_specialist_profile_2K_20261014105351.jpg" alt="Sarah Lin - Birthday Master">
            <span class="ps-badge" style="position: absolute; bottom: 12px; left: 12px;">BIRTHDAY MASTER</span>
          </div>
          <div class="ps-staff-body">
            <h4 style="margin: 0 0 0.25rem 0;">Sarah Lin</h4>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--ps-text-muted); margin-bottom: 0.75rem;">500+ Milestone Parties • Early Childhood Specialist</span>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1;">
              "We take care of every detail from party invitations to pizza distribution so moms and dads can actually sit back and enjoy their child's milestone."
            </p>
          </div>
        </div>

        <!-- Staff 3 -->
        <div class="ps-staff-card">
          <div class="ps-staff-thumb">
            <img src="assets/images/team/Climbing_inspector_and_agility_c…_2K_20261014105633.jpg" alt="David Ramos - Ninja &amp; Climb Lead">
            <span class="ps-badge" style="position: absolute; bottom: 12px; left: 12px;">NINJA &amp; CLIMB LEAD</span>
          </div>
          <div class="ps-staff-body">
            <h4 style="margin: 0 0 0.25rem 0;">David Ramos</h4>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--ps-text-muted); margin-bottom: 0.75rem;">ACCT Level 3 Climbing Inspector • Youth Agility Coach</span>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1;">
              "Teaching kids how to conquer their fear of heights on the 24ft climbing towers and watching their confidence soar is what makes this job magical."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Friday & Saturday Glow Nights Feature Section -->
  <section class="ps-section ps-section-white" style="border-top: 1px solid var(--ps-border-color);">
    <div class="ps-container">
      <div style="background-color: #000000; color: #FFFFFF; border-radius: var(--ps-radius-xl); padding: 3rem; border: 2px solid #FFCC00; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
        <div>
          <span class="badge-tag" style="margin-bottom: 1rem;">WEEKEND SPECIAL FEATURE</span>
          <h2 style="color: #FFFFFF; font-size: 2.8rem; line-height: 1.1; margin-bottom: 1rem;">
            Neon Blacklight Glow Nights
          </h2>
          <p style="color: rgba(255,255,255,0.85); font-size: 1.1rem; margin-bottom: 1.75rem;">
            Every Friday and Saturday from 7:00 PM to 10:00 PM, we shut off the arena mainlights and turn on blacklights, high-definition laser projections, and live DJ sets!
          </p>
          <ul style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
            <li style="display: flex; gap: 0.5rem; color: rgba(255,255,255,0.9); font-weight: 600;">
              <span class="ps-check-icon">✔</span> Free glowing neon wristband and glow necklace with every admission
            </li>
            <li style="display: flex; gap: 0.5rem; color: rgba(255,255,255,0.9); font-weight: 600;">
              <span class="ps-check-icon">✔</span> Neon dodgeball tournaments &amp; slam dunk contests
            </li>
            <li style="display: flex; gap: 0.5rem; color: rgba(255,255,255,0.9); font-weight: 600;">
              <span class="ps-check-icon">✔</span> Safe, controlled, fully supervised teen and pre-teen environment
            </li>
          </ul>
          <a href="pages/birthday-booking.html?package=party-vip" class="ps-btn ps-btn-primary ps-btn-lg">Book Birthday Party</a>
        </div>

        <div>
          <img src="assets/images/Neon_Blacklight_Glow_Nights_2K_20261014112057.jpg" alt="Neon Blacklight Glow Nights at PlaySpace" style="border-radius: var(--ps-radius-xl); border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 20px 40px rgba(0,0,0,0.5); width: 100%;">
        </div>
      </div>
    </div>
  </section>

  <!-- Community Voices & Parent Reviews (Unique to Home 2) -->
  <section class="ps-section" style="background-color: var(--ps-bg-main); border-top: 1px solid var(--ps-border-color);">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">COMMUNITY VOICES</span>
        <h2 style="margin-top: 0.75rem;">Real Stories from Local Families &amp; Educators</h2>
      </div>

      <div class="ps-grid ps-grid-3">
        <div class="ps-card">
          <div style="color: #FFCC00; font-size: 1.25rem; margin-bottom: 0.75rem;">★★★★★</div>
          <p style="font-weight: 500; font-style: italic; margin-bottom: 1.5rem;">
            "The parent coffee lounge with panoramic runway views let me finish my remote work while my 8-year-old safely burned boundless energy on the ninja course. Total sanity-saver."
          </p>
          <div class="ps-flex ps-items-center ps-gap-md" style="margin-top: auto;">
            <img class="ps-avatar-circle" src="assets/images/blog/Making_family_playtime_memorable_2K_20261014015513.jpg" alt="David Kowalski" loading="lazy" decoding="async" style="width: 44px; height: 44px; flex: 0 0 44px; object-fit: cover; object-position: 31% 49%;">
            <div>
              <h5 style="margin: 0; font-size: 0.95rem;">David Kowalski</h5>
              <span style="font-size: 0.8rem; color: var(--ps-text-muted);">Dad of Leo (8) • Weekly Member</span>
            </div>
          </div>
        </div>

        <div class="ps-card">
          <div style="color: #FFCC00; font-size: 1.25rem; margin-bottom: 0.75rem;">★★★★★</div>
          <p style="font-weight: 500; font-style: italic; margin-bottom: 1.5rem;">
            "We organized an end-of-year excursion for 120 elementary students. The PlaySpace staff handled wristband distribution, pizza lunch, and safety rotations like an Olympic squad."
          </p>
          <div class="ps-flex ps-items-center ps-gap-md" style="margin-top: auto;">
            <img class="ps-avatar-circle" src="assets/images/team/Early_childhood_specialist_profile_2K_20261014105351.jpg" alt="Principal Elena Rossi" loading="lazy" decoding="async" style="width: 44px; height: 44px; flex: 0 0 44px; object-fit: cover; object-position: 59% 32%;">
            <div>
              <h5 style="margin: 0; font-size: 0.95rem;">Principal Elena Rossi</h5>
              <span style="font-size: 0.8rem; color: var(--ps-text-muted);">Oakridge Elementary School</span>
            </div>
          </div>
        </div>

        <div class="ps-card">
          <div style="color: #FFCC00; font-size: 1.25rem; margin-bottom: 0.75rem;">★★★★★</div>
          <p style="font-weight: 500; font-style: italic; margin-bottom: 1.5rem;">
            "Having a truly segregated toddler zone is why we drive 25 minutes past other parks. My 3-year-old was able to play peacefully without big kids running through."
          </p>
          <div class="ps-flex ps-items-center ps-gap-md" style="margin-top: auto;">
            <img class="ps-avatar-circle" src="assets/images/blog/Parents_and_kids_experiencing_ne…_2K_20261014015508.jpg" alt="Priya Nair" loading="lazy" decoding="async" style="width: 44px; height: 44px; flex: 0 0 44px; object-fit: cover; object-position: 36% 51%;">
            <div>
              <h5 style="margin: 0; font-size: 0.95rem;">Priya Nair</h5>
              <span style="font-size: 0.8rem; color: var(--ps-text-muted);">Mom of Anya (3) &amp; Kabir (9)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 60-Second Digital Waiver Ribbon (Unique to Home 2) -->
  <section style="background-color: #000000; border-top: 2px solid #FFCC00; border-bottom: 2px solid #FFCC00; padding: 2.5rem 0; color: #FFFFFF;">
    <div class="ps-container">
      <div class="ps-grid ps-grid-2 ps-items-center" style="gap: 2rem;">
        <div>
          <span class="badge-tag" style="margin-bottom: 0.5rem;">FAST-TRACK TURNSTILE GATE</span>
          <h3 style="color: #FFFFFF; font-size: 1.85rem; margin-bottom: 0.5rem;">Sign Your Annual Safety Waiver in 60 Seconds</h3>
          <p style="color: rgba(255,255,255,0.75); margin: 0; font-size: 0.95rem;">
            Complete your digital waiver on your phone once per year. Walk directly through our automated QR turnstile gates with zero front-desk lines.
          </p>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center; justify-content: flex-end; flex-wrap: wrap;">
          <a href="pages/register.html" class="ps-btn ps-btn-primary ps-btn-lg">Sign Online Waiver</a>
          <a href="pages/safety-guidelines.html" class="ps-btn ps-btn-outline ps-btn-lg">View Safety Rules</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Distinct FAQ Accordion (Unique to Home 2) -->
  <section class="ps-section ps-section-white">
    <div class="ps-container" style="max-width: 860px;">
      <div class="ps-section-header text-center">
        <span class="badge-tag">ADVENTURE FAQs</span>
        <h2 style="margin-top: 0.75rem;">Planning Your PlaySpace Visit</h2>
      </div>

      <div class="ps-accordion" data-behavior="single">
        <div class="ps-accordion-item active">
          <div class="ps-accordion-header">
            <span>Can parents drop off their children and leave the park?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            For jumper safety, children aged 12 and under must have an adult guardian (18+) on facility premises at all times. Non-jumping guardians enter 100% free of charge and can relax in our viewing café lounge. Teens aged 13+ may attend independently with an active signed online safety waiver.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Are secure lockers available for backpacks, shoes, and valuables?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Yes! We provide complimentary electronic PIN lockers in our central locker bays. You choose your own 4-digit code. Shoe cubbies are also available adjacent to each court gate free of charge.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Is parking free and are electric vehicle (EV) chargers available?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Yes! Our facility features a dedicated 300-stall free parking lot directly adjacent to the entrance turnstiles, including 6 Level 2 electric vehicle charging stations and accessible parking stalls.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>What happens if my child is sick on the booked day?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            We understand family plans change unexpectedly! You can reschedule your booking online with zero penalty up to 2 hours before your scheduled time slot directly through your parent portal dashboard.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Newsletter Strip -->
  <section style="background-color: #000000; border-top: 2px solid #FFCC00; padding: 3rem 0; color: #FFFFFF;">
    <div class="ps-container">
      <div class="ps-newsletter-grid">
        <div>
          <span class="badge-tag" style="margin-bottom: 0.75rem;">STAY CONNECTED</span>
          <h3 style="color: #FFFFFF; font-size: 2rem; margin-bottom: 0.5rem;">Join the PlaySpace Family Club</h3>
          <p style="color: rgba(255,255,255,0.75); margin: 0;">Receive member-only jump passes, party room promotions, and special event announcements.</p>
        </div>
        <form data-newsletter-form class="ps-newsletter-form">
          <input type="email" class="ps-form-control ps-form-control-dark" data-type="email" placeholder="Enter your email" required style="height: 50px;">
          <button type="submit" class="ps-btn ps-btn-primary" style="height: 50px; flex-shrink: 0;">Subscribe Free</button>
        </form>
      </div>
    </div>
  </section>

  ${getPublicFooter('')}
  ${getCommonScripts('', ['pricing.js'])}
</body>
</html>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'home-2.html'), home2Html, 'utf8');
  console.log('Built updated and expanded index.html and home-2.html successfully');
}

buildHomepages();
