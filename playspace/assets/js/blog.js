/**
 * PlaySpace - Blog & Articles Module
 * Contains all 9 curated articles, category filtering, search, and dynamic detail loader.
 */

(function () {
  'use strict';

  var ARTICLES = [
    {
      id: 'top-benefits-trampoline-play-kids',
      title: 'Top Benefits of Trampoline Play for Kids',
      category: 'Play & Activities',
      categorySlug: 'play-activities',
      date: 'Oct 14, 2026',
      readTime: '4 min read',
      author: 'Coach Alex Reynolds',
      authorRole: 'Conditioning & Jump Coach',
      image: '../assets/images/blog/Benefits_of_trampoline_play_kids_2K_20261014013908.jpg',
      excerpt: 'Discover how supervised trampoline activities can support balance, coordination, and active play.',
      sections: [
        {
          heading: '1. Dynamic Balance and Vestibular Coordination',
          text: 'Every jump forces growing muscles and nervous systems to continuously recalibrate. Bouncing on an elastic trampoline bed activates the vestibular system in the inner ear, helping kids build reflexive balance, spatial awareness, and core stability without placing undue impact on developing joints.'
        },
        {
          heading: '2. High-Efficiency Cardiovascular Exercise',
          text: 'According to landmark studies by NASA researchers, rebounding on a trampoline is 68% more aerobically efficient than standard treadmill jogging. At the same time, the spring-loaded surface absorbs up to 80% of landing shock, protecting ankles, knees, and hips while building stamina and lung capacity.'
        },
        {
          heading: '3. Natural Mood Elevation & Focus Improvement',
          text: 'Rhythmic, high-flying movement stimulates the immediate release of endorphins, dopamine, and serotonin. Children leave trampoline sessions feeling energized yet calm, with proven improvements in classroom focus and deep, restful sleep patterns at night.'
        },
        {
          heading: '4. Safe Progression from Basics to Aerial Acrobatics',
          text: 'Under the supervision of trained court marshals, kids learn proper two-foot landing mechanics, safe knee tucks, and seat drops. Developing these motor skills under structured guidance instills physical confidence and encourages a lifelong love of physical activity.'
        }
      ],
      takeaways: [
        'Always bounce in the center of the trampoline bed.',
        'Follow the strict one-jumper-per-trampoline guideline.',
        'Wear certified traction grip socks to prevent slipping.'
      ]
    },
    {
      id: 'why-indoor-play-is-great-for-growing-kids',
      title: 'Why Indoor Play Is Great for Growing Kids',
      category: 'Parenting Tips',
      categorySlug: 'parenting-tips',
      date: 'Oct 11, 2026',
      readTime: '5 min read',
      author: 'Dr. Elena Vance',
      authorRole: 'Child Development Specialist',
      image: '../assets/images/blog/Indoor_play_for_kids_2K_20261014014123.jpg',
      excerpt: 'Explore ways indoor play can encourage movement, creativity, and social interaction.',
      sections: [
        {
          heading: '1. Year-Round, Weatherproof Physical Activity',
          text: 'Extreme summer heatwaves, sudden rain downpours, and chilly winter winds often disrupt outdoor park visits. A climate-controlled indoor adventure center guarantees that kids achieve their recommended 60 minutes of daily vigorous exercise 365 days a year in a clean, sanitized environment.'
        },
        {
          heading: '2. Multi-Level Obstacles Inspire Creative Problem Solving',
          text: 'Indoor soft play structures with rope bridges, crawl tunnels, foam ramps, and climbing towers turn movement into a puzzle. Children learn to evaluate risk, plan spatial trajectories, and overcome physical challenges in a completely padded, zero-consequence setting.'
        },
        {
          heading: '3. Fostering Spontaneous Social Connections',
          text: 'Indoor playgrounds bring together children of varied ages and backgrounds. Without the rigid rules of structured team sports, kids naturally invent cooperative games, take turns on slides, and practice empathy and conflict resolution through spontaneous group play.'
        },
        {
          heading: '4. Sensory-Rich Environments for All Learning Styles',
          text: 'From the tactile textures of foam cubes to visual pastel ball pools and acoustic resonance zones, indoor play stimulates multi-sensory development. This diverse sensory input helps regulate nervous systems and promotes healthy brain connectivity.'
        }
      ],
      takeaways: [
        'Schedule play sessions during mid-week afternoons for quieter exploration.',
        'Encourage your child to tackle obstacles independently before stepping in.',
        'Hydrate frequently with fresh water between play zones.'
      ]
    },
    {
      id: 'how-to-plan-perfect-kids-birthday-party',
      title: "How to Plan the Perfect Kids' Birthday Party",
      category: 'Birthday Party Ideas',
      categorySlug: 'birthday-party-ideas',
      date: 'Oct 08, 2026',
      readTime: '6 min read',
      author: 'Samantha Clarke',
      authorRole: 'Celebrations Director',
      image: '../assets/images/blog/Planning_kids_birthday_party_2K_20261014014237.jpg',
      excerpt: 'Learn how to choose a party theme, plan activities, and organize a memorable celebration.',
      sections: [
        {
          heading: '1. Choosing an Engaging, Age-Appropriate Theme',
          text: "A memorable party starts with a cohesive concept that sparks children's imaginations. Popular favorites include our Neon Blacklight Glow Adventure with ultraviolet decor, high-energy Ninja Warrior Tournaments, and colorful Pastel Toddler Wonderlands."
        },
        {
          heading: '2. The Golden Ratio: 90 Minutes Play + 45 Minutes Suite',
          text: "The biggest mistake in children's party planning is rushing the jump time or leaving kids restless in a party room too long. A proven schedule combines 90 minutes of supervised arena play—letting kids expend high energy—followed by 45 minutes in a private dining suite for artisan pizza, singing, and cake presentation."
        },
        {
          heading: '3. Streamlining Invitations and Digital Check-In',
          text: "Ditch paper RSVPs that get lost in backpacks. Use digital invitations that embed the venue's instant online waiver link. When parents complete waivers in advance on their smartphones, your entire guest list bypasses registration lines and jumps immediately."
        },
        {
          heading: '4. Delegating Host Duties to Venue Professionals',
          text: "Parents should enjoy their child's special day rather than serving pizza slices, refilling juice pitchers, and sweeping up wrapping paper. Dedicated party marshals handle suite setup, food delivery, candle lighting, and complete teardown so families can focus entirely on celebrating."
        }
      ],
      takeaways: [
        'Book 3 to 4 weeks in advance for prime weekend celebration slots.',
        'Coordinate dietary needs (gluten-free, dairy-free) ahead of time.',
        'Capture group photo moments during the private suite cake cutting.'
      ]
    },
    {
      id: 'essential-indoor-playground-safety-tips',
      title: 'Essential Indoor Playground Safety Tips',
      category: 'Safety & Wellness',
      categorySlug: 'safety-wellness',
      date: 'Oct 05, 2026',
      readTime: '4 min read',
      author: 'Marcus Miller',
      authorRole: 'Safety & Compliance Lead',
      image: '../assets/images/blog/Indoor_Playground_Safety_Tips_2K_20261014014758.jpg',
      excerpt: 'Understand age guidelines, appropriate play equipment, and the importance of following staff instructions.',
      sections: [
        {
          heading: '1. Strict Adherence to Age-Separated Zones',
          text: 'At PlaySpace, equipment is custom-engineered for specific developmental stages. Our Toddler Village (ages 0–5) features low-impact foam crawlers and gentle micro-slides, insulated by self-closing gates from high-velocity zones like the Extreme Dodgeball Cage and Ninja Obstacle Arena.'
        },
        {
          heading: '2. The Single-Jumper Rule on Trampoline Beds',
          text: 'Trampoline springs are calibrated to rebound individual jumper mass. Allowing multiple jumpers on a single bed creates unpredictable recoil that can cause collisions or uneven landings. Always bounce one jumper per bed, landing centrally with feet shoulder-width apart.'
        },
        {
          heading: '3. Mandatory Grip Socks and Proper Play Apparel',
          text: 'Certified silicone-tread grip socks are mandatory on all bounce courts to provide slip-resistant traction. Jumpers should wear comfortable, athletic clothing free of sharp buckles, studs, jewelry, or dangling cords that could catch on safety nets.'
        },
        {
          heading: '4. Respecting Certified Court Marshals',
          text: 'Our park marshals are certified in Red Cross First Aid, CPR, and ASTM F2970-20 trampoline park standards. Marshals are present on every court to ensure fair rotations, prevent reckless flips, and assist jumpers promptly whenever support is needed.'
        }
      ],
      takeaways: [
        'Never dive headfirst into foam pits or stunt airbags; land on two feet or bottoms.',
        'Empty pockets completely of phones, keys, and coins before stepping on court.',
        'Stay off court padding and transition walkways during bounce heats.'
      ]
    },
    {
      id: 'fun-indoor-activities-for-toddlers',
      title: 'Fun Indoor Activities for Toddlers',
      category: 'Play & Activities',
      categorySlug: 'play-activities',
      date: 'Sep 30, 2026',
      readTime: '5 min read',
      author: 'Chloe Bennett',
      authorRole: 'Early Childhood Movement Educator',
      image: '../assets/images/blog/Fun_Indoor_Activities_for_Toddlers_2K_20261014014917.jpg',
      excerpt: 'Find age-appropriate ideas for exploring, crawling, climbing, and sensory play.',
      sections: [
        {
          heading: '1. Exploring Sanitized Pastel Micro-Ball Pools',
          text: 'For toddlers ages 6 months to 3 years, ball pools offer immersive sensory stimulation. Scooping, rolling, and splashing through soft, non-toxic balls develops hand-eye coordination, depth perception, and gentle motor control in a safe, hygienic environment.'
        },
        {
          heading: '2. Soft Foam Crawl Mounds & Gentle Micro-Ramps',
          text: 'Early walkers gain balance confidence by navigating soft foam mounds, contoured hills, and cushioned ramps. If toddlers lose their footing, they land on high-density padded foam, eliminating tears and reinforcing exploratory curiosity.'
        },
        {
          heading: '3. Interactive Tactile Walls & Sound Wheels',
          text: 'Wall-mounted activities featuring spinning gear wheels, soft sensory exploration pads, and musical chimes engage cognitive curiosity. Toddlers build fine motor dexterity while exploring cause-and-effect relationships.'
        },
        {
          heading: '4. Peekaboo Fabric Tunnels and Sensory Blocks',
          text: 'Crawling through mesh-windowed fabric tunnels and stacking lightweight foam cubes encourages toddlers to test spatial boundaries and engage in early cooperative play alongside other youngsters and parents.'
        }
      ],
      takeaways: [
        'Visit during dedicated Toddler Time mornings (Tue & Thu 9am–11am) for gentle play.',
        'Parents enter free and can guide children directly through all toddler attractions.',
        'Bring non-spill water cups for regular hydration breaks.'
      ]
    },
    {
      id: 'planning-exciting-school-field-trip',
      title: 'Planning an Exciting School Field Trip',
      category: 'Events & Updates',
      categorySlug: 'events-updates',
      date: 'Sep 25, 2026',
      readTime: '5 min read',
      author: 'David Martinez',
      authorRole: 'Youth Programs Coordinator',
      image: '../assets/images/blog/Planning_school_field_trip_kids_2K_20261014015211.jpg',
      excerpt: 'Discover how to organize group visits, coordinate schedules, and prepare children for an indoor adventure.',
      sections: [
        {
          heading: '1. Establishing Group Goals and Curricular Links',
          text: 'Indoor adventure trips combine physical education with team dynamics. Whether reinforcing kinetic physics through trampoline bouncing, encouraging sportsmanship via referee-led dodgeball, or testing resilience on obstacle courses, educators can link field trip activities directly to PE standards.'
        },
        {
          heading: '2. Organizing Bus Transit, Wristbands & Digital Waivers',
          text: 'Smooth school visits require organized arrival protocols. Our group event coordinators provide schools with custom web links to collect parent digital waivers in advance, pre-assign color-coded wristbands, and reserve bus drop-off lanes right at our main entrance.'
        },
        {
          heading: '3. Structured Activity Rotations Across Attraction Zones',
          text: 'To avoid overcrowding, large groups (30 to 200 students) are divided into balanced cohorts. Groups rotate every 25 minutes between Trampoline Courts, Ninja Warrior Courses, Climbing Towers, and Stunt Airbag Zones, ensuring equal access to all activities.'
        },
        {
          heading: '4. Dedicated Chaperone Mezzanine & Observation Lounge',
          text: 'Teachers and adult chaperones enjoy free admission and access to our second-floor air-conditioned mezzanine lounge. Equipped with high-speed Wi-Fi, power outlets, complimentary barista coffee, and panoramic views of every court, supervising large student groups is stress-free.'
        }
      ],
      takeaways: [
        'Book 4 to 6 weeks in advance to secure optimal weekday morning hours.',
        'Take advantage of bundled box-lunch catering with stone-fired pizzas and fruit.',
        'Assign student buddy pairs before boarding the school bus.'
      ]
    },
    {
      id: 'meet-most-exciting-adventure-zones-at-playspace',
      title: 'Meet the Most Exciting Adventure Zones at PLAYSPACE',
      category: 'Indoor Adventures',
      categorySlug: 'indoor-adventures',
      date: 'Sep 20, 2026',
      readTime: '6 min read',
      author: 'Coach Tyler Brooks',
      authorRole: 'Head Park Marshal',
      image: '../assets/images/blog/PLAYSPACE_adventure_zones_2K_20261014014953.jpg',
      excerpt: 'Discover trampoline arenas, ninja courses, climbing zones, slides, and other available attractions.',
      sections: [
        {
          heading: '1. The Mega Trampoline Arena & Wall Rebound Runways',
          text: 'Our flagship arena spans over 60 interconnected springbeds surrounded by 10-foot angled rebound walls. Kids and teens can perform continuous tumbling passes, practice mid-air twists, and bounce up padded walls with maximum safety.'
        },
        {
          heading: '2. Multi-Tier Ninja Warrior Obstacle Course & Warped Wall',
          text: 'Engineered for aspiring young ninjas, this multi-stage obstacle test features swinging monkey rings, floating balance logs, cargo cargo nets, and dual 10-foot and 12-foot curved warped walls with soft foam crash pads underneath.'
        },
        {
          heading: '3. Super Slide Mountain & Zero-Shock Stunt Airbag',
          text: 'Adrenaline seekers can ascend vertical climbing towers and zoom down four-lane wave slides, or leap from elevated launch decks into a massive multi-chamber zero-impact stunt airbag that gently cushions jumpers up to 250 lbs.'
        },
        {
          heading: '4. Extreme Dodgeball Arena & Gladiatorial Battle Beam',
          text: 'Experience team sports like never before in our fully netted dodgeball cages, or grab safe foam pugil sticks for balance duels across a padded beam suspended over thousands of soft foam cubes.'
        }
      ],
      takeaways: [
        'Explore individual zone specs on our Attractions page for age and height details.',
        'Jump Patrol marshals provide free mini-coaching on obstacle techniques.',
        'Friday & Saturday Neon Glow nights transform all 27 zones with UV blacklights and DJ beats.'
      ]
    },
    {
      id: 'five-ways-to-make-family-playtime-more-memorable',
      title: 'Five Ways to Make Family Playtime More Memorable',
      category: 'Parenting Tips',
      categorySlug: 'parenting-tips',
      date: 'Sep 15, 2026',
      readTime: '4 min read',
      author: 'Jessica Taylor',
      authorRole: 'Family Lifestyle Contributor',
      image: '../assets/images/blog/Making_family_playtime_memorable_2K_20261014015513.jpg',
      excerpt: 'Get simple ideas for enjoying quality time, playing together, and creating happy family memories.',
      sections: [
        {
          heading: '1. Jump In and Play Directly Alongside Your Kids',
          text: "The most impactful playtime happens when parents actively join in rather than observing from afar. Slipping into grip socks, bouncing on open courts, and trying a friendly battle beam duel signals to children that their play world is valued, building unbreakable bonds."
        },
        {
          heading: '2. Put Away Digital Screens for the Entire Session',
          text: "Make active play a smartphone-free sanctuary. Pocketing phones for 90 uninterrupted minutes allows parents to be 100% present for their children's triumphant leaps, goofy laughter, and proud 'Watch what I can do!' milestones."
        },
        {
          heading: '3. Create Fun, Low-Stakes Mini-Challenges',
          text: 'Invent playful games such as synchronized family bounces, foam block balancing races, or cooperative scavenger hunts finding specific color markers. Keeping activities lighthearted focuses on joyful laughter rather than fierce competition.'
        },
        {
          heading: '4. Celebrate Small Triumphs and Bravery',
          text: 'Whether conquering the highest slide for the first time, leaping onto the stunt airbag, or mastering the monkey bars, validate your child\'s courage. High-fives and words of affirmation build deep self-confidence that transfers into school and daily life.'
        },
        {
          heading: '5. Wrap Up with a Relaxing Fuel Zone Debrief',
          text: 'After high-energy play, sit together at the Fuel Zone Café for a slice of artisan pizza or a refreshing fruit smoothie. Asking children about their favorite jump moments turns an afternoon outing into a treasured family tradition.'
        }
      ],
      takeaways: [
        'Family 4-Pack bundles include passes, grip socks, pizza, and drinks at a $35 discount.',
        'Schedule regular monthly active play dates to maintain consistent bonding.',
        'Capture one commemorative family selfie by the photo wall before heading home.'
      ]
    },
    {
      id: 'the-magic-of-neon-glow-nights',
      title: 'The Magic of Neon Glow Nights: What Parents & Kids Can Expect',
      category: 'Events & Updates',
      categorySlug: 'events-updates',
      date: 'Oct 16, 2026',
      readTime: '5 min read',
      author: 'Coach Maya Lin',
      authorRole: 'Youth Events & Entertainment Director',
      image: '../assets/images/blog/Parents_and_kids_experiencing_ne%E2%80%A6_2K_20261014015508.jpg',
      excerpt: 'Discover how UV blacklights, glowing wristbands, energetic music, and neon attractions transform weekend nights at PLAYSPACE.',
      sections: [
        {
          heading: '1. A Total Visual Transformation with Cosmic Blacklights',
          text: 'Every Friday and Saturday evening, the standard arena lighting dims and high-powered ultraviolet blacklights flood our 35,000-square-foot facility. Trampoline mats, climbing ropes, foam cubes, and perimeter boundaries radiate in electric neons, creating an immersive, otherworldly playground where jumpers feel like they are floating in outer space.'
        },
        {
          heading: '2. What to Wear: Maximizing the Glow Effect',
          text: 'To make the most of the experience, dress in fluorescent neon colors—hot pink, electric green, vivid yellow, and bright orange—or crisp white shirts that ignite under UV rays. Every jumper receives a complimentary glowing wristband and UV necklace at check-in, and our welcome booth features child-safe, washable neon face paint for added fun.'
        },
        {
          heading: '3. High-Octane DJ Soundtracks & Cosmic Games',
          text: 'Neon Glow Nights bring festival energy tailored for kids and families. Our live guest DJs spin upbeat, family-friendly chart tracks and dance favorites. Marshals organize glow-in-the-dark dodgeball tournaments with illuminated foam balls, cosmic limbo competitions, and synchronized jump waves across the Mega Trampoline Arena.'
        },
        {
          heading: '4. Certified Safety in a Low-Light Environment',
          text: 'While the ambiance feels delightfully dramatic, safety remains our highest priority. All landing zones, trampoline borders, stairs, and structural pillars are highlighted with high-visibility luminescent safety markings. Additional court marshals equipped with lighted identification vests monitor all active zones to ensure safe spacing and rotations.'
        }
      ],
      takeaways: [
        'Book in advance online—Neon Glow Night sessions frequently reach full park capacity.',
        'Wear white or fluorescent clothing and mandatory PlaySpace traction grip socks.',
        'Parents can relax in the second-floor lounge with coffee and panoramic glowing court views.'
      ]
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize Blog Listing Page (blog.html)
    initBlogListing();

    // 2. Initialize Blog Detail Page (blog-details.html)
    initBlogDetail();
  });

  /**
   * Initialize Search & Filtering on blog.html
   */
  function initBlogListing() {
    var searchInput = document.getElementById('ps-blog-search');
    var filterButtons = document.querySelectorAll('#ps-blog-filters .ps-filter-btn');
    var blogCards = document.querySelectorAll('.ps-blog-card');
    var countEl = document.getElementById('ps-blog-count');
    var noResultsEl = document.getElementById('ps-blog-no-results');

    if (!blogCards.length) return;

    var activeCategory = 'all';
    var searchQuery = '';

    function filterCards() {
      var visibleCount = 0;

      blogCards.forEach(function (card) {
        var cardCategory = card.getAttribute('data-category') || '';
        var title = (card.querySelector('h3, h4')?.textContent || '').toLowerCase();
        var excerpt = (card.querySelector('p')?.textContent || '').toLowerCase();
        var categoryText = (card.querySelector('.ps-blog-meta')?.textContent || '').toLowerCase();

        var matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
        var matchesSearch = !searchQuery ||
          title.includes(searchQuery) ||
          excerpt.includes(searchQuery) ||
          categoryText.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countEl) {
        countEl.textContent = 'Showing ' + visibleCount + ' of ' + blogCards.length + ' Articles';
      }

      if (noResultsEl) {
        noResultsEl.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = this.value.toLowerCase().trim();
        filterCards();
      });
    }

    if (filterButtons.length) {
      filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          filterButtons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          activeCategory = btn.getAttribute('data-category') || 'all';
          filterCards();
        });
      });
    }
  }

  /**
   * Initialize Dynamic Article Renderer on blog-details.html
   */
  function initBlogDetail() {
    var detailContainer = document.getElementById('ps-article-container');
    if (!detailContainer) return;

    var urlParams = new URLSearchParams(window.location.search);
    var articleId = urlParams.get('id') || urlParams.get('article');

    var article = null;
    if (articleId) {
      article = ARTICLES.find(function (a) { return a.id === articleId; });
    }
    if (!article) {
      article = ARTICLES[0];
    }

    renderArticleDetail(article);
  }

  function renderArticleDetail(article) {
    if (!article) return;

    // Update browser title
    document.title = article.title + ' | PlaySpace Blog';

    // Update Breadcrumb & Header
    var breadcrumbEl = document.getElementById('ps-article-breadcrumb');
    if (breadcrumbEl) breadcrumbEl.textContent = article.title;

    var titleEl = document.getElementById('ps-article-title');
    if (titleEl) titleEl.textContent = article.title;

    // Update Meta
    var metaEl = document.getElementById('ps-article-meta');
    if (metaEl) {
      metaEl.innerHTML = [
        '<span class="ps-badge" style="background:var(--ps-yellow);color:#000;font-weight:800;">' + article.category.toUpperCase() + '</span>',
        '<span>Published ' + article.date + '</span>',
        '<span>• ' + article.readTime + '</span>',
        '<span>• By ' + article.author + ' (' + article.authorRole + ')</span>'
      ].join(' ');
    }

    // Update Main Image
    var imgEl = document.getElementById('ps-article-img');
    if (imgEl) {
      imgEl.src = article.image;
      imgEl.alt = article.title;
    }

    // Update Body
    var bodyEl = document.getElementById('ps-article-body');
    if (bodyEl) {
      var html = [];
      html.push('<p class="lead" style="font-weight:600;font-size:1.15rem;line-height:1.6;color:var(--ps-text-main);margin-bottom:2rem;">' + article.excerpt + '</p>');

      if (article.sections && article.sections.length) {
        article.sections.forEach(function (sec) {
          html.push('<h3 style="margin-top:2rem;margin-bottom:0.75rem;font-size:1.35rem;color:var(--ps-text-main);">' + sec.heading + '</h3>');
          html.push('<p style="color:var(--ps-text-muted);line-height:1.7;font-size:1rem;margin-bottom:1.5rem;">' + sec.text + '</p>');
        });
      }

      if (article.takeaways && article.takeaways.length) {
        html.push('<div style="background:rgba(255,204,0,0.1);border-left:4px solid var(--ps-yellow);padding:1.5rem 1.75rem;border-radius:0 var(--ps-radius-md) var(--ps-radius-md) 0;margin:2.5rem 0;">');
        html.push('  <h4 style="margin:0 0 0.75rem 0;color:var(--ps-text-main);">★ Key PlaySpace Takeaways</h4>');
        html.push('  <ul style="margin:0;padding-left:1.25rem;color:var(--ps-text-main);line-height:1.7;">');
        article.takeaways.forEach(function (t) {
          html.push('    <li>' + t + '</li>');
        });
        html.push('  </ul>');
        html.push('</div>');
      }

      bodyEl.innerHTML = html.join('\n');
    }

    // Update Related Articles
    renderRelatedArticles(article.id);
  }

  function renderRelatedArticles(currentId) {
    var relatedGrid = document.getElementById('ps-article-related-grid');
    if (!relatedGrid) return;

    var others = ARTICLES.filter(function (a) { return a.id !== currentId; }).slice(0, 3);
    var html = [];

    others.forEach(function (other) {
      html.push([
        '<div class="ps-blog-card">',
        '  <div class="ps-blog-thumb">',
        '    <img src="' + other.image + '" alt="' + other.title + '" loading="lazy">',
        '  </div>',
        '  <div class="ps-blog-body">',
        '    <div class="ps-blog-meta">',
        '      <span>' + other.category + '</span> • <span>' + other.readTime + '</span>',
        '    </div>',
        '    <h4 style="margin:0 0 0.5rem 0;font-size:1.1rem;line-height:1.35;">' + other.title + '</h4>',
        '    <p class="text-muted" style="font-size:0.88rem;flex-grow:1;line-height:1.5;margin-bottom:1rem;">' + other.excerpt + '</p>',
        '    <a href="blog-details.html?id=' + other.id + '" class="ps-btn ps-btn-dark ps-btn-sm">Read Article →</a>',
        '  </div>',
        '</div>'
      ].join('\n'));
    });

    relatedGrid.innerHTML = html.join('\n');
  }

  // Expose API
  window.PlaySpaceBlog = {
    data: ARTICLES,
    getArticle: function (id) {
      return ARTICLES.find(function (a) { return a.id === id; });
    }
  };
})();
