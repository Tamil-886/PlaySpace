const fs = require('fs');
const path = require('path');
const { ROOT_DIR, ensureDir, getPublicHeader, getPublicFooter, getCommonScripts } = require('./build-base');

const PAGES_DIR = path.join(ROOT_DIR, 'pages');
ensureDir(PAGES_DIR);

function pageWrapper(title, description, contentHtml, activeNav = '', extraScripts = [], options = {}) {
  const basePath = '../';
  const headerHtml = options.hideNav ? '' : getPublicHeader(basePath, activeNav);
  const footerHtml = options.hideFooter ? '' : getPublicFooter(basePath, options);
  return `<!DOCTYPE html>
<html lang="en" data-theme="light" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — PlaySpace</title>
  <meta name="description" content="${description}">
  <link rel="icon" type="image/svg+xml" href="${basePath}assets/images/favicon/favicon.svg">
  <link rel="stylesheet" href="${basePath}assets/css/style.css">
</head>
<body>
  ${headerHtml}
  ${contentHtml}
  ${footerHtml}
  ${getCommonScripts(basePath, extraScripts)}
</body>
</html>`;
}

// 1. about.html
const aboutHtml = pageWrapper(
  'About Us',
  'Learn about PLAYSPACE: our mission and vision, our play philosophy, safety-first environment, why parents trust us, and our world-class facilities and certified staff.',
  `
  <!-- Hero Banner -->
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>About Us</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0;">About PLAYSPACE</h1>
      <p style="color: rgba(255,255,255,0.85); font-size: 1.1rem; max-width: 740px; margin: 0.75rem 0 0 0; line-height: 1.6;">
        The premier indoor trampoline &amp; soft play destination where unbounded joy, high-flying adventure, and gold-standard safety unite for children of all ages.
      </p>
    </div>
  </section>

  <!-- 1. About PLAYSPACE (Overview & Origin) -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-grid ps-grid-2 ps-items-center" style="gap: 3rem;">
        <div>
          <span class="badge-tag">WELCOME TO PLAYSPACE</span>
          <h2 style="margin-top: 0.75rem; font-size: 2.2rem; line-height: 1.25;">Where Boundless Energy Meets Pure Childhood Joy</h2>
          <p class="text-muted" style="line-height: 1.6; font-size: 1.05rem;">
            Founded by passionate parents and certified athletic coaches in 2021, <strong>PLAYSPACE</strong> was born from a simple yet revolutionary idea: creating a spotless, inclusive, and thrilling indoor park where kids can unplug from screens, unleash natural energy, and build confidence through active movement.
          </p>
          <p class="text-muted" style="line-height: 1.6;">
            Spanning over 35,000 square feet of custom-engineered terrain, we combine Olympic-grade trampolines, multi-tier soft play mazes, zero-shock foam pits, sensory toddler sanctuaries, and interactive technology. Every square inch is engineered for boundless fun and uncompromising safety.
          </p>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem;">
            <div style="background: var(--ps-bg-surface-alt, rgba(0,0,0,0.03)); border: 1px solid var(--ps-border-color); border-top: 3px solid #FFCC00; padding: 1.25rem 0.75rem; border-radius: 8px; text-align: center;">
              <h3 style="margin: 0; font-size: 1.85rem; color: var(--ps-text-main);">35,000+</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem; font-weight: 700; color: var(--ps-text-muted);">Sq. Ft. Facility</p>
            </div>
            <div style="background: var(--ps-bg-surface-alt, rgba(0,0,0,0.03)); border: 1px solid var(--ps-border-color); border-top: 3px solid #FFCC00; padding: 1.25rem 0.75rem; border-radius: 8px; text-align: center;">
              <h3 style="margin: 0; font-size: 1.85rem; color: var(--ps-text-main);">25,000+</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem; font-weight: 700; color: var(--ps-text-muted);">Happy Jumpers/Yr</p>
            </div>
            <div style="background: var(--ps-bg-surface-alt, rgba(0,0,0,0.03)); border: 1px solid var(--ps-border-color); border-top: 3px solid #FFCC00; padding: 1.25rem 0.75rem; border-radius: 8px; text-align: center;">
              <h3 style="margin: 0; font-size: 1.85rem; color: var(--ps-text-main);">100%</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem; font-weight: 700; color: var(--ps-text-muted);">CPR-Certified Crew</p>
            </div>
          </div>
        </div>

        <div>
          <img src="../assets/images/Children_playing_at_indoor_playg%E2%80%A6_2K_20261014070555.jpg" alt="Children Playing at PlaySpace Facility" style="border-radius: var(--ps-radius-xl); border: 2px solid var(--ps-border-color); box-shadow: var(--ps-shadow-lg); width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block;">
        </div>
      </div>
    </div>
  </section>

  <!-- 2. Our Mission and Vision -->
  <section class="ps-section ps-section-dark">
    <div class="ps-container">
      <div class="ps-section-header text-center" style="max-width: 740px; margin: 0 auto 3rem auto;">
        <span class="badge-tag">PURPOSE &amp; HORIZON</span>
        <h2 style="color: #FFFFFF; margin-top: 0.75rem;">Our Mission and Vision</h2>
        <p style="color: rgba(255,255,255,0.7); font-size: 1.05rem;">
          Guiding every bounce, every smile, and every family milestone with genuine care and unwavering dedication.
        </p>
      </div>

      <div class="ps-grid ps-grid-2" style="gap: 2rem;">
        <!-- Mission Card -->
        <div class="ps-card ps-card-dark" style="border: 2px solid #FFCC00; padding: 2.5rem; position: relative; background: #111111;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <span style="font-size: 2.4rem;">🎯</span>
            <span style="background: #FFCC00; color: #000000; font-weight: 800; font-size: 0.75rem; letter-spacing: 1px; padding: 0.35rem 0.85rem; border-radius: 20px;">OUR MISSION</span>
          </div>
          <h3 style="color: #FFFFFF; font-size: 1.6rem; margin-bottom: 1rem;">Inspire Active Play, Confidence &amp; Pure Joy</h3>
          <p style="color: rgba(255,255,255,0.8); line-height: 1.65; font-size: 1rem; margin-bottom: 1.5rem;">
            To provide a safe, exhilarating, and welcoming indoor community where every child discovers the strength of active movement, builds self-assurance through positive physical play, and creates cherished memories with their families.
          </p>
          <ul style="color: rgba(255,255,255,0.85); list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.92rem;">
            <li style="display: flex; align-items: center; gap: 0.6rem;"><span style="color: #FFCC00;">✔</span> Promoting healthy physical habits through high-energy fun</li>
            <li style="display: flex; align-items: center; gap: 0.6rem;"><span style="color: #FFCC00;">✔</span> Creating inclusive play accessible for all physical abilities</li>
            <li style="display: flex; align-items: center; gap: 0.6rem;"><span style="color: #FFCC00;">✔</span> Providing parents with a trusted, worry-free sanctuary</li>
          </ul>
        </div>

        <!-- Vision Card -->
        <div class="ps-card ps-card-dark" style="border: 2px solid var(--ps-border-color); padding: 2.5rem; position: relative; background: #111111;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <span style="font-size: 2.4rem;">🌟</span>
            <span style="background: #000000; color: #FFCC00; border: 1px solid #FFCC00; font-weight: 800; font-size: 0.75rem; letter-spacing: 1px; padding: 0.35rem 0.85rem; border-radius: 20px;">OUR VISION</span>
          </div>
          <h3 style="color: #FFFFFF; font-size: 1.6rem; margin-bottom: 1rem;">The Gold Standard in Family Entertainment</h3>
          <p style="color: rgba(255,255,255,0.8); line-height: 1.65; font-size: 1rem; margin-bottom: 1.5rem;">
            To be recognized as the premier family entertainment and youth fitness destination, redefining indoor recreation through world-class architectural safety, state-of-the-art play technology, and genuine human connection.
          </p>
          <ul style="color: rgba(255,255,255,0.85); list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.92rem;">
            <li style="display: flex; align-items: center; gap: 0.6rem;"><span style="color: #FFCC00;">✔</span> Pioneer safest-in-class multi-zone indoor play technology</li>
            <li style="display: flex; align-items: center; gap: 0.6rem;"><span style="color: #FFCC00;">✔</span> Maintain hospital-grade sanitation and ASTM court compliance</li>
            <li style="display: flex; align-items: center; gap: 0.6rem;"><span style="color: #FFCC00;">✔</span> Inspire a lifelong love for active, screen-free movement</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Our Play Philosophy -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center" style="max-width: 760px; margin: 0 auto 3rem auto;">
        <span class="badge-tag">HOW WE THINK ABOUT PLAY</span>
        <h2 style="margin-top: 0.75rem;">Our Play Philosophy</h2>
        <p class="text-muted" style="font-size: 1.05rem;">
          Play is far more than burning energy. It is how young brains build neural connections, test spatial boundaries, and cultivate empathy, resilience, and joy.
        </p>
      </div>

      <div class="ps-grid ps-grid-4" style="gap: 1.5rem;">
        <!-- Pillar 1 -->
        <div class="ps-card ps-philosophy-card" style="padding: 1.75rem; border: 1px solid var(--ps-border-color); border-top: 4px solid #FFCC00; display: flex; flex-direction: column; height: 100%; border-radius: var(--ps-radius-lg); background: var(--ps-bg-card);">
          <div style="display: flex; flex-direction: column; flex-grow: 1;">
            <div class="ps-icon-square ps-about-philosophy-icon" style="margin-bottom: 1.25rem; font-size: 1.5rem; width: 48px; height: 48px; border-radius: 12px; background: #FFCC00; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1;">🏃‍♂️</div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.75rem; min-height: 3.2rem; display: flex; align-items: flex-start; line-height: 1.35; color: var(--ps-text-main);">Physical Agility &amp; Fitness</h4>
            <p style="font-size: 0.92rem; color: var(--ps-text-main); opacity: 0.85; line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">
              Trampoline rebound movement strengthens core stabilization, elevates cardiovascular endurance, and enhances balance without joint impact stress.
            </p>
          </div>
          <div class="ps-philosophy-badge" style="font-size: 0.8rem; font-weight: 800; color: #000000; background: #FFCC00; padding: 0.45rem 0.85rem; border-radius: var(--ps-radius-full); text-align: center; margin-top: auto; letter-spacing: 0.02em; display: block; border: 1px solid #E6B800;">
            Core Agility &amp; Balance
          </div>
        </div>

        <!-- Pillar 2 -->
        <div class="ps-card ps-philosophy-card" style="padding: 1.75rem; border: 1px solid var(--ps-border-color); border-top: 4px solid #FFCC00; display: flex; flex-direction: column; height: 100%; border-radius: var(--ps-radius-lg); background: var(--ps-bg-card);">
          <div style="display: flex; flex-direction: column; flex-grow: 1;">
            <div class="ps-icon-square ps-about-philosophy-icon" style="margin-bottom: 1.25rem; font-size: 1.5rem; width: 48px; height: 48px; border-radius: 12px; background: #FFCC00; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1;">🧩</div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.75rem; min-height: 3.2rem; display: flex; align-items: flex-start; line-height: 1.35; color: var(--ps-text-main);">Sensory &amp; Motor Development</h4>
            <p style="font-size: 0.92rem; color: var(--ps-text-main); opacity: 0.85; line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">
              Tactile soft-play obstacles, ball pits, and tunnel networks stimulate proprioceptive sensory input, fine motor coordination, and spatial awareness.
            </p>
          </div>
          <div class="ps-philosophy-badge" style="font-size: 0.8rem; font-weight: 800; color: #000000; background: #FFCC00; padding: 0.45rem 0.85rem; border-radius: var(--ps-radius-full); text-align: center; margin-top: auto; letter-spacing: 0.02em; display: block; border: 1px solid #E6B800;">
            Sensory Stimulation
          </div>
        </div>

        <!-- Pillar 3 -->
        <div class="ps-card ps-philosophy-card" style="padding: 1.75rem; border: 1px solid var(--ps-border-color); border-top: 4px solid #FFCC00; display: flex; flex-direction: column; height: 100%; border-radius: var(--ps-radius-lg); background: var(--ps-bg-card);">
          <div style="display: flex; flex-direction: column; flex-grow: 1;">
            <div class="ps-icon-square ps-about-philosophy-icon" style="margin-bottom: 1.25rem; font-size: 1.5rem; width: 48px; height: 48px; border-radius: 12px; background: #FFCC00; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1;">🤝</div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.75rem; min-height: 3.2rem; display: flex; align-items: flex-start; line-height: 1.35; color: var(--ps-text-main);">Social Confidence &amp; Empathy</h4>
            <p style="font-size: 0.92rem; color: var(--ps-text-main); opacity: 0.85; line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">
              Shared adventures teach turn-taking, cooperative problem-solving, cheering peers on the ninja course, and building authentic childhood connections.
            </p>
          </div>
          <div class="ps-philosophy-badge" style="font-size: 0.8rem; font-weight: 800; color: #000000; background: #FFCC00; padding: 0.45rem 0.85rem; border-radius: var(--ps-radius-full); text-align: center; margin-top: auto; letter-spacing: 0.02em; display: block; border: 1px solid #E6B800;">
            Peer Camaraderie
          </div>
        </div>

        <!-- Pillar 4 -->
        <div class="ps-card ps-philosophy-card" style="padding: 1.75rem; border: 1px solid var(--ps-border-color); border-top: 4px solid #FFCC00; display: flex; flex-direction: column; height: 100%; border-radius: var(--ps-radius-lg); background: var(--ps-bg-card);">
          <div style="display: flex; flex-direction: column; flex-grow: 1;">
            <div class="ps-icon-square ps-about-philosophy-icon" style="margin-bottom: 1.25rem; font-size: 1.5rem; width: 48px; height: 48px; border-radius: 12px; background: #FFCC00; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1;">📵</div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.75rem; min-height: 3.2rem; display: flex; align-items: flex-start; line-height: 1.35; color: var(--ps-text-main);">Unplugged, Screen-Free Freedom</h4>
            <p style="font-size: 0.92rem; color: var(--ps-text-main); opacity: 0.85; line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">
              We swap passive screen time for dynamic, full-body immersion where imaginations soar freely, adrenaline flows positively, and kids sleep soundly.
            </p>
          </div>
          <div class="ps-philosophy-badge" style="font-size: 0.8rem; font-weight: 800; color: #000000; background: #FFCC00; padding: 0.45rem 0.85rem; border-radius: var(--ps-radius-full); text-align: center; margin-top: auto; letter-spacing: 0.02em; display: block; border: 1px solid #E6B800;">
            100% Screen-Free
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Safety-First Environment -->
  <section class="ps-section ps-section-dark">
    <div class="ps-container">
      <div class="ps-section-header text-center" style="max-width: 760px; margin: 0 auto 3.5rem auto;">
        <span class="badge-tag">NON-NEGOTIABLE STANDARDS</span>
        <h2 style="color: #FFFFFF; margin-top: 0.75rem; font-size: 2.25rem;">Safety-First Environment</h2>
        <p style="color: rgba(255,255,255,0.8); line-height: 1.6; font-size: 1.05rem;">
          At PLAYSPACE, safety is not merely a checklist — it is our operational philosophy. We engineer every square foot to exceed rigorous national standards so parents can relax with complete peace of mind.
        </p>
      </div>

      <div class="ps-grid ps-grid-2" style="gap: 2.5rem; align-items: stretch;">
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div style="background: #111111; border: 1px solid #222222; border-left: 3px solid #FFCC00; padding: 1.25rem; border-radius: 8px;">
              <strong style="color: #FFFFFF; font-size: 1.05rem; display: block;">🛡️ ASTM F2970 &amp; CPSC Compliance</strong>
              <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin: 0.25rem 0 0 0; line-height: 1.5;">
                Engineered with commercial 2-inch seamless vinyl impact padding over all springs and steel framing, zero exposed pinch points, and heavy-duty flame-retardant safety netting.
              </p>
            </div>

            <div style="background: #111111; border: 1px solid #222222; border-left: 3px solid #FFCC00; padding: 1.25rem; border-radius: 8px;">
              <strong style="color: #FFFFFF; font-size: 1.05rem; display: block;">✨ Hospital-Grade Daily &amp; Midday Sanitation</strong>
              <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin: 0.25rem 0 0 0; line-height: 1.5;">
                Continuous midday sanitizing cycles, nightly electrostatic antimicrobial fogging, commercial UV-C ball pit ball washers, and hospital-grade HEPA air filtration.
              </p>
            </div>

            <div style="background: #111111; border: 1px solid #222222; border-left: 3px solid #FFCC00; padding: 1.25rem; border-radius: 8px;">
              <strong style="color: #FFFFFF; font-size: 1.05rem; display: block;">👀 Active Zone Supervision &amp; Capacity Controls</strong>
              <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin: 0.25rem 0 0 0; line-height: 1.5;">
                Stationed court marshals maintain strict 1-child-per-trampoline-bed rules, prevent collisions, and enforce segregated age zones to keep little toddlers separate from bigger kids.
              </p>
            </div>
          </div>

          <div style="margin-top: 1.5rem;">
            <a href="safety-guidelines.html" class="ps-btn ps-btn-primary ps-btn-block" style="text-align: center;">Read Full Safety Protocols &rarr;</a>
          </div>
        </div>

        <div style="display: flex;">
          <div style="background: #111111; border: 2px solid #333333; border-radius: var(--ps-radius-xl); padding: 2.25rem; box-shadow: var(--ps-shadow-lg); width: 100%; display: flex; flex-direction: column; justify-content: space-between;">
            <h4 style="color: #FFCC00; margin-top: 0; font-size: 1.35rem; border-bottom: 1px solid #222; padding-bottom: 0.75rem;">
              Daily Safety Inspection Checklist
            </h4>
            <div style="display: flex; flex-direction: column; gap: 1.15rem; margin-top: 1.25rem;">
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="background: #FFCC00; color: #000; font-weight: 800; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.85rem;">✓</span>
                <div>
                  <strong style="color: #FFFFFF; font-size: 0.95rem;">Pre-Opening Structural Audit:</strong>
                  <p style="color: rgba(255,255,255,0.65); font-size: 0.85rem; margin: 0.15rem 0 0 0;">Every spring, cable, anchor bolt, and net joint is verified by head technicians.</p>
                </div>
              </div>
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="background: #FFCC00; color: #000; font-weight: 800; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.85rem;">✓</span>
                <div>
                  <strong style="color: #FFFFFF; font-size: 0.95rem;">Compulsory Grip Sock Standards:</strong>
                  <p style="color: rgba(255,255,255,0.65); font-size: 0.85rem; margin: 0.15rem 0 0 0;">High-traction rubberized grip socks required for all jumpers on vinyl surfaces.</p>
                </div>
              </div>
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="background: #FFCC00; color: #000; font-weight: 800; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.85rem;">✓</span>
                <div>
                  <strong style="color: #FFFFFF; font-size: 0.95rem;">First-Aid Ready Stations:</strong>
                  <p style="color: rgba(255,255,255,0.65); font-size: 0.85rem; margin: 0.15rem 0 0 0;">Automated External Defibrillators (AED) and pediatric trauma kits on-site 24/7.</p>
                </div>
              </div>
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="background: #FFCC00; color: #000; font-weight: 800; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.85rem;">✓</span>
                <div>
                  <strong style="color: #FFFFFF; font-size: 0.95rem;">Closed Video Surveillance:</strong>
                  <p style="color: rgba(255,255,255,0.65); font-size: 0.85rem; margin: 0.15rem 0 0 0;">32 high-definition camera angles continuously monitor courts, tunnels, and gates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Why Parents Trust Us -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center" style="max-width: 760px; margin: 0 auto 3rem auto;">
        <span class="badge-tag">DESIGNED WITH FAMILIES IN MIND</span>
        <h2 style="margin-top: 0.75rem;">Why Parents Trust Us</h2>
        <p class="text-muted" style="font-size: 1.05rem;">
          We built PLAYSPACE to deliver the ultimate balance: unbridled adventure for your children, and effortless comfort, visibility, and security for you.
        </p>
      </div>

      <div class="ps-grid ps-grid-3" style="gap: 2rem;">
        <!-- Trust 1 -->
        <div class="ps-card" style="padding: 2rem; border: 1px solid var(--ps-border-color); border-radius: var(--ps-radius-lg);">
          <div style="font-size: 2.2rem; margin-bottom: 1rem;">👀</div>
          <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Unobstructed 360° Sightlines</h4>
          <p class="text-muted" style="font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Never lose sight of your little ones! Our mezzanine seating, open-concept low-profile enclosures, and glass partitions let you supervise effortlessly from the comfort of our lounge.
          </p>
        </div>

        <!-- Trust 2 -->
        <div class="ps-card" style="padding: 2rem; border: 1px solid var(--ps-border-color); border-radius: var(--ps-radius-lg);">
          <div style="font-size: 2.2rem; margin-bottom: 1rem;">🔒</div>
          <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Secure Tamper-Proof Check-In</h4>
          <p class="text-muted" style="font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Our digital check-in pairs each child with a color-coded security wristband matched specifically to their parent or guardian. Children cannot exit the gate without their matched adult.
          </p>
        </div>

        <!-- Trust 3 -->
        <div class="ps-card" style="padding: 2rem; border: 1px solid var(--ps-border-color); border-radius: var(--ps-radius-lg);">
          <div style="font-size: 2.2rem; margin-bottom: 1rem;">☕</div>
          <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Parent Lounge &amp; PlayCafé</h4>
          <p class="text-muted" style="font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Work or recharge in style. Enjoy complimentary high-speed fiber Wi-Fi, plenty of device charging outlets, comfortable plush armchairs, and barista-made coffees and snacks.
          </p>
        </div>

        <!-- Trust 4 -->
        <div class="ps-card" style="padding: 2rem; border: 1px solid var(--ps-border-color); border-radius: var(--ps-radius-lg);">
          <div style="font-size: 2.2rem; margin-bottom: 1rem;">🚼</div>
          <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Segregated Toddler Sanctuaries</h4>
          <p class="text-muted" style="font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Zero worries about rough play! Children ages 0–3 have their own dedicated soft-padded toddler arena with locked gates where older children are strictly prohibited.
          </p>
        </div>

        <!-- Trust 5 -->
        <div class="ps-card" style="padding: 2rem; border: 1px solid var(--ps-border-color); border-radius: var(--ps-radius-lg);">
          <div style="font-size: 2.2rem; margin-bottom: 1rem;">🧼</div>
          <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Pristine Cleanliness Standards</h4>
          <p class="text-muted" style="font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Parents constantly praise our pristine cleanliness. Restrooms, diaper changing rooms, tables, and play zones are disinfected continuously on a 30-minute rotation.
          </p>
        </div>

        <!-- Trust 6 -->
        <div class="ps-card" style="padding: 2rem; border: 1px solid var(--ps-border-color); border-radius: var(--ps-radius-lg);">
          <div style="font-size: 2.2rem; margin-bottom: 1rem;">🎉</div>
          <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Stress-Free Hosted Parties</h4>
          <p class="text-muted" style="font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Our dedicated party hosts handle everything from setup, guest welcoming, food service, game facilitation, to post-party cleanup so parents can simply enjoy the moment.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. Our Facilities and Staff -->
  <section class="ps-section ps-section-dark">
    <div class="ps-container">
      <div class="ps-section-header text-center" style="max-width: 760px; margin: 0 auto 3rem auto;">
        <span class="badge-tag">EXCELLENCE IN EVERY DETAIL</span>
        <h2 style="color: #FFFFFF; margin-top: 0.75rem;">Our Facilities and Staff</h2>
        <p style="color: rgba(255,255,255,0.7); font-size: 1.05rem;">
          State-of-the-art play architecture operated by the warmest, most vigilant certified team in indoor entertainment.
        </p>
      </div>

      <!-- Facility Features Grid -->
      <div style="margin-bottom: 3.5rem;">
        <h3 style="color: #FFCC00; font-size: 1.4rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <span>🏢</span> World-Class 35,000 Sq. Ft. Facility Features
        </h3>
        <div class="ps-grid ps-grid-4 ps-facility-grid" style="gap: 1.5rem;">
          <div class="ps-facility-card">
            <div style="color: #FFCC00; font-size: 1.8rem; margin-bottom: 0.75rem;">🎪</div>
            <strong style="color: #FFFFFF; font-size: 1.1rem; display: flex; align-items: flex-start; min-height: 2.85rem; line-height: 1.35;">8 Distinct Zones</strong>
            <p style="color: rgba(255,255,255,0.65); font-size: 0.88rem; margin: 0.5rem 0 0 0; line-height: 1.5; flex-grow: 1;">
              Trampoline Arena, Soft Play, Ball Pit, Climbing Wall, Slides &amp; Tunnels, Toddler Zone, Ninja Course &amp; Interactive Play.
            </p>
          </div>

          <div class="ps-facility-card">
            <div style="color: #FFCC00; font-size: 1.8rem; margin-bottom: 0.75rem;">🎂</div>
            <strong style="color: #FFFFFF; font-size: 1.1rem; display: flex; align-items: flex-start; min-height: 2.85rem; line-height: 1.35;">Private Party Suites</strong>
            <p style="color: rgba(255,255,255,0.65); font-size: 0.88rem; margin: 0.5rem 0 0 0; line-height: 1.5; flex-grow: 1;">
              6 soundproof, climate-controlled party rooms equipped with neon glow lighting, dedicated sound systems, and custom decor setups.
            </p>
          </div>

          <div class="ps-facility-card">
            <div style="color: #FFCC00; font-size: 1.8rem; margin-bottom: 0.75rem;">☕</div>
            <strong style="color: #FFFFFF; font-size: 1.1rem; display: flex; align-items: flex-start; min-height: 2.85rem; line-height: 1.35;">PlayCafé &amp; Fuel Bar</strong>
            <p style="color: rgba(255,255,255,0.65); font-size: 0.88rem; margin: 0.5rem 0 0 0; line-height: 1.5; flex-grow: 1;">
              Nutritious children's meals, allergen-friendly snacks, pizza ovens, artisanal espresso, and refreshing fruit smoothies.
            </p>
          </div>

          <div class="ps-facility-card">
            <div style="color: #FFCC00; font-size: 1.8rem; margin-bottom: 0.75rem;">❄️</div>
            <strong style="color: #FFFFFF; font-size: 1.1rem; display: flex; align-items: flex-start; min-height: 2.85rem; line-height: 1.35;">Advanced HVAC Air Exchange</strong>
            <p style="color: rgba(255,255,255,0.65); font-size: 0.88rem; margin: 0.5rem 0 0 0; line-height: 1.5; flex-grow: 1;">
              Commercial grade air-conditioning exchanging 100% fresh filtered air 6 times per hour to maintain optimal temperature and purity.
            </p>
          </div>
        </div>
      </div>

      <!-- Staff & Leadership Team Grid -->
      <div>
        <h3 style="color: #FFCC00; font-size: 1.4rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <span>👥</span> Certified Staff &amp; Court Patrol
        </h3>
        <div class="ps-grid ps-grid-3 ps-about-staff-grid" style="gap: 1.5rem;">
          <!-- Staff Card 1 -->
          <div class="ps-card ps-card-dark ps-about-staff-card" style="background: #111111; border: 1px solid #222222; padding: 1.5rem 1.35rem;">
            <div class="ps-about-staff-header" style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1rem; min-height: 4.5rem;">
              <div class="ps-about-staff-icon" style="width: 48px; height: 48px; min-width: 48px; min-height: 48px; border-radius: 50%; background: #FFCC00; color: #000; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; box-shadow: 0 4px 12px rgba(255, 204, 0, 0.2);">⛑️</div>
              <div class="ps-about-staff-info" style="flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; justify-content: center;">
                <strong class="ps-about-staff-title" style="color: #FFFFFF; font-size: 1.08rem; font-weight: 700; display: flex; align-items: center; line-height: 1.32; min-height: 2.85rem; margin: 0;">100% CPR &amp; First-Aid Certified</strong>
                <span class="ps-about-staff-subtitle" style="color: #FFCC00; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.02em; display: block; white-space: nowrap; line-height: 1.25;">ALL COURT STAFF</span>
              </div>
            </div>
            <p class="ps-about-staff-desc" style="color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.55; margin: 0; flex-grow: 1;">
              Every member of our floor team undergoes certified Red Cross pediatric CPR, AED operation, and emergency trauma response training before their first shift.
            </p>
          </div>

          <!-- Staff Card 2 -->
          <div class="ps-card ps-card-dark ps-about-staff-card" style="background: #111111; border: 1px solid #222222; padding: 1.5rem 1.35rem;">
            <div class="ps-about-staff-header" style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1rem; min-height: 4.5rem;">
              <div class="ps-about-staff-icon" style="width: 48px; height: 48px; min-width: 48px; min-height: 48px; border-radius: 50%; background: #FFCC00; color: #000; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; box-shadow: 0 4px 12px rgba(255, 204, 0, 0.2);">📋</div>
              <div class="ps-about-staff-info" style="flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; justify-content: center;">
                <strong class="ps-about-staff-title" style="color: #FFFFFF; font-size: 1.08rem; font-weight: 700; display: flex; align-items: center; line-height: 1.32; min-height: 2.85rem; margin: 0;">Background Checked &amp; Screened</strong>
                <span class="ps-about-staff-subtitle" style="color: #FFCC00; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.02em; display: block; white-space: nowrap; line-height: 1.25;">TRUST &amp; INTEGRITY</span>
              </div>
            </div>
            <p class="ps-about-staff-desc" style="color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.55; margin: 0; flex-grow: 1;">
              We conduct thorough multi-state criminal background checks, child safety clearances, and reference screenings for every employee prior to hire.
            </p>
          </div>

          <!-- Staff Card 3 -->
          <div class="ps-card ps-card-dark ps-about-staff-card" style="background: #111111; border: 1px solid #222222; padding: 1.5rem 1.35rem;">
            <div class="ps-about-staff-header" style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1rem; min-height: 4.5rem;">
              <div class="ps-about-staff-icon" style="width: 48px; height: 48px; min-width: 48px; min-height: 48px; border-radius: 50%; background: #FFCC00; color: #000; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; box-shadow: 0 4px 12px rgba(255, 204, 0, 0.2);">🎯</div>
              <div class="ps-about-staff-info" style="flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; justify-content: center;">
                <strong class="ps-about-staff-title" style="color: #FFFFFF; font-size: 1.08rem; font-weight: 700; display: flex; align-items: center; line-height: 1.32; min-height: 2.85rem; margin: 0;">Engaging Play Facilitators</strong>
                <span class="ps-about-staff-subtitle" style="color: #FFCC00; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.02em; display: block; white-space: nowrap; line-height: 1.25;">ENERGY &amp; ENCOURAGEMENT</span>
              </div>
            </div>
            <p class="ps-about-staff-desc" style="color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.55; margin: 0; flex-grow: 1;">
              Our monitors do more than supervise — they coach kids on ninja obstacles, referee dodgeball games, encourage timid jumpers, and keep positive energy thriving!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="ps-section ps-about-cta" style="background: #FFCC00; color: #000000; padding: 4.5rem 0; text-align: center;">
    <div class="ps-container">
      <h2 style="color: #000000; font-size: 2.4rem; margin-bottom: 1rem;">Ready to Experience the Magic of PLAYSPACE?</h2>
      <p style="color: #222222; font-size: 1.15rem; max-width: 700px; margin: 0 auto 2rem auto; line-height: 1.6;">
        Come visit us today! Explore our 8 adventure zones, choose an open play pass, or book an unforgettable birthday party celebration.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="attractions.html" class="ps-btn ps-btn-dark" style="padding: 0.85rem 2rem; font-size: 1rem;">Explore All Attractions</a>
        <a href="booking.html" class="ps-btn" style="background: #000000; color: #FFCC00; border: 2px solid #000000; padding: 0.85rem 2rem; font-size: 1rem; font-weight: 700;">Book a Play Session</a>
        <a href="birthday-parties.html" class="ps-btn ps-btn-white" style="border: 2px solid #000000; padding: 0.85rem 2rem; font-size: 1rem;">Plan a Birthday Party</a>
      </div>
    </div>
  </section>
  `,
  'about'
);
fs.writeFileSync(path.join(PAGES_DIR, 'about.html'), aboutHtml, 'utf8');

// 2. attractions.html & 3. Individual Attraction Details Pages + attraction-details.html
const { generateAttractionsPage } = require('./generate-attractions-page');
const { buildIndividualAttractions } = require('./build-individual-attractions');

generateAttractionsPage();
buildIndividualAttractions();

// 4. pricing-passes.html
const pricingHtml = pageWrapper(
  'Pricing & Passes',
  'Clear, transparent hourly jump rates, 1-hour and 2-hour passes, all-day passes, multi-visit punch cards, sibling and family packages, and birthday party pricing at PlaySpace.',
  `
  <!-- 1. Hero Page Banner -->
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>Pricing &amp; Passes</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0 0 1rem 0;">Transparent Jump Rates &amp; Flexible Passes</h1>
      <p style="color: rgba(255, 255, 255, 0.85); font-size: 1.15rem; max-width: 820px; line-height: 1.6; margin-bottom: 1.5rem;">
        No hidden fees or unexpected extras. From single drop-in play sessions and all-day passes to sibling bundles, multi-visit punch cards, and all-inclusive birthday packages — discover the perfect pass for your family.
      </p>

      <!-- Feature Badges -->
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">⚡ Single Play Session</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">⏱️ 1-Hour &amp; 2-Hour Passes</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🌟 All-Day Play Pass</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🎟️ Multi-Visit Passes</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">👨‍👩‍👧‍👦 Sibling &amp; Family Packages</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🎂 Birthday Package Pricing</span>
      </div>

      <!-- Action Buttons in Hero -->
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="#compare-plans" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00;">Compare Plans</a>
        <a href="booking.html" class="ps-btn ps-btn-primary">Book Now</a>
        <a href="#family-packages" class="ps-btn ps-btn-dark" style="border: 1px solid #FFCC00; color: #FFFFFF;">Family Packages ↓</a>
      </div>
    </div>
  </section>

  <!-- 2. Single Play Sessions, 1-Hour, 2-Hour & All-Day Passes -->
  <section class="ps-section ps-section-white" id="timed-passes">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">HOURLY &amp; ALL-DAY TICKETS</span>
        <h2 style="margin-top: 0.75rem;">Single Play Sessions &amp; Passes</h2>
        <p class="text-muted">
          Every ticket grants full access to all 12 arena zones: wall-to-wall trampolines, foam airbags, slam dunk lanes, dodgeball courts, and ninja obstacles.
        </p>
      </div>

      <div class="ps-grid ps-grid-4">
        <!-- Pass 1: 1-Hour Pass -->
        <div class="ps-pricing-card" style="display: flex; flex-direction: column; justify-content: space-between; border: 2px solid var(--ps-border-color); padding: 2rem 1.5rem;">
          <div>
            <span class="ps-badge" style="background: var(--ps-bg-surface-alt, #000); color: var(--ps-text-main, #FFF); font-size: 0.75rem;">SINGLE PLAY</span>
            <h3 style="font-size: 1.3rem; margin: 0.75rem 0 0.25rem 0;">1-Hour Pass</h3>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin-bottom: 1rem;">Quick burst of high-intensity aerobic fun</p>
            <div class="ps-price-amount" style="font-size: 2.3rem; font-weight: 900; color: var(--ps-text-main); margin-bottom: 0.25rem;">$18</div>
            <p style="font-weight: 700; font-size: 0.82rem; color: var(--ps-text-muted); margin-bottom: 1.25rem;">60 Mins • All Ages</p>
            <ul class="ps-pricing-features" style="font-size: 0.85rem; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 0.4rem; color: var(--ps-text-main);">
              <li>✔ Full access to all 12 arena zones</li>
              <li>✔ Non-jumping parents enter FREE</li>
              <li>✔ Free digital shoe cubby storage</li>
              <li>✔ Grip socks reusable or $3.50/pair</li>
            </ul>
          </div>
          <div style="margin-top: 1.5rem;">
            <a href="pass-booking.html?pass=pass-60" class="ps-btn ps-btn-dark ps-btn-block">Book This Pass</a>
          </div>
        </div>

        <!-- Pass 2: 90-Minute Pass -->
        <div class="ps-pricing-card" style="display: flex; flex-direction: column; justify-content: space-between; border: 2px solid var(--ps-border-color); padding: 2rem 1.5rem;">
          <div>
            <span class="ps-badge" style="background: var(--ps-bg-surface-alt, #000); color: var(--ps-text-main, #FFF); font-size: 0.75rem;">SWEET SPOT</span>
            <h3 style="font-size: 1.3rem; margin: 0.75rem 0 0.25rem 0;">90-Minute Pass</h3>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin-bottom: 1rem;">The ideal duration for active jumpers</p>
            <div class="ps-price-amount" style="font-size: 2.3rem; font-weight: 900; color: var(--ps-text-main); margin-bottom: 0.25rem;">$24</div>
            <p style="font-weight: 700; font-size: 0.82rem; color: var(--ps-text-muted); margin-bottom: 1.25rem;">90 Mins • All Ages</p>
            <ul class="ps-pricing-features" style="font-size: 0.85rem; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 0.4rem; color: var(--ps-text-main);">
              <li>✔ Full access to all 12 arena zones</li>
              <li>✔ Ample time for dodgeball &amp; ninja</li>
              <li>✔ Non-jumping parents enter FREE</li>
              <li>✔ Instant digital waiver fast check-in</li>
            </ul>
          </div>
          <div style="margin-top: 1.5rem;">
            <a href="pass-booking.html?pass=pass-90" class="ps-btn ps-btn-dark ps-btn-block">Book This Pass</a>
          </div>
        </div>

        <!-- Pass 3: 2-Hour Pass (Featured) -->
        <div class="ps-pricing-card featured" style="display: flex; flex-direction: column; justify-content: space-between; border: 2px solid #FFCC00; background: #000000; color: #FFFFFF; padding: 2.25rem 1.5rem; transform: scale(1.02); position: relative; overflow: visible;">
          <div>
            <span class="ps-badge" style="background: #FFCC00; color: #000; font-weight: 800; font-size: 0.75rem;">BEST TIME VALUE</span>
            <h3 style="font-size: 1.3rem; margin: 0.75rem 0 0.25rem 0; color: #FFFFFF;">2-Hour Pass</h3>
            <p style="font-size: 0.85rem; color: rgba(255,255,255,0.8); margin-bottom: 1rem;">Complete energy burnout and stunt play</p>
            <div class="ps-price-amount" style="font-size: 2.3rem; font-weight: 900; color: #FFCC00; margin-bottom: 0.25rem;">$28</div>
            <p style="font-weight: 700; font-size: 0.82rem; color: rgba(255,255,255,0.75); margin-bottom: 1.25rem;">120 Mins • All Ages</p>
            <ul class="ps-pricing-features" style="font-size: 0.85rem; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 0.4rem; color: #FFFFFF;">
              <li><span style="color: #FFCC00;">✔</span> Full access to all 12 arena zones</li>
              <li><span style="color: #FFCC00;">✔</span> <strong style="color: #FFFFFF;">Complimentary digital locker rental</strong></li>
              <li><span style="color: #FFCC00;">✔</span> Non-jumping parents enter FREE</li>
              <li><span style="color: #FFCC00;">✔</span> Priority access to dodgeball heats</li>
            </ul>
          </div>
          <div style="margin-top: 1.5rem;">
            <a href="pass-booking.html?pass=pass-120" class="ps-btn ps-btn-primary ps-btn-block">Book This Pass</a>
          </div>
        </div>

        <!-- Pass 4: All-Day Play Pass -->
        <div class="ps-pricing-card" style="display: flex; flex-direction: column; justify-content: space-between; border: 2px solid var(--ps-border-color); padding: 2rem 1.5rem;">
          <div>
            <span class="ps-badge" style="background: #000000; color: #FFCC00; font-weight: 800; border: 1px solid #FFCC00; font-size: 0.75rem;">ALL-DAY PLAY</span>
            <h3 style="font-size: 1.3rem; margin: 0.75rem 0 0.25rem 0;">All-Day Pass</h3>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin-bottom: 1rem;">Unlimited bounce from opening to close</p>
            <div class="ps-price-amount" style="font-size: 2.3rem; font-weight: 900; color: var(--ps-text-main); margin-bottom: 0.25rem;">$36</div>
            <p style="font-weight: 700; font-size: 0.82rem; color: var(--ps-text-muted); margin-bottom: 1.25rem;">Unlimited Hours • In-and-Out Privileges</p>
            <ul class="ps-pricing-features" style="font-size: 0.85rem; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 0.4rem; color: var(--ps-text-main);">
              <li>✔ Unlimited re-entry all day long</li>
              <li>✔ <strong>1 Pair of Grip Socks INCLUDED</strong></li>
              <li>✔ Free digital locker rental</li>
              <li>✔ 1 Café soft drink or juice voucher</li>
            </ul>
          </div>
          <div style="margin-top: 1.5rem;">
            <a href="pass-booking.html?pass=pass-allday" class="ps-btn ps-btn-dark ps-btn-block">Book This Pass</a>
          </div>
        </div>
      </div>

      <!-- Spectator Policy & Toddler Pass Banner -->
      <div id="toddler" style="margin-top: 2rem; background: var(--ps-bg-card); border: 2px solid var(--ps-border-color); border-radius: var(--ps-radius-xl); padding: 1.75rem 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 1.25rem;">
          <div class="ps-icon-square" style="font-size: 1.75rem;">🧸</div>
          <div>
            <strong style="display: block; font-size: 1.1rem; color: var(--ps-text-main);">Toddler Time Pass &amp; Free Spectator Policy</strong>
            <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: var(--ps-text-muted); line-height: 1.5;">
              Non-jumping parents &amp; babies under 12 months enter 100% <strong>FREE</strong>. Dedicated Toddler Play Mornings (Tue &amp; Thu 9am–11am) are just <strong>$12/session</strong> (or $49/mo unlimited) for children ages 5 and under.
            </p>
          </div>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="#compare-plans" class="ps-btn ps-btn-outline-dark" style="border-color: var(--ps-border-color); color: #000000; font-weight: 800;">Compare Plans</a>
          <a href="booking.html?session=toddler&title=Toddler+Time&price=12&duration=120&slot=09:00+AM+-+11:00+AM" class="ps-btn ps-btn-primary">Book Now</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Sibling & Family Packages -->
  <section class="ps-section ps-section-alt" id="family-packages">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">BETTER TOGETHER</span>
        <h2 style="margin-top: 0.75rem;">Sibling &amp; Family Packages</h2>
        <p class="text-muted">
          Designed specifically for households with multiple kids. Jump, dine, and save with bundled family favorites.
        </p>
      </div>

      <div class="ps-grid ps-grid-3">
        <!-- Family 4-Pack (Highlighted) -->
        <div class="ps-card" style="border: 2px solid #FFCC00; background: var(--ps-bg-card); display: flex; flex-direction: column; justify-content: space-between; border-radius: var(--ps-radius-xl); overflow: hidden; position: relative;">
          <!-- Sleek Integrated Header Banner -->
          <div style="background: #FFCC00; color: #000000; font-weight: 900; font-size: 0.75rem; letter-spacing: 0.75px; text-align: center; padding: 0.55rem 1rem; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
            <span>★</span> BEST FAMILY VALUE — SAVE $35 BUNDLE <span>★</span>
          </div>

          <div style="padding: 1.75rem 2.25rem 2.25rem 2.25rem; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="ps-icon-square">👨‍👩‍👧‍👦</span>
                <span class="ps-badge" style="background: #000000; color: #FFCC00; font-weight: 800;">$79.00 / PACK</span>
              </div>
              <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Family 4-Pack &amp; Pizza Feast</h3>
              <p style="font-size: 0.9rem; color: var(--ps-text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
                Our #1 weekend choice! 90 minutes of high-flying arena jump for 4 jumpers plus a freshly stone-baked artisan pizza dinner.
              </p>
              <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.45rem; color: var(--ps-text-main);">
                <li>✔ <strong>4 Jump Passes (90 Mins each)</strong> (Kids or Adults)</li>
                <li>✔ <strong>4 Pairs of certified Grip Socks included</strong></li>
                <li>✔ 1 Extra-Large 16" stone-baked pizza (Cheese/Pepperoni)</li>
                <li>✔ 1 Pitcher of fountain soda or fruit punch with refills</li>
              </ul>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: auto;">
              <a href="booking.html?session=family&title=Family+Pizza+%26+Bounce&price=79&duration=90" class="ps-btn ps-btn-primary ps-btn-block">Book Now</a>
            </div>
          </div>
        </div>

        <!-- Sibling Tiered Discount -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card); display: flex; flex-direction: column; justify-content: space-between; border-radius: var(--ps-radius-xl);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span class="ps-icon-square">👧👦</span>
              <span class="ps-badge" style="background: #000; color: #FFCC00; font-weight: 800;">SAVE UP TO 30%</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Sibling Tiered Discount</h3>
            <p style="font-size: 0.9rem; color: var(--ps-text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
              Bringing brothers and sisters? Enjoy automatic tiered savings applied directly at online booking or at the front counter.
            </p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.45rem; color: var(--ps-text-main);">
              <li>✔ <strong>1st Child:</strong> Standard admission rate</li>
              <li>✔ <strong>2nd Sibling:</strong> <strong>20% OFF</strong> admission</li>
              <li>✔ <strong>3rd+ Sibling:</strong> <strong>30% OFF</strong> admission</li>
              <li>✔ Valid on all 1-hour, 2-hour, and all-day jump tickets</li>
              <li>✔ Applies automatically across all siblings in Parent Portal</li>
            </ul>
          </div>
          <a href="booking.html?session=sibling&title=Sibling+Tiered+Discount&price=24&duration=90" class="ps-btn ps-btn-dark ps-btn-block">Book Now</a>
        </div>

        <!-- Weekend Neon Family Night -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card); display: flex; flex-direction: column; justify-content: space-between; border-radius: var(--ps-radius-xl);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span class="ps-icon-square">✨</span>
              <span class="ps-badge" style="background: #000; color: #FFCC00; font-weight: 800;">$89.00 / 4 GUESTS</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Weekend Neon Glow Night</h3>
            <p style="font-size: 0.9rem; color: var(--ps-text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
              Friday and Saturday nights (6:00 PM – 9:00 PM). The arena transforms under UV blacklights, laser shows, and upbeat music!
            </p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.45rem; color: var(--ps-text-main);">
              <li>✔ <strong>3 Full Hours</strong> of blacklight neon jump (4 Jumpers)</li>
              <li>✔ 4 Sets of glowing neon wristbands &amp; necklaces</li>
              <li>✔ 1 XL 16" Artisan Pizza + 4 Cold Drinks</li>
              <li>✔ Glow face-paint station &amp; photo wall access</li>
            </ul>
          </div>
          <a href="booking.html?session=glow&title=Weekend+Neon+Glow+Night&price=89&duration=180&slot=06:00+PM+-+09:00+PM" class="ps-btn ps-btn-dark ps-btn-block">Book Now</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Multi-Visit Passes & Digital Punch Cards -->
  <section class="ps-section ps-section-dark" id="multi-visit-passes">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">REPEAT JUMPER SAVINGS</span>
        <h2 style="color: #FFFFFF; margin-top: 0.75rem;">Multi-Visit Passes &amp; Punch Cards</h2>
        <p style="color: rgba(255, 255, 255, 0.75);">
          Save up to $120! Multi-passes never expire for 12 full months, are 100% shareable across siblings, and load into your digital wallet.
        </p>
      </div>

      <!-- 3 Multi-Pass Cards -->
      <div class="ps-grid ps-grid-3" style="margin-bottom: 3rem;">
        <!-- 5-Visit Card -->
        <div class="ps-pass-wallet-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-flex-between">
              <span class="ps-badge">5-VISIT PASS</span>
              <span style="color: rgba(255,255,255,0.7); font-size: 0.82rem;">Valid 12 Months</span>
            </div>
            <h3 style="color: #FFFFFF; margin-top: 1rem; font-size: 1.3rem;">5-Session Punch Pass</h3>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.5;">
              Perfect for monthly weekend visits. Share with brothers and sisters or use for repeat jump sessions.
            </p>
            <div style="font-size: 2.2rem; font-weight: 900; color: #FFCC00; margin: 1rem 0;">
              $75 <span style="font-size: 0.95rem; color: #FFFFFF; font-weight: 600;">($15.00 / session)</span>
            </div>
            <ul style="padding: 0; margin: 0 0 1.25rem 0; list-style: none; font-size: 0.85rem; color: rgba(255,255,255,0.85); display: flex; flex-direction: column; gap: 0.35rem;">
              <li>✔ Save $15 compared to walk-in rates</li>
              <li>✔ 90 Minutes per session access</li>
              <li>✔ Shareable among all family members</li>
            </ul>
          </div>
          <a href="pass-booking.html?pass=punch-5" class="ps-btn ps-btn-dark ps-btn-block" style="border: 1px solid #FFCC00; color: #FFFFFF;">Book This Pass</a>
        </div>

        <!-- 10-Visit Card (Featured) -->
        <div class="ps-pass-wallet-card" style="border: 2px solid #FFCC00; display: flex; flex-direction: column; justify-content: space-between; transform: scale(1.02); position: relative; overflow: visible;">
          <div>
            <div class="ps-flex-between">
              <span class="ps-badge" style="background: #FFCC00; color: #000; font-weight: 800;">10-VISIT PASS</span>
              <span style="color: rgba(255,255,255,0.7); font-size: 0.82rem;">Valid 12 Months</span>
            </div>
            <h3 style="color: #FFFFFF; margin-top: 1rem; font-size: 1.3rem;">10-Session Punch Pass</h3>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.5;">
              Our top-selling multi-pass. Generates instant savings of $40! Includes digital QR scanning at check-in.
            </p>
            <div style="font-size: 2.2rem; font-weight: 900; color: #FFCC00; margin: 1rem 0;">
              $140 <span style="font-size: 0.95rem; color: #FFFFFF; font-weight: 600;">($14.00 / session)</span>
            </div>
            <ul style="padding: 0; margin: 0 0 1.25rem 0; list-style: none; font-size: 0.85rem; color: rgba(255,255,255,0.85); display: flex; flex-direction: column; gap: 0.35rem;">
              <li>✔ Save $40 compared to single walk-in tickets</li>
              <li>✔ 90 Minutes per session access</li>
              <li>✔ 1 Free pair of PlaySpace grip socks</li>
              <li>✔ Shareable between siblings &amp; friends</li>
            </ul>
          </div>
          <a href="pass-booking.html?pass=punch-10" class="ps-btn ps-btn-primary ps-btn-block">Book This Pass</a>
        </div>

        <!-- 20-Visit Card -->
        <div class="ps-pass-wallet-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-flex-between">
              <span class="ps-badge">20-VISIT PACK</span>
              <span style="color: rgba(255,255,255,0.7); font-size: 0.82rem;">Valid 12 Months</span>
            </div>
            <h3 style="color: #FFFFFF; margin-top: 1rem; font-size: 1.3rem;">20-Session Season Pack</h3>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.5;">
              Maximum savings for frequent bouncers and large families. Unbeatable $12.50 per visit rate!
            </p>
            <div style="font-size: 2.2rem; font-weight: 900; color: #FFCC00; margin: 1rem 0;">
              $250 <span style="font-size: 0.95rem; color: #FFFFFF; font-weight: 600;">($12.50 / session)</span>
            </div>
            <ul style="padding: 0; margin: 0 0 1.25rem 0; list-style: none; font-size: 0.85rem; color: rgba(255,255,255,0.85); display: flex; flex-direction: column; gap: 0.35rem;">
              <li>✔ Save $110 compared to single tickets</li>
              <li>✔ 90 Minutes per session access</li>
              <li>✔ 2 Free pairs of PlaySpace grip socks</li>
              <li>✔ 10% Café concession discount</li>
            </ul>
          </div>
          <a href="pass-booking.html?pass=punch-20" class="ps-btn ps-btn-dark ps-btn-block" style="border: 1px solid #FFCC00; color: #FFFFFF;">Book This Pass</a>
        </div>
      </div>

      <!-- Interactive Pass vs Walk-In Savings Calculator -->
      <div style="background: rgba(255, 255, 255, 0.05); border: 2px solid #FFCC00; border-radius: var(--ps-radius-xl); padding: 2.25rem; max-width: 900px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <span class="ps-badge" style="background: #FFCC00; color: #000; font-weight: 800;">CALCULATE YOUR SAVINGS</span>
            <h3 style="color: #FFFFFF; margin: 0.5rem 0 0 0; font-size: 1.35rem;">See How Much You Save With Multi-Passes</h3>
          </div>
          <!-- Clickable Pills connected to pricing.js -->
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="ps-btn ps-btn-sm ps-btn-outline" data-calc-visits="5" style="border-color: #FFCC00; color: #FFFFFF; cursor: pointer;">5 Visits</button>
            <button type="button" class="ps-btn ps-btn-sm ps-btn-primary active" data-calc-visits="10" style="cursor: pointer;">10 Visits</button>
            <button type="button" class="ps-btn ps-btn-sm ps-btn-outline" data-calc-visits="20" style="border-color: #FFCC00; color: #FFFFFF; cursor: pointer;">20 Visits</button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 1.5rem;">
          <div>
            <span style="color: rgba(255,255,255,0.7); font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">Standard Walk-In Cost</span>
            <span id="calc-walkin-cost" style="color: #FFFFFF; font-size: 1.8rem; font-weight: 900;">$180.00</span>
          </div>
          <div>
            <span style="color: rgba(255,255,255,0.7); font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">Multi-Pass Bundle Cost</span>
            <span id="calc-pass-cost" style="color: #FFCC00; font-size: 1.8rem; font-weight: 900;">$140.00</span>
          </div>
          <div>
            <span style="color: rgba(255,255,255,0.7); font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">Total Family Savings</span>
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <span id="calc-savings-amount" style="color: #FFFFFF; font-size: 1.8rem; font-weight: 900;">$40.00</span>
              <span id="calc-savings-badge" class="ps-badge" style="background: #FFCC00; color: #000; font-weight: 800; font-size: 0.75rem;">Save 22%</span>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1.75rem; flex-wrap: wrap;">
          <a href="pass-booking.html" class="ps-btn ps-btn-primary">Book This Pass</a>
          <a href="#compare-plans" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00;">Compare Plans</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Birthday Package Pricing -->
  <section class="ps-section ps-section-white" id="birthday-pricing">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">CELEBRATE WITH US</span>
        <h2 style="margin-top: 0.75rem;">Birthday Package Pricing</h2>
        <p class="text-muted">
          All-inclusive, fully hosted birthday celebrations. Private party suites, fresh pizzas, zero cleanup, and maximum active fun.
        </p>
      </div>

      <div class="ps-grid ps-grid-3">
        <!-- Package 1: Basic Birthday Bash -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="ps-badge" style="background: #000; color: #FFF; font-size: 0.75rem;">ESSENTIAL CELEBRATION</span>
            <h3 style="font-size: 1.35rem; margin: 0.75rem 0 0.25rem 0;">Basic Birthday Bash</h3>
            <p style="font-size: 0.88rem; color: var(--ps-text-muted); margin-bottom: 1rem;">Complete party fun with food &amp; dedicated host</p>
            <div style="font-size: 2.3rem; font-weight: 900; color: var(--ps-text-main); margin-bottom: 0.25rem;">$249</div>
            <p style="font-weight: 700; font-size: 0.85rem; color: var(--ps-text-muted); margin-bottom: 1.25rem;">Up to 10 Jumpers • 90 Mins Total</p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.45rem; color: var(--ps-text-main);">
              <li>✔ 60 Mins open jump arena access</li>
              <li>✔ 30 Mins reserved party room celebration</li>
              <li>✔ 2 Extra-large 16" stone-baked pizzas</li>
              <li>✔ Unlimited fruit punch &amp; apple juice</li>
              <li>✔ Certified safety grip socks for all 10 kids</li>
              <li>✔ Dedicated host handles setup &amp; cleanup</li>
            </ul>
          </div>
          <div>
            <a href="birthday-booking.html?package=party-basic" class="ps-btn ps-btn-dark ps-btn-block">Book Birthday Party</a>
          </div>
        </div>

        <!-- Package 2: Premium Adventure (Featured) -->
        <div class="ps-card featured" style="padding: 2.5rem 2.25rem; border: 2px solid #FFCC00; background: #000000; color: #FFFFFF; display: flex; flex-direction: column; justify-content: space-between; transform: scale(1.02); position: relative; overflow: visible;">
          <div>
            <span class="ps-badge" style="background: #FFCC00; color: #000; font-weight: 800; font-size: 0.75rem;">BEST VALUE</span>
            <h3 style="font-size: 1.35rem; margin: 0.75rem 0 0.25rem 0; color: #FFFFFF;">Premium Adventure</h3>
            <p style="font-size: 0.88rem; color: rgba(255,255,255,0.8); margin-bottom: 1rem;">More jump time, extra guests &amp; arcade credits</p>
            <div style="font-size: 2.3rem; font-weight: 900; color: #FFCC00; margin-bottom: 0.25rem;">$349</div>
            <p style="font-weight: 700; font-size: 0.85rem; color: rgba(255,255,255,0.75); margin-bottom: 1.25rem;">Up to 15 Jumpers • 120 Mins Total</p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.45rem; color: #FFFFFF;">
              <li><span style="color: #FFCC00;">✔</span> 75 Mins open jump arena access</li>
              <li><span style="color: #FFCC00;">✔</span> 45 Mins <strong style="color: #FFFFFF;">Private Party Suite</strong></li>
              <li><span style="color: #FFCC00;">✔</span> 3 Extra-large stone-baked pizzas + popcorn</li>
              <li><span style="color: #FFCC00;">✔</span> Frozen ICEE slushies for all 15 jumpers</li>
              <li><span style="color: #FFCC00;">✔</span> <strong style="color: #FFCC00;">$50 Arcade Game Card</strong> for birthday kid</li>
              <li><span style="color: #FFCC00;">✔</span> 1 Free Return Jump Pass for birthday child</li>
            </ul>
          </div>
          <div>
            <a href="birthday-booking.html?package=party-vip" class="ps-btn ps-btn-primary ps-btn-block">Book Birthday Party</a>
          </div>
        </div>

        <!-- Package 3: VIP Glow Extravaganza -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="ps-badge" style="background: #000; color: #FFCC00; font-weight: 800; border: 1px solid #FFCC00; font-size: 0.75rem;">ALL-INCLUSIVE VIP</span>
            <h3 style="font-size: 1.35rem; margin: 0.75rem 0 0.25rem 0;">VIP Glow Extravaganza</h3>
            <p style="font-size: 0.88rem; color: var(--ps-text-muted); margin-bottom: 1rem;">Blacklight UV party suite, neon decor &amp; gifts</p>
            <div style="font-size: 2.3rem; font-weight: 900; color: var(--ps-text-main); margin-bottom: 0.25rem;">$449</div>
            <p style="font-weight: 700; font-size: 0.85rem; color: var(--ps-text-muted); margin-bottom: 1.25rem;">Up to 15 Jumpers • 150 Mins Total</p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.45rem; color: var(--ps-text-main);">
              <li>✔ 90 Mins VIP open jump arena flight</li>
              <li>✔ 60 Mins <strong>Private UV Blacklight Suite</strong></li>
              <li>✔ Neon balloons &amp; glowing party accessories</li>
              <li>✔ 4 XL Artisan pizzas + warm popcorn feast</li>
              <li>✔ Custom Birthday Kid Neon Celebration T-Shirt</li>
              <li>✔ Premium photo backdrop with throne seating</li>
            </ul>
          </div>
          <div>
            <a href="birthday-booking.html?package=party-ultimate" class="ps-btn ps-btn-dark ps-btn-block">Book Birthday Party</a>
          </div>
        </div>
      </div>

      <!-- Links to Birthday Details -->
      <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
        <a href="birthday-parties.html" class="ps-btn ps-btn-outline-dark" style="border-color: var(--ps-border-color); color: #000000; font-weight: 800;">
          View Full Birthday Packages &amp; Add-Ons →
        </a>
        <a href="birthday-details.html" class="ps-btn ps-btn-outline-dark" style="border-color: #FFCC00; color: #000000; font-weight: 800;">
          Explore VIP Glow Party Features →
        </a>
      </div>
    </div>
  </section>

  <!-- 6. Compare Plans & Passes Matrix -->
  <section class="ps-section ps-section-alt" id="compare-plans">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">SIDE-BY-SIDE MATRIX</span>
        <h2 style="margin-top: 0.75rem;">Compare Plans &amp; Passes</h2>
        <p class="text-muted">
          Compare key features, duration, inclusions, and savings across all our ticket options.
        </p>
      </div>

      <div class="ps-comparison-table-wrap" style="overflow-x: auto;">
        <table class="ps-comparison-table">
          <thead>
            <tr>
              <th style="min-width: 220px;">Feature &amp; Plan Benefit</th>
              <th>1-Hour Pass</th>
              <th class="featured">2-Hour Pass</th>
              <th>All-Day Pass</th>
              <th>10-Visit Pass</th>
              <th>Family 4-Pack</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Standard Price</td>
              <td><strong>$18</strong> / jumper</td>
              <td class="featured"><strong>$28</strong> / jumper</td>
              <td><strong>$36</strong> / jumper</td>
              <td><strong>$140</strong> (10 Uses)</td>
              <td><strong>$79</strong> (4 Jumpers)</td>
            </tr>
            <tr>
              <td>Jump Session Duration</td>
              <td>60 Minutes</td>
              <td class="featured">120 Minutes</td>
              <td>Unlimited (Open to Close)</td>
              <td>90 Mins per visit</td>
              <td>90 Minutes</td>
            </tr>
            <tr>
              <td>Effective Cost per Jumper</td>
              <td>$18.00</td>
              <td class="featured"><strong>$14.00 / hr</strong></td>
              <td><strong>Best Daily Value</strong></td>
              <td><strong>$14.00 / session</strong></td>
              <td><strong>$19.75 / guest (incl pizza)</strong></td>
            </tr>
            <tr>
              <td>Access to All 12 Arena Zones</td>
              <td><span class="ps-check-icon">✔</span></td>
              <td class="featured"><span class="ps-check-icon">✔</span></td>
              <td><span class="ps-check-icon">✔</span></td>
              <td><span class="ps-check-icon">✔</span></td>
              <td><span class="ps-check-icon">✔</span></td>
            </tr>
            <tr>
              <td>Grip Socks Included</td>
              <td>$3.50 (Reusable)</td>
              <td class="featured">$3.50 (Reusable)</td>
              <td><span class="ps-check-icon">✔</span> 1 Pair Included</td>
              <td><span class="ps-check-icon">✔</span> 1 Pair Included</td>
              <td><span class="ps-check-icon">✔</span> 4 Pairs Included</td>
            </tr>
            <tr>
              <td>Same-Day Re-Entry Privileges</td>
              <td>—</td>
              <td class="featured">—</td>
              <td><span class="ps-check-icon">✔</span> Unlimited</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Free Digital Locker Rental</td>
              <td>—</td>
              <td class="featured"><span class="ps-check-icon">✔</span> Included</td>
              <td><span class="ps-check-icon">✔</span> Included</td>
              <td>—</td>
              <td><span class="ps-check-icon">✔</span> Included</td>
            </tr>
            <tr>
              <td>Shareable Between Siblings</td>
              <td>—</td>
              <td class="featured">—</td>
              <td>—</td>
              <td><span class="ps-check-icon">✔</span> 100% Shareable</td>
              <td><span class="ps-check-icon">✔</span> 4 Jumpers Any Mix</td>
            </tr>
            <tr>
              <td>Food &amp; Beverage Perks</td>
              <td>—</td>
              <td class="featured">—</td>
              <td>1 Free Drink Voucher</td>
              <td>10% Café Discount</td>
              <td><span class="ps-check-icon">✔</span> 1 XL Pizza + Pitcher</td>
            </tr>
            <tr>
              <td>Non-Jumping Spectator Entry</td>
              <td><strong>FREE</strong></td>
              <td class="featured"><strong>FREE</strong></td>
              <td><strong>FREE</strong></td>
              <td><strong>FREE</strong></td>
              <td><strong>FREE</strong></td>
            </tr>
            <tr>
              <td>Free Rescheduling Flexibility</td>
              <td><span class="ps-check-icon">✔</span> Up to 2h prior</td>
              <td class="featured"><span class="ps-check-icon">✔</span> Up to 2h prior</td>
              <td><span class="ps-check-icon">✔</span> Same-day change</td>
              <td><span class="ps-check-icon">✔</span> Valid 1 Year</td>
              <td><span class="ps-check-icon">✔</span> Free change</td>
            </tr>
            <tr style="background: var(--ps-bg-surface-alt, rgba(0,0,0,0.02));">
              <td><strong>Select Your Option</strong></td>
              <td>
                <a href="booking.html?duration=60&price=18&title=1-Hour+Pass" class="ps-btn ps-btn-dark ps-btn-sm ps-btn-block">Book Now</a>
              </td>
              <td class="featured">
                <a href="booking.html?duration=120&price=28&title=2-Hour+Pass" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-block">Book Now</a>
              </td>
              <td>
                <a href="booking.html?duration=allday&price=36&title=All-Day+Pass" class="ps-btn ps-btn-dark ps-btn-sm ps-btn-block">Book Now</a>
              </td>
              <td>
                <a href="pass-booking.html" class="ps-btn ps-btn-dark ps-btn-sm ps-btn-block">Book This Pass</a>
              </td>
              <td>
                <a href="booking.html?session=family&title=Family+4-Pack&price=79&duration=90" class="ps-btn ps-btn-primary ps-btn-sm ps-btn-block">Book Now</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- 7. Frequently Asked Questions -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">HELPFUL ANSWERS</span>
        <h2 style="margin-top: 0.75rem;">Pricing &amp; Passes FAQs</h2>
        <p class="text-muted">Everything you need to know about purchasing tickets, passes, and booking parties.</p>
      </div>

      <div class="ps-accordion" data-behavior="single">
        <div class="ps-accordion-item active">
          <div class="ps-accordion-header">
            <span>Do parents or spectators have to pay if they are not jumping?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            No! Non-jumping parents, grandparents, and guardians are 100% FREE to enter the park, accompany children to the courts, relax in our comfortable café and mezzanine lounge, and use complimentary high-speed Wi-Fi.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Can multiple siblings share a multi-visit punch card?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Yes, absolutely! Our 5-visit, 10-visit, and 20-visit passes are 100% shareable across brothers, sisters, and family members. When booking online or scanning in at our express desk, simply select how many visits you wish to redeem.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Are grip socks required, and can we bring our own from previous visits?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Yes, certified safety grip socks are required for all jumpers on all trampoline surfaces. If you already own PlaySpace grip socks, bring them back and jump with zero extra fee! New pairs are available for just $3.50.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>How does the Sibling Discount apply during online booking?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            When you select 2 or more children in your booking cart, our parent portal automatically applies 20% off for the second child and 30% off for the third and subsequent children before checkout!
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>What is the cancellation or rescheduling policy?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            We understand plans change with kids! Single play sessions and timed passes can be rescheduled online with zero fee up to 2 hours before your session. Birthday party reservations can be rescheduled up to 7 days in advance.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 8. Bottom Call to Action Section -->
  <section class="ps-section ps-section-dark" style="background-color: #000000; color: #FFFFFF; border-top: 3px solid #FFCC00; border-bottom: 3px solid #FFCC00; text-align: center; padding: 4.5rem 1.5rem;">
    <div class="ps-container" style="max-width: 850px;">
      <span class="badge-tag" style="background: #FFCC00; color: #000000; margin-bottom: 1rem; display: inline-block;">READY TO JUMP?</span>
      <h2 style="color: #FFFFFF; margin-bottom: 0.75rem; font-size: 2.25rem;">Book Your Play Session &amp; Skip the Line</h2>
      <p style="color: rgba(255,255,255,0.85); margin-bottom: 2rem; font-size: 1.05rem; line-height: 1.6;">
        Reserving online guarantees your court capacity time slot and speeds up your arrival with contactless digital waiver check-in.
      </p>

      <!-- The Requested CTA Buttons -->
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="#compare-plans" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00; font-size: 1.05rem; padding: 0.85rem 1.75rem;">
          Compare Plans
        </a>
        <a href="booking.html" class="ps-btn ps-btn-primary" style="font-size: 1.05rem; padding: 0.85rem 1.75rem;">
          Book Now
        </a>
      </div>

      <p style="color: rgba(255,255,255,0.6); margin-top: 1.75rem; font-size: 0.92rem;">
        Questions about packages or passes? Call our guest services desk at <a href="tel:5558397530" style="color: #FFCC00; font-weight: 700;">(555) 839-7530</a>.
      </p>
    </div>
  </section>
  `,
  'pricing',
  ['pricing.js']
);
fs.writeFileSync(path.join(PAGES_DIR, 'pricing-passes.html'), pricingHtml, 'utf8');

// 5. birthday-parties.html
const birthdayPartiesHtml = pageWrapper(
  'Birthday Parties & Packages',
  'Host an unforgettable birthday celebration at PlaySpace. Basic, Premium, and VIP party packages with jump arena flight, private party rooms, artisan pizzas, custom decorations, and dedicated hosts.',
  `
  <!-- 1. Hero Banner -->
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>Birthday Parties</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0 0 0.5rem 0;">Unforgettable Birthday Celebrations</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 0 0 1.5rem 0; font-size: 1.1rem; max-width: 700px;">
        High-flying trampoline arena fun, dedicated private party suites, fresh piping-hot pizzas, vibrant theme decor, and zero cleanup stress. We handle every single detail so parents can relax and celebrate!
      </p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="birthday-booking.html" class="ps-btn ps-btn-primary">Book a Birthday Party</a>
        <a href="#birthdayPackages" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00;">View Party Packages ↓</a>
      </div>
    </div>
  </section>

  <!-- 2. Birthday Package Cards (Basic, Premium, VIP) -->
  <section class="ps-section ps-section-white" id="birthdayPackages">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">WE DO ALL THE WORK</span>
        <h2 style="margin-top: 0.75rem;">Stress-Free Birthday Packages</h2>
        <p class="text-muted">
          All packages include open jump arena flights, private party suite access, certified grip socks for all guests, a dedicated party host, and 100% white-glove clean-up!
        </p>
      </div>

      <div class="ps-grid ps-grid-3">
        <!-- 1. BASIC PACKAGE -->
        <div class="ps-pricing-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span class="ps-badge ps-badge-dark">STARTER</span>
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--ps-text-muted);">Ages 4–14</span>
            </div>
            <h3 style="margin: 0.25rem 0 0.5rem 0;">Basic Bounce Party</h3>
            <p style="font-size: 0.92rem; margin-bottom: 1.25rem;">Ideal for classic, high-energy birthday celebrations with essential pizza &amp; drinks.</p>
            
            <div class="ps-price-amount">$299</div>

            <!-- Duration & Guest Capacity Highlights -->
            <div style="background: rgba(0,0,0,0.04); border: 1px solid var(--ps-border-color); border-radius: var(--ps-radius-md); padding: 0.85rem 1rem; margin: 1.25rem 0; display: flex; flex-direction: column; gap: 0.45rem;">
              <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.92rem;">
                <span style="font-size: 1.1rem;">⏱️</span>
                <span><strong>Duration:</strong> 2 Hours (90m Jump + 30m Party Room)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.92rem;">
                <span style="font-size: 1.1rem;">👥</span>
                <span><strong>Guest Capacity:</strong> Up to 10 Jumpers Included</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--ps-text-muted); margin-left: 1.85rem;">
                +$22 per additional jumper • Non-jumping adults FREE
              </div>
            </div>

            <!-- Package Inclusions -->
            <ul class="ps-pricing-features" style="margin: 1.5rem 0;">
              <li><span>✔</span> <strong>Arena Flight:</strong> 90 Mins open jump across main trampoline courts</li>
              <li><span>✔</span> <strong>Private Suite:</strong> 30 Mins in private celebration room</li>
              <li><span>✔</span> <strong>Grip Socks:</strong> Certified safety socks for all 10 jumpers</li>
              <li><span>✔</span> <strong>Food &amp; Drinks:</strong> 2 Large 16" Pizzas (Cheese/Pepperoni) + fruit punch dispensers</li>
              <li><span>✔</span> <strong>Decor &amp; Tableware:</strong> Color-coordinated plates, cups, napkins &amp; birthday banner</li>
              <li><span>✔</span> <strong>Digital Screen:</strong> Birthday child's name featured on room welcome display</li>
              <li><span>✔</span> <strong>Party Host:</strong> Dedicated party assistant for setup and cake cutting</li>
              <li><span>✔</span> <strong>Clean-Up:</strong> Complete post-party cleanup handled by our staff</li>
            </ul>
          </div>

          <div style="margin-top: 1.5rem;">
            <a href="birthday-booking.html?package=party-basic" class="ps-btn ps-btn-dark ps-btn-block">
              Book a Birthday Party
            </a>
          </div>
        </div>

        <!-- 2. PREMIUM PACKAGE (Featured) -->
        <div class="ps-pricing-card featured" style="display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: visible;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span class="ps-badge" style="background: #FFCC00; color: #000000; font-weight: 800;">PREMIUM PACKAGE</span>
              <span style="font-size: 0.82rem; font-weight: 700; color: #FFCC00;">★ Best Value</span>
            </div>
            <h3 style="margin: 0.25rem 0 0.5rem 0; color: #FFFFFF;">Premium Glow Adventure</h3>
            <p style="font-size: 0.92rem; margin-bottom: 1.25rem; color: rgba(255,255,255,0.8);">Our signature blacklight neon glow party with extra room time and unlimited refreshments.</p>
            
            <div class="ps-price-amount" style="color: #FFCC00;">$449</div>

            <!-- Duration & Guest Capacity Highlights -->
            <div style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,204,0,0.3); border-radius: var(--ps-radius-md); padding: 0.85rem 1rem; margin: 1.25rem 0; display: flex; flex-direction: column; gap: 0.45rem;">
              <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.92rem; color: #FFFFFF;">
                <span style="font-size: 1.1rem;">⏱️</span>
                <span><strong>Duration:</strong> 2.5 Hours (90m Jump + 60m Glow Suite)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.92rem; color: #FFCC00;">
                <span style="font-size: 1.1rem;">👥</span>
                <span><strong>Guest Capacity:</strong> Up to 15 Jumpers Included</span>
              </div>
              <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7); margin-left: 1.85rem;">
                +$24 per additional jumper • Non-jumping adults FREE
              </div>
            </div>

            <!-- Package Inclusions -->
            <ul class="ps-pricing-features" style="margin: 1.5rem 0;">
              <li><span style="color: #FFCC00;">✔</span> <strong>Arena &amp; Ninja:</strong> 90 Mins open jump + dodgeball arena &amp; ninja obstacle course</li>
              <li><span style="color: #FFCC00;">✔</span> <strong>Glow Suite:</strong> 60 Mins in private Neon Blacklight Party Suite</li>
              <li><span style="color: #FFCC00;">✔</span> <strong>Glow Accessories:</strong> Grip socks + UV neon glow necklaces &amp; bracelets for all</li>
              <li><span style="color: #FFCC00;">✔</span> <strong>Food Feast:</strong> 4 Large 16" Artisan Pizzas + Popcorn bowls + Unlimited fountain drinks</li>
              <li><span style="color: #FFCC00;">✔</span> <strong>Glow Tableware:</strong> Blacklight glowing plates, cups, cutlery &amp; 3-tier balloon centerpiece</li>
              <li><span style="color: #FFCC00;">✔</span> <strong>Birthday VIP T-Shirt:</strong> Custom PlaySpace neon party t-shirt for guest of honor</li>
              <li><span style="color: #FFCC00;">✔</span> <strong>Free Return Pass:</strong> 1 Complimentary 60-min return jump pass for birthday star</li>
              <li><span style="color: #FFCC00;">✔</span> <strong>Dedicated Host:</strong> Dedicated party coordinator for games, cake singing &amp; full cleanup</li>
            </ul>
          </div>

          <div style="margin-top: 1.5rem;">
            <a href="birthday-booking.html?package=party-vip" class="ps-btn ps-btn-primary ps-btn-block">
              Book a Birthday Party
            </a>
          </div>
        </div>

        <!-- 3. VIP PACKAGE -->
        <div class="ps-pricing-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span class="ps-badge ps-badge-dark">ELITE VIP</span>
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--ps-text-muted);">Ultimate Buyout Feel</span>
            </div>
            <h3 style="margin: 0.25rem 0 0.5rem 0;">VIP Ultimate Takeover</h3>
            <p style="font-size: 0.92rem; margin-bottom: 1.25rem;">The ultimate all-inclusive extravaganza with double private suite, full arena perks, and custom styling.</p>
            
            <div class="ps-price-amount">$699</div>

            <!-- Duration & Guest Capacity Highlights -->
            <div style="background: rgba(0,0,0,0.04); border: 1px solid var(--ps-border-color); border-radius: var(--ps-radius-md); padding: 0.85rem 1rem; margin: 1.25rem 0; display: flex; flex-direction: column; gap: 0.45rem;">
              <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.92rem;">
                <span style="font-size: 1.1rem;">⏱️</span>
                <span><strong>Duration:</strong> 3 Hours (120m All-Access + 60m Double Suite)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.92rem;">
                <span style="font-size: 1.1rem;">👥</span>
                <span><strong>Guest Capacity:</strong> Up to 25 Jumpers Included</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--ps-text-muted); margin-left: 1.85rem;">
                +$25 per additional jumper • Non-jumping adults FREE
              </div>
            </div>

            <!-- Package Inclusions -->
            <ul class="ps-pricing-features" style="margin: 1.5rem 0;">
              <li><span>✔</span> <strong>All-Access Arena:</strong> 120 Mins full park (Trampolines, climbing walls &amp; stunt airbag)</li>
              <li><span>✔</span> <strong>Double VIP Suite:</strong> 60 Mins in luxury double private suite with adult lounge area</li>
              <li><span>✔</span> <strong>VIP Gear &amp; Lanyards:</strong> Grip socks + LED flash accessories &amp; VIP all-access lanyards</li>
              <li><span>✔</span> <strong>Gourmet Catering:</strong> 6 Large Pizzas + Chicken tenders &amp; fries + Ice cream cups + Unlimited drinks</li>
              <li><span>✔</span> <strong>Deluxe Decor:</strong> Organic balloon garland arch, themed photo backdrop &amp; goodie favor bags for all</li>
              <li><span>✔</span> <strong>1-Month Pass Gift:</strong> 1-Month Unlimited Open Jump Pass for birthday child ($149 value)</li>
              <li><span>✔</span> <strong>Dual Host Team:</strong> 2 Dedicated party masters for white-glove hosting &amp; games</li>
              <li><span>✔</span> <strong>VIP Concierge:</strong> Priority check-in lane, gift loading to car &amp; complete cleanup</li>
            </ul>
          </div>

          <div style="margin-top: 1.5rem;">
            <a href="birthday-booking.html?package=party-ultimate" class="ps-btn ps-btn-dark ps-btn-block">
              Book a Birthday Party
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Food and Decorations Details Breakdown -->
  <section class="ps-section ps-section-alt">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">DELICIOUS &amp; FESTIVE</span>
        <h2 style="margin-top: 0.75rem;">Food &amp; Decorations Details</h2>
        <p class="text-muted">
          We believe birthdays should be as effortless as they are extraordinary. Here is how our chef-crafted kitchen and creative event stylists handle your party details.
        </p>
      </div>

      <div class="ps-grid ps-grid-2">
        <!-- Food & Beverage Details Card -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
              <div class="ps-icon-square">🍕</div>
              <div>
                <h3 style="margin: 0; font-size: 1.35rem;">Food &amp; Beverage Catering</h3>
                <span class="text-muted" style="font-size: 0.85rem;">Freshly baked on-site at Fuel Zone Café</span>
              </div>
            </div>

            <ul style="display: flex; flex-direction: column; gap: 1rem; padding: 0; margin: 0; list-style: none; font-size: 0.95rem; color: var(--ps-text-muted);">
              <li>
                <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.2rem;">• Fresh Artisan 16" Pizzas:</strong>
                Handmade stone-baked pizzas (8 oversized slices per pie). Choose from Four-Cheese, Pepperoni, or Garden Veggie. Halal beef pepperoni and certified gluten-free cauliflower crusts are available upon advance request.
              </li>
              <li>
                <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.2rem;">• Unlimited Party Beverages:</strong>
                Includes continuous service of crisp fruit punch, apple juice boxes, classic pink lemonade, and iced tap water throughout your entire party room session.
              </li>
              <li>
                <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.2rem;">• Sides &amp; Sweet Treats:</strong>
                Crispy golden chicken tenders, seasoned curly fry platters, hot buttered popcorn bowls, and single-serve ice cream cups (included in VIP or available via add-on).
              </li>
              <li>
                <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.2rem;">• Birthday Cake Policy (BYO-Cake Friendly):</strong>
                You are 100% welcome to bring your child's favorite birthday cake, cupcakes, or ice cream cake! We provide the ceremonial cake knife, candles/lighter, celebratory plates, forks, and our host cuts and serves it for you.
              </li>
              <li>
                <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.2rem;">• Adult Host Café Vouchers:</strong>
                Host parents receive 2 complimentary barista specialty coffee vouchers (espresso, cappuccino, cold brew, or iced latte) to enjoy while kids jump.
              </li>
            </ul>
          </div>

          <div style="margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--ps-border-color); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--ps-text-main);">Have dietary requirements?</span>
            <span style="font-size: 0.85rem; color: var(--ps-text-muted);">Nut-free kitchen facility • Vegetarian &amp; vegan options</span>
          </div>
        </div>

        <!-- Room Styling & Decorations Card -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
              <div class="ps-icon-square">🎈</div>
              <div>
                <h3 style="margin: 0; font-size: 1.35rem;">Party Room &amp; Decorations</h3>
                <span class="text-muted" style="font-size: 0.85rem;">Customized styling with full setup ready on arrival</span>
              </div>
            </div>

            <ul style="display: flex; flex-direction: column; gap: 1rem; padding: 0; margin: 0; list-style: none; font-size: 0.95rem; color: var(--ps-text-muted);">
              <li>
                <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.2rem;">• Complete Designer Tableware:</strong>
                Heavy-duty party plates, insulated beverage cups, durable color-coordinated cutlery, and soft napkins preset on every table before your party group enters.
              </li>
              <li>
                <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.2rem;">• Festive Balloon Installations:</strong>
                Color-matched 3-tier balloon bouquets on tables, with organic multi-color balloon arches and celebratory entrance pillars in our VIP suites.
              </li>
              <li>
                <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.2rem;">• Neon Blacklight Visuals (Premium &amp; VIP):</strong>
                High-output UV blacklights ignite the room in electric neon brilliance. Jumpers receive glowing wristbands, neon necklaces, and UV-reactive cups and napkins.
              </li>
              <li>
                <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.2rem;">• Personalized Digital Room Screen:</strong>
                55" High-definition party room display welcoming your child by name with high-energy party visuals and custom music playlist streaming.
              </li>
              <li>
                <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.2rem;">• 100% Zero-Cleanup Guarantee:</strong>
                When party time expires, simply walk out with your presents and happy jumpers. Our team cleans all tables, washes surfaces, empties trash, and packs your leftovers.
              </li>
            </ul>
          </div>

          <div style="margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--ps-border-color); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--ps-text-main);">Personal party touches?</span>
            <span style="font-size: 0.85rem; color: var(--ps-text-muted);">You may bring personal table favors or themed photo backdrops</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Add-On Options -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">CUSTOMIZE YOUR PARTY</span>
        <h2 style="margin-top: 0.75rem;">Popular Party Add-On Options</h2>
        <p class="text-muted">
          Customize your child's celebration with mouthwatering food extras, sweet treats, arcade power cards, and entertainment upgrades. Add-ons can be selected during online checkout or added up to 48 hours prior to your event!
        </p>
      </div>

      <div class="ps-grid ps-grid-4">
        <!-- Add-on 1 -->
        <div class="ps-card" style="padding: 1.5rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 1.85rem; margin-bottom: 0.5rem;">🍕</div>
            <h4 style="margin: 0 0 0.35rem 0;">Extra Large 16" Pizza</h4>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin: 0 0 0.75rem 0;">Hand-tossed crust with rich mozzarella and choice of toppings (8 large slices).</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 0.75rem;">
            <strong style="color: var(--ps-text-main); font-size: 1.1rem;">$18.00</strong>
            <span class="ps-badge ps-badge-dark" style="font-size: 0.75rem;">Per Pizza</span>
          </div>
        </div>

        <!-- Add-on 2 -->
        <div class="ps-card" style="padding: 1.5rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 1.85rem; margin-bottom: 0.5rem;">🧁</div>
            <h4 style="margin: 0 0 0.35rem 0;">Custom Cupcake Tower</h4>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin: 0 0 0.75rem 0;">24 Gourmet vanilla &amp; chocolate artisan cupcakes with sprinkles and celebration toppers.</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 0.75rem;">
            <strong style="color: var(--ps-text-main); font-size: 1.1rem;">$45.00</strong>
            <span class="ps-badge ps-badge-dark" style="font-size: 0.75rem;">24 Pack</span>
          </div>
        </div>

        <!-- Add-on 3 -->
        <div class="ps-card" style="padding: 1.5rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 1.85rem; margin-bottom: 0.5rem;">🍨</div>
            <h4 style="margin: 0 0 0.35rem 0;">Ice Cream Sundae Bar</h4>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin: 0 0 0.75rem 0;">Individual scoops with Oreo crumbles, gummy bears, hot fudge &amp; whipped cream.</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 0.75rem;">
            <strong style="color: var(--ps-text-main); font-size: 1.1rem;">$4.50</strong>
            <span class="ps-badge ps-badge-dark" style="font-size: 0.75rem;">Per Child</span>
          </div>
        </div>

        <!-- Add-on 4 -->
        <div class="ps-card" style="padding: 1.5rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 1.85rem; margin-bottom: 0.5rem;">🎁</div>
            <h4 style="margin: 0 0 0.35rem 0;">Deluxe Goodie Favor Bags</h4>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin: 0 0 0.75rem 0;">Includes high-bounce ball, slap bracelet, stickers, mini tattoo &amp; $5 arcade card.</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 0.75rem;">
            <strong style="color: var(--ps-text-main); font-size: 1.1rem;">$6.00</strong>
            <span class="ps-badge ps-badge-dark" style="font-size: 0.75rem;">Per Bag</span>
          </div>
        </div>

        <!-- Add-on 5 -->
        <div class="ps-card" style="padding: 1.5rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 1.85rem; margin-bottom: 0.5rem;">🦘</div>
            <h4 style="margin: 0 0 0.35rem 0;">Mascot or Coach Appearance</h4>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin: 0 0 0.75rem 0;">30 minutes of personal court games, dance-offs &amp; photo ops with Bounce the Kangaroo.</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 0.75rem;">
            <strong style="color: var(--ps-text-main); font-size: 1.1rem;">$65.00</strong>
            <span class="ps-badge ps-badge-dark" style="font-size: 0.75rem;">30 Mins</span>
          </div>
        </div>

        <!-- Add-on 6 -->
        <div class="ps-card" style="padding: 1.5rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 1.85rem; margin-bottom: 0.5rem;">🕹️</div>
            <h4 style="margin: 0 0 0.35rem 0;">Arcade Game Power Cards</h4>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin: 0 0 0.75rem 0;">$10 In arcade game tokens per child for our 40-game arcade and redemption counter.</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 0.75rem;">
            <strong style="color: var(--ps-text-main); font-size: 1.1rem;">$8.00</strong>
            <span class="ps-badge ps-badge-dark" style="font-size: 0.75rem;">$10 Value</span>
          </div>
        </div>

        <!-- Add-on 7 -->
        <div class="ps-card" style="padding: 1.5rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 1.85rem; margin-bottom: 0.5rem;">📸</div>
            <h4 style="margin: 0 0 0.35rem 0;">Dedicated Pro Photographer</h4>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin: 0 0 0.75rem 0;">90 Mins of candid jump action, cake cutting &amp; group photos with 48h digital gallery.</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 0.75rem;">
            <strong style="color: var(--ps-text-main); font-size: 1.1rem;">$120.00</strong>
            <span class="ps-badge ps-badge-dark" style="font-size: 0.75rem;">90 Mins</span>
          </div>
        </div>

        <!-- Add-on 8 -->
        <div class="ps-card" style="padding: 1.5rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 1.85rem; margin-bottom: 0.5rem;">⏳</div>
            <h4 style="margin: 0 0 0.35rem 0;">30-Min Jump Extension</h4>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin: 0 0 0.75rem 0;">Extend jump time for your entire group by an extra half hour across the whole park.</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--ps-border-color); padding-top: 0.75rem; margin-top: 0.75rem;">
            <strong style="color: var(--ps-text-main); font-size: 1.1rem;">$60.00</strong>
            <span class="ps-badge ps-badge-dark" style="font-size: 0.75rem;">All Jumpers</span>
          </div>
        </div>
      </div>

      <!-- Quick Add-on Booking Note -->
      <div style="background: rgba(255,204,0,0.12); border: 1.5px solid #FFCC00; border-radius: var(--ps-radius-lg); padding: 1.25rem 1.75rem; margin-top: 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <strong style="color: var(--ps-text-main); font-size: 1rem; display: block;">Have a custom party vision in mind?</strong>
          <span style="color: var(--ps-text-muted); font-size: 0.9rem;">From private facility buyouts to customized glow themes, our party concierge team can make it happen!</span>
        </div>
        <a href="birthday-booking.html" class="ps-btn ps-btn-primary ps-btn-sm">
          Book a Birthday Party
        </a>
      </div>
    </div>
  </section>

  <!-- 5. Step-by-Step Party Timeline -->
  <section class="ps-section ps-section-alt">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">HASSLE-FREE CELEBRATION</span>
        <h2 style="margin-top: 0.75rem;">How Your PlaySpace Birthday Works</h2>
        <p class="text-muted">
          Our trained party hosts manage the entire flow so you can focus on making memories and snapping photos.
        </p>
      </div>

      <div class="ps-grid ps-grid-4">
        <!-- Step 1 -->
        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); text-align: center; display: flex; flex-direction: column; align-items: center;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #FFCC00; color: #000000; font-weight: 900; font-size: 1.3rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
            1
          </div>
          <h4 style="margin-bottom: 0.5rem; text-align: center;">Arrival &amp; Sock-Up</h4>
          <span class="ps-badge ps-badge-dark" style="margin: 0 auto 0.75rem auto; align-self: center; display: inline-flex; justify-content: center; text-align: center;">15 Mins Prior</span>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); margin: 0; text-align: center;">
            Check in at the VIP Party Desk, verify digital waivers, receive grip socks, and store gifts in your private rolling party cart.
          </p>
        </div>

        <!-- Step 2 -->
        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); text-align: center; display: flex; flex-direction: column; align-items: center;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #FFCC00; color: #000000; font-weight: 900; font-size: 1.3rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
            2
          </div>
          <h4 style="margin-bottom: 0.5rem; text-align: center;">High-Fly Arena Jump</h4>
          <span class="ps-badge ps-badge-dark" style="margin: 0 auto 0.75rem auto; align-self: center; display: inline-flex; justify-content: center; text-align: center;">90–120 Mins Flight</span>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); margin: 0; text-align: center;">
            Jumpers explore the open arena, tackle ninja obstacles, leap into stunt airbags, and join organized dodgeball showdowns.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); text-align: center; display: flex; flex-direction: column; align-items: center;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #FFCC00; color: #000000; font-weight: 900; font-size: 1.3rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
            3
          </div>
          <h4 style="margin-bottom: 0.5rem; text-align: center;">Private Suite Feast</h4>
          <span class="ps-badge ps-badge-dark" style="margin: 0 auto 0.75rem auto; align-self: center; display: inline-flex; justify-content: center; text-align: center;">30–60 Mins Suite</span>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); margin: 0; text-align: center;">
            Gather in your decorated private suite for hot artisan pizza, ice-cold drinks, singing happy birthday, cake cutting, and gifts.
          </p>
        </div>

        <!-- Step 4 -->
        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); text-align: center; display: flex; flex-direction: column; align-items: center;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #FFCC00; color: #000000; font-weight: 900; font-size: 1.3rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
            4
          </div>
          <h4 style="margin-bottom: 0.5rem; text-align: center;">Zero-Cleanup Checkout</h4>
          <span class="ps-badge ps-badge-dark" style="margin: 0 auto 0.75rem auto; align-self: center; display: inline-flex; justify-content: center; text-align: center;">Departure</span>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); margin: 0; text-align: center;">
            Our crew packs leftover cake and gifts to your vehicle, hands out favor bags to guests, and takes care of 100% of the cleaning!
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. Frequently Asked Questions -->
  <section class="ps-section ps-section-white">
    <div class="ps-container" style="max-width: 860px;">
      <div class="ps-section-header text-center">
        <span class="badge-tag">HAVE QUESTIONS?</span>
        <h2 style="margin-top: 0.75rem;">Birthday Party FAQs</h2>
        <p class="text-muted">Common questions parents ask before booking their child's celebration.</p>
      </div>

      <div class="ps-accordion" data-behavior="single">
        <div class="ps-accordion-item active">
          <div class="ps-accordion-header">
            <span>Can I bring our own birthday cake and treats?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Yes, absolutely! Birthday cakes, cupcakes, and sealed ice cream treats are 100% welcomed for all reserved party bookings. We provide the cake knife, lighter/candles, plates, and our host cuts and serves it for you. We ask that all other outside food be coordinated through our Fuel Zone catering menu.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Do parents and chaperones need to purchase tickets?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Non-jumping adults, grandparents, and baby siblings in strollers are completely FREE to attend, watch, and celebrate in the party suites. Only children and adults actively jumping on trampolines and obstacle arenas count toward your package capacity.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>What if more or fewer children show up than originally booked?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            No worries! Extra jumpers beyond your package count are simply billed at the per-jumper rate ($22 for Basic, $24 for Premium, $25 for VIP) at checkout on party day. You will receive extra grip socks, drinks, and seating for all additional jumpers.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>When do I need to confirm pizza toppings and final guest count?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Our party concierge will reach out via email or phone 48 hours prior to your event to confirm pizza selections (Cheese, Pepperoni, Veggie, Gluten-free), approximate guest counts, and any desired add-ons like cupcake towers or character visits.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>What is your deposit and cancellation / rescheduling policy?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            A $100 non-refundable deposit is required at booking to lock in your date and private suite. If your plans change, you can reschedule your party date anytime up to 72 hours before the event with zero fee and your full deposit applied to the new date.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. Bottom Call to Action Banner -->
  <section class="ps-section ps-section-dark" style="background-color: #000000; color: #FFFFFF; border-top: 3px solid #FFCC00; border-bottom: 3px solid #FFCC00; text-align: center; padding: 4rem 1.5rem;">
    <div class="ps-container" style="max-width: 800px;">
      <span class="badge-tag" style="background: #FFCC00; color: #000000; margin-bottom: 1rem; display: inline-block;">READY TO CELEBRATE?</span>
      <h2 style="color: #FFFFFF; margin-bottom: 0.75rem; font-size: 2.25rem;">Book the Best Birthday Party Ever!</h2>
      <p style="color: rgba(255,255,255,0.8); margin-bottom: 2rem; font-size: 1.05rem;">
        Popular weekend party slots fill up 3–4 weeks in advance. Reserve your child's favorite timeslot and private celebration room online in under 2 minutes!
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="birthday-booking.html" class="ps-btn ps-btn-primary" style="font-size: 1.1rem; padding: 0.9rem 2rem;">
          Book a Birthday Party
        </a>
        <a href="birthday-details.html" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00; font-size: 1.1rem; padding: 0.9rem 1.75rem;">
          View VIP Glow Details
        </a>
      </div>
      <p style="color: rgba(255,255,255,0.6); margin-top: 1.5rem; font-size: 0.9rem;">
        Prefer to book over the phone? Call our party coordinators at <a href="tel:5558397530" style="color: #FFCC00; font-weight: 700;">(555) 839-7530</a>.
      </p>
    </div>
  </section>
  `,
  'parties'
);
fs.writeFileSync(path.join(PAGES_DIR, 'birthday-parties.html'), birthdayPartiesHtml, 'utf8');

// 6. birthday-details.html
const birthdayDetailsHtml = pageWrapper(
  'VIP Glow Party Experience',
  'Step into an electrifying neon wonderland at PlaySpace! Private VIP party room, glow-in-the-dark decorations, neon balloons, dedicated host, kids food package, VIP play session, and premium photo backdrop.',
  `
  <!-- 1. Hero Page Banner -->
  <section class="ps-page-banner">
    <div class="ps-container" style="text-align: center; display: flex; flex-direction: column; align-items: center;">
      <div class="ps-breadcrumb" style="justify-content: center;">
        <a href="../index.html">Home</a> <span class="sep">/</span> <a href="birthday-parties.html">Birthday Parties</a> <span class="sep">/</span> <span>VIP Glow Party</span>
      </div>
      <span class="ps-badge" style="background: #FFCC00; color: #000000; font-weight: 800; margin-bottom: 0.75rem; display: inline-block;">★ SIGNATURE VIP EXPERIENCE</span>
      <h1 style="color: #FFFFFF; margin: 0 0 0.5rem 0; text-align: center;">VIP Glow Birthday Party</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 0 auto 1.5rem auto; font-size: 1.1rem; max-width: 720px; text-align: center;">
        An electrifying blacklight celebration where trampolines radiate, lasers dance to live party beats, and your child takes center stage in our private neon party suite with white-glove host service!
      </p>

      <!-- Key Inclusions Ribbon -->
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.75rem; justify-content: center; align-items: center;">
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🚪 Exclusive VIP Party Room</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">✨ Glow-in-the-Dark Decor</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🎈 Neon Balloons &amp; Accessories</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🎯 Dedicated Party Host</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🍕 Kids' Food Package</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🚀 VIP Play Session</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">📸 Premium Photo Backdrop</span>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        <a href="birthday-booking.html?package=party-vip" class="ps-btn ps-btn-primary">Book VIP Glow Party</a>
        <a href="#vipGlowFeatures" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00;">Explore Inclusions ↓</a>
      </div>
    </div>
  </section>

  <!-- 2. The 7 Core VIP Glow Party Features -->
  <section class="ps-section ps-section-white" id="vipGlowFeatures">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">COMPLETE EXPERIENCE</span>
        <h2 style="margin-top: 0.75rem;">Everything Included in the VIP Glow Party</h2>
        <p class="text-muted">
          Engineered for energetic celebrations with high-tech blacklight visual magic, private luxury accommodations, and zero cleanup for parents.
        </p>
      </div>

      <div class="ps-grid ps-grid-3">
        <!-- Feature 1: Exclusive VIP Party Room -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🚪</div>
            <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">Exclusive VIP Party Room</h3>
            <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
              A private, climate-controlled celebration suite outfitted with high-output UV blacklights, synchronized surround sound, and a 55" display screen with custom birthday graphics.
            </p>
            <ul style="padding: 0; margin: 0; list-style: none; font-size: 0.85rem; color: var(--ps-text-main); display: flex; flex-direction: column; gap: 0.35rem;">
              <li>✔ Soundproof suite with adult lounge seating</li>
              <li>✔ High-definition digital room welcome screen</li>
              <li>✔ Fully private for your group for 60 minutes</li>
            </ul>
          </div>
        </div>

        <!-- Feature 2: Glow-in-the-Dark Decorations -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-icon-square" style="margin-bottom: 1.25rem;">✨</div>
            <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">Glow-in-the-Dark Decorations</h3>
            <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
              Electric ultraviolet blacklight decor transforms the suite into a radiant neon paradise with glowing table runners, UV-reactive plates, cups, napkins, and illuminated wall art.
            </p>
            <ul style="padding: 0; margin: 0; list-style: none; font-size: 0.85rem; color: var(--ps-text-main); display: flex; flex-direction: column; gap: 0.35rem;">
              <li>✔ Ultraviolet blacklight canopy lighting</li>
              <li>✔ Glow-reactive neon plates, cups &amp; cutlery</li>
              <li>✔ Illuminated celebratory birthday wall graphics</li>
            </ul>
          </div>
        </div>

        <!-- Feature 3: Neon Balloons and Party Accessories -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🎈</div>
            <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">Neon Balloons &amp; Accessories</h3>
            <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
              Every jumper receives glowing UV neon bracelets, necklaces, and flash accessories on arrival, paired with vibrant 3-tier neon balloon centerpieces and a custom Birthday Kid Neon T-Shirt!
            </p>
            <ul style="padding: 0; margin: 0; list-style: none; font-size: 0.85rem; color: var(--ps-text-main); display: flex; flex-direction: column; gap: 0.35rem;">
              <li>✔ Glowing neon wristbands &amp; necklaces for all</li>
              <li>✔ Floating neon balloon cluster centerpieces</li>
              <li>✔ Custom Birthday Kid Neon Celebration T-Shirt</li>
            </ul>
          </div>
        </div>

        <!-- Feature 4: Dedicated Party Host -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🎯</div>
            <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">Dedicated Party Host</h3>
            <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
              Your dedicated VIP concierge runs the entire party! From greeting guests at our VIP desk to organizing dodgeball tournaments, serving food, leading cake singalongs, and white-glove cleanup.
            </p>
            <ul style="padding: 0; margin: 0; list-style: none; font-size: 0.85rem; color: var(--ps-text-main); display: flex; flex-direction: column; gap: 0.35rem;">
              <li>✔ Personal check-in &amp; waiver verification host</li>
              <li>✔ Schedule and game facilitation throughout</li>
              <li>✔ 100% Zero-cleanup guarantee for parents</li>
            </ul>
          </div>
        </div>

        <!-- Feature 5: Special Kids' Food Package -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🍕</div>
            <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">Special Kids' Food Package</h3>
            <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
              A feast of 4 piping-hot extra-large 16" artisan pizzas (Cheese/Pepperoni), warm popcorn bowls, and unlimited fruit punch, apple juice, and soda, plus full cake cutting service.
            </p>
            <ul style="padding: 0; margin: 0; list-style: none; font-size: 0.85rem; color: var(--ps-text-main); display: flex; flex-direction: column; gap: 0.35rem;">
              <li>✔ 4 Fresh XL stone-baked 16" pizzas</li>
              <li>✔ Unlimited fruit punch, apple juice &amp; water</li>
              <li>✔ BYO birthday cake cutting and plating included</li>
            </ul>
          </div>
        </div>

        <!-- Feature 6: VIP Play Session -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🚀</div>
            <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">VIP Play Session</h3>
            <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
              90 minutes of high-energy arena flight across our interconnected trampolines, slam dunk lanes, dodgeball courts, and ninja warrior obstacles, plus certified safety grip socks for all!
            </p>
            <ul style="padding: 0; margin: 0; list-style: none; font-size: 0.85rem; color: var(--ps-text-main); display: flex; flex-direction: column; gap: 0.35rem;">
              <li>✔ 90 Mins open jump across all court zones</li>
              <li>✔ PlaySpace certified safety grip socks for all</li>
              <li>✔ 1 Free return jump pass for birthday child</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Feature 7: Premium Photo Backdrop (Featured Wide Card) -->
      <div class="ps-card" style="margin-top: 1.5rem; padding: 2.25rem; border: 2px solid #FFCC00; background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
        <div style="flex: 1; min-width: 280px;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
            <div class="ps-icon-square">📸</div>
            <div>
              <span class="ps-badge" style="background: #FFCC00; color: #000000; font-weight: 800; font-size: 0.75rem;">PHOTO READY</span>
              <h3 style="margin: 0.25rem 0 0 0; font-size: 1.35rem;">Premium Photo Backdrop</h3>
            </div>
          </div>
          <p style="color: var(--ps-text-muted); font-size: 0.95rem; margin: 0 0 0.75rem 0; line-height: 1.6;">
            Capture unforgettable birthday portraits in front of our illuminated neon photo wall! Complete with festive glow photo props, celebratory birthday throne seating, and custom frame cutouts for instant family keepsakes.
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.85rem; font-weight: 700; color: var(--ps-text-main);">
            <span>✔ Glowing neon selfie backdrop</span>
            <span>✔ Birthday throne seating</span>
            <span>✔ Glow prop kit included</span>
          </div>
        </div>
        <div>
          <a href="birthday-booking.html?package=party-vip" class="ps-btn ps-btn-primary" style="white-space: nowrap; font-size: 1.05rem; padding: 0.85rem 1.75rem;">
            Book VIP Glow Party
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Minute-by-Minute Timeline & Quick Reservation Card -->
  <section class="ps-section ps-section-alt">
    <div class="ps-container">
      <div class="ps-grid ps-grid-2">
        <!-- Schedule Timeline Column -->
        <div>
          <span class="badge-tag">SEAMLESS FLOW</span>
          <h2 style="margin-top: 0.75rem;">2.5-Hour VIP Party Timeline</h2>
          <p class="text-muted" style="margin-bottom: 1.75rem;">
            Here is how your party coordinator runs the celebration from arrival to final send-off:
          </p>

          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div style="border-left: 3px solid #FFCC00; padding-left: 1.25rem;">
              <strong style="display: block; font-size: 1rem; color: var(--ps-text-main);">0:00 – 0:15 | VIP Check-In &amp; Sock-Up</strong>
              <p style="font-size: 0.9rem; color: var(--ps-text-muted); margin: 4px 0 0 0;">
                Arrive 15 mins early at the dedicated VIP check-in desk. Waivers verified, grip socks distributed, glow necklaces and wristbands put on, and presents safely placed in your secure mobile cart.
              </p>
            </div>

            <div style="border-left: 3px solid #FFCC00; padding-left: 1.25rem;">
              <strong style="display: block; font-size: 1rem; color: var(--ps-text-main);">0:15 – 1:15 | High-Flying Arena Action</strong>
              <p style="font-size: 0.9rem; color: var(--ps-text-muted); margin: 4px 0 0 0;">
                60 minutes of freestyle trampoline bounce, slam dunk competitions, leap-into-airbag stunt flights, and private organized dodgeball games led by your host.
              </p>
            </div>

            <div style="border-left: 3px solid #FFCC00; padding-left: 1.25rem;">
              <strong style="display: block; font-size: 1rem; color: var(--ps-text-main);">1:15 – 1:45 | Ninja Course &amp; Obstacles</strong>
              <p style="font-size: 0.9rem; color: var(--ps-text-muted); margin: 4px 0 0 0;">
                30 minutes of parkour obstacle challenges, cargo net crawls, and warped wall climbs with timed buzzer runs.
              </p>
            </div>

            <div style="border-left: 3px solid #FFCC00; padding-left: 1.25rem;">
              <strong style="display: block; font-size: 1rem; color: var(--ps-text-main);">1:45 – 2:30 | VIP Suite Pizza, Cake &amp; Photos</strong>
              <p style="font-size: 0.9rem; color: var(--ps-text-muted); margin: 4px 0 0 0;">
                Transition to your private glow suite. Hot artisan pizza served, ice-cold drinks poured, singing Happy Birthday, ceremonial cake cutting, gift opening, and backdrop photo shoots.
              </p>
            </div>

            <div style="border-left: 3px solid #FFFFFF; padding-left: 1.25rem;">
              <strong style="display: block; font-size: 1rem; color: var(--ps-text-main);">2:30 | White-Glove Departure &amp; Zero Cleanup</strong>
              <p style="font-size: 0.9rem; color: var(--ps-text-muted); margin: 4px 0 0 0;">
                Your host packs up leftover cake and gifts directly into your cart, helps distribute party favors, and handles 100% of the room cleaning!
              </p>
            </div>
          </div>
        </div>

        <!-- Booking Card Column -->
        <div>
          <div class="ps-card" style="background-color: #000000; color: #FFFFFF; border: 2px solid #FFCC00; padding: 2.5rem; border-radius: var(--ps-radius-xl); display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span class="ps-badge" style="background: #FFCC00; color: #000000; font-weight: 800;">VIP ALL-INCLUSIVE</span>
                <span style="font-size: 0.85rem; color: #FFCC00; font-weight: 700;">★ Highest Parent Rating</span>
              </div>

              <h3 style="color: #FFFFFF; margin: 0 0 0.5rem 0; font-size: 1.85rem;">VIP Glow Celebration</h3>
              <p style="color: rgba(255,255,255,0.75); font-size: 0.95rem; margin-bottom: 1.5rem;">
                All 7 VIP features bundled into one seamless, unforgettable birthday experience.
              </p>

              <div style="font-size: 3rem; font-weight: 900; color: #FFCC00; line-height: 1;">
                $449
              </div>
              <div style="color: #FFFFFF; font-weight: 700; margin-top: 0.5rem; margin-bottom: 0.25rem;">
                Includes Up to 15 Jumpers (Birthday Star + 14 Friends)
              </div>
              <div style="color: rgba(255,255,255,0.65); font-size: 0.85rem; margin-bottom: 1.75rem;">
                +$24 per extra jumper • Non-jumping adult chaperones FREE
              </div>

              <ul style="display: flex; flex-direction: column; gap: 0.75rem; padding: 0; margin: 0; list-style: none; font-size: 0.92rem; color: #FFFFFF;">
                <li style="display: flex; gap: 0.5rem;"><span style="color: #FFCC00;">✔</span> 60 Mins in Private VIP Glow Suite</li>
                <li style="display: flex; gap: 0.5rem;"><span style="color: #FFCC00;">✔</span> Complete Glow-in-the-Dark Decor &amp; UV Blacklights</li>
                <li style="display: flex; gap: 0.5rem;"><span style="color: #FFCC00;">✔</span> Neon Balloons, Glow Necklaces &amp; Bracelets for All</li>
                <li style="display: flex; gap: 0.5rem;"><span style="color: #FFCC00;">✔</span> Dedicated Full-Service Party Host &amp; Coordinator</li>
                <li style="display: flex; gap: 0.5rem;"><span style="color: #FFCC00;">✔</span> 4 Fresh 16" Pizzas + Popcorn + Unlimited Drinks</li>
                <li style="display: flex; gap: 0.5rem;"><span style="color: #FFCC00;">✔</span> 90 Mins VIP Play Session across all jump courts</li>
                <li style="display: flex; gap: 0.5rem;"><span style="color: #FFCC00;">✔</span> Premium Photo Backdrop with Birthday Throne</li>
                <li style="display: flex; gap: 0.5rem;"><span style="color: #FFCC00;">✔</span> Custom Birthday Kid Neon Party T-Shirt</li>
                <li style="display: flex; gap: 0.5rem;"><span style="color: #FFCC00;">✔</span> 1 Free 60-Minute Return Jump Pass</li>
              </ul>
            </div>

            <div style="margin-top: 2rem;">
              <a href="birthday-booking.html?package=party-vip" class="ps-btn ps-btn-primary ps-btn-block" style="font-size: 1.1rem; padding: 0.9rem;">
                Book VIP Glow Party
              </a>
              <div style="text-align: center; margin-top: 0.75rem; font-size: 0.82rem; color: rgba(255,255,255,0.6);">
                🔒 Instant reservation • $100 refundable deposit to hold suite
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Real Glow Party Gallery Highlights -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">NEON GALLERY</span>
        <h2 style="margin-top: 0.75rem;">Real VIP Glow Celebrations</h2>
        <p class="text-muted">Take a peek at what our blacklight celebration rooms look like in action.</p>
      </div>

      <div class="ps-grid ps-grid-4">
        <div class="ps-card" style="padding: 0; overflow: hidden; border: 2px solid var(--ps-border-color); border-radius: var(--ps-radius-lg);">
          <img src="../assets/images/birthdays/vip-party-suite-setup.jpg" alt="VIP Party Suite Setup at PlaySpace" style="width: 100%; height: 200px; object-fit: cover; display: block;">
          <div style="padding: 1rem;">
            <h5 style="margin: 0 0 0.25rem 0;">VIP Party Suite Setup</h5>
            <span class="text-muted" style="font-size: 0.8rem;">Glow tableware &amp; balloon decor</span>
          </div>
        </div>

        <div class="ps-card" style="padding: 0; overflow: hidden; border: 2px solid var(--ps-border-color); border-radius: var(--ps-radius-lg);">
          <img src="../assets/images/birthdays/blacklight-arena-jump.jpg" alt="Kids Blacklight Arena Jump at PlaySpace" style="width: 100%; height: 200px; object-fit: cover; display: block;">
          <div style="padding: 1rem;">
            <h5 style="margin: 0 0 0.25rem 0;">Blacklight Arena Jump</h5>
            <span class="text-muted" style="font-size: 0.8rem;">Ultraviolet glow &amp; laser beats</span>
          </div>
        </div>

        <div class="ps-card" style="padding: 0; overflow: hidden; border: 2px solid var(--ps-border-color); border-radius: var(--ps-radius-lg);">
          <img src="../assets/images/birthdays/fresh-pizza-feast.jpg" alt="Fresh Artisan Pizza Feast Birthday Catering" style="width: 100%; height: 200px; object-fit: cover; display: block;">
          <div style="padding: 1rem;">
            <h5 style="margin: 0 0 0.25rem 0;">Fresh Pizza Feast</h5>
            <span class="text-muted" style="font-size: 0.8rem;">Kids catering &amp; cake cutting</span>
          </div>
        </div>

        <div class="ps-card" style="padding: 0; overflow: hidden; border: 2px solid var(--ps-border-color); border-radius: var(--ps-radius-lg);">
          <img src="../assets/images/birthdays/deluxe-photo-wall.jpg" alt="Deluxe Birthday Photo Wall with Throne" style="width: 100%; height: 200px; object-fit: cover; display: block;">
          <div style="padding: 1rem;">
            <h5 style="margin: 0 0 0.25rem 0;">Deluxe Photo Wall</h5>
            <span class="text-muted" style="font-size: 0.8rem;">Backdrop &amp; birthday throne</span>
          </div>
        </div>
      </div>

      <div class="text-center" style="margin-top: 2rem;">
        <a href="gallery.html" class="ps-btn ps-btn-dark ps-btn-sm">
          Browse All 18 Gallery Photos ↗
        </a>
      </div>
    </div>
  </section>

  <!-- 5. Frequently Asked Questions -->
  <section class="ps-section ps-section-alt">
    <div class="ps-container" style="max-width: 860px;">
      <div class="ps-section-header text-center">
        <span class="badge-tag">GLOW PARTY TIPS</span>
        <h2 style="margin-top: 0.75rem;">VIP Glow Party FAQs</h2>
        <p class="text-muted">Helpful answers for planning your blacklight birthday celebration.</p>
      </div>

      <div class="ps-accordion" data-behavior="single">
        <div class="ps-accordion-item active">
          <div class="ps-accordion-header">
            <span>What clothing should kids wear for the blacklight glow party?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            White, neon green, bright pink, and fluorescent yellow clothing shine brightest under our ultraviolet blacklights! Every jumper also receives glowing UV neon necklaces and bracelets from us to wear during the party.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Can we bring our own birthday cake or cupcakes?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Yes, absolutely! Birthday cakes, cupcakes, and ice cream treats are 100% permitted. We provide the cake cutter, lighter, celebration plates, and forks, and your party host takes care of slicing and serving.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>What if we have more than 15 jumpers?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Additional jumpers can easily be added for $24 each! Extra jumpers receive certified grip socks, glow accessories, extra pizza slices, and drinks. Our spacious VIP suites comfortably hold up to 25 children.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Do adult family members and chaperones need to pay?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            No! Non-jumping parents, grandparents, and guests are completely FREE to attend, relax in the suite lounge, take photos, and celebrate.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. Bottom Call to Action Section -->
  <section class="ps-section ps-section-dark" style="background-color: #000000; color: #FFFFFF; border-top: 3px solid #FFCC00; border-bottom: 3px solid #FFCC00; text-align: center; padding: 4rem 1.5rem;">
    <div class="ps-container" style="max-width: 800px;">
      <span class="badge-tag" style="background: #FFCC00; color: #000000; margin-bottom: 1rem; display: inline-block;">LOCK IN YOUR DATE</span>
      <h2 style="color: #FFFFFF; margin-bottom: 0.75rem; font-size: 2.25rem;">Ready to Book the VIP Glow Party?</h2>
      <p style="color: rgba(255,255,255,0.8); margin-bottom: 2rem; font-size: 1.05rem;">
        Weekend neon suite slots fill up weeks in advance. Select your preferred date and reserve online in under 2 minutes!
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="birthday-booking.html?package=party-vip" class="ps-btn ps-btn-primary" style="font-size: 1.1rem; padding: 0.9rem 2rem;">
          Book VIP Glow Party
        </a>
        <a href="birthday-parties.html" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00; font-size: 1.1rem; padding: 0.9rem 1.75rem;">
          Compare All Party Packages
        </a>
      </div>
      <p style="color: rgba(255,255,255,0.6); margin-top: 1.5rem; font-size: 0.9rem;">
        Need custom arrangements? Call our VIP party desk directly at <a href="tel:5558397530" style="color: #FFCC00; font-weight: 700;">(555) 839-7530</a>.
      </p>
    </div>
  </section>
  `,
  'parties'
);
fs.writeFileSync(path.join(PAGES_DIR, 'birthday-details.html'), birthdayDetailsHtml, 'utf8');

// 7. group-events.html
const groupEventsHtml = pageWrapper(
  'Group Events & Field Trips',
  'School field trips, daycare visits, team-building, birthday celebrations, trampoline adventures, and flexible group booking packages at PlaySpace.',
  `
  <!-- 1. Hero Page Banner -->
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>Group Events &amp; Field Trips</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0 0 1rem 0;">Group Events &amp; Educational Field Trips</h1>
      <p style="color: rgba(255, 255, 255, 0.85); font-size: 1.15rem; max-width: 820px; line-height: 1.6; margin-bottom: 1.5rem;">
        Action-packed, turnkey outings for schools, daycares, sports teams, youth groups, and corporate team-building events. Over 25,000 sq ft of interconnected trampolines, obstacle courses, and soft play adventures for groups of 15 to 300+ guests.
      </p>

      <!-- Feature Pills -->
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🎓 School Field Trips</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🧸 Daycare &amp; Preschool</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🎉 Birthday &amp; Group Parties</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🤝 Team-Building</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🚀 Trampoline &amp; Soft Play</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🏆 Games &amp; Challenges</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">🍕 Food &amp; Refreshments</span>
        <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">⚡ Flexible Booking</span>
      </div>

      <!-- CTA Buttons in Hero -->
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="#plan-visit" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00;">Plan Your Visit</a>
        <a href="booking.html?session=group&title=Group+Event+Booking" class="ps-btn ps-btn-primary">Book a Group Event</a>
        <a href="#request-quote" class="ps-btn ps-btn-dark" style="border: 1px solid #FFCC00; color: #FFFFFF;">Request a Quote</a>
      </div>
    </div>
  </section>

  <!-- 2. Who We Welcome: 4 Specialized Outing Programs -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">TAILORED FOR EVERY GATHERING</span>
        <h2 style="margin-top: 0.75rem;">Specialized Group Experiences</h2>
        <p class="text-muted">
          From curriculum-aligned physics field trips to calm toddler sensory mornings and energetic corporate team challenges.
        </p>
      </div>

      <div class="ps-grid ps-grid-2" style="gap: 1.75rem;">
        <!-- Program 1: School & Educational Field Trips -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <div class="ps-icon-square">🎓</div>
              <span class="ps-badge" style="background: #000000; color: #FFCC00; font-weight: 800; border: 1px solid #FFCC00;">K-12 &amp; STEM APPROVED</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.75rem;">School &amp; Educational Field Trips</h3>
            <p style="color: var(--ps-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">
              Transform physical education and science into an unforgettable tactile adventure. Students explore the principles of gravity, kinetic energy, rebound velocity, and parabolic arcs while burning energy in an ultra-safe environment.
            </p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; color: var(--ps-text-main);">
              <li>✔ STEM physics worksheets &amp; kinetic motion guides included</li>
              <li>✔ Structured PE obstacle challenges &amp; cardiovascular warmups</li>
              <li>✔ 1 Free Chaperone/Teacher per 8 students + Chaperone Lounge</li>
              <li>✔ School District Purchase Orders (PO) &amp; tax-exempt invoices accepted</li>
              <li>✔ Free bus parking &amp; express curbside group drop-off loop</li>
            </ul>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="#request-quote" class="ps-btn ps-btn-dark ps-btn-sm">Request School Quote</a>
            <a href="#plan-visit" class="ps-btn ps-btn-outline ps-btn-sm" style="border-color: var(--ps-border-color); color: var(--ps-text-main);">Field Trip Checklist ↓</a>
          </div>
        </div>

        <!-- Program 2: Daycare & Preschool Group Visits -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <div class="ps-icon-square">🧸</div>
              <span class="ps-badge" style="background: #000000; color: #FFCC00; font-weight: 800; border: 1px solid #FFCC00;">AGES 0–6 SPECIALIZED</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.75rem;">Daycare &amp; Preschool Group Visits</h3>
            <p style="color: var(--ps-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">
              Engineered specifically for little jumpers aged 6 and under. Our weekday morning quiet sessions provide a tranquil, fully padded haven where early learners develop motor skills, balance, and spatial awareness away from older jumpers.
            </p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; color: var(--ps-text-main);">
              <li>✔ Exclusive access to our gated Toddler Soft Play &amp; Ball Pit Zone</li>
              <li>✔ Low-impact foam pit sensory exploration &amp; mini crawl slides</li>
              <li>✔ High 1:4 teacher-to-child supervision wristband system</li>
              <li>✔ Sanitized vinyl surfaces cleaned with hospital-grade botanicals</li>
              <li>✔ Dedicated shoe cubby area &amp; stroller parking station</li>
            </ul>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="#request-quote" class="ps-btn ps-btn-dark ps-btn-sm">Request Daycare Quote</a>
            <a href="#plan-visit" class="ps-btn ps-btn-outline ps-btn-sm" style="border-color: var(--ps-border-color); color: var(--ps-text-main);">Preschool Guidelines ↓</a>
          </div>
        </div>

        <!-- Program 3: Birthday & Group Celebrations -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <div class="ps-icon-square">🎉</div>
              <span class="ps-badge" style="background: #000000; color: #FFCC00; font-weight: 800; border: 1px solid #FFCC00;">TEAMS &amp; REUNIONS</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.75rem;">Birthday &amp; Group Celebrations</h3>
            <p style="color: var(--ps-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">
              Celebrate milestones in high-flying fashion! Ideal for youth athletic leagues (soccer, baseball, basketball banquets), scout badge ceremonies, homeschool cohorts, summer camp graduation parties, and multi-family reunions.
            </p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; color: var(--ps-text-main);">
              <li>✔ Reserved group banquet tables with custom table signage</li>
              <li>✔ Facility-wide PA loudspeaker shoutouts &amp; coach presentation podium</li>
              <li>✔ Flexible catering packages featuring fresh artisan pizza &amp; drinks</li>
              <li>✔ Option to book multi-room adjoining celebration suites</li>
              <li>✔ Free jump pass for the team MVP or guest of honor</li>
            </ul>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="booking.html?session=group&title=Group+Celebration+Booking" class="ps-btn ps-btn-primary ps-btn-sm">Book Group Celebration</a>
            <a href="birthday-parties.html" class="ps-btn ps-btn-outline ps-btn-sm" style="border-color: var(--ps-border-color); color: var(--ps-text-main);">Birthday Packages</a>
          </div>
        </div>

        <!-- Program 4: Team-Building Activities -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <div class="ps-icon-square">🤝</div>
              <span class="ps-badge" style="background: #000000; color: #FFCC00; font-weight: 800; border: 1px solid #FFCC00;">YOUTH &amp; CORPORATE</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.75rem;">Team-Building Activities</h3>
            <p style="color: var(--ps-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">
              Inject serious energy into team bonding! Ditch dull conference rooms for structured dodgeball tournaments, ninja warrior time-trial relays, and cooperative obstacle challenges that foster trust, communication, and camaraderie.
            </p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; color: var(--ps-text-main);">
              <li>✔ Refereed dodgeball brackets with official bracket boards</li>
              <li>✔ Ninja Warrior relay courses emphasizing problem-solving &amp; agility</li>
              <li>✔ Gladiator beam balance challenges over massive foam pits</li>
              <li>✔ Private executive meeting lounge with 65" AV screen &amp; Wi-Fi</li>
              <li>✔ Custom team hydration stations &amp; catered lunch spreads</li>
            </ul>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="#request-quote" class="ps-btn ps-btn-dark ps-btn-sm">Request Team Quote</a>
            <a href="booking.html?session=group&title=Team+Building+Event" class="ps-btn ps-btn-primary ps-btn-sm">Book a Group Event</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Trampoline & Soft Play Adventures -->
  <section class="ps-section ps-section-alt">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">FACILITY ATTRACTIONS</span>
        <h2 style="margin-top: 0.75rem;">Trampoline &amp; Soft Play Adventures</h2>
        <p class="text-muted">
          Over 25,000 square feet of world-class play courts, engineered to ASTM F2970 safety standards.
        </p>
      </div>

      <div class="ps-grid ps-grid-3">
        <!-- Attraction 1 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🚀</div>
          <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Wall-to-Wall Trampoline Arena</h4>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
            50+ interconnected jump beds, tumbling runways, and angled rebound walls for non-stop aerial freedom and group routines.
          </p>
          <span style="font-size: 0.82rem; font-weight: 700; color: #000; background: #FFCC00; padding: 0.2rem 0.6rem; border-radius: 4px;">ALL AGES</span>
        </div>

        <!-- Attraction 2 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🏰</div>
          <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Multi-Tier Soft Play Jungle</h4>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
            3-story padded adventure labyrinth with spiral slides, rope climbing bridges, crawl tunnels, and interactive sensory ball pools.
          </p>
          <span style="font-size: 0.82rem; font-weight: 700; color: #000; background: #FFCC00; padding: 0.2rem 0.6rem; border-radius: 4px;">AGES 0–10</span>
        </div>

        <!-- Attraction 3 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">☁️</div>
          <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Airbag &amp; Foam Pit Stunt Arena</h4>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
            High-flying launch towers that allow jumpers to practice flips, leaps, and acrobatic jumps into zero-impact air-cushioned landings.
          </p>
          <span style="font-size: 0.82rem; font-weight: 700; color: #000; background: #FFCC00; padding: 0.2rem 0.6rem; border-radius: 4px;">STUNT JUMPERS</span>
        </div>

        <!-- Attraction 4 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🏀</div>
          <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Slam Dunk Trampoline Lanes</h4>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
            Regulation and junior height basketball rims positioned above runway spring beds so jumpers can soar for high-flying dunks.
          </p>
          <span style="font-size: 0.82rem; font-weight: 700; color: #000; background: #FFCC00; padding: 0.2rem 0.6rem; border-radius: 4px;">SKILLS &amp; DUNKS</span>
        </div>

        <!-- Attraction 5 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">⚡</div>
          <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Ninja Warrior &amp; Parkour Course</h4>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
            Test speed, grip, and grit across quintuple steps, ring swings, balance beams, cargo net traverses, and the iconic warped wall.
          </p>
          <span style="font-size: 0.82rem; font-weight: 700; color: #000; background: #FFCC00; padding: 0.2rem 0.6rem; border-radius: 4px;">AGILITY &amp; GRIT</span>
        </div>

        <!-- Attraction 6 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🎮</div>
          <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Interactive ValoJump &amp; Arcade</h4>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0 0 1rem 0;">
            Augmented reality cameras track jumpers live inside interactive video game quests, accompanied by our family arcade pavilion.
          </p>
          <span style="font-size: 0.82rem; font-weight: 700; color: #000; background: #FFCC00; padding: 0.2rem 0.6rem; border-radius: 4px;">INTERACTIVE TECH</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Group Games & Fun Challenges -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-grid ps-grid-2 ps-items-center" style="gap: 2.5rem;">
        <div>
          <span class="badge-tag">FACILITATED BY PLAY HOSTS</span>
          <h2 style="margin-top: 0.75rem;">Group Games &amp; Fun Challenges</h2>
          <p class="text-muted" style="margin-bottom: 1.5rem; line-height: 1.6;">
            Never worry about how to manage your group! Our energetic, CPR-certified play directors coordinate structured group challenges, keeping jumpers focused, enthusiastic, and working cooperatively.
          </p>

          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div style="border-left: 3px solid #FFCC00; padding-left: 1.25rem;">
              <strong style="display: block; font-size: 1.05rem; color: var(--ps-text-main);">🔥 Neon Glow Dodgeball Tournaments</strong>
              <p style="font-size: 0.9rem; color: var(--ps-text-muted); margin: 0.25rem 0 0 0;">
                Bracketed double-elimination tournaments on enclosed trampoline courts with soft-impact foam balls, team headbands, and refereed rules.
              </p>
            </div>

            <div style="border-left: 3px solid #FFCC00; padding-left: 1.25rem;">
              <strong style="display: block; font-size: 1.05rem; color: var(--ps-text-main);">⏱️ Ninja Warrior Timed Relay Races</strong>
              <p style="font-size: 0.9rem; color: var(--ps-text-muted); margin: 0.25rem 0 0 0;">
                Squads test agility, relay batons, and solve obstacle puzzle sequences, cheering on classmates as they hit the digital buzzer.
              </p>
            </div>

            <div style="border-left: 3px solid #FFCC00; padding-left: 1.25rem;">
              <strong style="display: block; font-size: 1.05rem; color: var(--ps-text-main);">🎵 Arena Freeze Bounce &amp; Simon Says</strong>
              <p style="font-size: 0.9rem; color: var(--ps-text-muted); margin: 0.25rem 0 0 0;">
                High-energy microphone games with rhythmic soundtrack pauses that challenge balance, reaction time, and body awareness.
              </p>
            </div>

            <div style="border-left: 3px solid #FFCC00; padding-left: 1.25rem;">
              <strong style="display: block; font-size: 1.05rem; color: var(--ps-text-main);">🌋 "The Floor is Lava" Foam Pit Rescue</strong>
              <p style="font-size: 0.9rem; color: var(--ps-text-muted); margin: 0.25rem 0 0 0;">
                Cooperative team puzzle where children work together to bridge foam pit chasms using soft blocks without touching the pit floor.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div class="ps-card" style="padding: 2.25rem; border: 2px solid #FFCC00; background: var(--ps-bg-card); border-radius: var(--ps-radius-xl);">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
              <div class="ps-icon-square">🏅</div>
              <div>
                <h4 style="margin: 0; font-size: 1.2rem;">High-Flyer Participation Ribbons</h4>
                <span style="font-size: 0.85rem; color: var(--ps-text-muted);">Ceremony included with every booking</span>
              </div>
            </div>
            <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin-bottom: 1.5rem;">
              Every young participant receives a collectible PlaySpace High-Flyer ribbon at the end of their event, with special MVP badges awarded for sportsmanship and teamwork.
            </p>
            <div style="background: rgba(255, 204, 0, 0.1); border: 1px dashed #FFCC00; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
              <strong style="display: block; font-size: 0.95rem; color: var(--ps-text-main); margin-bottom: 0.25rem;">Chaperone Guarantee:</strong>
              <span style="font-size: 0.88rem; color: var(--ps-text-muted);">
                Our hosts lead 100% of the game schedule so teachers and chaperones can observe safely from our comfortable elevated mezzanine.
              </span>
            </div>
            <a href="#plan-visit" class="ps-btn ps-btn-dark ps-btn-block">Plan Your Visit Checklist</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Food & Refreshment Packages -->
  <section class="ps-section ps-section-alt">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">CATERING &amp; REFUELING</span>
        <h2 style="margin-top: 0.75rem;">Food &amp; Refreshment Packages</h2>
        <p class="text-muted">
          Satisfy hungry jumpers with warm, crowd-pleasing meals served right at your reserved group tables.
        </p>
      </div>

      <div class="ps-grid ps-grid-3">
        <!-- Meal 1: Pizza Feast -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span class="ps-icon-square">🍕</span>
              <span class="ps-badge" style="background: #000; color: #FFCC00; font-weight: 800;">$8.00 / GUEST</span>
            </div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">The Pizza Feast</h3>
            <p style="font-size: 0.9rem; color: var(--ps-text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
              Freshly stone-baked artisan 16" pizzas prepared on-site, served hot with crisp popcorn and continuous beverages.
            </p>
            <ul style="padding: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.88rem; color: var(--ps-text-main);">
              <li>✔ 2 Large slices of Cheese or Pepperoni pizza</li>
              <li>✔ Warm, freshly popped buttered popcorn bowl</li>
              <li>✔ Unlimited fruit punch, apple juice &amp; ice water</li>
              <li>✔ Heavy-duty plates, cups &amp; napkins provided</li>
            </ul>
          </div>
        </div>

        <!-- Meal 2: Healthy Fuel Box -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span class="ps-icon-square">🥗</span>
              <span class="ps-badge" style="background: #000; color: #FFCC00; font-weight: 800;">$10.00 / GUEST</span>
            </div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Healthy Fuel Box</h3>
            <p style="font-size: 0.9rem; color: var(--ps-text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
              A balanced, energizing grab-and-go meal box packed with nutritious essentials loved by educators and parents.
            </p>
            <ul style="padding: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.88rem; color: var(--ps-text-main);">
              <li>✔ Oven-roasted turkey &amp; cheddar or veggie wrap</li>
              <li>✔ Crisp whole red apple or organic fruit pouch</li>
              <li>✔ Baked multi-grain crisps &amp; honey oat granola bar</li>
              <li>✔ Chilled 100% pure spring water bottle</li>
            </ul>
          </div>
        </div>

        <!-- Meal 3: Ultimate Celebration -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span class="ps-icon-square">🍦</span>
              <span class="ps-badge" style="background: #000; color: #FFCC00; font-weight: 800;">$13.00 / GUEST</span>
            </div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Ultimate Celebration</h3>
            <p style="font-size: 0.9rem; color: var(--ps-text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
              The all-star banquet package with warm snacks, dessert treats, and a commemorative PlaySpace souvenir cup!
            </p>
            <ul style="padding: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.88rem; color: var(--ps-text-main);">
              <li>✔ 2 Slices of artisan pizza + warm soft pretzel bites</li>
              <li>✔ Ice cream sundae cup or frozen fruit slushie</li>
              <li>✔ PlaySpace souvenir sports bottle with free drink refills</li>
              <li>✔ Free gift voucher for the group leader / organizer</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Chaperone Coffee Bar & Dietary Banner -->
      <div class="ps-card" style="margin-top: 1.75rem; padding: 1.75rem; border: 2px solid var(--ps-border-color); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div class="ps-icon-square">☕</div>
          <div>
            <strong style="display: block; font-size: 1.05rem; color: var(--ps-text-main);">Complimentary Chaperone &amp; Driver Coffee Bar</strong>
            <span style="font-size: 0.9rem; color: var(--ps-text-muted);">
              All teachers, chaperones, and bus drivers enjoy free hot Colombian coffee, herbal teas, and ice water in our private mezzanine lounge.
            </span>
          </div>
        </div>
        <div>
          <span class="ps-badge" style="background: #FFCC00; color: #000000; font-weight: 800; padding: 0.5rem 1rem;">NUT-FREE FACILITY POLICY</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. Flexible Group Booking Options & Tiers -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">VOLUME DISCOUNT RATES</span>
        <h2 style="margin-top: 0.75rem;">Flexible Group Booking Options</h2>
        <p class="text-muted">
          Transparent, volume-discounted rates scaled to your group size. No surprise fees.
        </p>
      </div>

      <div class="ps-grid ps-grid-4">
        <!-- Tier 1 -->
        <div class="ps-pricing-card" style="padding: 2rem 1.5rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--ps-text-muted); text-transform: uppercase;">Small Groups</div>
            <h3 style="font-size: 1.2rem; margin: 0.35rem 0;">15 – 30 Jumpers</h3>
            <div style="font-size: 2.2rem; font-weight: 900; margin: 1rem 0; color: var(--ps-text-main);">$15 <span style="font-size: 0.85rem; font-weight: 600; color: var(--ps-text-muted);">/ jumper</span></div>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin-bottom: 1.25rem;">15% Off standard admission for small clubs &amp; troops.</p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.4rem; color: var(--ps-text-main);">
              <li>✔ 90 Mins open jump &amp; soft play</li>
              <li>✔ PlaySpace grip socks included</li>
              <li>✔ Reserved seating table cluster</li>
              <li>✔ 2 Free adult chaperones</li>
            </ul>
          </div>
          <a href="booking.html?session=group&title=Group+15-30+Jumpers&price=15&duration=90" class="ps-btn ps-btn-dark ps-btn-block">Book 15–30 Jumpers</a>
        </div>

        <!-- Tier 2 (Highlighted) -->
        <div class="ps-pricing-card featured" style="padding: 2.25rem 1.5rem; border: 2px solid #FFCC00; background: #000000; color: #FFFFFF; display: flex; flex-direction: column; justify-content: space-between; transform: scale(1.02); position: relative; overflow: visible;">
          <div>
            <div style="font-size: 0.85rem; font-weight: 800; color: #FFCC00; text-transform: uppercase;">Medium Groups</div>
            <h3 style="font-size: 1.2rem; margin: 0.35rem 0; color: #FFFFFF;">31 – 75 Jumpers</h3>
            <div style="font-size: 2.2rem; font-weight: 900; margin: 1rem 0; color: #FFCC00;">$13.50 <span style="font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.75);">/ jumper</span></div>
            <p style="font-size: 0.85rem; color: rgba(255,255,255,0.8); margin-bottom: 1.25rem;">25% Off admission for daycare classes &amp; youth teams.</p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.4rem; color: #FFFFFF;">
              <li><span style="color: #FFCC00;">✔</span> 90 Mins open jump &amp; soft play</li>
              <li><span style="color: #FFCC00;">✔</span> PlaySpace grip socks included</li>
              <li><span style="color: #FFCC00;">✔</span> <strong style="color: #FFFFFF;">1 Private Party Room included</strong></li>
              <li><span style="color: #FFCC00;">✔</span> 1 Dedicated Event Play Host</li>
              <li><span style="color: #FFCC00;">✔</span> 1 Free Chaperone per 8 kids</li>
            </ul>
          </div>
          <a href="booking.html?session=group&title=Group+31-75+Jumpers&price=13.50&duration=90" class="ps-btn ps-btn-primary ps-btn-block">Book 31–75 Jumpers</a>
        </div>

        <!-- Tier 3 -->
        <div class="ps-pricing-card" style="padding: 2rem 1.5rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--ps-text-muted); text-transform: uppercase;">Large Groups &amp; Camps</div>
            <h3 style="font-size: 1.2rem; margin: 0.35rem 0;">76 – 150 Jumpers</h3>
            <div style="font-size: 2.2rem; font-weight: 900; margin: 1rem 0; color: var(--ps-text-main);">$11.50 <span style="font-size: 0.85rem; font-weight: 600; color: var(--ps-text-muted);">/ jumper</span></div>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin-bottom: 1.25rem;">35% Off admission for school grades &amp; summer camps.</p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.4rem; color: var(--ps-text-main);">
              <li>✔ <strong>2 Full Hours</strong> park access</li>
              <li>✔ PlaySpace grip socks included</li>
              <li>✔ <strong>2 Private Party Rooms</strong></li>
              <li>✔ 2 Dedicated Event Play Hosts</li>
              <li>✔ Sound system group announcements</li>
            </ul>
          </div>
          <a href="#request-quote" class="ps-btn ps-btn-dark ps-btn-block">Request Large Quote</a>
        </div>

        <!-- Tier 4: Buyout -->
        <div class="ps-pricing-card" id="buyout" style="padding: 2rem 1.5rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--ps-text-muted); text-transform: uppercase;">Private Buyout</div>
            <h3 style="font-size: 1.2rem; margin: 0.35rem 0;">Up to 300 Jumpers</h3>
            <div style="font-size: 1.9rem; font-weight: 900; margin: 1rem 0; color: var(--ps-text-main);">Custom Flat <span style="font-size: 0.85rem; font-weight: 600; color: var(--ps-text-muted);">Rate</span></div>
            <p style="font-size: 0.85rem; color: var(--ps-text-muted); margin-bottom: 1.25rem;">100% exclusive private park rental for entire schools &amp; firms.</p>
            <ul style="padding: 0; margin: 0 0 1.5rem 0; list-style: none; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.4rem; color: var(--ps-text-main);">
              <li>✔ 2 to 4 Hours 100% Private Closure</li>
              <li>✔ All trampolines, soft play &amp; ninja zones</li>
              <li>✔ Full audio &amp; LED lighting control</li>
              <li>✔ Outside catering permitted</li>
              <li>✔ Dedicated management &amp; safety patrol</li>
            </ul>
          </div>
          <a href="#request-quote" class="ps-btn ps-btn-dark ps-btn-block">Inquire Buyout</a>
        </div>
      </div>

      <!-- Booking Flexibility Perks -->
      <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
        <div style="background: var(--ps-bg-card); border: 1px solid var(--ps-border-color); padding: 1.25rem; border-radius: 8px;">
          <strong style="color: var(--ps-text-main); display: block; font-size: 0.95rem;">📅 Free Rescheduling</strong>
          <span style="font-size: 0.85rem; color: var(--ps-text-muted);">Change your event date up to 7 calendar days before with zero penalty.</span>
        </div>
        <div style="background: var(--ps-bg-card); border: 1px solid var(--ps-border-color); padding: 1.25rem; border-radius: 8px;">
          <strong style="color: var(--ps-text-main); display: block; font-size: 0.95rem;">📑 Net-30 PO Billing</strong>
          <span style="font-size: 0.85rem; color: var(--ps-text-muted);">Public school districts and accredited nonprofits can reserve with approved POs.</span>
        </div>
        <div style="background: var(--ps-bg-card); border: 1px solid var(--ps-border-color); padding: 1.25rem; border-radius: 8px;">
          <strong style="color: var(--ps-text-main); display: block; font-size: 0.95rem;">🔒 Low 20% Deposit</strong>
          <span style="font-size: 0.85rem; color: var(--ps-text-muted);">Lock in peak weekday morning slots with just a 20% refundable deposit.</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. Plan Your Visit: 4-Step Organizer Blueprint -->
  <section class="ps-section ps-section-alt" id="plan-visit">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">STEP-BY-STEP CHECKLIST</span>
        <h2 style="margin-top: 0.75rem;">Plan Your Visit: Stress-Free Organizer Guide</h2>
        <p class="text-muted">
          We do the heavy lifting so teachers, coordinators, and chaperones can relax.
        </p>
      </div>

      <div class="ps-grid ps-grid-4">
        <!-- Step 1 -->
        <div class="ps-card" style="padding: 2rem 1.5rem; border: 2px solid var(--ps-border-color); border-top: 4px solid #FFCC00;">
          <div style="font-size: 2rem; font-weight: 900; color: #FFCC00; line-height: 1; margin-bottom: 0.5rem;">01</div>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Reserve &amp; Lock In</h4>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0;">
            Select your preferred date, estimate your head count, and submit a quote or online booking. We email you an instant confirmation and contract.
          </p>
        </div>

        <!-- Step 2 -->
        <div class="ps-card" style="padding: 2rem 1.5rem; border: 2px solid var(--ps-border-color); border-top: 4px solid #FFCC00;">
          <div style="font-size: 2rem; font-weight: 900; color: #FFCC00; line-height: 1; margin-bottom: 0.5rem;">02</div>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Collect Waivers</h4>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0;">
            Share your unique group waiver link with parents. Parents sign in 30 seconds on their smartphones. You can monitor signed waivers live on your portal!
          </p>
        </div>

        <!-- Step 3 -->
        <div class="ps-card" style="padding: 2rem 1.5rem; border: 2px solid var(--ps-border-color); border-top: 4px solid #FFCC00;">
          <div style="font-size: 2rem; font-weight: 900; color: #FFCC00; line-height: 1; margin-bottom: 0.5rem;">03</div>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Express Arrival</h4>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0;">
            Buses pull into our designated bus parking loop. Your coordinator meets your bus, distributes color-coded wristbands and grip socks, bypassing all lines.
          </p>
        </div>

        <!-- Step 4 -->
        <div class="ps-card" style="padding: 2rem 1.5rem; border: 2px solid var(--ps-border-color); border-top: 4px solid #FFCC00;">
          <div style="font-size: 2rem; font-weight: 900; color: #FFCC00; line-height: 1; margin-bottom: 0.5rem;">04</div>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Play &amp; Zero Cleanup</h4>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0;">
            Jump patrol monitors all zones, leads games, serves meals, and handles 100% of room cleanup. Jumpers depart safely with awards and smiling faces.
          </p>
        </div>
      </div>

      <!-- Action buttons for Plan Your Visit -->
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-top: 2.5rem;">
        <a href="booking.html?session=group&title=Group+Event+Booking" class="ps-btn ps-btn-primary">Book a Group Event</a>
        <a href="#request-quote" class="ps-btn ps-btn-dark">Request a Quote</a>
        <a href="safety-guidelines.html" class="ps-btn ps-btn-outline" style="border-color: var(--ps-border-color); color: var(--ps-text-main);">View Safety Guidelines</a>
      </div>
    </div>
  </section>

  <!-- 8. Interactive Group Quote Calculator & Request Form -->
  <section class="ps-section ps-section-white" id="request-quote">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">INSTANT ESTIMATE &amp; PROPOSAL</span>
        <h2 style="margin-top: 0.75rem;">Request a Quote / Group Inquiry</h2>
        <p class="text-muted">
          Adjust the group slider below for an instant live estimate, or submit your details to receive an official booking proposal within 2 hours.
        </p>
      </div>

      <div class="ps-grid ps-grid-2" style="gap: 2.5rem; align-items: flex-start;">
        <!-- Left: Interactive Form -->
        <div class="ps-card" style="padding: 2.25rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card);">
          <form id="groupQuoteForm" onsubmit="event.preventDefault(); if (window.PlaySpaceValidation && !window.PlaySpaceValidation.validateForm(this)) return false; document.getElementById('quoteSuccessAlert').style.display='block'; window.scrollTo({top: document.getElementById('quoteSuccessAlert').offsetTop - 100, behavior: 'smooth'});">
            <div id="quoteSuccessAlert" style="display: none; background: #000000; border: 2px solid #FFCC00; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem; color: #FFFFFF;">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span style="color: #FFCC00; font-size: 1.25rem;">✔</span>
                <strong style="color: #FFCC00; font-size: 1.05rem;">Quote Request Submitted Successfully!</strong>
              </div>
              <p style="font-size: 0.9rem; color: rgba(255,255,255,0.85); margin: 0;">
                Thank you! Our group sales coordinator has received your request and will email you an official itemized proposal and date confirmation within 2 business hours.
              </p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="ps-form-group">
                <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--ps-text-main);">Organization / School *</label>
                <input type="text" required placeholder="e.g. Lincoln Elementary" style="width: 100%; padding: 0.75rem; border: 1px solid var(--ps-border-color); border-radius: 6px; background: var(--ps-bg-surface); color: var(--ps-text-main);">
                <div class="ps-form-error">Organization name is required.</div>
              </div>
              <div class="ps-form-group">
                <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--ps-text-main);">Contact Name *</label>
                <input type="text" data-type="name" required placeholder="e.g. Ranjith Kumar" style="width: 100%; padding: 0.75rem; border: 1px solid var(--ps-border-color); border-radius: 6px; background: var(--ps-bg-surface); color: var(--ps-text-main);">
                <div class="ps-form-error">Contact name must contain letters and spaces only.</div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="ps-form-group">
                <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--ps-text-main);">Work Email *</label>
                <input type="email" data-type="email" required placeholder="name@school.edu" style="width: 100%; padding: 0.75rem; border: 1px solid var(--ps-border-color); border-radius: 6px; background: var(--ps-bg-surface); color: var(--ps-text-main);">
                <div class="ps-form-error">Valid email with @ and domain required.</div>
              </div>
              <div class="ps-form-group">
                <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--ps-text-main);">Phone Number *</label>
                <input type="tel" data-type="mobile" placeholder="9876543210" maxlength="10" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--ps-border-color); border-radius: 6px; background: var(--ps-bg-surface); color: var(--ps-text-main);">
                <div class="ps-form-error">Mobile number must contain exactly 10 digits.</div>
              </div>
            </div>

            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--ps-text-main);">Group / Event Type *</label>
              <select id="calcEventType" style="width: 100%; padding: 0.75rem; border: 1px solid var(--ps-border-color); border-radius: 6px; background: var(--ps-bg-surface); color: var(--ps-text-main);">
                <option value="school">School &amp; Educational Field Trip (STEM)</option>
                <option value="daycare">Daycare &amp; Preschool Group Visit</option>
                <option value="birthday">Birthday &amp; Group Celebration</option>
                <option value="teambuilding">Team-Building &amp; Corporate Outing</option>
                <option value="camp">Summer Camp / Youth League Outing</option>
                <option value="buyout">Private Facility Buyout (Full Park)</option>
              </select>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <label style="font-size: 0.85rem; font-weight: 700; color: var(--ps-text-main);">Estimated Number of Jumpers: <strong id="calcJumperCountLabel" style="color: #FFCC00; background: #000; padding: 2px 8px; border-radius: 4px;">45 Jumpers</strong></label>
              </div>
              <input type="range" id="calcJumperSlider" min="15" max="250" value="45" step="5" style="width: 100%; accent-color: #FFCC00; cursor: pointer;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--ps-text-muted); margin-top: 0.25rem;">
                <span>15 Jumpers (Min)</span>
                <span>75 Jumpers</span>
                <span>150 Jumpers</span>
                <span>250+ Jumpers</span>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--ps-text-main);">Preferred Date *</label>
                <input type="date" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--ps-border-color); border-radius: 6px; background: var(--ps-bg-surface); color: var(--ps-text-main);">
              </div>
              <div>
                <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--ps-text-main);">Preferred Time Slot</label>
                <select style="width: 100%; padding: 0.75rem; border: 1px solid var(--ps-border-color); border-radius: 6px; background: var(--ps-bg-surface); color: var(--ps-text-main);">
                  <option>Morning (9:00 AM – 12:00 PM)</option>
                  <option>Midday (12:00 PM – 3:00 PM)</option>
                  <option>Afternoon (3:00 PM – 6:00 PM)</option>
                  <option>Evening Glow (6:00 PM – 9:00 PM)</option>
                </select>
              </div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--ps-text-main);">Food &amp; Catering Package</label>
              <select id="calcCateringSelect" style="width: 100%; padding: 0.75rem; border: 1px solid var(--ps-border-color); border-radius: 6px; background: var(--ps-bg-surface); color: var(--ps-text-main);">
                <option value="0">No Food Package (Jump Only)</option>
                <option value="8" selected>The Pizza Feast (+$8.00/guest)</option>
                <option value="10">Healthy Fuel Box (+$10.00/guest)</option>
                <option value="13">Ultimate Celebration (+$13.00/guest)</option>
              </select>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--ps-text-main);">Special Requests / Purchase Order Billing Notes</label>
              <textarea rows="3" placeholder="Tell us about special accommodations, PO numbers, or specific scheduling requirements..." style="width: 100%; padding: 0.75rem; border: 1px solid var(--ps-border-color); border-radius: 6px; background: var(--ps-bg-surface); color: var(--ps-text-main); font-family: inherit;"></textarea>
            </div>

            <button type="submit" class="ps-btn ps-btn-primary ps-btn-block" style="font-size: 1.05rem; padding: 0.85rem;">
              Request a Quote
            </button>
          </form>
        </div>

        <!-- Right: Live Estimate Breakdown Card -->
        <div>
          <div class="ps-card" style="padding: 2.25rem; border: 2px solid #FFCC00; background: var(--ps-bg-card); position: sticky; top: 90px; border-radius: var(--ps-radius-xl);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span class="ps-badge" style="background: #000; color: #FFCC00; font-weight: 800; border: 1px solid #FFCC00;">LIVE PRICING PREVIEW</span>
              <span id="calcTierBadge" style="font-size: 0.85rem; font-weight: 700; color: var(--ps-text-muted);">Medium Group Tier</span>
            </div>

            <div style="margin-bottom: 1.5rem; border-bottom: 1px solid var(--ps-border-color); padding-bottom: 1.25rem;">
              <div style="font-size: 0.9rem; color: var(--ps-text-muted); margin-bottom: 0.25rem;">Estimated Total Price</div>
              <div style="display: flex; align-items: baseline; gap: 0.5rem;">
                <span id="calcTotalCost" style="font-size: 2.75rem; font-weight: 900; color: var(--ps-text-main);">$967.50</span>
                <span id="calcPerJumperCost" style="font-size: 0.95rem; font-weight: 700; color: var(--ps-text-muted);">($21.50 / guest total)</span>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; font-size: 0.92rem;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--ps-text-muted);">Base Admission (<span id="calcSummaryJumpers">45</span> Jumpers @ <span id="calcSummaryRate">$13.50</span>):</span>
                <strong id="calcSummaryBaseTotal" style="color: var(--ps-text-main);">$607.50</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--ps-text-muted);">Catering (<span id="calcSummaryCateringName">Pizza Feast</span>):</span>
                <strong id="calcSummaryCateringTotal" style="color: var(--ps-text-main);">$360.00</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--ps-text-muted);">PlaySpace Grip Socks (All Jumpers):</span>
                <strong style="color: #FFCC00; background: #000; padding: 1px 6px; border-radius: 4px;">FREE (Included)</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--ps-text-muted);">Teacher &amp; Chaperone Admission:</span>
                <strong style="color: #FFCC00; background: #000; padding: 1px 6px; border-radius: 4px;">FREE (1:8 Ratio)</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--ps-text-muted);">Private Room / Host Facilitation:</span>
                <strong id="calcSummaryRoom" style="color: var(--ps-text-main);">Included Free</strong>
              </div>
            </div>

            <div style="background: var(--ps-bg-surface-alt, rgba(0,0,0,0.03)); border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--ps-text-muted);">
              💡 <em>Official quote includes formal invoice, tax exemption adjustment (if applicable), and customized arrival schedule.</em>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <a href="booking.html?session=group&title=Group+Event+Booking" class="ps-btn ps-btn-primary ps-btn-block">
                Book a Group Event
              </a>
              <a href="#plan-visit" class="ps-btn ps-btn-outline ps-btn-block" style="border-color: var(--ps-border-color); color: var(--ps-text-main);">
                Plan Your Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 9. Group Events FAQs -->
  <section class="ps-section ps-section-alt">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">HELPFUL ANSWERS</span>
        <h2 style="margin-top: 0.75rem;">Frequently Asked Questions</h2>
        <p class="text-muted">Common questions from teachers, coordinators, and group leaders.</p>
      </div>

      <div class="ps-accordion" data-behavior="single">
        <div class="ps-accordion-item active">
          <div class="ps-accordion-header">
            <span>Do you accept School District Purchase Orders (POs) and tax-exempt certificates?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Yes, absolutely. We regularly partner with public, charter, and private school districts. Simply provide your approved district Purchase Order or state tax-exemption certificate when requesting a quote, and we will issue an itemized Net-30 invoice with zero state sales tax.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>What is the chaperone ratio, and are teachers charged admission?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Teachers, bus drivers, and adult chaperones receive 100% FREE admission at a 1:8 ratio for school groups (1:4 ratio for daycares). Chaperones enjoy complimentary access to our mezzanine lounge, free Wi-Fi, and complimentary hot coffee and beverages.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>How do digital waivers work for large groups of minor children?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Upon booking, we provide you with a unique event waiver URL to forward to parents via email, school messaging portals, or QR code handouts. Parents can sign digitally on their phones in under 30 seconds. Your organizer dashboard displays signed waivers in real-time.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Can groups bring their own sack lunches or outside food?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            School field trips and daycare groups are welcome to bring brown-bag sack lunches to enjoy in our reserved banquet area at no extra charge. We also offer affordable artisan pizza and healthy boxed lunches starting at just $8 per student.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>What happens if our jumper count changes before the event date?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            We understand school attendance fluctuates! You can adjust your head count up or down by up to 20% until 48 hours prior to your outing, and your final invoice will reflect the exact number of attendees on the day of the event (subject to the 15 jumper minimum).
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 10. Bottom Call to Action Section -->
  <section class="ps-section ps-section-dark" style="background-color: #000000; color: #FFFFFF; border-top: 3px solid #FFCC00; border-bottom: 3px solid #FFCC00; text-align: center; padding: 4.5rem 1.5rem;">
    <div class="ps-container" style="max-width: 850px;">
      <span class="badge-tag" style="background: #FFCC00; color: #000000; margin-bottom: 1rem; display: inline-block;">START PLANNING TODAY</span>
      <h2 style="color: #FFFFFF; margin-bottom: 0.75rem; font-size: 2.25rem;">Ready to Book Your Group's Next Big Adventure?</h2>
      <p style="color: rgba(255,255,255,0.85); margin-bottom: 2rem; font-size: 1.05rem; line-height: 1.6;">
        Peak weekday mornings and weekend time slots fill up rapidly. Lock in your preferred time slot, customize your catering, and give your group an experience they'll talk about all year!
      </p>

      <!-- The 3 Requested CTA Buttons -->
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="#plan-visit" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00; font-size: 1.05rem; padding: 0.85rem 1.75rem;">
          Plan Your Visit
        </a>
        <a href="booking.html?session=group&title=Group+Event+Booking" class="ps-btn ps-btn-primary" style="font-size: 1.05rem; padding: 0.85rem 1.75rem;">
          Book a Group Event
        </a>
        <a href="#request-quote" class="ps-btn ps-btn-dark" style="border: 1px solid #FFCC00; color: #FFFFFF; font-size: 1.05rem; padding: 0.85rem 1.75rem;">
          Request a Quote
        </a>
      </div>

      <p style="color: rgba(255,255,255,0.6); margin-top: 1.75rem; font-size: 0.92rem;">
        Prefer to speak directly with our Group Events Coordinator? Call us at <a href="tel:5558397530" style="color: #FFCC00; font-weight: 700;">(555) 839-7530</a> or email <a href="contact.html" style="color: #FFCC00; font-weight: 700;">events@playspacekids.com</a>.
      </p>
    </div>
  </section>

  <!-- Interactive Calculator Script -->
  <script>
    (function() {
      const slider = document.getElementById('calcJumperSlider');
      const countLabel = document.getElementById('calcJumperCountLabel');
      const cateringSelect = document.getElementById('calcCateringSelect');
      const eventTypeSelect = document.getElementById('calcEventType');
      const totalCostEl = document.getElementById('calcTotalCost');
      const perJumperCostEl = document.getElementById('calcPerJumperCost');
      const tierBadgeEl = document.getElementById('calcTierBadge');
      const summaryJumpersEl = document.getElementById('calcSummaryJumpers');
      const summaryRateEl = document.getElementById('calcSummaryRate');
      const summaryBaseTotalEl = document.getElementById('calcSummaryBaseTotal');
      const summaryCateringNameEl = document.getElementById('calcSummaryCateringName');
      const summaryCateringTotalEl = document.getElementById('calcSummaryCateringTotal');
      const summaryRoomEl = document.getElementById('calcSummaryRoom');

      if (!slider || !totalCostEl) return;

      function updateCalculation() {
        const jumpers = parseInt(slider.value, 10);
        const cateringRate = parseFloat(cateringSelect.value);
        let baseRate = 15.00;
        let tierName = 'Small Group Tier';
        let roomIncluded = 'Reserved Seating Cluster';

        if (jumpers > 75) {
          baseRate = 11.50;
          tierName = 'Large Group / Camp Tier (35% Off)';
          roomIncluded = '2 Private Suites Included';
        } else if (jumpers > 30) {
          baseRate = 13.50;
          tierName = 'Medium Group Tier (25% Off)';
          roomIncluded = '1 Private Room Included';
        }

        const baseTotal = jumpers * baseRate;
        const cateringTotal = jumpers * cateringRate;
        const total = baseTotal + cateringTotal;
        const perJumper = total / jumpers;

        countLabel.textContent = jumpers + ' Jumpers';
        summaryJumpersEl.textContent = jumpers;
        summaryRateEl.textContent = '$' + baseRate.toFixed(2);
        summaryBaseTotalEl.textContent = '$' + baseTotal.toFixed(2);

        tierBadgeEl.textContent = tierName;
        summaryRoomEl.textContent = roomIncluded;

        const catNames = {
          '0': 'None (Jump Only)',
          '8': 'Pizza Feast (+$8/ea)',
          '10': 'Healthy Fuel Box (+$10/ea)',
          '13': 'Ultimate Celebration (+$13/ea)'
        };
        summaryCateringNameEl.textContent = catNames[cateringSelect.value] || 'Custom';
        summaryCateringTotalEl.textContent = '$' + cateringTotal.toFixed(2);

        totalCostEl.textContent = '$' + total.toFixed(2);
        perJumperCostEl.textContent = '($' + perJumper.toFixed(2) + ' / guest total)';
      }

      slider.addEventListener('input', updateCalculation);
      cateringSelect.addEventListener('change', updateCalculation);
      eventTypeSelect.addEventListener('change', updateCalculation);
    })();
  </script>
  `,
  'parties'
);
fs.writeFileSync(path.join(PAGES_DIR, 'group-events.html'), groupEventsHtml, 'utf8');

// 8. safety-guidelines.html
const safetyGuidelinesHtml = pageWrapper(
  'Safety Guidelines & Waiver',
  'Our comprehensive safety policies, ASTM standards, court rules, and digital waiver information.',
  `
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>Safety Guidelines</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0;">Safety Standards &amp; Park Rules</h1>
    </div>
  </section>

  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">SAFETY FIRST. ALWAYS.</span>
        <h2 style="margin-top: 0.75rem;">Our Comprehensive Safety Commitments</h2>
      </div>

      <div class="ps-grid ps-grid-3">
        <div class="ps-card">
          <h4>1. Digital Safety Waiver</h4>
          <p class="text-muted" style="font-size: 0.95rem;">
            Every participant under 18 must have an active signed waiver by their legal parent or guardian. Waivers remain valid on file for 1 full year.
          </p>
        </div>
        <div class="ps-card">
          <h4>2. PlaySpace Grip Socks</h4>
          <p class="text-muted" style="font-size: 0.95rem;">
            Approved rubberized non-slip grip socks prevent slips on trampoline beds and maintain sanitary court surfaces.
          </p>
        </div>
        <div class="ps-card">
          <h4>3. One Jumper Per Bed</h4>
          <p class="text-muted" style="font-size: 0.95rem;">
            Double-bouncing creates hazardous momentum transfers. We enforce strict single-jumper boundaries on each trampoline square.
          </p>
        </div>
        <div class="ps-card">
          <h4>4. Safe Airbag Landings</h4>
          <p class="text-muted" style="font-size: 0.95rem;">
            Always land on feet or rear bottom when entering foam cushions or stunt airbags. Never dive head or neck first.
          </p>
        </div>
        <div class="ps-card">
          <h4>5. Age Zone Separation</h4>
          <p class="text-muted" style="font-size: 0.95rem;">
            The Toddler Lagoon is restricted exclusively to jumpers 4 and under to protect smaller guests from fast-moving older kids.
          </p>
        </div>
        <div class="ps-card">
          <h4>6. Pockets &amp; Jewelry</h4>
          <p class="text-muted" style="font-size: 0.95rem;">
            All jewelry, sharp belt buckles, and electronics must be placed in our free security lockers before stepping onto jump mats.
          </p>
        </div>
      </div>
    </div>
  </section>
  `,
  'safety'
);
fs.writeFileSync(path.join(PAGES_DIR, 'safety-guidelines.html'), safetyGuidelinesHtml, 'utf8');

// 9. gallery.html
const galleryHtml = pageWrapper(
  'Photo & Facility Gallery',
  'Explore high-energy photos of our 35,000 sq ft indoor adventure park. Wall-to-wall trampoline arenas, toddler soft play, ninja warrior courses, neon glow suites, and parent lounges.',
  `
  <!-- 1. Hero Page Banner -->
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>Photo Gallery</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0 0 0.5rem 0;">Explore PlaySpace in Action</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 0 0 1.5rem 0; font-size: 1.1rem; max-width: 720px;">
        Step inside our premier 35,000 sq ft indoor trampoline and soft play adventure park. Discover our multi-court trampoline arena, dedicated toddler village, ninja obstacles, and VIP neon glow party suites!
      </p>

      <!-- Facility Quick Stats -->
      <div style="display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 1.75rem;">
        <div style="border-left: 3px solid #FFCC00; padding-left: 0.75rem;">
          <div style="font-size: 1.35rem; font-weight: 900; color: #FFCC00;">35,000 Sq Ft</div>
          <div style="font-size: 0.82rem; color: rgba(255,255,255,0.8);">Total Arena Footprint</div>
        </div>
        <div style="border-left: 3px solid #FFFFFF; padding-left: 0.75rem;">
          <div style="font-size: 1.35rem; font-weight: 900; color: #FFFFFF;">21 Action Zones</div>
          <div style="font-size: 0.82rem; color: rgba(255,255,255,0.8);">For All Age Groups</div>
        </div>
        <div style="border-left: 3px solid #FFCC00; padding-left: 0.75rem;">
          <div style="font-size: 1.35rem; font-weight: 900; color: #FFCC00;">100+ Trampolines</div>
          <div style="font-size: 0.82rem; color: rgba(255,255,255,0.8);">Interconnected Bounce Beds</div>
        </div>
        <div style="border-left: 3px solid #FFFFFF; padding-left: 0.75rem;">
          <div style="font-size: 1.35rem; font-weight: 900; color: #FFFFFF;">6 Party Suites</div>
          <div style="font-size: 0.82rem; color: rgba(255,255,255,0.8);">Private VIP Celebration Rooms</div>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="booking.html" class="ps-btn ps-btn-primary">Book Jump Session</a>
        <a href="#photoGalleryGrid" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00;">Filter Photos Below ↓</a>
      </div>
    </div>
  </section>

  <!-- 2. Categorized Photo Gallery Section with Interactive Filtering -->
  <section class="ps-section ps-section-white" id="photoGalleryGrid">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">ACTION SHOTS</span>
        <h2 style="margin-top: 0.75rem;">Photo &amp; Attraction Gallery</h2>
        <p class="text-muted">
          Click any category below to filter our high-flying park attractions, toddler areas, party rooms, and café lounges.
        </p>
      </div>

                  <!-- Filter Tabs -->
      <div class="ps-gallery-filters">
        <button type="button" class="ps-filter-btn active" data-filter="all">All Zones (21)</button>
        <button type="button" class="ps-filter-btn" data-filter="trampolines">Trampolines &amp; Sports (5)</button>
        <button type="button" class="ps-filter-btn" data-filter="climbing">Climbing &amp; Ninja (6)</button>
        <button type="button" class="ps-filter-btn" data-filter="softplay">Soft Play &amp; Mazes (2)</button>
        <button type="button" class="ps-filter-btn" data-filter="toddlers">Toddler Sanctuary (4)</button>
        <button type="button" class="ps-filter-btn" data-filter="interactive">Interactive &amp; Glow (4)</button>
      </div>

      <!-- 21 High-Res Categorized Gallery Grid -->
      <div class="ps-gallery-grid">
        <!-- 1. Mega Trampoline Arena -->
        <div class="ps-gallery-item" data-category="trampolines" data-gallery-id="mega-trampoline-arena">
          <img src="../assets/images/attractions/mega-trampoline-arena.jpg" alt="Mega Trampoline Arena" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 4+</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Mega Trampoline Arena</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Jump high, bounce freely, and enjoy energetic jumping challenges across our flagship court designed for jumpers of all ages.</p>
          </div>
        </div>

        <!-- 2. Ninja Warrior Course -->
        <div class="ps-gallery-item" data-category="climbing" data-gallery-id="ninja-warrior-course">
          <img src="../assets/images/attractions/ninja-warrior-course.jpg" alt="Ninja Warrior Course" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 6 - 15 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Ninja Warrior Course</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Climb, crawl, balance, and conquer exciting obstacle challenges that test your grip, speed, and agility.</p>
          </div>
        </div>

        <!-- 3. Adventure Climbing Zone -->
        <div class="ps-gallery-item" data-category="climbing" data-gallery-id="adventure-climbing-zone">
          <img src="../assets/images/attractions/adventure-climbing-zone.jpg" alt="Adventure Climbing Zone" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 5 - 14 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Adventure Climbing Zone</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Explore climbing frames, fun pathways, and exciting elevated play structures with 100% fail-safe auto-belay descenders.</p>
          </div>
        </div>

        <!-- 4. Super Slide Mountain -->
        <div class="ps-gallery-item" data-category="softplay" data-gallery-id="super-slide-mountain">
          <img src="../assets/images/attractions/super-slide-mountain.jpg" alt="Super Slide Mountain" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 3 - 12 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Super Slide Mountain</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Race down colorful slides and enjoy thrilling rides into the soft-play area with safe, padded deceleration lanes.</p>
          </div>
        </div>

        <!-- 5. Rainbow Ball Pit -->
        <div class="ps-gallery-item" data-category="softplay" data-gallery-id="rainbow-ball-pit">
          <img src="../assets/images/attractions/rainbow-ball-pit.jpg" alt="Rainbow Ball Pit" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 1 - 6 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Rainbow Ball Pit</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Dive into a colorful ball pool filled with playful activities, sensory chutes, and sparkling clean surprises.</p>
          </div>
        </div>

        <!-- 6. Sky-High Rope Adventure -->
        <div class="ps-gallery-item" data-category="climbing" data-gallery-id="sky-high-rope-adventure">
          <img src="../assets/images/attractions/sky-high-rope-adventure.jpg" alt="Sky-High Rope Adventure" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 6 - 14 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Sky-High Rope Adventure</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Test balance and coordination on exciting rope bridges and net obstacles with continuous overhead lifeline protection.</p>
          </div>
        </div>

        <!-- 7. Foam Pit Challenge -->
        <div class="ps-gallery-item" data-category="trampolines" data-gallery-id="foam-pit-challenge">
          <img src="../assets/images/attractions/foam-pit-challenge.jpg" alt="Foam Pit Challenge" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 5+</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Foam Pit Challenge</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Jump into a soft foam landing zone and enjoy playful jumping challenges with zero-shock impact absorption.</p>
          </div>
        </div>

        <!-- 8. Laser Maze Mission -->
        <div class="ps-gallery-item" data-category="interactive" data-gallery-id="laser-maze-mission">
          <img src="../assets/images/attractions/laser-maze-mission.jpg" alt="Laser Maze Mission" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 5+</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Laser Maze Mission</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Navigate through a light-based maze and complete exciting secret agent missions with live countdown timers.</p>
          </div>
        </div>

        <!-- 9. Interactive Play Arena -->
        <div class="ps-gallery-item" data-category="interactive" data-gallery-id="interactive-play-arena">
          <img src="../assets/images/attractions/interactive-play-arena.jpg" alt="Interactive Play Arena" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 3+</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Interactive Play Arena</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Play movement-based games with interactive lights, projections, and real-time motion-tracking video challenges.</p>
          </div>
        </div>

        <!-- 10. Little Explorers Zone -->
        <div class="ps-gallery-item" data-category="toddlers" data-gallery-id="little-explorers-zone">
          <img src="../assets/images/attractions/little-explorers-zone.jpg" alt="Little Explorers Zone" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 6 MONTHS – 3 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Little Explorers Zone</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">A gentle adventure space with mini slides, tunnels, and soft-play activities designed specially for toddlers.</p>
          </div>
        </div>

        <!-- 11. Cargo Net Climber -->
        <div class="ps-gallery-item" data-category="climbing" data-gallery-id="cargo-net-climber">
          <img src="../assets/images/attractions/cargo-net-climber.jpg" alt="Cargo Net Climber" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 4 - 12 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Cargo Net Climber</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Climb through flexible net structures and discover new paths to explore high above the ground.</p>
          </div>
        </div>

        <!-- 12. Balance & Bounce Trail -->
        <div class="ps-gallery-item" data-category="toddlers" data-gallery-id="balance-bounce-trail">
          <img src="../assets/images/attractions/balance-bounce-trail.jpg" alt="Balance & Bounce Trail" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 3 - 9 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Balance & Bounce Trail</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Hop across stepping stones, balance on beams, and complete fun movement trails that build motor coordination.</p>
          </div>
        </div>

        <!-- 13. Neon Glow Adventure -->
        <div class="ps-gallery-item" data-category="interactive" data-gallery-id="neon-glow-adventure">
          <img src="../assets/images/attractions/neon-glow-adventure.jpg" alt="Neon Glow Adventure" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 4+</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Neon Glow Adventure</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Experience a colorful neon play zone with glowing lights, UV blacklight cannons, and exciting evening activities.</p>
          </div>
        </div>

        <!-- 14. Mini Sports Arena -->
        <div class="ps-gallery-item" data-category="trampolines" data-gallery-id="mini-sports-arena">
          <img src="../assets/images/attractions/mini-sports-arena.jpg" alt="Mini Sports Arena" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 4 - 14 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Mini Sports Arena</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Enjoy mini basketball, target games, slam dunk runways, and friendly team competitions in an enclosed cage.</p>
          </div>
        </div>

        <!-- 15. Mystery Tunnel Quest -->
        <div class="ps-gallery-item" data-category="toddlers" data-gallery-id="mystery-tunnel-quest">
          <img src="../assets/images/attractions/mystery-tunnel-quest.jpg" alt="Mystery Tunnel Quest" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 3 - 10 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Mystery Tunnel Quest</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Crawl through winding tunnels and discover hidden routes in a playful maze filled with observation bubble domes.</p>
          </div>
        </div>

        <!-- 16. Spider Wall Climb -->
        <div class="ps-gallery-item" data-category="climbing" data-gallery-id="spider-wall-climb">
          <img src="../assets/images/attractions/spider-wall-climb.jpg" alt="Spider Wall Climb" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 4 - 12 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Spider Wall Climb</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Climb a padded, age-appropriate climbing wall wearing special sticky suits that let you stick right to the vertical surface.</p>
          </div>
        </div>

        <!-- 17. Parkour Jump Zone -->
        <div class="ps-gallery-item" data-category="trampolines" data-gallery-id="parkour-jump-zone">
          <img src="../assets/images/attractions/parkour-jump-zone.jpg" alt="Parkour Jump Zone" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 6 - 15 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Parkour Jump Zone</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Navigate soft obstacles and jumping platforms designed to teach urban parkour and freerunning skills safely.</p>
          </div>
        </div>

        <!-- 18. Adventure Tower -->
        <div class="ps-gallery-item" data-category="climbing" data-gallery-id="adventure-tower">
          <img src="../assets/images/attractions/adventure-tower.jpg" alt="Adventure Tower" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 4 - 14 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Adventure Tower</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Explore multi-level climbing and sliding structures with 3 tiers of vertical obstacles and lookout platforms.</p>
          </div>
        </div>

        <!-- 19. Volcano Climb -->
        <div class="ps-gallery-item" data-category="toddlers" data-gallery-id="volcano-climb">
          <img src="../assets/images/attractions/volcano-climb.jpg" alt="Volcano Climb" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 3 - 10 YEARS</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Volcano Climb</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Climb a themed soft-play mountain featuring realistic vinyl rock slopes, climbing ropes, and an exit slide.</p>
          </div>
        </div>

        <!-- 20. Wipeout Challenge -->
        <div class="ps-gallery-item" data-category="interactive" data-gallery-id="wipeout-challenge">
          <img src="../assets/images/attractions/wipeout-challenge.jpg" alt="Wipeout Challenge" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 6+</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Wipeout Challenge</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Test balance and timing on moving-style rotating obstacles in a thrilling last-one-standing challenge game.</p>
          </div>
        </div>

        <!-- 21. Airbag Jump Zone -->
        <div class="ps-gallery-item" data-category="trampolines" data-gallery-id="airbag-jump-zone">
          <img src="../assets/images/attractions/airbag-jump-zone.jpg" alt="Airbag Jump Zone" loading="lazy">
          <div class="ps-gallery-overlay">
            <span class="ps-badge" style="background: #FFCC00; color: #000000; align-self: flex-start; margin-bottom: 0.5rem; font-size: 0.72rem;">AGES 5+</span>
            <h4 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Airbag Jump Zone</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 0;">Experience supervised jumps onto a purpose-designed commercial stunt landing airbag with dual pressure chambers.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Facility Zones Overview Breakdown -->
  <section class="ps-section ps-section-alt">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">FACILITY TOUR</span>
        <h2 style="margin-top: 0.75rem;">Our 6 Core Adventure Zones</h2>
        <p class="text-muted">
          Engineered for active safety, maximum fun, and progressive challenges for kids, teens, and parents alike.
        </p>
      </div>

      <div class="ps-grid ps-grid-3">
        <!-- Zone 1 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🤸</div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">1. Main Jump Arena</h3>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0;">
            Over 60 interconnected trampolines forming a continuous ocean of bounce. Features tumble tracks for gymnastic routines, angled rebound side pads, and wide walking decks.
          </p>
        </div>

        <!-- Zone 2 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">👶</div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">2. Toddler Soft Play Village</h3>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0;">
            A secluded, padded haven reserved exclusively for little jumpers aged 0–5. Zero older kids allowed, featuring soft foam crawling tunnels, tactile toys, and gentle foam slides.
          </p>
        </div>

        <!-- Zone 3 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🥷</div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">3. Ninja Warrior Course</h3>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0;">
            Test your agility, grip strength, and balance across our 3-lane ninja obstacle course. Conclude with our 10-foot and 12-foot warped climbing walls with buzzer timers!
          </p>
        </div>

        <!-- Zone 4 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">☁️</div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">4. Stunt Airbag &amp; Foam Pits</h3>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0;">
            Launch from elevated jump platforms directly into our professional stunt cushion. Safe, soft landings allow jumpers to attempt aerial flips and tricks with zero fear.
          </p>
        </div>

        <!-- Zone 5 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">🎂</div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">5. VIP Celebration Suites</h3>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0;">
            Six soundproof, climate-controlled private party rooms equipped with 55" digital displays, custom theme lighting, comfortable seating, and direct kitchen service.
          </p>
        </div>

        <!-- Zone 6 -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">☕</div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">6. Fuel Zone Café &amp; Lounge</h3>
          <p style="font-size: 0.92rem; color: var(--ps-text-muted); line-height: 1.6; margin: 0;">
            Relax in our elevated mezzanine lounge with panoramic arena views. Enjoy Starbucks espresso drinks, artisan pizzas, fresh fruit smoothies, and complimentary high-speed Wi-Fi.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Safety & Cleanliness Standards Highlight -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-section-header text-center">
        <span class="badge-tag">SAFETY FIRST</span>
        <h2 style="margin-top: 0.75rem;">Engineered for Clean, Safe Adventure</h2>
        <p class="text-muted">
          Your family's health and safety are the cornerstone of everything we build and maintain.
        </p>
      </div>

      <div class="ps-grid ps-grid-4">
        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); text-align: center;">
          <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">🛡️</div>
          <h4 style="margin: 0 0 0.5rem 0;">ASTM F2970 Certified</h4>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); margin: 0;">Fully compliant with the highest international trampoline court engineering standards.</p>
        </div>

        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); text-align: center;">
          <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">✨</div>
          <h4 style="margin: 0 0 0.5rem 0;">Daily Sanitization Fog</h4>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); margin: 0;">Hospital-grade electrostatic fogging and continuous contact surface cleaning all day.</p>
        </div>

        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); text-align: center;">
          <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">👥</div>
          <h4 style="margin: 0 0 0.5rem 0;">Certified Court Marshals</h4>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); margin: 0;">Vigilant, CPR and First Aid trained staff stationed on every single active court zone.</p>
        </div>

        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); text-align: center;">
          <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">🧦</div>
          <h4 style="margin: 0 0 0.5rem 0;">Traction Grip Socks</h4>
          <p style="font-size: 0.88rem; color: var(--ps-text-muted); margin: 0;">Specialized rubber-tread grip socks maintain maximum traction and court hygiene.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Parent Photography Tips & Social Community -->
  <section class="ps-section ps-section-alt">
    <div class="ps-container">
      <div class="ps-grid ps-grid-2">
        <div>
          <span class="badge-tag">PHOTO PRO TIPS</span>
          <h2 style="margin-top: 0.75rem;">How to Capture Epic Action Photos</h2>
          <p class="text-muted" style="margin-bottom: 1.5rem;">
            Want to take Instagram-worthy photos of your kids soaring through the air? Follow our quick arena photo guide!
          </p>

          <ul style="display: flex; flex-direction: column; gap: 1rem; padding: 0; margin: 0; list-style: none; font-size: 0.95rem; color: var(--ps-text-muted);">
            <li>
              <strong style="color: var(--ps-text-main); display: block;">1. Use Burst Mode for Mid-Air Flips:</strong>
              Hold your smartphone camera shutter button to capture 10 shots per second right at the peak of their bounce.
            </li>
            <li>
              <strong style="color: var(--ps-text-main); display: block;">2. Shoot from Low Angles:</strong>
              Crouch slightly below trampoline pad level and aim up toward the arena lights to emphasize jump height!
            </li>
          </ul>
        </div>

        <!-- Social Community Callout Card -->
        <div>
          <div class="ps-card" style="height: 100%; background-color: #000000; color: #FFFFFF; border: 2px solid #FFCC00; padding: 2.5rem; border-radius: var(--ps-radius-xl); text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">📸</div>
            <span class="ps-badge" style="background: #FFCC00; color: #000000; font-weight: 800; margin-bottom: 0.75rem;">COMMUNITY SPOTLIGHT</span>
            <h3 style="color: #FFFFFF; margin-top: 0.5rem; margin-bottom: 0.75rem;">Tag Us &amp; Get Featured!</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 0.95rem; margin-bottom: 1.5rem;">
              Share your high-flying moments on Instagram or TikTok using <strong style="color: #FFCC00;">#JumpAtPlaySpace</strong> and tag <strong style="color: #FFCC00;">@PlaySpacePark</strong>. Weekly featured photos win free jump passes!
            </p>
            <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
              <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">#PlaySpacePark</span>
              <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">#JumpAtPlaySpace</span>
              <span class="ps-badge ps-badge-dark" style="border: 1px solid rgba(255,255,255,0.3); color: #FFFFFF;">#GlowNightFun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. Bottom Call to Action Section -->
  <section class="ps-section ps-section-dark" style="background-color: #000000; color: #FFFFFF; border-top: 3px solid #FFCC00; border-bottom: 3px solid #FFCC00; text-align: center; padding: 4rem 1.5rem;">
    <div class="ps-container" style="max-width: 800px;">
      <span class="badge-tag" style="background: #FFCC00; color: #000000; margin-bottom: 1rem; display: inline-block;">READY FOR TAKE-OFF?</span>
      <h2 style="color: #FFFFFF; margin-bottom: 0.75rem; font-size: 2.25rem;">Experience the Thrill in Person</h2>
      <p style="color: rgba(255,255,255,0.8); margin-bottom: 2rem; font-size: 1.05rem;">
        Pictures only tell half the story. Book your family open jump session or celebrate an unforgettable birthday party at PlaySpace today!
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="booking.html" class="ps-btn ps-btn-primary" style="font-size: 1.1rem; padding: 0.9rem 2rem;">
          Book Jump Session
        </a>
        <a href="birthday-parties.html" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00; font-size: 1.1rem; padding: 0.9rem 1.75rem;">
          Book a Birthday Party
        </a>
        <a href="safety-guidelines.html" class="ps-btn ps-btn-outline" style="border-color: rgba(255,255,255,0.5); color: #FFFFFF; font-size: 1.1rem; padding: 0.9rem 1.75rem;">
          Sign Safety Waiver
        </a>
      </div>
    </div>
  </section>

  <!-- 4. Interactive Gallery Modal and Lightbox Container -->
  <div class="ps-gallery-modal" id="psGalleryViewModal" role="dialog" aria-modal="true" aria-labelledby="psModalTitle">
    <div class="ps-gallery-modal-dialog">
      <div class="ps-gallery-modal-header">
        <div class="ps-gallery-modal-header-text">
          <span class="ps-badge" id="psModalBadge" style="background:#FFCC00;color:#000000;font-size:0.75rem;font-weight:900;">COLLECTION</span>
          <h3 class="ps-gallery-modal-title" id="psModalTitle">Gallery Title</h3>
          <p class="ps-gallery-modal-desc" id="psModalDesc">Gallery Description</p>
        </div>
        <button type="button" class="ps-gallery-modal-close-btn" id="psModalClose" aria-label="Close Gallery View" title="Close (Esc)">✕</button>
      </div>
      <div class="ps-gallery-modal-body">
        <div class="ps-gallery-modal-hint">
          <span>3 Curated Photos in this Collection</span>
          <span style="color:rgba(255,255,255,0.6);font-size:0.8rem;text-transform:none;">Click any photo to expand fullscreen</span>
        </div>
        <div class="ps-gallery-view-grid" id="psModalGrid"></div>
      </div>
      <div class="ps-gallery-modal-footer">
        <button type="button" class="ps-btn ps-btn-outline ps-btn-sm" id="psModalBackBtn" style="border-color:rgba(255,255,255,0.3);color:#FFFFFF;">
          ← Back to All Galleries
        </button>
        <a href="booking.html" class="ps-btn ps-btn-primary ps-btn-sm">
          Book a Play Session ↗
        </a>
      </div>
    </div>
  </div>

  <!-- Fullscreen Lightbox Modal -->
  <div class="ps-lightbox" id="psLightboxModal" role="dialog" aria-modal="true" aria-label="Image Lightbox">
    <div class="ps-lightbox-topbar">
      <div class="ps-lightbox-meta">
        <span class="ps-lightbox-badge" id="psLightboxBadge">GALLERY</span>
        <span class="ps-lightbox-counter" id="psLightboxCounter">Photo 1 of 3</span>
      </div>
      <button type="button" class="ps-lightbox-close-btn" id="psLightboxClose" aria-label="Close Lightbox" title="Close (Esc)">✕</button>
    </div>
    <button type="button" class="ps-lightbox-nav-btn ps-lightbox-nav-prev" id="psLightboxPrev" aria-label="Previous Image" title="Previous (Left Arrow)">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <button type="button" class="ps-lightbox-nav-btn ps-lightbox-nav-next" id="psLightboxNext" aria-label="Next Image" title="Next (Right Arrow)">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
    <div class="ps-lightbox-viewport" id="psLightboxViewport">
      <div class="ps-lightbox-image-wrap">
        <img src="" alt="" class="ps-lightbox-img" id="psLightboxImg">
      </div>
    </div>
    <div class="ps-lightbox-bottombar">
      <div class="ps-lightbox-caption" id="psLightboxCaption"></div>
    </div>
  </div>
  `,
  'gallery',
  ['gallery.js']
);
fs.writeFileSync(path.join(PAGES_DIR, 'gallery.html'), galleryHtml, 'utf8');

// 10. testimonials.html
const testimonialsHtml = pageWrapper(
  'Parent Reviews & Testimonials',
  'Read verified parent reviews and testimonials from families who celebrate and jump at PlaySpace.',
  `
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>Testimonials</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0;">What Parents Say About PlaySpace</h1>
    </div>
  </section>

  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-grid ps-grid-3">
        <div class="ps-card">
          <div style="color: #FFCC00; font-size: 1.25rem; margin-bottom: 0.75rem;">★★★★★</div>
          <p style="font-weight: 500; font-style: italic;">
            "Cleanest indoor play park we have ever visited! The staff is vigilant without being harsh, and our kids passed out in the car on the way home."
          </p>
          <div class="ps-flex ps-items-center ps-gap-md" style="margin-top: 1.5rem;">
            <div class="ps-avatar-circle">SJ</div>
            <div>
              <h5 style="margin: 0;">Sarah Jenkins</h5>
              <span class="text-muted" style="font-size: 0.8rem;">Parent of 2</span>
            </div>
          </div>
        </div>

        <div class="ps-card">
          <div style="color: #FFCC00; font-size: 1.25rem; margin-bottom: 0.75rem;">★★★★★</div>
          <p style="font-weight: 500; font-style: italic;">
            "We booked the VIP Glow Party for my daughter's 9th birthday. The party room blew the kids away and the coordinator handled all the pizzas!"
          </p>
          <div class="ps-flex ps-items-center ps-gap-md" style="margin-top: 1.5rem;">
            <div class="ps-avatar-circle">MD</div>
            <div>
              <h5 style="margin: 0;">Marcus Davis</h5>
              <span class="text-muted" style="font-size: 0.8rem;">Birthday Host</span>
            </div>
          </div>
        </div>

        <div class="ps-card">
          <div style="color: #FFCC00; font-size: 1.25rem; margin-bottom: 0.75rem;">★★★★★</div>
          <p style="font-weight: 500; font-style: italic;">
            "The 10-jump pass is a lifesaver on rainy weekend mornings. Booking slots in the parent portal takes 10 seconds."
          </p>
          <div class="ps-flex ps-items-center ps-gap-md" style="margin-top: 1.5rem;">
            <div class="ps-avatar-circle">EW</div>
            <div>
              <h5 style="margin: 0;">Emily Watson</h5>
              <span class="text-muted" style="font-size: 0.8rem;">Annual Member</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `,
  'explore'
);
fs.writeFileSync(path.join(PAGES_DIR, 'testimonials.html'), testimonialsHtml, 'utf8');

// 11. faq.html
const faqHtml = pageWrapper(
  'Frequently Asked Questions',
  'Answers to common questions regarding jump tickets, age restrictions, grip socks, party booking, and waivers.',
  `
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>FAQs</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0;">Frequently Asked Questions</h1>
    </div>
  </section>

  <section class="ps-section ps-section-white">
    <div class="ps-container" style="max-width: 860px;">
      <div class="ps-accordion" data-behavior="single">
        <div class="ps-accordion-item active">
          <div class="ps-accordion-header">
            <span>What should my child wear to jump?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Wear comfortable, athletic clothing. Avoid clothing with sharp metal zippers, belts, or protruding snaps. Certified PlaySpace non-slip grip socks must be worn on all trampoline courts.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Can I bring outside food and drinks?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Outside food is permitted exclusively for reserved birthday party bookings (birthday cakes and cupcakes). For all other visits, we have a fully stocked café with fresh pizzas, smoothies, coffees, and snacks.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Do I need to book my jump time in advance?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            While walk-ins are accepted subject to live capacity, we strongly recommend reserving your session online to secure your preferred timeslot, particularly on Fridays, weekends, and school holidays.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>What is your cancellation policy?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Individual jump session bookings can be rescheduled or cancelled up to 2 hours prior to start time directly from your Parent Portal with full pass/store credit refund.
          </div>
        </div>
      </div>
    </div>
  </section>
  `,
  'explore'
);
fs.writeFileSync(path.join(PAGES_DIR, 'faq.html'), faqHtml, 'utf8');

// 12. blog.html
const blogHtml = pageWrapper(
  'PlaySpace Blog & Articles',
  'Expert parenting advice, physical fitness benefits of trampolining, birthday planning guides, safety tips, and toddler play ideas.',
  `
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>Blog &amp; Articles</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0;">PlaySpace Articles &amp; Parenting Guides</h1>
      <p style="color: rgba(255, 255, 255, 0.8); margin: 0.5rem 0 0 0; font-size: 1.05rem; max-width: 650px;">
        Expert tips on trampoline physical benefits, active indoor play, birthday planning, toddler milestones, and family adventures.
      </p>
    </div>
  </section>

  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <!-- Search & Category Filters -->
      <div style="margin-bottom: 2.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="max-width: 440px; width: 100%;">
            <input type="text" id="ps-blog-search" class="ps-form-control" placeholder="Search articles by title, topic, or keyword...">
          </div>
          <div id="ps-blog-count" style="font-size: 0.9rem; font-weight: 700; color: var(--ps-text-muted);">
            Showing 9 Articles
          </div>
        </div>

        <div class="ps-gallery-filters" id="ps-blog-filters" style="margin-bottom: 0;">
          <button class="ps-filter-btn active" data-category="all">All Articles</button>
          <button class="ps-filter-btn" data-category="play-activities">Play &amp; Activities</button>
          <button class="ps-filter-btn" data-category="parenting-tips">Parenting Tips</button>
          <button class="ps-filter-btn" data-category="birthday-party-ideas">Birthday Party Ideas</button>
          <button class="ps-filter-btn" data-category="safety-wellness">Safety &amp; Wellness</button>
          <button class="ps-filter-btn" data-category="events-updates">Events &amp; Updates</button>
          <button class="ps-filter-btn" data-category="indoor-adventures">Indoor Adventures</button>
        </div>
      </div>

      <!-- 9 Curated Article Cards Grid -->
      <div class="ps-grid ps-grid-3" id="ps-blog-grid">
        <!-- Article 1: Top Benefits of Trampoline Play for Kids -->
        <div class="ps-blog-card" data-category="play-activities">
          <div class="ps-blog-thumb">
            <img src="../assets/images/blog/Benefits_of_trampoline_play_kids_2K_20261014013908.jpg" alt="Top Benefits of Trampoline Play for Kids" loading="lazy">
          </div>
          <div class="ps-blog-body">
            <div class="ps-blog-meta">
              <span class="ps-badge" style="font-size: 0.7rem; padding: 0.2rem 0.55rem; background: var(--ps-yellow); color: #000; font-weight: 800;">PLAY &amp; ACTIVITIES</span>
              <span>Oct 14, 2026</span> • <span>4 min read</span>
            </div>
            <h4 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.15rem; line-height: 1.35;">Top Benefits of Trampoline Play for Kids</h4>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1; line-height: 1.55; margin-bottom: 1.25rem;">
              Discover how supervised trampoline activities can support balance, coordination, and active play.
            </p>
            <a href="blog-details.html?id=top-benefits-trampoline-play-kids" class="ps-btn ps-btn-dark ps-btn-sm">Read Article →</a>
          </div>
        </div>

        <!-- Article 2: Why Indoor Play Is Great for Growing Kids -->
        <div class="ps-blog-card" data-category="parenting-tips">
          <div class="ps-blog-thumb">
            <img src="../assets/images/blog/Indoor_play_for_kids_2K_20261014014123.jpg" alt="Why Indoor Play Is Great for Growing Kids" loading="lazy">
          </div>
          <div class="ps-blog-body">
            <div class="ps-blog-meta">
              <span class="ps-badge" style="font-size: 0.7rem; padding: 0.2rem 0.55rem; background: var(--ps-yellow); color: #000; font-weight: 800;">PARENTING TIPS</span>
              <span>Oct 11, 2026</span> • <span>5 min read</span>
            </div>
            <h4 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.15rem; line-height: 1.35;">Why Indoor Play Is Great for Growing Kids</h4>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1; line-height: 1.55; margin-bottom: 1.25rem;">
              Explore ways indoor play can encourage movement, creativity, and social interaction.
            </p>
            <a href="blog-details.html?id=why-indoor-play-is-great-for-growing-kids" class="ps-btn ps-btn-dark ps-btn-sm">Read Article →</a>
          </div>
        </div>

        <!-- Article 3: How to Plan the Perfect Kids' Birthday Party -->
        <div class="ps-blog-card" data-category="birthday-party-ideas">
          <div class="ps-blog-thumb">
            <img src="../assets/images/blog/Planning_kids_birthday_party_2K_20261014014237.jpg" alt="How to Plan the Perfect Kids' Birthday Party" loading="lazy">
          </div>
          <div class="ps-blog-body">
            <div class="ps-blog-meta">
              <span class="ps-badge" style="font-size: 0.7rem; padding: 0.2rem 0.55rem; background: var(--ps-yellow); color: #000; font-weight: 800;">BIRTHDAY PARTY IDEAS</span>
              <span>Oct 08, 2026</span> • <span>6 min read</span>
            </div>
            <h4 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.15rem; line-height: 1.35;">How to Plan the Perfect Kids' Birthday Party</h4>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1; line-height: 1.55; margin-bottom: 1.25rem;">
              Learn how to choose a party theme, plan activities, and organize a memorable celebration.
            </p>
            <a href="blog-details.html?id=how-to-plan-perfect-kids-birthday-party" class="ps-btn ps-btn-dark ps-btn-sm">Read Article →</a>
          </div>
        </div>

        <!-- Article 4: Essential Indoor Playground Safety Tips -->
        <div class="ps-blog-card" data-category="safety-wellness">
          <div class="ps-blog-thumb">
            <img src="../assets/images/blog/Indoor_Playground_Safety_Tips_2K_20261014014758.jpg" alt="Essential Indoor Playground Safety Tips" loading="lazy">
          </div>
          <div class="ps-blog-body">
            <div class="ps-blog-meta">
              <span class="ps-badge" style="font-size: 0.7rem; padding: 0.2rem 0.55rem; background: var(--ps-yellow); color: #000; font-weight: 800;">SAFETY &amp; WELLNESS</span>
              <span>Oct 05, 2026</span> • <span>4 min read</span>
            </div>
            <h4 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.15rem; line-height: 1.35;">Essential Indoor Playground Safety Tips</h4>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1; line-height: 1.55; margin-bottom: 1.25rem;">
              Understand age guidelines, appropriate play equipment, and the importance of following staff instructions.
            </p>
            <a href="blog-details.html?id=essential-indoor-playground-safety-tips" class="ps-btn ps-btn-dark ps-btn-sm">Read Article →</a>
          </div>
        </div>

        <!-- Article 5: Fun Indoor Activities for Toddlers -->
        <div class="ps-blog-card" data-category="play-activities">
          <div class="ps-blog-thumb">
            <img src="../assets/images/blog/Fun_Indoor_Activities_for_Toddlers_2K_20261014014917.jpg" alt="Fun Indoor Activities for Toddlers" loading="lazy">
          </div>
          <div class="ps-blog-body">
            <div class="ps-blog-meta">
              <span class="ps-badge" style="font-size: 0.7rem; padding: 0.2rem 0.55rem; background: var(--ps-yellow); color: #000; font-weight: 800;">PLAY &amp; ACTIVITIES</span>
              <span>Sep 30, 2026</span> • <span>5 min read</span>
            </div>
            <h4 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.15rem; line-height: 1.35;">Fun Indoor Activities for Toddlers</h4>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1; line-height: 1.55; margin-bottom: 1.25rem;">
              Find age-appropriate ideas for exploring, crawling, climbing, and sensory play.
            </p>
            <a href="blog-details.html?id=fun-indoor-activities-for-toddlers" class="ps-btn ps-btn-dark ps-btn-sm">Read Article →</a>
          </div>
        </div>

        <!-- Article 6: Planning an Exciting School Field Trip -->
        <div class="ps-blog-card" data-category="events-updates">
          <div class="ps-blog-thumb">
            <img src="../assets/images/blog/Planning_school_field_trip_kids_2K_20261014015211.jpg" alt="Planning an Exciting School Field Trip" loading="lazy">
          </div>
          <div class="ps-blog-body">
            <div class="ps-blog-meta">
              <span class="ps-badge" style="font-size: 0.7rem; padding: 0.2rem 0.55rem; background: var(--ps-yellow); color: #000; font-weight: 800;">EVENTS &amp; UPDATES</span>
              <span>Sep 25, 2026</span> • <span>5 min read</span>
            </div>
            <h4 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.15rem; line-height: 1.35;">Planning an Exciting School Field Trip</h4>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1; line-height: 1.55; margin-bottom: 1.25rem;">
              Discover how to organize group visits, coordinate schedules, and prepare children for an indoor adventure.
            </p>
            <a href="blog-details.html?id=planning-exciting-school-field-trip" class="ps-btn ps-btn-dark ps-btn-sm">Read Article →</a>
          </div>
        </div>

        <!-- Article 7: Meet the Most Exciting Adventure Zones at PLAYSPACE -->
        <div class="ps-blog-card" data-category="indoor-adventures">
          <div class="ps-blog-thumb">
            <img src="../assets/images/blog/PLAYSPACE_adventure_zones_2K_20261014014953.jpg" alt="Meet the Most Exciting Adventure Zones at PLAYSPACE" loading="lazy">
          </div>
          <div class="ps-blog-body">
            <div class="ps-blog-meta">
              <span class="ps-badge" style="font-size: 0.7rem; padding: 0.2rem 0.55rem; background: var(--ps-yellow); color: #000; font-weight: 800;">INDOOR ADVENTURES</span>
              <span>Sep 20, 2026</span> • <span>6 min read</span>
            </div>
            <h4 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.15rem; line-height: 1.35;">Meet the Most Exciting Adventure Zones at PLAYSPACE</h4>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1; line-height: 1.55; margin-bottom: 1.25rem;">
              Discover trampoline arenas, ninja courses, climbing zones, slides, and other available attractions.
            </p>
            <a href="blog-details.html?id=meet-most-exciting-adventure-zones-at-playspace" class="ps-btn ps-btn-dark ps-btn-sm">Read Article →</a>
          </div>
        </div>

        <!-- Article 8: Five Ways to Make Family Playtime More Memorable -->
        <div class="ps-blog-card" data-category="parenting-tips">
          <div class="ps-blog-thumb">
            <img src="../assets/images/blog/Making_family_playtime_memorable_2K_20261014015513.jpg" alt="Five Ways to Make Family Playtime More Memorable" loading="lazy">
          </div>
          <div class="ps-blog-body">
            <div class="ps-blog-meta">
              <span class="ps-badge" style="font-size: 0.7rem; padding: 0.2rem 0.55rem; background: var(--ps-yellow); color: #000; font-weight: 800;">PARENTING TIPS</span>
              <span>Sep 15, 2026</span> • <span>4 min read</span>
            </div>
            <h4 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.15rem; line-height: 1.35;">Five Ways to Make Family Playtime More Memorable</h4>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1; line-height: 1.55; margin-bottom: 1.25rem;">
              Get simple ideas for enjoying quality time, playing together, and creating happy family memories.
            </p>
            <a href="blog-details.html?id=five-ways-to-make-family-playtime-more-memorable" class="ps-btn ps-btn-dark ps-btn-sm">Read Article →</a>
          </div>
        </div>

        <!-- Article 9: The Magic of Neon Glow Nights: What Parents & Kids Can Expect -->
        <div class="ps-blog-card" data-category="events-updates">
          <div class="ps-blog-thumb">
            <img src="../assets/images/blog/Parents_and_kids_experiencing_ne%E2%80%A6_2K_20261014015508.jpg" alt="The Magic of Neon Glow Nights: What Parents &amp; Kids Can Expect" loading="lazy">
          </div>
          <div class="ps-blog-body">
            <div class="ps-blog-meta">
              <span class="ps-badge" style="font-size: 0.7rem; padding: 0.2rem 0.55rem; background: var(--ps-yellow); color: #000; font-weight: 800;">EVENTS &amp; UPDATES</span>
              <span>Oct 16, 2026</span> • <span>5 min read</span>
            </div>
            <h4 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.15rem; line-height: 1.35;">The Magic of Neon Glow Nights: What Parents &amp; Kids Can Expect</h4>
            <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1; line-height: 1.55; margin-bottom: 1.25rem;">
              Discover how UV blacklights, glowing wristbands, energetic music, and neon attractions transform weekend nights at PLAYSPACE.
            </p>
            <a href="blog-details.html?id=the-magic-of-neon-glow-nights" class="ps-btn ps-btn-dark ps-btn-sm">Read Article →</a>
          </div>
        </div>
      </div>

      <!-- No Results State -->
      <div id="ps-blog-no-results" style="display: none; text-align: center; padding: 4rem 1rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <h3>No matching articles found</h3>
        <p class="text-muted">Try searching with a different keyword or select another category filter.</p>
      </div>
    </div>
  </section>
  `,
  'blog',
  ['blog.js']
);
fs.writeFileSync(path.join(PAGES_DIR, 'blog.html'), blogHtml, 'utf8');

// 13. blog-details.html
const blogDetailsHtml = pageWrapper(
  'Top Benefits of Trampoline Play for Kids',
  'Discover how supervised trampoline activities can support balance, coordination, and active play.',
  `
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <a href="blog.html">Blog &amp; Articles</a> <span class="sep">/</span> <span id="ps-article-breadcrumb">Top Benefits of Trampoline Play for Kids</span>
      </div>
      <h1 id="ps-article-title" style="color: #FFFFFF; margin: 0;">Top Benefits of Trampoline Play for Kids</h1>
    </div>
  </section>

  <section class="ps-section ps-section-white" id="ps-article-container">
    <div class="ps-container" style="max-width: 860px;">
      <div class="ps-blog-meta" id="ps-article-meta" style="margin-bottom: 1.5rem; display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <span class="ps-badge" style="background: var(--ps-yellow); color: #000; font-weight: 800;">PLAY &amp; ACTIVITIES</span>
        <span>Published Oct 14, 2026</span> • <span>4 min read</span> • <span>By Coach Alex Reynolds (Conditioning &amp; Jump Coach)</span>
      </div>

      <img id="ps-article-img" src="../assets/images/blog/Benefits_of_trampoline_play_kids_2K_20261014013908.jpg" alt="Top Benefits of Trampoline Play for Kids" style="border-radius: var(--ps-radius-xl); border: 2px solid var(--ps-border-color); width: 100%; max-height: 480px; object-fit: cover; margin-bottom: 2rem;">

      <div id="ps-article-body">
        <p class="lead" style="font-weight: 600; font-size: 1.15rem; line-height: 1.6; color: var(--ps-text-main); margin-bottom: 2rem;">
          Discover how supervised trampoline activities can support balance, coordination, and active play.
        </p>

        <h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-size: 1.35rem; color: var(--ps-text-main);">1. Dynamic Balance and Vestibular Coordination</h3>
        <p style="color: var(--ps-text-muted); line-height: 1.7; font-size: 1rem; margin-bottom: 1.5rem;">
          Every jump forces growing muscles and nervous systems to continuously recalibrate. Bouncing on an elastic trampoline bed activates the vestibular system in the inner ear, helping kids build reflexive balance, spatial awareness, and core stability without placing undue impact on developing joints.
        </p>

        <h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-size: 1.35rem; color: var(--ps-text-main);">2. High-Efficiency Cardiovascular Exercise</h3>
        <p style="color: var(--ps-text-muted); line-height: 1.7; font-size: 1rem; margin-bottom: 1.5rem;">
          According to landmark studies by NASA researchers, rebounding on a trampoline is 68% more aerobically efficient than standard treadmill jogging. At the same time, the spring-loaded surface absorbs up to 80% of landing shock, protecting ankles, knees, and hips while building stamina and lung capacity.
        </p>

        <h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-size: 1.35rem; color: var(--ps-text-main);">3. Natural Mood Elevation &amp; Focus Improvement</h3>
        <p style="color: var(--ps-text-muted); line-height: 1.7; font-size: 1rem; margin-bottom: 1.5rem;">
          Rhythmic, high-flying movement stimulates the immediate release of endorphins, dopamine, and serotonin. Children leave trampoline sessions feeling energized yet calm, with proven improvements in classroom focus and deep, restful sleep patterns at night.
        </p>

        <h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-size: 1.35rem; color: var(--ps-text-main);">4. Safe Progression from Basics to Aerial Acrobatics</h3>
        <p style="color: var(--ps-text-muted); line-height: 1.7; font-size: 1rem; margin-bottom: 1.5rem;">
          Under the supervision of trained court marshals, kids learn proper two-foot landing mechanics, safe knee tucks, and seat drops. Developing these motor skills under structured guidance instills physical confidence and encourages a lifelong love of physical activity.
        </p>

        <div style="background: rgba(255,204,0,0.1); border-left: 4px solid var(--ps-yellow); padding: 1.5rem 1.75rem; border-radius: 0 var(--ps-radius-md) var(--ps-radius-md) 0; margin: 2.5rem 0;">
          <h4 style="margin: 0 0 0.75rem 0; color: var(--ps-text-main);">★ Key PlaySpace Takeaways</h4>
          <ul style="margin: 0; padding-left: 1.25rem; color: var(--ps-text-main); line-height: 1.7;">
            <li>Always bounce in the center of the trampoline bed.</li>
            <li>Follow the strict one-jumper-per-trampoline guideline.</li>
            <li>Wear certified traction grip socks to prevent slipping.</li>
          </ul>
        </div>
      </div>

      <!-- Book Session CTA Banner -->
      <div style="background-color: var(--ps-black); color: var(--ps-white); padding: 2.25rem; border-radius: var(--ps-radius-xl); border: 2px solid var(--ps-yellow); margin-top: 3rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
        <div>
          <h4 style="color: #FFFFFF; margin: 0 0 0.5rem 0; font-size: 1.3rem;">Experience Active Play Firsthand!</h4>
          <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 0.95rem;">
            Book an open jump session today and watch your kids thrive with high-flying, healthy fun.
          </p>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="blog.html" class="ps-btn ps-btn-outline" style="border-color: rgba(255,255,255,0.3); color: #FFFFFF;">← Back to Articles</a>
          <a href="booking.html" class="ps-btn ps-btn-primary">Book Jump Session</a>
        </div>
      </div>

      <!-- Related Articles Section -->
      <div style="margin-top: 4rem; border-top: 1px solid var(--ps-border-color); padding-top: 2.5rem;">
        <h3 style="margin-bottom: 1.5rem;">More Articles You Might Like</h3>
        <div class="ps-grid ps-grid-3" id="ps-article-related-grid"></div>
      </div>
    </div>
  </section>
  `,
  'blog',
  ['blog.js']
);
fs.writeFileSync(path.join(PAGES_DIR, 'blog-details.html'), blogDetailsHtml, 'utf8');

// 14. contact.html
const contactHtml = pageWrapper(
  'Contact & Location',
  'Visit PlaySpace at 4500 Bounce Boulevard, Adventure City. Operating hours, phone numbers, interactive map, driving directions, free parking guide, and contact form.',
  `
  <section class="ps-page-banner">
    <div class="ps-container">
      <div class="ps-breadcrumb">
        <a href="../index.html">Home</a> <span class="sep">/</span> <span>Contact Us</span>
      </div>
      <h1 style="color: #FFFFFF; margin: 0;">Contact Us &amp; Visit PlaySpace</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 0.5rem 0 0 0; font-size: 1.05rem; max-width: 650px;">
        Find our location, check real-time facility hours, get driving &amp; parking directions, or reach out to our guest support team.
      </p>
    </div>
  </section>

  <!-- 1. Quick Contact & Location Cards -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="ps-grid ps-grid-4">
        <!-- Address & Map Link -->
        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-icon-square" style="margin-bottom: 1rem;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h4 style="margin: 0 0 0.5rem 0;">Facility Address</h4>
            <p style="color: var(--ps-text-muted); font-size: 0.95rem; margin: 0; line-height: 1.5;">
              4500 Bounce Boulevard<br>Adventure City, AC 90210
            </p>
          </div>
          <div style="margin-top: 1.25rem;">
            <a href="https://maps.google.com/?q=4500+Bounce+Boulevard,+Adventure+City,+AC+90210" target="_blank" rel="noopener noreferrer" class="ps-btn ps-btn-sm ps-btn-dark" style="width: 100%; text-align: center;">
              Open in Maps ↗
            </a>
          </div>
        </div>

        <!-- Phone Numbers -->
        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-icon-square" style="margin-bottom: 1rem;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h4 style="margin: 0 0 0.5rem 0;">Phone Lines</h4>
            <p style="color: var(--ps-text-muted); font-size: 0.9rem; margin: 0; line-height: 1.6;">
              <strong>Main Desk:</strong> <a href="tel:5558397529" style="color: inherit;">(555) 839-PLAY</a><br>
              <strong>Parties/Events:</strong> <a href="tel:5558397530" style="color: inherit;">(555) 839-7530</a>
            </p>
          </div>
          <div style="margin-top: 1.25rem;">
            <a href="tel:5558397529" class="ps-btn ps-btn-sm ps-btn-dark" style="width: 100%; text-align: center;">
              Call Main Desk
            </a>
          </div>
        </div>

        <!-- Email Addresses -->
        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-icon-square" style="margin-bottom: 1rem;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <h4 style="margin: 0 0 0.5rem 0;">Email Support</h4>
            <p style="color: var(--ps-text-muted); font-size: 0.88rem; margin: 0; line-height: 1.6;">
              <strong>General:</strong> <a href="mailto:jump@playspacepark.com" style="color: inherit;">jump@playspacepark.com</a><br>
              <strong>Parties:</strong> <a href="mailto:parties@playspacepark.com" style="color: inherit;">parties@playspacepark.com</a>
            </p>
          </div>
          <div style="margin-top: 1.25rem;">
            <a href="#psContactForm" class="ps-btn ps-btn-sm ps-btn-dark" style="width: 100%; text-align: center;">
              Send Message ↓
            </a>
          </div>
        </div>

        <!-- Opening Hours Overview -->
        <div class="ps-card" style="padding: 1.75rem; border: 2px solid var(--ps-border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="ps-icon-square" style="margin-bottom: 1rem;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h4 style="margin: 0 0 0.5rem 0;">Jump Hours</h4>
            <p style="color: var(--ps-text-muted); font-size: 0.88rem; margin: 0; line-height: 1.6;">
              <strong>Mon–Thu:</strong> 10:00 AM – 8:00 PM<br>
              <strong>Fri–Sat:</strong> 9:00 AM – 10:00 PM<br>
              <strong>Sun:</strong> 10:00 AM – 7:00 PM
            </p>
          </div>
          <div style="margin-top: 1.25rem;">
            <a href="#psFacilitySchedule" class="ps-btn ps-btn-sm ps-btn-dark" style="width: 100%; text-align: center;">
              Full Schedule ↓
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. Contact Form & Comprehensive Opening Hours -->
  <section class="ps-section ps-section-alt">
    <div class="ps-container">
      <div class="ps-grid ps-grid-2">
        <!-- Contact Form Column -->
        <div>
          <span class="badge-tag">GET IN TOUCH</span>
          <h2 style="margin-top: 0.75rem; margin-bottom: 0.5rem;">Have a Question or Special Request?</h2>
          <p class="text-muted" style="margin-bottom: 1.75rem;">
            Fill out the form below and our guest experience team will get back to you within 24 hours. For urgent booking inquiries today, please call <a href="tel:5558397529" style="font-weight: 700; color: inherit;">(555) 839-PLAY</a>.
          </p>

          <!-- Form Success Alert Container -->
          <div id="contactSuccessAlert" class="ps-card" style="display: none; background-color: #000000; color: #FFFFFF; border: 2px solid #FFCC00; padding: 1.5rem; margin-bottom: 1.5rem; border-radius: var(--ps-radius-lg);">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: #FFCC00; color: #000000; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; flex-shrink: 0;">✓</div>
              <div>
                <h4 style="margin: 0; color: #FFCC00;">Inquiry Sent Successfully!</h4>
                <p style="margin: 4px 0 0 0; font-size: 0.92rem; color: rgba(255,255,255,0.85);">
                  Thank you for contacting PlaySpace. We have received your inquiry and our guest services concierge will reply via email or phone within 24 hours.
                </p>
              </div>
            </div>
          </div>

          <form id="psContactForm" data-validate style="background: var(--ps-bg-card, #FFFFFF); padding: 2rem; border-radius: var(--ps-radius-xl); border: 2px solid var(--ps-border-color);">
            <div class="ps-grid ps-grid-2" style="gap: 1rem;">
              <div class="ps-form-group">
                <label class="ps-form-label">Full Name <span style="color: #FFCC00;">*</span></label>
                <input type="text" class="ps-form-control" data-type="name" required placeholder="Sarah Jenkins">
                <div class="ps-form-error">Name must contain letters and spaces only.</div>
              </div>
              <div class="ps-form-group">
                <label class="ps-form-label">Email Address <span style="color: #FFCC00;">*</span></label>
                <input type="email" class="ps-form-control" data-type="email" required placeholder="sarah.jenkins@example.com">
                <div class="ps-form-error">Valid email with @ and domain required.</div>
              </div>
            </div>

            <div class="ps-grid ps-grid-2" style="gap: 1rem;">
              <div class="ps-form-group">
                <label class="ps-form-label">Phone Number <span style="color: #FFCC00;">*</span></label>
                <input type="tel" class="ps-form-control" data-type="mobile" placeholder="9876543210" maxlength="10" required>
                <div class="ps-form-error">Mobile number must contain exactly 10 digits.</div>
              </div>
              <div class="ps-form-group">
                <label class="ps-form-label">Inquiry Subject <span style="color: #FFCC00;">*</span></label>
                <select class="ps-form-control" required>
                  <option value="">Select a topic...</option>
                  <option value="General Question">General Facility Inquiry</option>
                  <option value="Birthday Party Inquiries">Birthday Party Packages &amp; Rooms</option>
                  <option value="School Field Trip / Group Booking">School Field Trip / Camp Group Booking</option>
                  <option value="Membership & Passes">Membership &amp; Punch Passes</option>
                  <option value="Waiver & Safety Assistance">Waiver &amp; Safety Question</option>
                  <option value="Lost & Found">Lost &amp; Found Inquiry</option>
                </select>
                <div class="ps-form-error">Please select an inquiry topic.</div>
              </div>
            </div>

            <div class="ps-grid ps-grid-2" style="gap: 1rem;">
              <div class="ps-form-group">
                <label class="ps-form-label">Planned Visit Date (Optional)</label>
                <input type="date" class="ps-form-control">
              </div>
              <div class="ps-form-group">
                <label class="ps-form-label">Estimated Number of Jumpers</label>
                <select class="ps-form-control">
                  <option value="1-2 Jumpers">1–2 Jumpers</option>
                  <option value="3-5 Jumpers">3–5 Jumpers (Family)</option>
                  <option value="6-10 Jumpers">6–10 Jumpers (Small Group)</option>
                  <option value="11-20 Jumpers">11–20 Jumpers (Party / Group)</option>
                  <option value="20+ Jumpers">20+ Jumpers (Private / Field Trip)</option>
                </select>
              </div>
            </div>

            <div class="ps-form-group">
              <label class="ps-form-label">Message Details <span style="color: #FFCC00;">*</span></label>
              <textarea class="ps-form-control" rows="4" required placeholder="Tell us how we can help you plan your visit, customize your party package, or answer any facility questions..."></textarea>
              <div class="ps-form-error">Please enter your message details.</div>
            </div>

            <div class="ps-form-group" style="margin-bottom: 1.5rem;">
              <label style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.9rem; cursor: pointer;">
                <input type="checkbox" style="margin-top: 3px; accent-color: #FFCC00;">
                <span>I have signed or need assistance with the digital safety waiver for minor jumpers.</span>
              </label>
            </div>

            <button type="submit" class="ps-btn ps-btn-primary ps-btn-block" style="font-size: 1.05rem; padding: 0.9rem;">
              Send Inquiry Message
            </button>
          </form>
        </div>

        <!-- Comprehensive Hours & Facility Schedule Column -->
        <div id="psFacilitySchedule">
          <div class="ps-card" style="background-color: #000000; color: #FFFFFF; border: 2px solid #FFCC00; padding: 2.5rem; border-radius: var(--ps-radius-xl); height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
                <span class="badge-tag">FACILITY SCHEDULE</span>
                <span style="font-size: 0.85rem; font-weight: 800; color: #FFCC00; display: inline-flex; align-items: center; gap: 6px;">
                  <span style="width: 8px; height: 8px; background: #FFCC00; border-radius: 50%; display: inline-block;"></span>
                  LIVE HOURS
                </span>
              </div>
              <h3 style="color: #FFFFFF; margin-bottom: 0.5rem;">Opening Hours &amp; Programs</h3>
              <p style="color: rgba(255,255,255,0.75); font-size: 0.95rem; margin-bottom: 1.75rem;">
                Our 35,000 sq ft facility features dedicated sessions for toddlers, general family open flight, and weekend neon glow events.
              </p>

              <!-- Schedule Grid Breakdown -->
              <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                <div style="border-left: 3px solid #FFCC00; padding-left: 1rem;">
                  <strong style="color: #FFFFFF; display: block; font-size: 1rem;">General Open Jump (Ages 4+)</strong>
                  <div style="color: rgba(255,255,255,0.8); font-size: 0.88rem; margin-top: 3px;">
                    <div>• <strong>Monday – Thursday:</strong> 10:00 AM – 8:00 PM</div>
                    <div>• <strong>Friday:</strong> 10:00 AM – 7:00 PM</div>
                    <div>• <strong>Saturday:</strong> 9:00 AM – 7:00 PM</div>
                    <div>• <strong>Sunday:</strong> 10:00 AM – 7:00 PM</div>
                  </div>
                </div>

                <div style="border-left: 3px solid #FFFFFF; padding-left: 1rem;">
                  <strong style="color: #FFFFFF; display: block; font-size: 1rem;">Toddler Time (Ages 0–5 Only)</strong>
                  <div style="color: rgba(255,255,255,0.8); font-size: 0.88rem; margin-top: 3px;">
                    <div>• <strong>Monday, Wednesday &amp; Friday:</strong> 9:00 AM – 10:30 AM</div>
                    <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Exclusive quiet arena access for gentle bounces without older jumpers.</div>
                  </div>
                </div>

                <div style="border-left: 3px solid #FFCC00; padding-left: 1rem;">
                  <strong style="color: #FFCC00; display: block; font-size: 1rem;">Neon Glow Night (Ages 6+)</strong>
                  <div style="color: rgba(255,255,255,0.8); font-size: 0.88rem; margin-top: 3px;">
                    <div>• <strong>Friday &amp; Saturday:</strong> 7:00 PM – 10:00 PM</div>
                    <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Blacklights, neon lasers, glow wristbands, and live DJ dance beats.</div>
                  </div>
                </div>

                <div style="border-left: 3px solid #FFFFFF; padding-left: 1rem;">
                  <strong style="color: #FFFFFF; display: block; font-size: 1rem;">Sensory-Friendly Jump</strong>
                  <div style="color: rgba(255,255,255,0.8); font-size: 0.88rem; margin-top: 3px;">
                    <div>• <strong>1st &amp; 3rd Sunday:</strong> 9:00 AM – 10:00 AM</div>
                    <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Soft natural lighting, turned-down music, and reduced arena capacity.</div>
                  </div>
                </div>
              </div>

              <!-- Holiday Note -->
              <div style="background: rgba(255,255,255,0.06); padding: 1rem; border-radius: var(--ps-radius-md); margin-top: 1.5rem; font-size: 0.85rem; color: rgba(255,255,255,0.85);">
                <strong style="color: #FFCC00;">Holiday &amp; School Recess Hours:</strong> During public school vacations and summer recess, open jump opens early at <strong>9:00 AM every weekday</strong>.
              </div>
            </div>

            <!-- Quick Action Buttons -->
            <div style="display: flex; gap: 0.75rem; margin-top: 2rem; flex-wrap: wrap;">
              <a href="booking.html" class="ps-btn ps-btn-primary" style="flex: 1; text-align: center;">
                Book Jump Session
              </a>
              <a href="safety-guidelines.html" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00; flex: 1; text-align: center;">
                Sign Waiver
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Interactive Map & Location Overview -->
  <section class="ps-section ps-section-white">
    <div class="ps-container">
      <div class="text-center" style="max-width: 700px; margin: 0 auto 2.5rem auto;">
        <span class="badge-tag">INTERACTIVE MAP</span>
        <h2 style="margin-top: 0.75rem;">Find Us in Adventure City</h2>
        <p class="text-muted">
          Centrally located on Bounce Boulevard with rapid access from US-101 and I-405, featuring 250+ dedicated complimentary parking spots.
        </p>
      </div>

      <!-- Google Maps Embed Container -->
      <div style="position: relative; width: 100%; border-radius: var(--ps-radius-xl); overflow: hidden; border: 2px solid var(--ps-border-color); box-shadow: var(--ps-shadow-md);">
        <iframe
          title="PlaySpace Arena Location Map"
          src="https://maps.google.com/maps?q=4500+Bounce+Boulevard,+Adventure+City,+AC+90210&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="420"
          style="border: 0; display: block;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>

      <!-- Map Action Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-top: 1.25rem; padding: 1.25rem 1.75rem; background: var(--ps-bg-card, #FFFFFF); border: 2px solid var(--ps-border-color); border-radius: var(--ps-radius-lg);">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="ps-icon-square" style="width: 36px; height: 36px;">📍</div>
          <div>
            <strong style="display: block; font-size: 0.95rem; color: var(--ps-text-main);">PlaySpace Indoor Trampoline &amp; Soft Play Park</strong>
            <span style="color: var(--ps-text-muted); font-size: 0.85rem;">4500 Bounce Boulevard, Adventure City, AC 90210 • GPS: 34.0522° N, 118.2437° W</span>
          </div>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="https://maps.google.com/?q=4500+Bounce+Boulevard,+Adventure+City,+AC+90210" target="_blank" rel="noopener noreferrer" class="ps-btn ps-btn-dark ps-btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
            <span>Get Directions (Google Maps)</span> ↗
          </a>
          <a href="https://maps.apple.com/?q=4500+Bounce+Boulevard,+Adventure+City,+AC+90210" target="_blank" rel="noopener noreferrer" class="ps-btn ps-btn-outline-dark ps-btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
            <span>Apple Maps</span> ↗
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Directions and Parking Information -->
  <section class="ps-section ps-section-alt">
    <div class="ps-container">
      <div class="text-center" style="max-width: 720px; margin: 0 auto 3rem auto;">
        <span class="badge-tag">ARRIVAL &amp; PARKING</span>
        <h2 style="margin-top: 0.75rem;">Directions, Parking &amp; Arrival Guide</h2>
        <p class="text-muted">
          Everything parents, party hosts, and group chaperones need to know for a stress-free arrival and rapid check-in.
        </p>
      </div>

      <div class="ps-grid ps-grid-3">
        <!-- Driving Directions Card -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
          </div>
          <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Driving Directions</h3>
          <ul style="display: flex; flex-direction: column; gap: 1rem; padding: 0; margin: 0; list-style: none; font-size: 0.92rem; color: var(--ps-text-muted);">
            <li>
              <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.25rem;">From US-101 (North):</strong>
              Take Exit 42B for Bounce Boulevard. Drive east 0.8 miles. Turn right into the PlaySpace plaza entrance marked by the yellow flagpoles.
            </li>
            <li>
              <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.25rem;">From I-405 (South &amp; West):</strong>
              Take the Adventure Parkway exit. Proceed 1.2 miles north to Bounce Boulevard, then turn left at the signal.
            </li>
            <li>
              <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.25rem;">From Downtown / Metro Expressway:</strong>
              Follow Flight Avenue heading west, merge onto Bounce Boulevard at the civic roundabout.
            </li>
          </ul>
        </div>

        <!-- Parking Information Card -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 17V7h4a3 3 0 0 1 0 6H9"></path></svg>
          </div>
          <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Parking &amp; EV Charging</h3>
          <ul style="display: flex; flex-direction: column; gap: 1rem; padding: 0; margin: 0; list-style: none; font-size: 0.92rem; color: var(--ps-text-muted);">
            <li>
              <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.25rem;">250+ Free Surface Stalls:</strong>
              100% complimentary on-site parking directly surrounding our building. No parking validation or fees required.
            </li>
            <li>
              <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.25rem;">4 Level-2 EV Charging Ports:</strong>
              Located in Parking Row B. Complimentary for guests while kids enjoy active jump sessions.
            </li>
            <li>
              <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.25rem;">ADA &amp; Stroller Parking:</strong>
              12 oversized spaces located right beside our ground-level main entrance ramp for effortless stroller and wheelchair access.
            </li>
          </ul>
        </div>

        <!-- Group Drop-Off & Transit Card -->
        <div class="ps-card" style="padding: 2rem; border: 2px solid var(--ps-border-color); background: var(--ps-bg-card, #FFFFFF); border-radius: var(--ps-radius-xl);">
          <div class="ps-icon-square" style="margin-bottom: 1.25rem;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6v6"></path><path d="M15 6v6"></path><path d="M2 12h19.6"></path><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2-.3-1.1-.8-2.8-.8-2.8h-3"></path><circle cx="7" cy="18" r="2"></circle><path d="M9 18h5"></path><circle cx="16" cy="18" r="2"></circle></svg>
          </div>
          <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Group Drop-Off &amp; Transit</h3>
          <ul style="display: flex; flex-direction: column; gap: 1rem; padding: 0; margin: 0; list-style: none; font-size: 0.92rem; color: var(--ps-text-muted);">
            <li>
              <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.25rem;">Bus &amp; Van Circular Drop Loop:</strong>
              Dedicated South Entrance circular turnaround for school buses, camp vans, and party carpools with curbside marshals.
            </li>
            <li>
              <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.25rem;">Metro Transit Route 14:</strong>
              Direct bus stop situated right at Bounce Blvd &amp; Trampoline Way (a sheltered 2-minute walk from our lobby).
            </li>
            <li>
              <strong style="display: block; color: var(--ps-text-main); margin-bottom: 0.25rem;">Bicycle &amp; Scooter Racks:</strong>
              Covered bike racks with CCTV surveillance positioned immediately next to the primary glass entrance.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Frequently Asked Questions -->
  <section class="ps-section ps-section-white">
    <div class="ps-container" style="max-width: 880px;">
      <div class="text-center" style="margin-bottom: 2.75rem;">
        <span class="badge-tag">HAVE QUESTIONS?</span>
        <h2 style="margin-top: 0.75rem;">Frequently Asked Questions</h2>
        <p class="text-muted">
          Quick answers to the questions families ask most before arriving at PlaySpace.
        </p>
      </div>

      <div class="ps-accordion" data-behavior="single">
        <div class="ps-accordion-item active">
          <div class="ps-accordion-header">
            <span>Do I need to book my jump time in advance or can we walk in?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            While walk-ins are accepted subject to live capacity, we strongly recommend reserving your session online to secure your preferred timeslot, particularly on Fridays, weekends, and school holidays. Pre-booking also lets you link your signed waiver and skip the front desk queue!
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Where and when do we sign the digital safety waiver?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Every jumper (children and adults entering courts) must have a signed waiver on file. Minors under 18 must have their waiver completed by a parent or legal guardian. You can complete our digital waiver online from your phone or computer before arriving, or use our self-service waiver kiosks in the lobby.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Are PlaySpace grip socks mandatory, and can we bring our own?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            For ASTM F2970 court safety compliance and hygienic standards, certified PlaySpace anti-slip traction socks ($3.50/pair) are mandatory on all trampolines and obstacle arenas. Once purchased, they are yours to keep and wash for all future visits!
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Is parking completely free and are there spaces for oversized vehicles?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Yes! We provide 250+ completely free parking spaces in our private, well-lit surface lot directly adjacent to the facility. We feature extra-wide bays for SUVs and family vans, 4 Level-2 EV charging stations, and dedicated drop-off turnaround loops for buses.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>What should children and chaperones wear to the park?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Wear comfortable athletic clothing such as t-shirts, joggers, or leggings. Please avoid clothing with sharp metal zippers, belts, studs, or buckles. Long hair should be tied back, and jewelry, watches, and phones must be safely stored in our complimentary digital shoe lockers.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>Can we bring outside food, snacks, or birthday cakes?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Outside food and cakes are permitted exclusively for reserved Birthday Party rooms. For open jumpers, our full-service Fuel Zone Café offers artisan pizzas, fruit bowls, smoothies, Starbucks coffees, and kid-approved snacks.
          </div>
        </div>

        <div class="ps-accordion-item">
          <div class="ps-accordion-header">
            <span>What is your cancellation or rescheduling policy?</span>
            <span class="icon">+</span>
          </div>
          <div class="ps-accordion-body">
            Individual jump session bookings can be rescheduled up to 2 hours prior to start time directly from your Parent Portal with full pass/store credit refund. Birthday parties can be rescheduled with up to 72 hours notice.
          </div>
        </div>
      </div>

      <div class="text-center" style="margin-top: 2rem;">
        <p class="text-muted" style="margin-bottom: 1rem;">
          Still have questions? Check our complete knowledge base or review our safety regulations.
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <a href="faq.html" class="ps-btn ps-btn-dark ps-btn-sm">View Full FAQ Page</a>
          <a href="safety-guidelines.html" class="ps-btn ps-btn-outline-dark ps-btn-sm">Safety Guidelines &amp; Rules</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. Pre-Arrival Safety Checklist Banner -->
  <section class="ps-section" style="background-color: #000000; color: #FFFFFF; border-top: 3px solid #FFCC00; border-bottom: 3px solid #FFCC00; padding: 2.75rem 0;">
    <div class="ps-container">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
        <div>
          <span class="badge-tag" style="background: #FFCC00; color: #000000; margin-bottom: 0.5rem; display: inline-block;">BEFORE YOU ARRIVE</span>
          <h3 style="color: #FFFFFF; margin: 0 0 0.25rem 0;">Ready to Jump? Complete Your 4-Step Checklist</h3>
          <p style="color: rgba(255,255,255,0.75); margin: 0; font-size: 0.95rem;">
            1. Sign digital waiver online • 2. Bring PlaySpace grip socks • 3. Wear comfortable athletic wear • 4. Arrive 15 min early
          </p>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <a href="safety-guidelines.html" class="ps-btn ps-btn-outline" style="border-color: #FFCC00; color: #FFCC00;">Sign Waiver Now</a>
          <a href="booking.html" class="ps-btn ps-btn-primary">Book Jump Session</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Form Feedback Handler Script -->
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      var contactForm = document.getElementById('psContactForm');
      if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
          e.preventDefault();
          if (window.PlaySpaceValidation && !window.PlaySpaceValidation.validateForm(this)) {
            return;
          }
          var successAlert = document.getElementById('contactSuccessAlert');
          if (successAlert) {
            successAlert.style.display = 'block';
            contactForm.reset();
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }
    });
  </script>
  `,
  'contact',
  [],
  { hideVipBox: true }
);
fs.writeFileSync(path.join(PAGES_DIR, 'contact.html'), contactHtml, 'utf8');

// 15. login.html
const loginHtml = pageWrapper(
  'Login to Parent Portal',
  'Sign in to your PlaySpace parent portal to manage child profiles, view active punch passes, and book jump sessions.',
  `
  <section class="ps-section ps-section-white" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2.5rem 1rem; position: relative;">
    <!-- Top Floating Actions: Back to Home, LTR/RTL Toggle & Dark Mode Toggle -->
    <div class="ps-auth-topbar">
      <a href="../index.html" class="ps-auth-link" style="display: inline-flex; align-items: center; gap: 0.4rem; font-weight: 700; font-size: 0.92rem;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Home
      </a>
      <div class="ps-auth-actions">
        <!-- LTR / RTL Switcher -->
        <button class="ps-lang-toggle" aria-label="Toggle Layout Direction" title="Switch between LTR and RTL">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          <span>RTL</span>
        </button>

        <!-- Dark Mode Switcher -->
        <button class="ps-theme-toggle ps-btn-icon" aria-label="Toggle Dark/Light Mode" title="Toggle Theme">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>
      </div>
    </div>

    <div class="ps-container" style="max-width: 460px; width: 100%;">
      <div class="ps-card" style="padding: 2.75rem 2.25rem; border: 2px solid var(--ps-border-color); box-shadow: var(--ps-shadow-lg);">
        <div class="text-center" style="margin-bottom: 2rem;">
          <a href="../index.html" style="display: inline-block;">
            <img src="../assets/images/brand/logo-dark.svg" alt="PlaySpace" class="ps-brand-logo-light ps-brand-logo-card" style="height: 48px; margin: 0 auto 1rem auto;">
            <img src="../assets/images/brand/logo.svg" alt="PlaySpace" class="ps-brand-logo-dark ps-brand-logo-card" style="height: 48px; margin: 0 auto 1rem auto; display: none;">
          </a>
          <h2 style="margin-bottom: 0.35rem; font-size: 1.75rem;">Welcome Back</h2>
          <p class="text-muted" style="margin: 0; font-size: 0.95rem;">Sign in to your PlaySpace account</p>
        </div>

        <form id="ps-login-form">
          <div class="ps-form-group">
            <label class="ps-form-label">Email Address</label>
            <input type="email" id="login-email" class="ps-form-control" data-type="email" required placeholder="e.g. ranjith@gmail.com">
            <div class="ps-form-error">Valid email with @ and domain required.</div>
          </div>
          <div class="ps-form-group">
            <label class="ps-form-label">Password</label>
            <input type="password" id="login-password" class="ps-form-control" required placeholder="Enter your password">
            <div class="ps-form-error">Password is required.</div>
          </div>
          <div class="ps-flex-between" style="margin-bottom: 1.5rem;">
            <label class="ps-checkbox-label">
              <input type="checkbox" class="ps-checkbox">
              <span>Remember me</span>
            </label>
            <a href="forgot-password.html" class="ps-auth-link" style="font-size: 0.85rem; font-weight: 700; text-decoration: underline;">Forgot password?</a>
          </div>
          <button type="submit" class="ps-btn ps-btn-primary ps-btn-block" style="padding: 0.85rem; font-size: 1rem; font-weight: 800;">Sign In</button>
        </form>

        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--ps-border-color); text-align: center; font-size: 0.92rem;">
          <span class="text-muted">Don’t have an account?</span>
          <a href="register.html" class="ps-auth-link" style="font-weight: 800; margin-left: 6px;">Create Parent Account</a>
        </div>
      </div>
    </div>
  </section>
  `,
  '',
  ['authentication.js'],
  { hideNav: true, hideFooter: true }
);
fs.writeFileSync(path.join(PAGES_DIR, 'login.html'), loginHtml, 'utf8');


// 16. register.html
const registerHtml = pageWrapper(
  'Create Parent Account',
  'Sign up for an online PlaySpace parent account to link child profiles and sign digital safety waivers.',
  `
  <section class="ps-section ps-section-white" style="min-height: 80vh; display: flex; align-items: center;">
    <div class="ps-container" style="max-width: 520px;">
      <div class="ps-card" style="padding: 2.5rem; border: 2px solid var(--ps-border-color);">
        <div class="text-center" style="margin-bottom: 2rem;">
          <img src="../assets/images/brand/logo-dark.svg" alt="PlaySpace" class="ps-brand-logo-light ps-brand-logo-card" style="height: 48px; margin: 0 auto 1rem auto;">
          <img src="../assets/images/brand/logo.svg" alt="PlaySpace" class="ps-brand-logo-dark ps-brand-logo-card" style="height: 48px; margin: 0 auto 1rem auto; display: none;">
          <h2>Create Account</h2>
          <p class="text-muted">Register to book and track passes</p>
        </div>

        <form data-validate>
          <div class="ps-form-group">
            <label class="ps-form-label">Full Name</label>
            <input type="text" class="ps-form-control" data-type="name" required placeholder="e.g. Ranjith Kumar">
            <div class="ps-form-error">Name must contain letters and spaces only.</div>
          </div>
          <div class="ps-form-group">
            <label class="ps-form-label">Email Address</label>
            <input type="email" class="ps-form-control" data-type="email" required placeholder="e.g. ranjith@gmail.com">
            <div class="ps-form-error">Valid email with @ and domain required.</div>
          </div>
          <div class="ps-form-group">
            <label class="ps-form-label">Phone Number</label>
            <input type="tel" class="ps-form-control" data-type="mobile" placeholder="9876543210" maxlength="10" required>
            <div class="ps-form-error">Mobile number must contain exactly 10 digits.</div>
          </div>
          <div class="ps-form-group">
            <label class="ps-form-label">Password</label>
            <input type="password" class="ps-form-control" required placeholder="Create strong password">
            <div class="ps-form-error">Password is required.</div>
          </div>
          <div class="ps-form-group">
            <label class="ps-checkbox-label">
              <input type="checkbox" class="ps-checkbox" required>
              <span>I agree to PlaySpace Safety Rules &amp; Terms</span>
            </label>
            <div class="ps-form-error">You must agree to the safety rules.</div>
          </div>
          <button type="submit" class="ps-btn ps-btn-primary ps-btn-block">Create Account</button>
        </form>

        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--ps-border-color); text-align: center;">
          <span class="text-muted">Already have an account?</span>
          <a href="login.html" class="ps-auth-link" style="font-weight: 800; margin-left: 6px;">Sign In</a>
        </div>
      </div>
    </div>
  </section>
  `,
  ''
);
fs.writeFileSync(path.join(PAGES_DIR, 'register.html'), registerHtml, 'utf8');

// 17. forgot-password.html
const forgotPasswordHtml = pageWrapper(
  'Reset Password',
  'Recover your PlaySpace parent account password.',
  `
  <section class="ps-section ps-section-white" style="min-height: 75vh; display: flex; align-items: center;">
    <div class="ps-container" style="max-width: 480px;">
      <div class="ps-card" style="padding: 2.5rem; border: 2px solid var(--ps-border-color);">
        <div class="text-center" style="margin-bottom: 2rem;">
          <h2>Reset Password</h2>
          <p class="text-muted">Enter your registered email to receive password recovery instructions.</p>
        </div>

        <form data-validate action="login.html">
          <div class="ps-form-group">
            <label class="ps-form-label">Email Address</label>
            <input type="email" class="ps-form-control" data-type="email" required placeholder="e.g. ranjith@gmail.com">
            <div class="ps-form-error">Valid email with @ and domain required.</div>
          </div>
          <button type="submit" class="ps-btn ps-btn-primary ps-btn-block">Send Reset Link</button>
        </form>

        <div style="margin-top: 1.5rem; text-align: center;">
          <a href="login.html" class="ps-auth-link" style="font-weight: 700; font-size: 0.9rem;">Back to Sign In</a>
        </div>
      </div>
    </div>
  </section>
  `,
  ''
);
fs.writeFileSync(path.join(PAGES_DIR, 'forgot-password.html'), forgotPasswordHtml, 'utf8');

// 18. 404.html
const notFoundHtml = pageWrapper(
  'Page Not Found (404)',
  'Whoops! You bounced out of bounds. The requested page could not be found.',
  `
  <section class="ps-section ps-section-white text-center" style="min-height: 70vh; display: flex; align-items: center;">
    <div class="ps-container" style="max-width: 600px;">
      <div style="font-size: 6rem; font-weight: 900; line-height: 1; color: #FFCC00; margin-bottom: 1rem;">404</div>
      <h2>Whoops! You Bounced Out of Bounds</h2>
      <p class="text-muted" style="margin-bottom: 2rem;">
        The page you are looking for has been moved, renamed, or doesn't exist on our trampoline courts.
      </p>
      <a href="../index.html" class="ps-btn ps-btn-primary ps-btn-lg">Return to Homepage</a>
    </div>
  </section>
  `,
  ''
);
fs.writeFileSync(path.join(PAGES_DIR, '404.html'), notFoundHtml, 'utf8');

// 19. coming-soon.html
const comingSoonHtml = pageWrapper(
  'Coming Soon — Neon Laser Tag',
  'We are expanding! A brand new multi-level Neon Laser Tag arena is coming to PlaySpace soon.',
  `
  <section class="ps-section ps-section-dark text-center" style="min-height: 80vh; display: flex; align-items: center;">
    <div class="ps-container" style="max-width: 680px;">
      <span class="badge-tag" style="margin-bottom: 1.5rem;">NEW ATTRACTION EXPANSION</span>
      <h1 style="color: #FFFFFF; font-size: 3.5rem; margin-bottom: 1rem;">Neon Laser Tag Arena</h1>
      <p style="color: rgba(255,255,255,0.8); font-size: 1.25rem; margin-bottom: 2.5rem;">
        Get ready for two levels of stealth, glowing laser obstacles, and thrilling family team battles. Launching Winter 2026!
      </p>

      <div style="display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 3rem;">
        <div style="background: rgba(255,255,255,0.1); border: 2px solid #FFCC00; border-radius: 12px; padding: 1rem 1.5rem; min-width: 90px;">
          <div style="font-size: 2.2rem; font-weight: 900; color: #FFCC00;">45</div>
          <div style="font-size: 0.75rem; text-transform: uppercase;">Days</div>
        </div>
        <div style="background: rgba(255,255,255,0.1); border: 2px solid #FFCC00; border-radius: 12px; padding: 1rem 1.5rem; min-width: 90px;">
          <div style="font-size: 2.2rem; font-weight: 900; color: #FFCC00;">14</div>
          <div style="font-size: 0.75rem; text-transform: uppercase;">Hours</div>
        </div>
        <div style="background: rgba(255,255,255,0.1); border: 2px solid #FFCC00; border-radius: 12px; padding: 1rem 1.5rem; min-width: 90px;">
          <div style="font-size: 2.2rem; font-weight: 900; color: #FFCC00;">28</div>
          <div style="font-size: 0.75rem; text-transform: uppercase;">Mins</div>
        </div>
      </div>

      <a href="../index.html" class="ps-btn ps-btn-primary ps-btn-lg">Back to Home</a>
    </div>
  </section>
  `,
  ''
);
fs.writeFileSync(path.join(PAGES_DIR, 'coming-soon.html'), comingSoonHtml, 'utf8');

// 20. maintenance.html
const maintenanceHtml = pageWrapper(
  'Facility Maintenance',
  'PlaySpace is currently performing routine scheduled deep-cleaning and spring inspections.',
  `
  <section class="ps-section ps-section-white text-center" style="min-height: 70vh; display: flex; align-items: center;">
    <div class="ps-container" style="max-width: 600px;">
      <span class="badge-tag" style="margin-bottom: 1rem;">SAFETY &amp; SANITIZATION</span>
      <h2>Routine Park Maintenance</h2>
      <p class="text-muted" style="margin-bottom: 2rem;">
        We are currently performing our scheduled bi-weekly deep sanitization and ASTM spring tension safety audits. We will reopen tomorrow at 9:00 AM!
      </p>
      <a href="contact.html" class="ps-btn ps-btn-dark">Contact Guest Support</a>
    </div>
  </section>
  `,
  ''
);
fs.writeFileSync(path.join(PAGES_DIR, 'maintenance.html'), maintenanceHtml, 'utf8');

console.log('Built all 20 public pages successfully');
