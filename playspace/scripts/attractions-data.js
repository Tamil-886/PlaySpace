/**
 * PlaySpace - Comprehensive Attraction Zones Dataset
 * All 21 unique attraction zones with detailed, bespoke content for individual pages.
 */

const ATTRACTION_ZONES = [
  {
    id: "mega-trampoline-arena",
    num: 1,
    title: "Mega Trampoline Arena",
    category: "trampolines",
    categoryLabel: "Trampoline Zones",
    tagline: "Defy gravity on 14,000 sq ft of interconnected Olympic springbeds with 45-degree rebound walls!",
    heroImage: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224655.jpg",
    description: "Jump high, bounce freely, and enjoy energetic jumping challenges across our flagship court designed for jumpers of all ages.",
    specs: ["14,000 Sq Ft", "70+ Bounce Mats", "Angled Rebound Walls"],
    footwear: "PlaySpace Rubber Grip Socks Mandatory",
    about: "The Mega Trampoline Arena is the pounding heartbeat of PlaySpace — a colossal 14,000-square-foot matrix of seamlessly welded steel frames and high-tensile Olympic springbeds. Designed in strict compliance with ASTM F2970 safety standards, jumpers can seamlessly transition from flat runways to 45-degree angled rebound walls that let you bounce off the perimeter like an acrobatic superhero.<br><br>Whether you are practicing rhythmic tuck-jumps, performing synchronized aerial routines with friends, or simply letting boundless energy bounce away, our arena provides unparalleled kinetic rebound with 2-inch cross-linked polyethylene safety padding across all structural steel dividers.",
    activities: [
      { title: "Open Flight Jumping", desc: "Experience pure weightlessness bouncing across expansive interconnected springbeds." },
      { title: "Wall-Run Leaps", desc: "Rebound off 45-degree angled padded walls to achieve incredible aerial heights and spins." },
      { title: "Tumble Track Passes", desc: "Perform cartwheels, handsprings, and long-stride tumble sequences along 40-foot cushioned runways." },
      { title: "Synchronized Family Bounces", desc: "Enjoy cooperative jump challenges and rhythmic bounce games with court marshal guidance." }
    ],
    features: [
      "Heavy-duty Olympic woven nylon springbeds with zero-pinch coil covers",
      "45-degree angled peripheral rebound walls for wall-running acrobatics",
      "Continuous 2-inch high-density closed-cell polyethylene seam padding",
      "Dedicated court marshals stationed on elevated vantage platforms at all times",
      "ASTM F2970-20 certified structural frames engineered for commercial dynamic loads"
    ],
    ageGroup: "Ages 4+ (All Ages & Adults Welcome)",
    agePolicy: {
      minimumAge: "4 Years (Jumpers 4–6 must have an active adult jumping or observing on court)",
      heightWeight: "Max weight limit 260 lbs (118 kg). No minimum height requirement.",
      supervision: "1 adult observer per 2 young children recommended. Court marshals provide active supervision.",
      equipment: "Mandatory PlaySpace rubber-tread grip socks required for all jumpers."
    },
    safetyGuidelines: [
      "Strictly 1 jumper per trampoline mat at any time — double bouncing is strictly prohibited.",
      "Always land on two feet or seated seat-drop position with arms tucked across your chest.",
      "Never attempt flips, inverted tricks, or dives head-first without prior marshal certification.",
      "Pockets must be completely emptied into security lockers; no keys, phones, or jewelry permitted on court.",
      "Rest immediately along padded perimeter walkways if feeling fatigued or lightheaded."
    ],
    gallery: [
      { url: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224636.jpg", caption: "High-flying leaps over the 70-bed interconnected trampoline matrix." },
      { url: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224641.jpg", caption: "Kids practicing bounce techniques on padded tumble tracks." },
      { url: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224651.jpg", caption: "Spacious court layout featuring 45-degree rebound perimeter walls." }
    ],
    benefits: [
      { title: "Cardiovascular Endurance", desc: "Bouncing burns 3x more calories than jogging while being gentle on growing joints." },
      { title: "Vestibular Balance", desc: "Frequent aerial adjustments sharpen spatial awareness and inner-ear equilibrium." },
      { title: "Endorphin Energy Release", desc: "A high-octane sensory outlet that releases built-up school stress and promotes restful sleep." },
      { title: "Confidence & Core Strength", desc: "Stabilizing landings strengthens abdominals, calves, and postural back muscles." }
    ],
    faqs: [
      { q: "Can adults jump in the Mega Trampoline Arena with their kids?", a: "Yes! Our commercial trampoline beds are engineered to support adult jumpers up to 260 lbs. We actively encourage parents to jump alongside their children!" },
      { q: "Do I have to buy PlaySpace grip socks?", a: "Yes. For hygiene and traction safety, approved non-slip grip socks ($3/pair, reusable) are mandatory for all participants." },
      { q: "Is there a time limit on the trampoline arena?", a: "Your play pass grants all-inclusive access to the trampoline arena for your entire booked duration (60, 90, or 120 minutes)." }
    ],
    related: ["ninja-warrior-course", "foam-pit-challenge", "parkour-jump-zone"]
  },
  {
    id: "ninja-warrior-course",
    num: 2,
    title: "Ninja Warrior Course",
    category: "climbing",
    categoryLabel: "Adventure & Climbing Zones",
    tagline: "Climb, crawl, balance, and conquer exciting obstacle challenges inspired by real ninja warrior courses!",
    heroImage: "../assets/images/attractions/Ninja%20Warrior%20Course/Child_running_ninja_course_2K_20261013225811.jpg",
    description: "Climb, crawl, balance, and conquer exciting obstacle challenges that test your grip, speed, and agility.",
    specs: ["10ft Warped Wall", "Ring Swings", "Quintuple Steps"],
    footwear: "Grip Socks or Clean Athletic Sneakers",
    about: "Channel your inner ninja across our triple-lane obstacle gauntlet! The Ninja Warrior Course is specifically engineered for active kids and energetic teens who want to test their grit, balance, and agility. Featuring suspended ring swings, horizontal cargo traverses, rolling balance logs, and the iconic dual curved warped walls (8ft and 10ft), this course brings prime-time television excitement right to Adventure City.<br><br>The entire course is suspended directly over a 4-foot deep bed of zero-shock foam cubes and high-density safety mats, guaranteeing that any slip or fall results in an ultra-cushioned, giggly soft landing.",
    activities: [
      { title: "Warped Wall Sprint", desc: "Charge up the curved 8-foot or 10-foot wooden ramp and hit the victory buzzer at the summit." },
      { title: "Suspended Ring Traverse", desc: "Swing hand-over-hand across dynamic hanging rings and cannonball grips without touching the ground." },
      { title: "Quintuple Agility Steps", desc: "Leap between 5 angled foam steps at lightning speed to test footwork precision and balance." },
      { title: "Cargo Net Spider Crawl", desc: "Scramble horizontally across heavy-duty braided marine nets suspended in mid-air." }
    ],
    features: [
      "Dual-height curved warped wall with automatic electronic summit buzzers and countdown timers",
      "Quintuple angled agility balance steps engineered with high-friction rubberized surfaces",
      "Modular suspended ring, rope, and grip holds adjustable for different skill and age levels",
      "Under-lane zero-shock foam pit cushions that absorb all falls safely and comfortably",
      "Color-coded green (beginner), yellow (intermediate), and black (pro) difficulty lanes"
    ],
    ageGroup: "Ages 6 - 15 Years (Min 44\" Height)",
    agePolicy: {
      minimumAge: "6 Years old. Participants under 6 are encouraged to enjoy the Toddler Trail or Little Explorers Zone.",
      heightWeight: "Minimum height: 44 inches (112 cm). Maximum weight: 220 lbs (100 kg).",
      supervision: "Dedicated Ninja Marshals oversee each run. Spectator viewing platforms line both sides.",
      equipment: "Grip socks mandatory. Athletic attire recommended; no loose hanging cords or jewelry."
    },
    safetyGuidelines: [
      "Strictly 1 participant per obstacle lane at any time — wait for the lane ahead to be completely clear.",
      "If you lose grip, cross your arms across your chest and fall relaxed onto the safety foam landing bed.",
      "Never push, shove, or pull on fellow competitors while traversing suspended obstacles.",
      "Do not attempt to jump down backwards from the top of the warped wall — use the padded side exit staircase.",
      "Follow designated directional arrows from the starting platform to the finish platform only."
    ],
    gallery: [
      { url: "../assets/images/attractions/Ninja%20Warrior%20Course/Child_running_ninja_course_2K_20261013225811.jpg", caption: "Jumpers tackling suspended ring grips over cushioned safety landing pads." },
      { url: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80", caption: "Climbers testing their upper-body strength on the horizontal rope traverse." },
      { url: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80", caption: "Sprinting up the 10ft warped wall to strike the summit buzzer." }
    ],
    benefits: [
      { title: "Upper-Body & Grip Stamina", desc: "Swinging hand-to-hand dramatically builds forearm, lat, and finger strength." },
      { title: "Dynamic Agility & Coordination", desc: "Navigating shifting balance beams and angled steps hones quick motor reflexes." },
      { title: "Resilience & Grit", desc: "Missing an obstacle teaches perseverance — falling into foam is just an invitation to try again!" },
      { title: "Spatial Problem Solving", desc: "Kids rapidly assess distance, momentum, and route planning before taking each leap." }
    ],
    faqs: [
      { q: "Is the Ninja Warrior Course safe for beginner climbers?", a: "Absolutely! We feature three clearly marked lanes ranging from beginner green steps to advanced black grips, all cushioned by deep foam pits." },
      { q: "Can kids time their ninja runs?", a: "Yes! Each lane has start and stop digital sensor buzzers that display live times on our arena leaderboard." },
      { q: "Do kids need climbing shoes?", a: "No, standard PlaySpace non-slip grip socks or clean athletic shoes with non-marking rubber soles are perfect." }
    ],
    related: ["adventure-climbing-zone", "cargo-net-climber", "parkour-jump-zone"]
  },
  {
    id: "adventure-climbing-zone",
    num: 3,
    title: "Adventure Climbing Zone",
    category: "climbing",
    categoryLabel: "Adventure & Climbing Zones",
    tagline: "Reach new heights with certified hydraulic auto-belay towers and colorful themed climbing routes!",
    heroImage: "../assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil%E2%80%A6_2K_20261013230351.jpg",
    description: "Explore climbing frames, fun pathways, and exciting elevated play structures with 100% fail-safe auto-belay descenders.",
    specs: ["Auto-Belay Spires", "Vertical Routes", "Soft Landing Mat"],
    footwear: "Grip Socks or Clean Rubber-Soled Athletic Shoes",
    about: "Scale colorful spires, glowing Tetris-style geometric faces, and vertical speed challenges in the Adventure Climbing Zone! Designed with state-of-the-art TRUBLUE magnetic auto-belay descent systems, climbers can safely reach heights of up to 24 feet before being lowered in an ultra-smooth, controlled, feather-soft descent back to the cushioned floor.<br><br>Every tower offers a distinct visual theme and grip texture — from giant spiral telephone poles and illuminated neon speed columns to textured faux-rock surfaces tailored for beginners and aspiring rock climbers alike.",
    activities: [
      { title: "Auto-Belay High Tower Ascent", desc: "Clip in with certified harness gear and climb vertical spires up to 24 feet high." },
      { title: "Timed Dual Speed Races", desc: "Race side-by-side against friends or siblings on mirrored vertical tracks with digital summit timers." },
      { title: "Themed Tetris Route Climbing", desc: "Navigate oversized colorful geometric blocks that challenge grip placement and foot positioning." },
      { title: "Feather-Soft Auto Descent", desc: "Let go at the summit and enjoy a gentle, magnetic-brake controlled drift back down to the safety mat." }
    ],
    features: [
      "Commercial TRUBLUE magnetic eddy-current auto-belay descenders for 100% automated descent safety",
      "8 distinct themed vertical spires including Speed Towers, Tetris Blocks, and Spiral Spires",
      "Digital touch timers at summit peaks for friendly time-trial competitions",
      "Ergonomic, non-abrasive molded polyhedral holds designed specifically for young hands",
      "ACCT Level 3 safety certified operators conducting daily harness and cable pull tests"
    ],
    ageGroup: "Ages 5 - 14 Years",
    agePolicy: {
      minimumAge: "5 Years old (Harness must securely fit around waist and thighs).",
      heightWeight: "Weight range: 30 lbs to 250 lbs (14 kg to 113 kg) to engage magnetic brake descenders.",
      supervision: "Staff marshals inspect and double-check all clip-ins before every ascent.",
      equipment: "PlaySpace full-body or sit-harness provided on-site. Grip socks or sneakers required."
    },
    safetyGuidelines: [
      "Always allow a certified PlaySpace climbing marshal to attach and double-check your auto-belay carabiner.",
      "Clear the designated drop zone below before descending — look down to ensure nobody is on the landing pad.",
      "Climb with two hands and both feet on holds; never grab onto the safety cable itself while ascending.",
      "Keep shoes or grip socks dry and free of debris for maximum grip traction.",
      "If you slip or need to stop, push away gently from the wall with both feet and allow the auto-belay to catch you."
    ],
    gallery: [
      { url: "../assets/images/attractions/Adventure%20Climbing%20Zone/Adventure_climbing_zone_for_chil%E2%80%A6_2K_20261013230351.jpg", caption: "Climbers ascending illuminated auto-belay spires in full safety harnesses." },
      { url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80", caption: "Reaching the summit and tapping the electronic finish buzzer." },
      { url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80", caption: "Feather-soft controlled magnetic descents back down to the padded landing floor." }
    ],
    benefits: [
      { title: "Confidence & Overcoming Fears", desc: "Reaching the summit empowers children with a profound sense of self-belief." },
      { title: "Fine & Gross Motor Dexterity", desc: "Carefully coordinating handholds and toe placement sharpens neuromuscular control." },
      { title: "Core & Leg Power", desc: "Pushing upward from holds develops quads, calves, and stabilizing abdominal muscles." },
      { title: "Strategic Route Planning", desc: "Climbers mentally plot their moves 2 steps ahead to solve vertical spatial puzzles." }
    ],
    faqs: [
      { q: "Do kids need prior climbing experience?", a: "Not at all! Our spires are designed with beginner-friendly handholds, and auto-belays make descending effortless and worry-free." },
      { q: "Are harnesses provided?", a: "Yes, certified safety climbing harnesses in multiple kid and teen sizes are provided at no extra charge." },
      { q: "How many climbers can use the towers at once?", a: "Up to 8 climbers can scale our towers simultaneously, each on an independent auto-belay line." }
    ],
    related: ["spider-wall-climb", "adventure-tower", "sky-high-rope-adventure"]
  },
  {
    id: "super-slide-mountain",
    num: 4,
    title: "Super Slide Mountain",
    category: "softplay",
    categoryLabel: "Soft Play & Toddler Zones",
    tagline: "Race down vibrant 4-lane racing slides and 360-degree corkscrew speed tubes into ultra-padded landing bays!",
    heroImage: "../assets/images/attractions/Super%20Slide%20Mountain/Super_Slide_Mountain_2K_20261013231315.jpg",
    description: "Race down colorful slides and enjoy thrilling rides into the soft-play area with safe, padded deceleration lanes.",
    specs: ["4-Lane Racing Slides", "Spiral Speed Tubes", "Cushioned Runout"],
    footwear: "Grip Socks Required (Socks decrease friction safely)",
    about: "Towering 18 feet above the soft play kingdom, Super Slide Mountain is the ultimate high-speed sliding adventure for kids! Featuring four rainbow-striped racing lanes side-by-side, plus twin enclosed 360-degree corkscrew tube slides, kids can challenge friends to exciting gravity-powered speed runs.<br><br>Crafted from commercial anti-static, anti-friction rotationally molded polyethylene with deep cushioned foam deceleration runout bays at the bottom, every slide delivers thrilling velocity with gentle, fail-safe deceleration.",
    activities: [
      { title: "Quad Rainbow Racing", desc: "Line up 4 riders across simultaneous lanes and race to the bottom on the count of three." },
      { title: "Enclosed Corkscrew Tube", desc: "Twist through a 360-degree dark spiral slide before popping out into the vibrant landing zone." },
      { title: "Wavy Drop Speed Runs", desc: "Experience airtime crests and fun dips on the undulating multi-bump speed slide." },
      { title: "Padded Soft Landings", desc: "Glide seamlessly into zero-shock deceleration runouts lined with high-density foam buffers." }
    ],
    features: [
      "4-lane side-by-side rainbow racing slides with divider barriers to keep riders in lanes",
      "Twin 360-degree fully enclosed translucent spiral tube slides with internal ambient light strips",
      "Anti-static, anti-friction rotationally molded food-grade polyethylene construction",
      "High-density foam deceleration runout zones preventing abrupt stops",
      "One-way padded entry gates at summit monitored by trained slide marshals"
    ],
    ageGroup: "Ages 3 - 12 Years",
    agePolicy: {
      minimumAge: "3 Years old (Toddlers under 4 should slide with an accompanying parent or use mini toddler slides).",
      heightWeight: "Max rider weight: 200 lbs (90 kg). No height restrictions.",
      supervision: "Slide marshals manage line queues at top and bottom to ensure lanes are clear before each rider launches.",
      equipment: "Grip socks mandatory; no wet clothing, plastic zippers, or metal buttons."
    },
    safetyGuidelines: [
      "Always slide seated facing forward with feet out in front and arms crossed across your chest.",
      "Wait for the green light from the slide marshal confirming the landing zone is completely clear.",
      "Never slide head-first, on your stomach, backwards, or standing up.",
      "Exit the landing deceleration bay immediately upon coming to a stop — do not linger in runout lanes.",
      "Never climb back up the slide lanes from the bottom — use the padded stairs to return to the top."
    ],
    gallery: [
      { url: "../assets/images/attractions/Super%20Slide%20Mountain/Super_Slide_Mountain_2K_20261013231315.jpg", caption: "Four racing lanes lined up for adrenaline-pumping downhill races." },
      { url: "https://images.unsplash.com/photo-1780932333368-4995b2e14174?auto=format&fit=crop&w=800&q=80", caption: "Cushioned deceleration runout bays ensuring gentle, giggly landings." },
      { url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80", caption: "Enclosed spiral speed tube providing 360 degrees of exciting twists." }
    ],
    benefits: [
      { title: "Spatial Velocity Processing", desc: "Experiencing rapid motion teaches children to predict momentum and speed safely." },
      { title: "Friendly Social Play", desc: "Racing side-by-side encourages friendly competition and turn-taking teamwork." },
      { title: "Pure Joy & Dopamine", desc: "The sensation of sliding releases pure childhood joy and creates uninhibited laughter." },
      { title: "Postural Stability", desc: "Maintaining an upright seated sliding posture engages core abdominal stabilizers." }
    ],
    faqs: [
      { q: "Can parents slide down with their young kids?", a: "Yes, our wide rainbow lanes allow an adult to hold a young toddler (ages 3+) comfortably on their lap." },
      { q: "Is the slide static-free?", a: "Yes, our slides are treated with commercial anti-static coatings so kids don't experience static zaps." },
      { q: "How do kids get to the top?", a: "Access to the slide summit is via padded non-slip carpeted stairwells inside our multi-tier soft play structure." }
    ],
    related: ["volcano-climb", "soft-play-zone", "rainbow-ball-pit"]
  },
  {
    id: "rainbow-ball-pit",
    num: 5,
    title: "Rainbow Ball Pit",
    category: "softplay",
    categoryLabel: "Soft Play & Toddler Zones",
    tagline: "Dive into over 60,000 colorful, UV-C sanitized balls with interactive pneumatic vacuum chutes and drop buckets!",
    heroImage: "../assets/images/attractions/Rainbow%20Ball%20Pit/Rainbow_Ball_Pit_2K_20261013231429.jpg",
    description: "Dive into a colorful ball pool filled with playful activities, sensory chutes, and sparkling clean surprises.",
    specs: ["60,000+ Clean Balls", "UV-C Sanitized Daily", "Sensory Chutes"],
    footwear: "Grip Socks Required",
    about: "A kaleidoscope of vibrant color and sensory wonder awaits in the Rainbow Ball Pit! Holding over 60,000 commercial anti-microbial hollow plastic balls, this expansive play lagoon allows kids to swim, splash, and sink safely into a tactile sea of joy.<br><br>Equipped with interactive pneumatic ball vacuum pipes, target hoppers, and an overhead tipping bucket that rains colorful balls down every few minutes, it is an irresistible paradise. Best of all for parents, our balls are processed daily through automated commercial UV-C ball washing machinery that sanitizes 15,000 balls per hour with hospital-grade disinfectant.",
    activities: [
      { title: "Pneumatic Vacuum Pipes", desc: "Feed balls into transparent suction tubes and watch them zip through overhead tubes to the dump bucket." },
      { title: "Tipping Bucket Splash", desc: "Gather below the giant ceiling bucket as it fills and countdown to the dramatic rainbow ball drop." },
      { title: "Sensory Ball Swimming", desc: "Glide through the buoyant sea of spheres to experience full-body proprioceptive pressure." },
      { title: "Target Toss Challenge", desc: "Aim and toss color-coded balls into wall-mounted illuminated target rings to score points." }
    ],
    features: [
      "Over 60,000 food-grade non-toxic crush-proof polyethylene balls in 6 vibrant rainbow shades",
      "Interactive electric vacuum suction pipes and transparent overhead transit tubes",
      "Automated overhead tipping dump bucket with warning lights and countdown chimes",
      "Hospital-grade daily sanitization via high-speed automated UV-C ball washing system",
      "Ramped padded entry and exit stairs with soft handrails for secure footing"
    ],
    ageGroup: "Ages 1 - 6 Years",
    agePolicy: {
      minimumAge: "1 Year old (Infants 1–2 must be accompanied by an adult inside the ball pit).",
      heightWeight: "Depth is 24 inches (60 cm) — perfect for safe wading and gentle submersion.",
      supervision: "Parents can sit comfortably on padded perimeter benches with 100% line-of-sight.",
      equipment: "Grip socks mandatory. All jewelry, hairpins, and pacifier clips must be removed."
    },
    safetyGuidelines: [
      "No head-first diving or jumping from heights into the ball pit — slide or step in gently.",
      "Never bury children completely underneath balls — faces and heads must always remain visible.",
      "Do not throw balls outside of the designated padded pit enclosure into walking aisles.",
      "Keep food, drinks, shoes, and sharp objects strictly outside the ball pit area.",
      "Exit immediately if shoes, socks, or small objects are dropped, and notify a marshal for assistance."
    ],
    gallery: [
      { url: "../assets/images/attractions/Rainbow%20Ball%20Pit/Rainbow_Ball_Pit_2K_20261013231429.jpg", caption: "Thousands of clean rainbow balls creating an immersive sensory playground." },
      { url: "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=800&q=80", caption: "Toddlers exploring pneumatic vacuum tubes and colorful target games." },
      { url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80", caption: "Deep cushioned ball pool providing gentle sensory pressure and endless giggles." }
    ],
    benefits: [
      { title: "Tactile Sensory Integration", desc: "The deep pressure of surrounding spheres calms the nervous system and relaxes active children." },
      { title: "Color Recognition & Sorting", desc: "Children naturally practice color grouping, counting, and hand-eye coordination while playing." },
      { title: "Motor Planning in Fluid Mediums", desc: "Wading through spheres strengthens stabilizing leg muscles and hip balance." },
      { title: "Cause-and-Effect Discovery", desc: "Watching vacuum tubes transport balls teaches basic physics and pneumatic mechanics." }
    ],
    faqs: [
      { q: "How often are the ball pit balls cleaned?", a: "Every single day! We run all 60,000+ balls through our commercial UV-C washer and organic antibacterial cleaning bath." },
      { q: "Is the pit deep enough for toddlers?", a: "The ball pit has a graduated depth from 12 inches for tiny toddlers up to 24 inches for preschoolers." },
      { q: "Can parents sit in the pit with their child?", a: "Yes, parents are welcome to step in and assist their little ones or relax on the perimeter cushioned rim." }
    ],
    related: ["little-explorers-zone", "soft-play-zone", "super-slide-mountain"]
  },
  {
    id: "sky-high-rope-adventure",
    num: 6,
    title: "Sky-High Rope Adventure",
    category: "climbing",
    categoryLabel: "Adventure & Climbing Zones",
    tagline: "Test balance, nerve, and aerial agility across suspended rope bridges and wobble planks high above the park!",
    heroImage: "../assets/images/attractions/Sky-High%20Rope%20Adventure/Child_climbing_rope_adventure_2K_20261013231646.jpg",
    description: "Test balance and coordination on exciting rope bridges and net obstacles with continuous overhead lifeline protection.",
    specs: ["Suspension Bridges", "Wobble Planks", "Overhead Safety Line"],
    footwear: "Grip Socks or Closed-Toe Athletic Shoes Required",
    about: "Hovering 12 feet above the main concourse, the Sky-High Rope Adventure gives kids the thrill of an outdoor canopy trek in a temperature-controlled, ultra-safe indoor environment. Participants wear a full-body harness secured by a continuous overhead rolling lifeline trolley that follows them seamlessly across every bridge, wobble log, and swinging plank.<br><br>With 12 progressive obstacles ranging from zig-zag suspension bridges to floating lily pads and net crossings, kids build courageous balance step-by-step while taking in sweeping panoramic views of the entire PlaySpace park.",
    activities: [
      { title: "Wobble Plank Crossing", desc: "Step carefully across suspended hardwood planks that sway gently beneath your feet." },
      { title: "Zig-Zag Cable Traverse", desc: "Navigate tensioned steel foot cables using dual handrails to maintain aerial equilibrium." },
      { title: "Suspension Net Bridge", desc: "Stride across a flexible rope hammock bridge spanning 25 feet across the arena floor." },
      { title: "Floating Lily Pads", desc: "Hop between suspended circular platforms testing foot placement and center of gravity." }
    ],
    features: [
      "Continuous closed-track overhead safety lifeline — riders cannot unclip mid-course",
      "Full-body kid-sized safety harnesses with padded shoulder and leg straps",
      "12 interconnected aerial obstacles at 12-foot elevation with 360-degree safety netting",
      "Certified high-ropes course marshals guiding every participant through pre-flight briefing",
      "Dual emergency egress ladders and hydraulic lower-off rescue systems on standby"
    ],
    ageGroup: "Ages 6 - 14 Years (Min 46\" Height)",
    agePolicy: {
      minimumAge: "6 Years old. Climbers 6–8 may be accompanied by a harnessed adult or marshal.",
      heightWeight: "Minimum height: 46 inches (117 cm). Maximum weight: 220 lbs (100 kg).",
      supervision: "Dedicated high-ropes operator stations oversee launch, mid-course, and landing platforms.",
      equipment: "Full harness and tether supplied by PlaySpace. Closed-toe shoes or grip socks mandatory."
    },
    safetyGuidelines: [
      "Staff must verify and lock your overhead lifeline trolley before entering the course.",
      "Strictly 1 participant per obstacle bridge span at any time; wait on platforms between bridges.",
      "Keep both hands on overhead or side guide cables while traversing moving bridge elements.",
      "Do not run, intentionally swing harness cables, or bounce vigorously on rope crossings.",
      "If you feel nervous or want to exit, sit down into your harness and alert the marshal for assistance."
    ],
    gallery: [
      { url: "../assets/images/attractions/Sky-High%20Rope%20Adventure/Child_climbing_rope_adventure_2K_20261013231646.jpg", caption: "Young climbers traversing wobbling planks in full safety harnesses." },
      { url: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80", caption: "Overhead lifeline trolley system keeping participants 100% secure throughout." },
      { url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80", caption: "Aerial bridge crossings providing panoramic bird's-eye views of the park." }
    ],
    benefits: [
      { title: "Vestibular Courage", desc: "Overcoming elevation fears builds lasting emotional self-regulation and grit." },
      { title: "Dynamic Center of Gravity", desc: "Balancing on swaying bridges sharpens core stability and micro-muscle adjustments." },
      { title: "Spatial Focus & Patience", desc: "Carefully timing steps cultivates mindfulness, focus, and deliberate body control." },
      { title: "Proud Accomplishment", desc: "Completing all 12 aerial spans instills immense pride and self-confidence." }
    ],
    faqs: [
      { q: "Can a child get stuck on the rope course?", a: "No. The harness securely supports the child at all times, and our marshals can walk out alongside them or gently guide them to the nearest platform." },
      { q: "Is the safety cable locked on?", a: "Yes! Our continuous overhead track system locks at the entrance platform and cannot be unclipped until completing the full course." },
      { q: "How long does one round take?", a: "Most kids take approximately 10 to 15 minutes to complete the full 12-obstacle sky circuit." }
    ],
    related: ["adventure-climbing-zone", "cargo-net-climber", "ninja-warrior-course"]
  },
  {
    id: "foam-pit-challenge",
    num: 7,
    title: "Foam Pit Challenge",
    category: "trampolines",
    categoryLabel: "Trampoline Zones",
    tagline: "Leap from Olympic springboards into an ocean of thousands of zero-shock fire-retardant foam cubes!",
    heroImage: "../assets/images/attractions/Foam%20Pit%20Challenge/Child_in_foam_pit_2K_20261013231811.jpg",
    description: "Jump into a soft foam landing zone and enjoy playful jumping challenges with zero-shock impact absorption.",
    specs: ["5-Foot Foam Depth", "Launch Beds", "Zero-Shock Foam Blocks"],
    footwear: "Grip Socks Mandatory",
    about: "Want to practice high-flying flips, superhero leap landings, or cannonball drops without feeling any impact? The Foam Pit Challenge features two high-rebound Olympic spring runways leading straight into an enormous 5-foot-deep sea of over 10,000 premium open-cell foam cubes.<br><br>The pit is lined underneath with a 2-foot subterranean trampoline suspension bed and closed-cell impact decking, creating a multi-stage deceleration cushion that absorbs 100% of landing shock so jumpers can launch into the air with complete peace of mind.",
    activities: [
      { title: "Springboard Launch Flights", desc: "Sprint down the launch mat and leap into the center of the deep foam sea." },
      { title: "Cannonball Splashes", desc: "Tuck your knees tight and make a giant splash into the ocean of soft foam cubes." },
      { title: "Gladiator Balance Beam Duels", desc: "Test balance on the padded beam spanning the pit and battle with soft foam pugil sticks." },
      { title: "Foam Extraction Crawl", desc: "Wiggle, scramble, and swim your way out through thousands of cubes to the padded exit deck." }
    ],
    features: [
      "Over 10,000 premium open-cell fire-retardant high-density foam cubes",
      "Sub-pit secondary safety suspension trampoline bed underneath the foam layer",
      "Padded gladiator duel beam with regulation soft foam pugil sticks and head protection",
      "Dual 25-foot Olympic spring runway launch tracks with approach markers",
      "Daily pre-opening anti-microbial sanitization and foam cube aeration inspection"
    ],
    ageGroup: "Ages 5+ (All Jumpers)",
    agePolicy: {
      minimumAge: "5 Years old (Younger jumpers under 5 should use the Toddler Lagoon soft pit).",
      heightWeight: "Max jumper weight: 240 lbs (109 kg). No height limit.",
      supervision: "Court marshal positioned at the runway launch gate regulates one jumper at a time.",
      equipment: "Grip socks mandatory. All items removed from pockets before jumping."
    },
    safetyGuidelines: [
      "Strictly 1 jumper per launch runway — wait until the foam pit landing zone is completely clear.",
      "Always land on your rear bottom, back, or feet — NEVER dive head-first or neck-first into foam.",
      "Clear the foam pit immediately after landing by crawling toward the perimeter exit steps.",
      "Do not bury yourself or hide underneath foam cubes where incoming jumpers cannot see you.",
      "No food, drink, cell phones, eyeglasses, or loose jewelry allowed near the pit rim."
    ],
    gallery: [
      { url: "../assets/images/attractions/Foam%20Pit%20Challenge/Child_in_foam_pit_2K_20261013231811.jpg", caption: "Jumper launching high into the deep bed of zero-shock foam cubes." },
      { url: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224655.jpg", caption: "Olympic spring approach runway providing maximum vertical liftoff." },
      { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", caption: "Padded gladiator balance beam spanning the center of the foam pit." }
    ],
    benefits: [
      { title: "Fearless Aerial Practice", desc: "Landing in foam removes fear of hard falls, allowing kids to build aerial jumping confidence." },
      { title: "Full-Body Scramble Exercise", desc: "Climbing out of deep foam cubes engages core, shoulders, and hips in fun resistance play." },
      { title: "Kinesthetic Awareness", desc: "Practicing mid-air tucks and seat landings teaches rotational body control." },
      { title: "Sensory Deep Pressure", desc: "Wading through soft cubes provides calming proprioceptive input for energetic kids." }
    ],
    faqs: [
      { q: "Is it difficult to get out of the foam pit?", a: "Crawling through the foam cubes is half the fun! We have padded ropes along the edges to help younger jumpers pull themselves onto the deck." },
      { q: "Can I wear glasses while jumping into the pit?", a: "We strongly recommend removing glasses or using a secure athletic strap so glasses aren't lost in the foam." },
      { q: "How deep is the foam pit?", a: "The foam depth is 5 feet, backed by a secondary spring trampoline suspension system underneath for ultimate safety." }
    ],
    related: ["airbag-jump-zone", "mega-trampoline-arena", "parkour-jump-zone"]
  },
  {
    id: "laser-maze-mission",
    num: 8,
    title: "Laser Maze Mission",
    category: "interactive",
    categoryLabel: "Interactive & Sports Zones",
    tagline: "Channel your inner secret agent: crawl, contort, and step through dynamic laser grids without tripping the alarm!",
    heroImage: "../assets/images/attractions/Laser%20Maze%20Mission/Laser_Maze_Mission_age_5_2K_20261013231946.jpg",
    description: "Navigate through a light-based maze and complete exciting secret agent missions with live countdown timers.",
    specs: ["Dynamic Laser Grid", "Digital Countdown", "Secret Agent Theme"],
    footwear: "Grip Socks or Clean Athletic Shoes",
    about: "Step into our high-tech secret agent laser chamber! The Laser Maze Mission immerses players in a dark, atmospheric vault crisscrossed by dozens of glowing green and red optical laser beams. Players must step over, crawl under, and contort their bodies around beams to reach mission objective checkpoints before striking the final mission-complete vault button.<br><br>Featuring four selectable difficulty modes (Rookie, Secret Agent, Ninja, and Mission Impossible) and integrated smoke haze effects that illuminate every beam, it is an addictive test of agility, flexibility, and stealth for solo operatives and competitive duos.",
    activities: [
      { title: "Secret Agent Stealth Run", desc: "Crawl and slither through low beams without tripping optical sensors to achieve 100% stealth rating." },
      { title: "Speed Rush Time Attack", desc: "Sprint through the maze as fast as humanly possible, racing against the 60-second digital countdown." },
      { title: "Co-op Duo Mission", desc: "Two operatives enter together to push synchronized dual wall buttons at opposite sides of the vault." },
      { title: "Beam Buster Mode", desc: "A chaotic party mode where kids compete to break as many flashing beams as possible within 45 seconds!" }
    ],
    features: [
      "Commercial class 2 eye-safe 532nm green and 650nm red optical laser projection beams",
      "High-precision optical receiver sensors with instant audio buzzer and visual strobe feedback",
      "Interactive multi-mission touchscreen kiosk with live Hall of Fame leaderboard displays",
      "Atmospheric food-grade water-based haze generator to make laser beams crisply visible",
      "Padded non-slip chamber flooring with soft perimeter bumpers protecting knees and elbows"
    ],
    ageGroup: "Ages 5+ (Solo & Team Play)",
    agePolicy: {
      minimumAge: "5 Years old (Younger children may enter with an accompanying adult in Free Play mode).",
      heightWeight: "No height or weight restrictions.",
      supervision: "External observation monitor displays live inside action for waiting parents and peers.",
      equipment: "Grip socks or clean sneakers. Avoid shiny reflective jewelry that could bounce beams."
    },
    safetyGuidelines: [
      "All laser beams are certified Class 2 eye-safe; however, avoid deliberately staring directly into emitter lenses.",
      "Walk, crawl, and step carefully — no uncontrolled diving onto the chamber floor.",
      "Do not hang on, kick, or pull on laser emitter fixtures or sensor wall brackets.",
      "Only 1 or 2 operatives permitted inside the chamber per mission run to prevent accidental collisions.",
      "Exit promptly through the lighted exit portal when your mission timer completes."
    ],
    gallery: [
      { url: "../assets/images/attractions/Laser%20Maze%20Mission/Laser_Maze_Mission_age_5_2K_20261013231946.jpg", caption: "Glowing green laser grid crisscrossing the high-tech mission chamber." },
      { url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80", caption: "Secret agent crawling under low laser tripwires to reach the vault target." },
      { url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80", caption: "Digital touch leaderboard displaying top agent mission completion times." }
    ],
    benefits: [
      { title: "Body Awareness & Flexibility", desc: "Carefully contorting under beams teaches acute proprioception and spinal mobility." },
      { title: "Strategic Planning Under Pressure", desc: "Navigating the maze against a clock fosters quick tactical decision-making." },
      { title: "Patience & Deliberate Movement", desc: "Kids learn that slow, controlled movements often beat reckless rushing." },
      { title: "Imaginative Roleplay Fun", desc: "Becoming a secret agent ignites creative childhood imagination and team spirit." }
    ],
    faqs: [
      { q: "Are the lasers dangerous for kids' eyes?", a: "Not at all. Our lasers are low-energy certified Class 2 eye-safe optical beams designed specifically for commercial entertainment." },
      { q: "What happens if someone touches a laser beam?", a: "A fun secret agent alarm sounds, a penalty second is added to your clock, and you keep playing!" },
      { q: "Can parents watch their kids inside?", a: "Yes! A giant HD flatscreen monitor outside the chamber broadcasts live night-vision feeds of the mission." }
    ],
    related: ["interactive-play-arena", "neon-glow-adventure", "mystery-tunnel-quest"]
  },
  {
    id: "interactive-play-arena",
    num: 9,
    title: "Interactive Play Arena",
    category: "interactive",
    categoryLabel: "Interactive & Sports Zones",
    tagline: "Merge physical trampolining with augmented reality gaming on ValoJump screens and motion projection floors!",
    heroImage: "../assets/images/attractions/Interactive%20Play%20Arena/Interactive_play_arena_for_children_2K_20261013232047.jpg",
    description: "Play movement-based games with interactive lights, projections, and real-time motion-tracking video challenges.",
    specs: ["Augmented Projection", "Motion Gaming Floor", "ValoJump Screen"],
    footwear: "Grip Socks Mandatory",
    about: "Step into the future of active entertainment where video games meet physical jump fitness! The Interactive Play Arena features cutting-edge ValoJump augmented reality trampoline screens and interactive motion projection floors. When jumping on our specialized AR trampoline, high-speed camera sensors track your physical body and insert you directly onto the digital game screen as the playable hero.<br><br>Battle alien invasions, bounce through floating cloud platforms, dodge virtual fireballs, or challenge a friend to live two-player split-screen air duels! Combining energetic physical jumping with digital gameplay, kids get a full workout without even realizing they are exercising.",
    activities: [
      { title: "ValoJump AR Superhero Games", desc: "Bounce on the trampoline while your live camera avatar collects coins and defeats bosses on screen." },
      { title: "Interactive Smash-Wall", desc: "Hurl soft foam balls at giant projected target walls to pop bubbles, hit targets, and score points." },
      { title: "Motion-Floor Agility Dance", desc: "Stomp, hop, and slide across dynamic floor projection tiles that react to your foot movement." },
      { title: "Two-Player Trampoline Duels", desc: "Connect two linked AR trampolines for real-time 1v1 volleyball and aerial volleyball face-offs!" }
    ],
    features: [
      "ValoJump dual commercial augmented reality camera tracking systems with low-latency rendering",
      "Interactive 200-inch high-lumen laser projection smash-wall with acoustic impact sensors",
      "Motion-sensing interactive LED floor projection with 20+ rotation game modes",
      "Automatic video recording kiosk — scan your wristband to email your gameplay replay video home",
      "Multiplayer arcade battle modes for head-to-head competitive sibling play"
    ],
    ageGroup: "Ages 3+ (All Ages & Adults)",
    agePolicy: {
      minimumAge: "3 Years old (Games feature tailored difficulty modes for toddlers, kids, teens, and adults).",
      heightWeight: "Max jumper weight: 260 lbs (118 kg). No height restrictions.",
      supervision: "Game kiosks are self-service with staff marshals assisting with game selection and queuing.",
      equipment: "Grip socks mandatory. All items removed from pockets."
    },
    safetyGuidelines: [
      "Strictly 1 jumper on the ValoJump trampoline mat while the game is active.",
      "Jump within the center perimeter markers of the mat to ensure motion sensors track accurately.",
      "Soft foam balls only for the interactive smash-wall — never throw shoes, water bottles, or hard objects.",
      "Do not touch or lean against the digital projection screen surfaces.",
      "Take turns courteously and limit solo sessions to 2 game rounds when others are waiting."
    ],
    gallery: [
      { url: "../assets/images/attractions/Interactive%20Play%20Arena/Interactive_play_arena_for_children_2K_20261013232047.jpg", caption: "ValoJump AR screen tracking a jumper's real-time movements inside the video game." },
      { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", caption: "Interactive projection wall where kids throw soft balls at moving game targets." },
      { url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80", caption: "Motion floor tiles lighting up under kids' footsteps in interactive dance games." }
    ],
    benefits: [
      { title: "Active Screen-Time Fusion", desc: "Redirects kids' love for video games into an exhausting, healthy aerobic workout." },
      { title: "Rapid Hand-Eye Coordination", desc: "Timing jumps with on-screen obstacles hones split-second visual reflexes." },
      { title: "Social Turn-Taking", desc: "Kids cheer each other's high scores and collaborate in co-op challenge matches." },
      { title: "Cardio Calorie Burn", desc: "Just 10 minutes of interactive jumping provides a high-intensity cardio blast." }
    ],
    faqs: [
      { q: "Can we save videos of our gameplay?", a: "Yes! ValoJump automatically records your video clip, which you can send straight to your email from our kiosk." },
      { q: "Are the games suitable for 4-year-olds?", a: "Yes! There are gentle modes like 'Toy Stomp' and 'Bubble Pop' designed specifically for young preschoolers." },
      { q: "Is there an extra fee to play?", a: "No! Access to the Interactive Play Arena is 100% included with any standard PlaySpace pass." }
    ],
    related: ["laser-maze-mission", "neon-glow-adventure", "wipeout-challenge"]
  },
  {
    id: "little-explorers-zone",
    num: 10,
    title: "Little Explorers Zone",
    category: "toddlers",
    categoryLabel: "Soft Play & Toddler Zones",
    tagline: "A gentle, gated sensory haven with mini foam slides, sensory boards, and soft crawl ramps exclusively for ages 0–3!",
    heroImage: "../assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233235.jpg",
    description: "A gentle adventure space with mini slides, tunnels, and soft-play activities designed specially for toddlers.",
    specs: ["Gated Safe Haven", "Mini Foam Steps", "Sensory Busy Boards"],
    footwear: "Grip Socks for Toddlers & Adults (Shoes Prohibited)",
    about: "Designed specifically to protect our littlest guests, the Little Explorers Zone is a serene, gated wonderland strictly reserved for babies and toddlers ages 6 months to 3 years old. Far removed from the high-energy velocity of big kids, this padded sanctuary allows infants to crawl, cruise, and take their first brave steps in absolute security.<br><br>Featuring low-height foam ramps, gentle mini undulating wavy slides, tactile busy boards, sensory mirrors, and oversized building blocks, every surface is padded with medical-grade antimicrobial foam that is disinfected throughout the day.",
    activities: [
      { title: "Gentle Foam Step Crawl", desc: "Cruise up low 4-inch padded foam steps that build leg strength and coordination." },
      { title: "Mini Wavy Slide Fun", desc: "Experience the thrill of a toddler-sized 3-foot gentle slide with an adult waiting at the bottom." },
      { title: "Sensory Wall Exploration", desc: "Spin colorful gears, explore textured fabric swatches, and peek into baby-safe mirrors." },
      { title: "Giant Foam Block Stacking", desc: "Build towering soft structures and delight in knocking them over safely." }
    ],
    features: [
      "Secure magnetic double-latch perimeter safety gates preventing curious toddlers from wandering",
      "Ultra-low 4-inch soft foam climbing stairs and gentle deceleration slides",
      "12 tactile sensory wall panels featuring spinning gears, chime bells, and textured surfaces",
      "Hospital-grade antimicrobial seamless vinyl padding wiped down every 60 minutes",
      "Plush perimeter lounge seating for parents with USB charging stations and direct line-of-sight"
    ],
    ageGroup: "Ages 6 Months – 3 Years (Strictly No Big Kids)",
    agePolicy: {
      minimumAge: "6 Months old (crawlers and cruisers). Strictly capped at age 3 — older kids prohibited.",
      heightWeight: "Maximum height: 38 inches (96 cm).",
      supervision: "Active, continuous parent or guardian accompaniment inside the gated zone required.",
      equipment: "Grip socks mandatory for both toddlers and accompanying adults inside the zone."
    },
    safetyGuidelines: [
      "Strictly toddlers and babies only — children aged 4 and older are not permitted inside this zone.",
      "Parents must remain within arm's reach of their child at all times inside the gated area.",
      "Shoes, strollers, outside toys, and food/drinks are strictly prohibited past the gated entrance.",
      "Do not place toddlers on top of peripheral enclosure walls or furniture.",
      "If equipment becomes soiled, notify staff immediately for spot sanitization."
    ],
    gallery: [
      { url: "../assets/images/attractions/Little%20Explorers%20Zone/Little_Explorers_Zone_for_toddlers_2K_20261013233235.jpg", caption: "Gated toddler sanctuary featuring mini crawl ramps and soft sensory shapes." },
      { url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80", caption: "Tactile wall panels with spinning gears and sensory discovery boards." },
      { url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80", caption: "Low-height gentle foam slides providing safe first sliding adventures." }
    ],
    benefits: [
      { title: "Early Gross Motor Milestones", desc: "Low steps and crawl ramps help babies transition from crawling to independent walking." },
      { title: "Sensory Brain Development", desc: "Tactile wall textures, sounds, and mirrors stimulate neural sensory pathways." },
      { title: "Stress-Free Parental Bonding", desc: "Parents can relax knowing there are zero older kids running or jumping nearby." },
      { title: "Parallel Social Play", desc: "Toddlers observe peers and learn foundational social awareness in a peaceful environment." }
    ],
    faqs: [
      { q: "Is the Little Explorers Zone strictly enforced for toddlers?", a: "Yes! Our court marshals strictly enforce our 0–3 age limit so older kids never enter this safe space." },
      { q: "Do parents need a paid ticket to accompany their toddler?", a: "One accompanying adult enters completely free with each purchased Toddler Pass!" },
      { q: "Are shoes allowed inside?", a: "No, all adults and toddlers must wear grip socks to keep the play mats spotlessly clean." }
    ],
    related: ["rainbow-ball-pit", "balance-bounce-trail", "mystery-tunnel-quest"]
  },
  {
    id: "cargo-net-climber",
    num: 11,
    title: "Cargo Net Climber",
    category: "climbing",
    categoryLabel: "Adventure & Climbing Zones",
    tagline: "Climb through flexible 3D net tunnels, hanging webs, and elevated panoramic crow's nests!",
    heroImage: "../assets/images/attractions/Cargo%20Net%20Climber/Child_climbing_cargo_net_2K_20261013233720.jpg",
    description: "Climb through flexible net structures and discover new paths to explore high above the ground.",
    specs: ["Braided Marine Rope", "Multi-Tier Tunnels", "Padded Enclosure"],
    footwear: "Grip Socks Mandatory",
    about: "Climb, scramble, and conquer the multi-tier Cargo Net Climber! Crafted from heavy-duty braided marine-grade polypropylene rope with industrial steel joint thimbles, this three-dimensional climbing matrix invites kids to scramble through suspended rope tunnels, crawl over inclined rope ladders, and explore elevated lookout chambers.<br><br>Fully enveloped by fine-weave safety containment netting, kids experience the sensation of free-air climbing without the slightest danger of falling out, developing agility and climbing endurance at every turn.",
    activities: [
      { title: "Horizontal Net Crawl", desc: "Crawl through 20-foot suspended rope mesh tubes connecting different tiers of the play structure." },
      { title: "Inclined Web Ascent", desc: "Scramble up a 60-degree rope web using handholds and toe holds to reach the top deck." },
      { title: "Crow's Nest Lookout", desc: "Rest in the panoramic elevated net dome overlooking the entire soft play adventure zone." },
      { title: "Spider Web Traverse", desc: "Cross vertical hanging net walls testing grip stamina and core balance." }
    ],
    features: [
      "16mm commercial poly-steel braided marine rope resistant to fraying and abrasions",
      "Triple-stitched high-tensile safety containment netting preventing falls or drops",
      "Interconnected access points linking into Super Slide Mountain and the Adventure Tower",
      "Ergonomic rope knots designed specifically for comfortable hand grip without pinching",
      "Multi-level padded steel support framework meeting ASTM F1918 commercial play standards"
    ],
    ageGroup: "Ages 4 - 12 Years",
    agePolicy: {
      minimumAge: "4 Years old. Younger children under 4 should explore the Little Explorers Zone.",
      heightWeight: "Max climber weight: 200 lbs (90 kg).",
      supervision: "Clear sightlines from floor level allow parents to monitor climbers at every stage.",
      equipment: "Grip socks mandatory. Avoid loose hanging jewelry or clothing drawstrings."
    },
    safetyGuidelines: [
      "Maintain 3 points of contact (two hands and one foot, or two feet and one hand) while climbing.",
      "Never jump down from elevated netting levels — climb down using designated rope pathways.",
      "Follow one-way traffic flow inside narrow tunnel tubes to prevent head-to-head collisions.",
      "Do not hang upside down by feet or attempt flips inside the net matrix.",
      "Pockets must be completely emptied before entering the net climber."
    ],
    gallery: [
      { url: "../assets/images/attractions/Cargo%20Net%20Climber/Child_climbing_cargo_net_2K_20261013233720.jpg", caption: "Multi-tier cargo net climber with interconnected tubes and panoramic viewpoints." },
      { url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80", caption: "Kids scrambling through heavy-duty braided marine net tunnels." },
      { url: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80", caption: "Secure 3D rope climbing framework enclosed by fine-mesh safety netting." }
    ],
    benefits: [
      { title: "Full-Body Climbing Agility", desc: "Engages toes, calves, forearms, and core muscles in comprehensive physical exercise." },
      { title: "Spatial Navigation & Depth", desc: "Moving through 3D rope matrices sharpens spatial reasoning and depth perception." },
      { title: "Hand-Foot Cross Coordination", desc: "Alternating opposite limbs while climbing builds contralateral neurological connections." },
      { title: "Perseverance & Physical Grit", desc: "Finding footholds on flexible rope develops problem-solving patience and tenacity." }
    ],
    faqs: [
      { q: "Is the net strong enough for older kids?", a: "Yes! Each marine rope cable is tested to withstand over 2,000 lbs of tension and commercial loads." },
      { q: "Can kids fall through the netting?", a: "No, the mesh openings are engineered to strict ASTM standards that prevent limbs or torsos from slipping through." },
      { q: "What connects to the Cargo Net Climber?", a: "It connects directly into the Adventure Tower and the summit of Super Slide Mountain." }
    ],
    related: ["ninja-warrior-course", "spider-wall-climb", "adventure-tower"]
  },
  {
    id: "balance-bounce-trail",
    num: 12,
    title: "Balance & Bounce Trail",
    category: "toddlers",
    categoryLabel: "Soft Play & Toddler Zones",
    tagline: "Hop across stepping stones, wobble on balance beams, and complete fun agility movement trails!",
    heroImage: "../assets/images/attractions/Balance%20%26%20Bounce%20Trail/Balance_%26_Bounce_Trail_2K_20261013233842.jpg",
    description: "Hop across stepping stones, balance on beams, and complete fun movement trails that build motor coordination.",
    specs: ["Foam Stepping Stones", "Wobble Beams", "Agility Obstacles"],
    footwear: "Grip Socks Mandatory",
    about: "Step, hop, balance, and giggle across the Balance & Bounce Trail! Inspired by childhood games of 'The Floor is Lava', this colorful movement circuit features oversized high-density foam stepping islands, low-altitude wobble logs, angled balance beams, and mini foam hurdles.<br><br>Surrounded entirely by 3-inch high-density safety padding, kids can test their agility, improve foot-eye coordination, and practice dynamic balance in a joyful, low-stress environment where stepping off is completely safe.",
    activities: [
      { title: "Stepping Stone Island Hop", desc: "Leap between color-coded foam stepping islands without touching the surrounding mat." },
      { title: "Wobble Beam Walk", desc: "Cross a 15-foot suspended low-altitude foam balance beam that responds to your weight." },
      { title: "Mini Foam Hurdles", desc: "Bound over soft foam hurdles designed to teach light, springy two-footed landing mechanics." },
      { title: "Agility Zig-Zag Slalom", desc: "Weave between soft foam vertical bollards at top speed to test quick lateral footwork." }
    ],
    features: [
      "Modular high-density foam stepping islands with textured non-slip vinyl coverings",
      "Low-altitude 8-inch elevation balance beams ensuring 100% fail-safe dismounts",
      "Vibrant high-contrast color coding (Yellow, Cyan, Magenta) stimulating visual tracking",
      "Seamless anti-microbial floor padding certified under ASTM F1292 impact attenuation standards",
      "Clear directional footprint markers guiding kids through the movement circuit"
    ],
    ageGroup: "Ages 3 - 9 Years",
    agePolicy: {
      minimumAge: "3 Years old (Toddlers ages 3–4 enjoy holding a parent's hand across the beams).",
      heightWeight: "No height restrictions. Max weight 180 lbs (82 kg).",
      supervision: "Parents can easily walk alongside the low-profile trail.",
      equipment: "Grip socks mandatory to provide traction across vinyl surfaces."
    },
    safetyGuidelines: [
      "Follow the directional arrow markers — no running backwards into oncoming children.",
      "One child on each narrow balance beam section at a time; no pushing or overtaking.",
      "Step down carefully onto surrounding safety mats if you lose balance.",
      "Keep the trail clear of loose toys, shoes, and water bottles.",
      "Grip socks must be dry before entering the balance circuit."
    ],
    gallery: [
      { url: "../assets/images/attractions/Balance%20%26%20Bounce%20Trail/Balance_%26_Bounce_Trail_2K_20261013233842.jpg", caption: "Colorful foam stepping stones challenging kids' balance and foot placement." },
      { url: "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=800&q=80", caption: "Low-altitude wobble beams teaching balance without risk of falls." },
      { url: "https://images.unsplash.com/photo-1780932333368-4995b2e14174?auto=format&fit=crop&w=800&q=80", caption: "Agility trail lined with thick shock-absorbing floor matting." }
    ],
    benefits: [
      { title: "Vestibular Balance Reflexes", desc: "Micro-adjustments made while traversing wobble beams strengthen core equilibrium." },
      { title: "Bilateral Coordination", desc: "Hopping smoothly from foot to foot develops alternating leg strength and rhythmic timing." },
      { title: "Spatial Distance Estimation", desc: "Judging distances between stepping stones sharpens visual-spatial calculation." },
      { title: "Motor Planning Confidence", desc: "Successfully completing the full agility circuit instills immense pride and poise." }
    ],
    faqs: [
      { q: "Can toddlers use this trail?", a: "Yes! The obstacles are low to the ground (under 8 inches), making it wonderful for preschoolers with parent guidance." },
      { q: "Is the trail slippery?", a: "No, all surfaces feature textured non-slip vinyl and mandatory grip socks provide excellent traction." },
      { q: "Can parents walk alongside their kids?", a: "Yes, the open perimeter makes it easy for parents to hold a child's hand while they cross." }
    ],
    related: ["treasure-hunt-zone", "little-explorers-zone", "super-slide-mountain"]
  },
  {
    id: "neon-glow-adventure",
    num: 13,
    title: "Neon Glow Adventure",
    category: "interactive",
    categoryLabel: "Interactive & Sports Zones",
    tagline: "Experience blacklight magic with UV trampolines, neon dodgeball, glowing face paint, and pulse-pounding music!",
    heroImage: "../assets/images/attractions/Neon%20Glow%20Adventure/Neon_Glow_Adventure_for_kids_2K_20261013234014.jpg",
    description: "Experience a colorful neon play zone with glowing lights, UV blacklight cannons, and exciting evening activities.",
    specs: ["Blacklight Illumination", "Glow Trampoline Beds", "Neon Obstacles"],
    footwear: "Grip Socks (Fluorescent / White Socks Recommended!)",
    about: "When the sun goes down, PlaySpace transforms into an electrifying neon wonderland! The Neon Glow Adventure features high-output 365nm UV blacklight floodlights, glowing fluorescent trampoline bed borders, neon foam cubes, and pulsating music that turns active play into an unforgettable party.<br><br>Wear white or neon attire and watch yourself glow in the dark! Complete with blacklight dodgeball showdowns, laser projections, and glowing dance beats, it is the ultimate Friday and Saturday night experience for kids, tweens, teens, and families.",
    activities: [
      { title: "Blacklight Open Bounce", desc: "Leap across neon-lined trampoline beds illuminated exclusively by theatrical UV blacklights." },
      { title: "Glow Dodgeball Tournaments", desc: "Dodge and throw fluorescent foam balls in our enclosed glow dodgeball arena with referee marshals." },
      { title: "Neon Face-Paint Station", desc: "Get free custom glowing designs painted on your cheeks and arms by our resident glow artists." },
      { title: "Laser & Music Light Shows", desc: "Dance and bounce to family-friendly hit tracks accompanied by synchronized laser beam displays." }
    ],
    features: [
      "Commercial high-output 365nm UV blacklight LED flood fixtures bathing the arena in vibrant glow",
      "Fluorescent UV-reactive trampoline mat borders, safety wall pads, and foam cubes",
      "Dedicated glow-in-the-dark dodgeball arena with referee marshals and digital scoreboards",
      "Free neon face-paint and glow accessory station included with all Glow Pass admissions",
      "High-energy family-safe sound system with live DJ sets on Friday and Saturday evenings"
    ],
    ageGroup: "Ages 4+ (Family Glow Experience)",
    agePolicy: {
      minimumAge: "4 Years old. Jumpers under 7 must have an accompanying adult in the arena.",
      heightWeight: "Standard court weight limit: 260 lbs (118 kg).",
      supervision: "Enhanced marshal staffing during glow hours with glowing marshal safety vests.",
      equipment: "Grip socks mandatory. White, neon green, bright pink, or fluorescent yellow shirts highly encouraged!"
    },
    safetyGuidelines: [
      "Even under low-light ambient conditions, standard court safety rules strictly apply: 1 jumper per mat.",
      "Wear bright fluorescent clothing so other jumpers and marshals can easily see your movements.",
      "No running across trampoline divider pads in low lighting.",
      "Do not bring outside glowsticks that can crack or leak chemical fluids onto court mats.",
      "If you experience eye sensitivity to strobe effects, notify staff for access to our standard-lit lounge."
    ],
    gallery: [
      { url: "../assets/images/attractions/Neon%20Glow%20Adventure/Neon_Glow_Adventure_for_kids_2K_20261013234014.jpg", caption: "Blacklight illumination transforming the entire trampoline arena into a glowing paradise." },
      { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", caption: "Glow dodgeball tournament with neon balls and fluorescent boundary lines." },
      { url: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224655.jpg", caption: "Jumpers glowing under commercial 365nm UV blacklight cannons." }
    ],
    benefits: [
      { title: "Sensory Excitement & Wonder", desc: "Glowing visuals and upbeat music create an enchanting atmosphere that boosts energy." },
      { title: "Active Weekend Alternative", desc: "Provides teens and tweens with a safe, wholesome, active social outlet on weekend nights." },
      { title: "Teamwork in Glow Sports", desc: "Organized glow dodgeball fosters camaraderie, fair play, and athletic communication." },
      { title: "Unforgettable Memories", desc: "A distinctive party experience that makes birthdays and family nights extraordinary." }
    ],
    faqs: [
      { q: "What should my child wear to Neon Glow Night?", a: "White, neon green, highlighter yellow, or bright orange shirts glow brilliantly under our blacklights!" },
      { q: "When does the Neon Glow Adventure happen?", a: "Every Friday and Saturday evening from 7:00 PM to 10:00 PM, plus special holiday glow sessions." },
      { q: "Are standard play passes accepted during Glow hours?", a: "Glow Night requires a 120-minute Glow Pass ($25), which includes glow accessories and face paint." }
    ],
    related: ["laser-maze-mission", "mini-sports-arena", "mega-trampoline-arena"]
  },
  {
    id: "mini-sports-arena",
    num: 14,
    title: "Mini Sports Arena",
    category: "trampolines",
    categoryLabel: "Trampoline Zones",
    tagline: "Throw down high-flying slam dunks on spring-assisted runways and challenge peers in caged dodgeball!",
    heroImage: "../assets/images/attractions/Mini%20Sports%20Arena/Kids_playing_in_sports_arena_2K_20261013235314.jpg",
    description: "Enjoy mini basketball, target games, slam dunk runways, and friendly team competitions in an enclosed cage.",
    specs: ["Slam Dunk Hoops", "Rebound Enclosure", "Digital Scoreboard"],
    footwear: "Grip Socks Mandatory",
    about: "Ever dreamed of throwing down an NBA-style rim-rattling slam dunk? The Mini Sports Arena makes it possible for jumpers of every height! Featuring three dedicated spring-loaded trampoline approach runways leading directly to regulation breakaway basketball rims at varying heights (6ft, 8ft, and 10ft), kids and teens can execute acrobatic between-the-legs dunks and alley-oop passes safely.<br><br>The arena also features an integrated rebound dodgeball cage with electronic target buzzers and digital scoreboards, creating a dynamic multi-sport cage for friendly athletic competition.",
    activities: [
      { title: "Spring-Assisted Slam Dunks", desc: "Bound down the runway and throw down rim-rocking dunks on hoops tailored to your height." },
      { title: "Alley-Oop Passing Drills", desc: "Toss a soft basketball off the rebound backboard for your friend to catch and slam in mid-air." },
      { title: "3-Point Rebound Shootout", desc: "Bounce and shoot from marked court positions against an electronic shot clock." },
      { title: "Cage Dodgeball Showdowns", desc: "Dodge, dip, duck, and dive in our fully netted court designed for continuous team gameplay." }
    ],
    features: [
      "Three regulation spring-loaded approach tracks leading to dual-height breakaway basketball rims (6ft, 8ft, 10ft)",
      "High-density padded backboards with soft foam breakaway rims preventing finger injuries",
      "Fully enclosed safety netting cage keeping basketballs and dodgeballs inside the court",
      "Digital electronic scoreboards with buzzer timers for organized team tournament heats",
      "Official soft-grip foam basketballs and non-sting dodgeballs provided on-site"
    ],
    ageGroup: "Ages 4 - 14 Years",
    agePolicy: {
      minimumAge: "4 Years old (6-foot hoop allows young kids to achieve thrilling slam dunks).",
      heightWeight: "Max jumper weight: 250 lbs (113 kg).",
      supervision: "Court marshals rotate jumpers and ensure strict one-runner-per-lane etiquette.",
      equipment: "Grip socks mandatory. Soft foam basketballs provided; outside balls strictly prohibited."
    },
    safetyGuidelines: [
      "Strictly 1 jumper per dunk runway lane at any time — do not trail behind another runner.",
      "Do NOT hang, swing, or pull down on basketball rims or backboard structures.",
      "Land with two feet or seated seat-drop on the landing mat after shooting; do not dive.",
      "Soft foam balls only — throwing hard leather balls or outside equipment is strictly prohibited.",
      "Retrieve your ball quickly and exit via the side walkway to keep the approach lane open."
    ],
    gallery: [
      { url: "../assets/images/attractions/Mini%20Sports%20Arena/Kids_playing_in_sports_arena_2K_20261013235314.jpg", caption: "Spring-assisted runway leading to regulation breakaway basketball slam dunk hoops." },
      { url: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224655.jpg", caption: "Jumpers soaring in mid-air to complete acrobatic slam dunk maneuvers." },
      { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", caption: "Fully netted dodgeball cage with electronic target buzzers and scoring." }
    ],
    benefits: [
      { title: "Athletic Explosiveness", desc: "Timing approaches and jumping off springbeds builds fast-twitch leg power." },
      { title: "Mid-Air Hand-Eye Coordination", desc: "Controlling the ball while airborne sharpens neuromuscular timing and spatial accuracy." },
      { title: "High-Flying Athletic Self-Esteem", desc: "Dunking on a 10-foot hoop makes every child feel like a professional athlete." },
      { title: "Healthy Team Spirit", desc: "Team games like dodgeball teach cooperative communication, sportsmanship, and strategy." }
    ],
    faqs: [
      { q: "Are the basketballs hard or soft?", a: "We exclusively use commercial high-density soft foam basketballs that bounce realistically without hurting fingers or wrists." },
      { q: "Can younger kids reach the hoops?", a: "Yes! We have hoops set at 6 feet, 8 feet, and 10 feet so kids of all ages can dunk comfortably." },
      { q: "Can we organize dodgeball matches for birthday parties?", a: "Yes! Our party hosts can reserve the Mini Sports Arena for dedicated private birthday dodgeball matches." }
    ],
    related: ["foam-pit-challenge", "mega-trampoline-arena", "parkour-jump-zone"]
  },
  {
    id: "mystery-tunnel-quest",
    num: 15,
    title: "Mystery Tunnel Quest",
    category: "toddlers",
    categoryLabel: "Soft Play & Toddler Zones",
    tagline: "Crawl through winding subterranean tunnels, discover hidden rooms, and collect secret quest checkpoint stamps!",
    heroImage: "../assets/images/attractions/Mystery%20Tunnel%20Quest/Mystery_Tunnel_Quest_2K_20261014002606.jpg",
    description: "Crawl through winding tunnels and discover hidden routes in a playful maze filled with observation bubble domes.",
    specs: ["Winding Labyrinth", "Lookout Windows", "Hidden Quest Rooms"],
    footwear: "Grip Socks Mandatory",
    about: "An enchanting underground labyrinth awaits young explorers in Mystery Tunnel Quest! Nestled beneath our elevated play structures, this network of winding, padded crawl tunnels features clear acrylic observation domes, secret discovery alcoves, soft LED glow markers, and interactive sensory wall puzzles.<br><br>Children embark on a quest to locate 4 hidden stamp stations hidden inside the secret chambers, collecting embossed symbols on their adventure passport while building spatial confidence in an exciting, cozy subterranean labyrinth.",
    activities: [
      { title: "Subterranean Tunnel Crawl", desc: "Wiggle and crawl through 100 feet of interconnected padded tunnels with soft glow lighting." },
      { title: "Bubble Window Peek-a-Boo", desc: "Pop your head up into transparent observation domes to wave at parents outside." },
      { title: "Passport Stamp Hunt", desc: "Find all 4 hidden secret stamp chambers and stamp your official PlaySpace adventure passport." },
      { title: "Hidden Treasure Alcove", desc: "Discover secret mini chambers equipped with tactile sensory wall puzzles and soft glowing mirrors." }
    ],
    features: [
      "Over 100 linear feet of fully padded, fire-retardant vinyl crawling tunnel labyrinths",
      "Clear scratch-resistant acrylic observation bubbles giving parents 100% visibility into tunnels",
      "Low-voltage child-safe ambient LED path lighting ensuring cozy, non-scary illumination",
      "4 embossed passport stamp kiosks scattered through hidden tunnel junctions",
      "Multiple emergency adult-access access panels allowing parents or staff easy entry if needed"
    ],
    ageGroup: "Ages 3 - 10 Years",
    agePolicy: {
      minimumAge: "3 Years old (Tunnels are wide enough for an adult to crawl through to assist young children).",
      heightWeight: "Tunnel diameter: 36 inches (92 cm) — spacious and comfortable for kids.",
      supervision: "Clear acrylic bubble windows ensure parents can observe their child's progress throughout.",
      equipment: "Grip socks mandatory. Long pants or leggings recommended for comfortable crawling."
    },
    safetyGuidelines: [
      "Crawl on hands and knees only — no running or standing upright inside tunnel sections.",
      "Follow designated directional flow arrows to prevent head-to-head collisions in tunnels.",
      "Do not push fellow explorers from behind; maintain a respectful distance between crawlers.",
      "Keep shoes, water bottles, and outside toys outside the tunnel labyrinth.",
      "If a child feels uncomfortable or stuck, use the nearest clear observation window or emergency exit panel."
    ],
    gallery: [
      { url: "../assets/images/attractions/Mystery%20Tunnel%20Quest/Mystery_Tunnel_Quest_2K_20261014002606.jpg", caption: "Padded winding crawl tunnels with warm LED glow path markers." },
      { url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80", caption: "Clear acrylic observation domes where kids peek out at parents." },
      { url: "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=800&q=80", caption: "Hidden stamp stations rewarding young explorers along the quest route." }
    ],
    benefits: [
      { title: "Cross-Pattern Crawling", desc: "Hands-and-knees crawling stimulates brain hemisphericity and bilateral neural pathways." },
      { title: "Spatial Mapping & Memory", desc: "Navigating turns and junctions builds cognitive mental mapping and navigation skills." },
      { title: "Sensory Comfort & Independence", desc: "Enclosed cozy spaces offer a soothing sensory retreat for kids needing a break from open courts." },
      { title: "Achievement & Goal Setting", desc: "Completing all 4 passport stamps instills perseverance and task completion." }
    ],
    faqs: [
      { q: "Is the tunnel maze dark or scary?", a: "Not at all! The tunnels are illuminated with soft, colorful LED pathway lighting, and clear bubble windows let in ample park light." },
      { q: "Can an adult fit inside if their child needs help?", a: "Yes, our tunnels are 3 feet wide and feature adult-accessible emergency side flaps every 10 feet." },
      { q: "Where do kids get the stamp passport?", a: "Free adventure passports are handed out at the front check-in desk upon arrival!" }
    ],
    related: ["treasure-hunt-zone", "soft-play-zone", "super-slide-mountain"]
  },
  {
    id: "spider-wall-climb",
    num: 16,
    title: "Spider Wall Climb",
    category: "climbing",
    categoryLabel: "Adventure & Climbing Zones",
    tagline: "Suit up in a Velcro Spider Suit, spring off a launch trampoline, and stick flat to the giant wall!",
    heroImage: "../assets/images/attractions/Spider%20Wall%20Climb/Children_climbing_spider_wall_2K_20261014002844.jpg",
    description: "Climb a padded, age-appropriate climbing wall wearing special sticky suits that let you stick right to the vertical surface.",
    specs: ["Padded Velcro Wall", "Spider Suits", "Soft Crash Mat"],
    footwear: "Grip Socks Mandatory (Velcro Spider Suits Provided)",
    about: "Have you ever wanted to stick to a wall like Spider-Man? The Spider Wall Climb is one of the most hilarious and thrilling attractions at PlaySpace! Jumpers suit up in custom-designed Velcro-backed Spider Suits, bounce down a high-rebound launch runway, and fling themselves backwards onto an enormous high-grip Velcro wall.<br><br>Watch as you stick completely suspended in mid-air in comical upside-down or sideways poses! When you are ready to come down, a court marshal assists with a soft release onto the ultra-thick zero-shock landing crash mat below.",
    activities: [
      { title: "Spider-Man Wall Stick", desc: "Bounce high, twist backwards in mid-air, and stick firmly to the wall high above the floor." },
      { title: "Inverted Spider Poses", desc: "Challenge yourself to stick completely upside-down or in goofy superhero action poses." },
      { title: "High-Stick Contest", desc: "See who can jump the highest and stick their suit closest to the top boundary marker." },
      { title: "Padded Soft Release", desc: "Peel off the wall with staff assistance and drop into the deep cushioned crash mat." }
    ],
    features: [
      "Commercial heavy-duty high-traction Velcro hook-and-loop wall surface spanning 16 feet wide",
      "Multiple sizes of custom kid and teen Spider Suits equipped with heavy-duty loop backing",
      "High-rebound Olympic spring approach launch beds providing explosive vertical liftoff",
      "18-inch thick zero-shock landing safety crash mat beneath the entire wall surface",
      "Dedicated court marshal assisting every jumper with suit fitting and wall peel releases"
    ],
    ageGroup: "Ages 4 - 12 Years",
    agePolicy: {
      minimumAge: "4 Years old (Must fit securely into our smallest size Spider Suit).",
      heightWeight: "Weight limit: 160 lbs (73 kg) for optimal Velcro adhesion and safe peeling.",
      supervision: "Staff marshal operates the launch gate and assists every jumper peeling off the wall.",
      equipment: "PlaySpace Spider Suit and grip socks required. Street clothes worn underneath suit."
    },
    safetyGuidelines: [
      "Wear your Spider Suit securely zipped and velcroed by a trained PlaySpace court marshal.",
      "Always launch facing backwards towards the wall — NEVER jump head-first face-forward into the Velcro.",
      "Strictly 1 jumper on the trampoline launch bed at any time.",
      "When stuck on the wall, remain relaxed and wait for marshal assistance to peel off safely.",
      "Clear the crash mat immediately after landing to make way for the next jumper."
    ],
    gallery: [
      { url: "../assets/images/attractions/Spider%20Wall%20Climb/Children_climbing_spider_wall_2K_20261014002844.jpg", caption: "Young jumper stuck in a comical superhero pose on the giant Velcro Spider Wall." },
      { url: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80", caption: "High-rebound launch trampoline bed propelling jumpers toward the Velcro wall." },
      { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", caption: "18-inch zero-shock safety landing mat ensuring giggly, soft dismounts." }
    ],
    benefits: [
      { title: "Uninhibited Laughter & Joy", desc: "Sticking to a wall in ridiculous poses produces boundless childhood laughter and fun." },
      { title: "Mid-Air Rotational Timing", desc: "Twisting in mid-air to land flat on your back sharpens aerial coordination and timing." },
      { title: "Leg Spring Power", desc: "Maximizing launch height encourages powerful two-footed jumping extension." },
      { title: "Great Photo Keepsakes", desc: "A crowd favorite for parents taking unforgettable action photos and videos." }
    ],
    faqs: [
      { q: "Does the Velcro hurt when you peel off?", a: "Not at all! The suits are thickly padded and staff gently assist in peeling the suit away from the wall." },
      { q: "What should my child wear under the Spider Suit?", a: "Standard t-shirts and shorts or athletic pants fit comfortably inside the suits." },
      { q: "Is it safe if a child gets stuck upside-down?", a: "Yes, our marshals are right there on the crash mat to support the child and guide them down within seconds." }
    ],
    related: ["adventure-climbing-zone", "airbag-jump-zone", "parkour-jump-zone"]
  },
  {
    id: "parkour-jump-zone",
    num: 17,
    title: "Parkour Jump Zone",
    category: "trampolines",
    categoryLabel: "Trampoline Zones",
    tagline: "Vault, wall-run, and leap across modular soft plyo blocks, precision rails, and landing pads!",
    heroImage: "../assets/images/attractions/Parkour%20Jump%20Zone/Parkour_Jump_Zone_2K_20261014003003.jpg",
    description: "Navigate soft obstacles and jumping platforms designed to teach urban parkour and freerunning skills safely.",
    specs: ["Soft Vault Blocks", "Angled Plyo Boxes", "Precision Landing Pads"],
    footwear: "Grip Socks Mandatory",
    about: "Learn the art of freerunning in a 100% padded, risk-free environment! The Parkour Jump Zone is an obstacle playground featuring modular high-density foam vaulting boxes, precision balance rails, angled wall-run ramps, and step-up plyometric platforms.<br><br>Coached by court marshals trained in beginner freerunning techniques, kids learn fundamental cat leaps, safety rolls, speed vaults, and precision landings on foam blocks that absorb impact while forgiving every stumble.",
    activities: [
      { title: "Speed Vault Practice", desc: "Place one hand on a soft foam vault block and glide your legs cleanly over to the other side." },
      { title: "Precision Rail Balance", desc: "Land with the balls of both feet centered on padded rails without slipping off." },
      { title: "Angled Wall-Run Rebound", desc: "Sprint up a 60-degree angled foam wall, plant a foot, and push off into a controlled jump." },
      { title: "Safety Roll Transitions", desc: "Practice dynamic shoulder rolls on soft mats to dissipate momentum from elevated jumps." }
    ],
    features: [
      "Modular high-density foam vault blocks with Velcro base anchors for custom obstacle courses",
      "Angled plywood-reinforced foam wall-run wedges with high-traction vinyl surfaces",
      "Low-profile padded precision landing balance rails with zero-pinch joints",
      "Progressive beginner, intermediate, and advanced movement tracks",
      "Certified parkour and gymnastics marshals on court offering technique tips"
    ],
    ageGroup: "Ages 6 - 15 Years",
    agePolicy: {
      minimumAge: "6 Years old. Jumpers under 6 are encouraged to use the Balance & Bounce Trail.",
      heightWeight: "Max user weight: 220 lbs (100 kg).",
      supervision: "Active marshal supervision ensures single-runner lane flow.",
      equipment: "Grip socks mandatory. Athletic track pants or shorts recommended."
    },
    safetyGuidelines: [
      "Strictly 1 runner per parkour lane — wait until the runner ahead has cleared the landing zone.",
      "Always land with knees slightly bent and feet shoulder-width apart — never land with locked knees.",
      "Do not attempt dangerous inverted flips or high drops without prior staff permission.",
      "Check that your landing mat is clear of obstacles before launching off elevated vault blocks.",
      "Take breaks if your legs feel tired to prevent uncontrolled stumble landings."
    ],
    gallery: [
      { url: "../assets/images/attractions/Parkour%20Jump%20Zone/Parkour_Jump_Zone_2K_20261014003003.jpg", caption: "Young athlete executing a clean speed vault over a high-density foam block." },
      { url: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224655.jpg", caption: "Precision footwork and balance practice along padded landing rails." },
      { url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80", caption: "Modular foam obstacle setup allowing progressive freerunning challenges." }
    ],
    benefits: [
      { title: "Agile Kinetic Fluidity", desc: "Freerunning teaches children to move smoothly over and around obstacles with effortless economy." },
      { title: "Safe Falling Instincts", desc: "Learning safety rolls and soft landings protects kids in everyday schoolyard activities." },
      { title: "Creative Movement Expression", desc: "Parkour empowers kids to view physical space creatively and invent unique routes." },
      { title: "Core & Quad Strength", desc: "Continuous vaulting and jumping strengthens hips, calves, and abdominal stabilizers." }
    ],
    faqs: [
      { q: "Is parkour dangerous for kids?", a: "Not at PlaySpace! Every block, rail, and ramp is constructed from high-density safety foam surrounded by thick mats, eliminating hard impacts." },
      { q: "Are there parkour classes available?", a: "Yes, we host weekly Junior Parkour Academy workshops every Tuesday afternoon." },
      { q: "What should kids wear?", a: "Comfortable athletic clothing (t-shirt and sweatpants) and PlaySpace grip socks." }
    ],
    related: ["ninja-warrior-course", "airbag-jump-zone", "mega-trampoline-arena"]
  },
  {
    id: "adventure-tower",
    num: 18,
    title: "Adventure Tower",
    category: "climbing",
    categoryLabel: "Adventure & Climbing Zones",
    tagline: "Explore a 3-tier vertical play fortress with panoramic lookout domes, crawl bridges, and high-speed spiral exits!",
    heroImage: "../assets/images/attractions/Adventure%20Tower/Adventure_Tower_for_Children_2K_20261014003202.jpg",
    description: "Explore multi-level climbing and sliding structures with 3 tiers of vertical obstacles and lookout platforms.",
    specs: ["3-Tier Tower", "Panoramic Domes", "Spiral Slide Exit"],
    footwear: "Grip Socks Mandatory",
    about: "Rising three stories above the soft play park, the Adventure Tower is a multi-level fortress of kinetic discovery! Kids navigate vertical padded climbing chimneys, stepping platforms, and suspended crawl bridges as they ascend to the third-floor panoramic observation deck.<br><br>At the summit, explorers can peer out through clear bubble domes over the entire trampoline arena before rocketing back down to ground level through an exhilarating, fully enclosed spiral tube slide.",
    activities: [
      { title: "Vertical Chimney Climb", desc: "Ascend through padded staggered foam platforms inside the vertical tower spire." },
      { title: "3rd-Tier Observation Deck", desc: "Enjoy panoramic 360-degree views of the entire 35,000 sq ft park through clear acrylic domes." },
      { title: "High-Speed Spiral Slide Exit", desc: "Zoom down the enclosed 360-degree corkscrew tube slide straight into the padded runout." },
      { title: "Suspended Skywalk Bridge", desc: "Cross an elevated enclosed rope bridge connecting the Adventure Tower to the Cargo Net Climber." }
    ],
    features: [
      "Three distinct vertical play tiers reaching a peak height of 18 feet",
      "Enclosed 360-degree acrylic bubble observation domes at the summit level",
      "High-speed enclosed spiral slide providing rapid, safe descent back to ground level",
      "Padded soft-stair and ladder routes with continuous fall-containment safety netting",
      "Interconnected skywalk bridges linking directly into Super Slide Mountain and Cargo Net Climber"
    ],
    ageGroup: "Ages 4 - 14 Years",
    agePolicy: {
      minimumAge: "4 Years old. Younger children under 4 should be assisted by an adult.",
      heightWeight: "Max climber weight: 200 lbs (90 kg).",
      supervision: "Full containment netting ensures climbers cannot fall; parents can view all tiers from below.",
      equipment: "Grip socks mandatory. All items removed from pockets."
    },
    safetyGuidelines: [
      "No rough play, pushing, or overtaking on narrow vertical climbing stairways.",
      "Slide feet-first only on the spiral tube slide — never go down head-first.",
      "Clear the spiral slide landing area immediately after arriving at the bottom.",
      "Do not climb or hang on the exterior containment safety netting.",
      "Follow designated directional flow arrows from ground entrance to summit slide."
    ],
    gallery: [
      { url: "../assets/images/attractions/Adventure%20Tower/Adventure_Tower_for_Children_2K_20261014003202.jpg", caption: "Three-tier Adventure Tower featuring panoramic summit domes and high-speed spiral slide." },
      { url: "https://images.unsplash.com/photo-1750082828854-61333b7b9e95?auto=format&fit=crop&w=800&q=80", caption: "Enclosed spiral exit tube delivering exhilarating descent back to the floor." },
      { url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80", caption: "Skywalk bridge connecting the tower to adjacent elevated net structures." }
    ],
    benefits: [
      { title: "Vertical Spatial Exploration", desc: "Climbing multi-tiered structures develops three-dimensional spatial reasoning." },
      { title: "Elevation Confidence", desc: "Safely reaching the 3rd tier and sliding down builds self-reliance and bravery." },
      { title: "Full-Body Cardiovascular Exercise", desc: "Climbing stairs and ramps repeatedly provides an engaging aerobic workout." },
      { title: "Social Imagination Play", desc: "Kids love pretending the tower is a castle, space station, or secret mountain base." }
    ],
    faqs: [
      { q: "Can parents climb into the Adventure Tower?", a: "Yes! Our structural tiers have adult headroom clearance, so parents can easily accompany younger children." },
      { q: "Is the slide enclosed?", a: "Yes, the spiral slide is completely enclosed in heavy-duty translucent plastic with internal light strips." },
      { q: "How do kids get down if they don't want to use the slide?", a: "There is a padded interior staircase right next to the slide entrance for walking back down." }
    ],
    related: ["cargo-net-climber", "super-slide-mountain", "volcano-climb"]
  },
  {
    id: "volcano-climb",
    num: 19,
    title: "Volcano Climb",
    category: "toddlers",
    categoryLabel: "Soft Play & Toddler Zones",
    tagline: "Climb a themed soft-play magma mountain using sturdy ropes and rock holds, then slide down the crater!",
    heroImage: "../assets/images/attractions/Volcano%20Climb/Volcano_climb_game_for_kids_2K_20261014003425.jpg",
    description: "Climb a themed soft-play mountain featuring realistic vinyl rock slopes, climbing ropes, and an exit slide.",
    specs: ["Padded Volcano Cone", "Rope Climber", "Crater Slide"],
    footwear: "Grip Socks Mandatory",
    about: "Get ready for a fiery adventure on the Volcano Climb! Styled like a glowing neon volcano with bright orange and red magma graphics, this soft-play mountain challenges kids to scale its 50-degree padded cone slope using knotted marine climbing ropes and textured climbing cleats.<br><br>Once climbers reach the volcano's summit rim, they can look down into the 'crater' and zoom down an exciting enclosed tube slide straight into a cushioned landing bay of orange and red foam blocks.",
    activities: [
      { title: "Magma Slope Ascent", desc: "Grip the heavy-duty knotted climbing rope and walk up the 50-degree vinyl volcano cone." },
      { title: "Crater Summit Lookout", desc: "Stand on the padded summit platform and celebrate conquering the volcano peak." },
      { title: "Lava Slide Descent", desc: "Slide down the summit exit tube straight into a pit of soft orange and red foam cubes." },
      { title: "Footwork Cleat Scramble", desc: "Practice scaling the slope using molded foot cleats without relying solely on ropes." }
    ],
    features: [
      "Custom conical steel-framed structure wrapped in 3-inch high-density foam and commercial vinyl",
      "Heavy-duty knotted braided poly-rope with soft rubber grip caps for comfortable pulling",
      "Vibrant UV-reactive neon magma graphics that glow under blacklight illumination",
      "Crater summit exit slide with soft foam landing deceleration zone",
      "Anti-microbial vinyl coating wiped down and inspected daily"
    ],
    ageGroup: "Ages 3 - 10 Years",
    agePolicy: {
      minimumAge: "3 Years old (Preschoolers can climb with parent assistance on the lower slope).",
      heightWeight: "Max climber weight: 180 lbs (82 kg).",
      supervision: "Staff marshal stationed adjacent to the volcano monitors queue and slide clearance.",
      equipment: "Grip socks mandatory to ensure firm footing on the vinyl slope."
    },
    safetyGuidelines: [
      "Use climbing ropes with two hands while ascending the volcano slope.",
      "Never jump or dive off the volcano cone slope — always use the summit slide to descend.",
      "Strictly 2 climbers ascending the slope simultaneously; wait your turn at the base.",
      "Slide feet-first only into the crater foam pit.",
      "Clear the crater landing pit immediately after arriving at the bottom."
    ],
    gallery: [
      { url: "../assets/images/attractions/Volcano%20Climb/Volcano_climb_game_for_kids_2K_20261014003425.jpg", caption: "Themed volcano soft-play cone with climbing ropes and summit platform." },
      { url: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80", caption: "Kids using knotted ropes to pull themselves up the padded slope." },
      { url: "https://images.unsplash.com/photo-1750082828854-61333b7b9e95?auto=format&fit=crop&w=800&q=80", caption: "Summit crater slide delivering riders safely into orange and red foam cubes." }
    ],
    benefits: [
      { title: "Arm & Back Pulling Power", desc: "Pulling hand-over-hand on climbing ropes builds upper-body pulling strength and biceps." },
      { title: "Foot Friction Awareness", desc: "Learning how angled foot placement creates traction develops bodily mechanics understanding." },
      { title: "Themed Adventure Fun", desc: "Volcano theme sparks exciting imaginary storytelling and cooperative peer play." },
      { title: "Balance & Core Stability", desc: "Stabilizing the torso while leaning forward on the incline strengthens abdominal muscles." }
    ],
    faqs: [
      { q: "Is the slope slippery?", a: "The vinyl surface is textured, and PlaySpace rubber grip socks provide exceptional traction." },
      { q: "What happens if a child slips on the slope?", a: "The entire volcano cone is padded with 3 inches of high-density foam, so slipping simply results in sliding gently down to the bottom mat." },
      { q: "Can a 4-year-old climb it?", a: "Yes! Many 3- and 4-year-olds climb to the summit using the knotted ropes and love the crater slide." }
    ],
    related: ["super-slide-mountain", "adventure-tower", "soft-play-zone"]
  },
  {
    id: "wipeout-challenge",
    num: 20,
    title: "Wipeout Challenge",
    category: "interactive",
    categoryLabel: "Interactive & Sports Zones",
    tagline: "Duck, jump, and stay on your pod as two rotating soft foam sweep arms test your timing and reflexes!",
    heroImage: "../assets/images/attractions/Wipeout%20Challenge/Wipeout_challenge_for_kids_2K_20261014003706.jpg",
    description: "Test balance and timing on moving-style rotating obstacles in a thrilling last-one-standing challenge game.",
    specs: ["Rotating Foam Arm", "8 Jump Pods", "Variable Speed Operator"],
    footwear: "Grip Socks Mandatory",
    about: "Step onto your circular jump pod and prepare to duck and jump! Inspired by classic television game shows, the Wipeout Challenge features 8 individual air-cushioned jumper pods surrounding a central motorized hub with two spinning padded foam sweep arms (one low to jump over, and one high to duck under).<br><br>Controlled by an experienced PlaySpace operator who tailors speed and rotation direction to the age group on court, players leap and duck as the arms spin faster and change direction. Who will be the last one standing?",
    activities: [
      { title: "Jump Over the Low Arm", desc: "Time your vertical leap to jump cleanly over the sweeping soft foam bottom arm." },
      { title: "Duck Under the High Arm", desc: "Crouch low on your circular pod as the top sweeping arm whistles right over your head." },
      { title: "Last-One-Standing Tournament", desc: "Compete against 7 fellow jumpers in bracketed rounds to see who maintains balance the longest." },
      { title: "Reverse Direction Spin", desc: "React quickly as the operator suddenly reverses rotation direction to test your reflexes!" }
    ],
    features: [
      "Dual-height ultra-soft high-density foam rotating sweep arms that cause zero pain on contact",
      "8 individual pneumatic air-cushioned jump pods with non-slip circular boundaries",
      "Operator-controlled variable-speed console with instant-stop safety deadman brakes",
      "Surrounding 24-inch zero-shock crash pad absorbing all stumble dismounts",
      "Electronic arena music and game show sound effects synchronized to the action"
    ],
    ageGroup: "Ages 6+ (Jump & Duck Thrill)",
    agePolicy: {
      minimumAge: "6 Years old. Jumpers must be able to jump and duck independently.",
      heightWeight: "Maximum jumper weight: 220 lbs (100 kg).",
      supervision: "Dedicated operator controls every second of game speed and oversees safety.",
      equipment: "Grip socks mandatory. All loose objects removed from pockets."
    },
    safetyGuidelines: [
      "Remain centered on your designated circular pod throughout the game round.",
      "Jump over the low arm or duck under the high arm — NEVER grab, kick, or climb onto rotating arms.",
      "If the foam arm taps you and you fall off your pod, remain seated on the padded floor until the round stops.",
      "Do not push or touch adjacent jumpers on neighboring pods.",
      "Operator will immediately stop the rotating arms if any participant requests an exit."
    ],
    gallery: [
      { url: "../assets/images/attractions/Wipeout%20Challenge/Wipeout_challenge_for_kids_2K_20261014003706.jpg", caption: "Rotating padded sweep arm challenging jumpers on circular air-cushioned pods." },
      { url: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224655.jpg", caption: "Jumpers ducking and leaping in sync during a thrilling last-one-standing round." },
      { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", caption: "Deep surrounding safety landing pads cushioning every hilarious wipeout." }
    ],
    benefits: [
      { title: "Lightning-Fast Reflexes", desc: "Reading incoming sweep arms hones visual processing speed and jump reaction timing." },
      { title: "Dynamic Squat & Leap Power", desc: "Rapidly alternating between deep squats and vertical leaps provides an exceptional leg workout." },
      { title: "Friendly Sportsmanship", desc: "Cheering on surviving jumpers builds lighthearted camaraderie and good sportsmanship." },
      { title: "Focus Under Pressure", desc: "Maintaining balance while anticipating arm reversals sharpens mental concentration." }
    ],
    faqs: [
      { q: "Does it hurt if the arm hits you?", a: "Not at all! The sweep arms are made of lightweight, ultra-cushioned soft foam that gently knocks you off balance onto thick padding." },
      { q: "Can the operator control the speed for younger kids?", a: "Yes! Our operators always start at gentle slow speeds and adjust appropriately based on the jumpers on court." },
      { q: "How many players can play at once?", a: "Up to 8 players can compete simultaneously, making it ideal for birthday groups and family challenges." }
    ],
    related: ["interactive-play-arena", "airbag-jump-zone", "mini-sports-arena"]
  },
  {
    id: "airbag-jump-zone",
    num: 21,
    title: "Airbag Jump Zone",
    category: "trampolines",
    categoryLabel: "Trampoline Zones",
    tagline: "Experience zero-gravity leaps from elevated Olympic jump runways onto a giant custom stunt airbag!",
    heroImage: "../assets/images/attractions/Airbag%20Jump%20Zone/Child_jumping_on_airbag_zone_2K_20261014010208.jpg",
    description: "Experience supervised jumps onto a purpose-designed commercial stunt landing airbag with dual pressure chambers.",
    specs: ["Stunt Airbag", "Dual Jump Runways", "Dual Pressure Chambers"],
    footwear: "Grip Socks Mandatory",
    about: "Fly through the air with the confidence of a Hollywood stunt performer! The Airbag Jump Zone features a giant 30ft x 20ft custom dual-chamber zero-gravity landing airbag positioned at the end of dual high-rebound Olympic spring runways.<br><br>Engineered with dual independent air chambers and pressure relief exhaust vents, the top sheet decelerates your body gently while the lower chamber prevents bottoming out. Jumpers can practice aerial tucks, spread-eagles, and giant airborne strides with an ultra-soft, zero-impact deceleration landing.",
    activities: [
      { title: "Stunt Flight Leap", desc: "Sprint down the Olympic runway and launch yourself high into the center of the giant airbag." },
      { title: "Aerial Spread-Eagle Jump", desc: "Spread arms and legs wide in mid-air to maximize your flight silhouette before a soft cushion landing." },
      { title: "Seat-Drop Cushioning", desc: "Perform elevated seat-drops and feel the airbag's internal air valves gently deflate around your body." },
      { title: "Slide-Off Rollout", desc: "Roll easily off the smooth vinyl surface toward the exit ramp to reset for your next flight." }
    ],
    features: [
      "Custom 30ft x 20ft commercial stunt landing airbag with dual independent internal air pressure chambers",
      "Continuous industrial air replenishment blowers maintaining exact pneumatic firmness levels",
      "Dual 25-foot Olympic spring approach runways with padded launch markers",
      "Anti-friction, anti-microbial top sheet ensuring comfortable slide-offs without skin abrasions",
      "Dedicated jump marshal stationed at the launch deck to ensure single-jumper intervals"
    ],
    ageGroup: "Ages 5+ (All Jumpers)",
    agePolicy: {
      minimumAge: "5 Years old (Younger jumpers under 5 should enjoy the Toddler Lagoon soft pit).",
      heightWeight: "Maximum jumper weight: 260 lbs (118 kg).",
      supervision: "Launch marshal regulates one jumper per runway; clear indicator lights signal when safe to jump.",
      equipment: "Grip socks mandatory. All items removed from pockets."
    },
    safetyGuidelines: [
      "Strictly 1 jumper on the approach runway at any time — wait for the green light from the marshal.",
      "Always land on your rear bottom, back, or feet — NEVER dive head-first or neck-first onto the airbag.",
      "Exit the airbag immediately after landing by sliding toward the side exit ramp.",
      "Do not attempt double flips or uncontrolled inverted maneuvers without prior marshal certification.",
      "Keep pockets completely empty; remove eyeglasses or use athletic straps."
    ],
    gallery: [
      { url: "../assets/images/attractions/Airbag%20Jump%20Zone/Child_jumping_on_airbag_zone_2K_20261014010208.jpg", caption: "Jumper launching high above the dual-chamber commercial stunt airbag." },
      { url: "../assets/images/attractions/Mega%20Trampoline%20Arena/Mega_Trampoline_Arena_for_kids_20261013224655.jpg", caption: "Elevated Olympic spring runway providing maximum vertical liftoff." },
      { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", caption: "Ultra-smooth vinyl top sheet providing effortless deceleration and quick rollout exits." }
    ],
    benefits: [
      { title: "Effortless Exit Transition", desc: "Unlike foam pits, the flat airbag surface allows jumpers to stand up and exit in under 3 seconds." },
      { title: "High-Confidence Aerial Leaps", desc: "Zero landing shock empowers jumpers to overcome hesitation and leap fearlessly." },
      { title: "Hygiene & Cleanliness", desc: "Smooth vinyl top sheets are disinfected multiple times daily with hospital-grade sanitizers." },
      { title: "Pure Kinetic Euphoria", desc: "The sensation of soaring through open air before a cloud-soft landing is unmatched." }
    ],
    faqs: [
      { q: "How is an airbag better than a foam pit?", a: "Airbags provide identical zero-shock cushioning, but jumping on an airbag allows you to stand up and walk off instantly without climbing out of cubes!" },
      { q: "Can an adult jump on the airbag?", a: "Yes! Our commercial airbag is certified to absorb impacts from jumpers up to 260 lbs safely." },
      { q: "Is the air constantly blowing?", a: "Yes, dual commercial air blowers continuously circulate fresh air to maintain optimal deceleration pressure." }
    ],
    related: ["foam-pit-challenge", "mega-trampoline-arena", "parkour-jump-zone"]
  },
];

const AGE_SPECS = {
  'mega-trampoline-arena': { minAge: 4, maxAge: 99, ageTags: ['junior', 'bigkids', 'family'], ageFilterLabel: 'Ages 4+ (Family & Big Kids)' },
  'ninja-warrior-course': { minAge: 6, maxAge: 15, ageTags: ['junior', 'bigkids'], ageFilterLabel: 'Ages 6 - 15' },
  'adventure-climbing-zone': { minAge: 5, maxAge: 14, ageTags: ['junior', 'bigkids'], ageFilterLabel: 'Ages 5 - 14' },
  'super-slide-mountain': { minAge: 3, maxAge: 12, ageTags: ['toddler', 'junior', 'bigkids'], ageFilterLabel: 'Ages 3 - 12' },
  'rainbow-ball-pit': { minAge: 1, maxAge: 6, ageTags: ['toddler', 'junior'], ageFilterLabel: 'Ages 1 - 6' },
  'sky-high-rope-adventure': { minAge: 6, maxAge: 14, ageTags: ['junior', 'bigkids'], ageFilterLabel: 'Ages 6 - 14' },
  'foam-pit-challenge': { minAge: 5, maxAge: 99, ageTags: ['junior', 'bigkids', 'family'], ageFilterLabel: 'Ages 5+ (All Jumpers)' },
  'laser-maze-mission': { minAge: 5, maxAge: 99, ageTags: ['junior', 'bigkids', 'family'], ageFilterLabel: 'Ages 5+ (Solo & Team)' },
  'interactive-play-arena': { minAge: 3, maxAge: 99, ageTags: ['toddler', 'junior', 'bigkids', 'family'], ageFilterLabel: 'Ages 3+ (All Ages)' },
  'little-explorers-zone': { minAge: 0, maxAge: 3, ageTags: ['toddler'], ageFilterLabel: 'Ages 0 - 3 (Toddlers Only)' },
  'cargo-net-climber': { minAge: 4, maxAge: 12, ageTags: ['junior', 'bigkids'], ageFilterLabel: 'Ages 4 - 12' },
  'balance-bounce-trail': { minAge: 3, maxAge: 9, ageTags: ['toddler', 'junior', 'bigkids'], ageFilterLabel: 'Ages 3 - 9' },
  'neon-glow-adventure': { minAge: 4, maxAge: 99, ageTags: ['junior', 'bigkids', 'family'], ageFilterLabel: 'Ages 4+ (All Ages)' },
  'mini-sports-arena': { minAge: 4, maxAge: 14, ageTags: ['junior', 'bigkids'], ageFilterLabel: 'Ages 4 - 14' },
  'mystery-tunnel-quest': { minAge: 3, maxAge: 10, ageTags: ['toddler', 'junior', 'bigkids'], ageFilterLabel: 'Ages 3 - 10' },
  'spider-wall-climb': { minAge: 4, maxAge: 12, ageTags: ['junior', 'bigkids'], ageFilterLabel: 'Ages 4 - 12' },
  'parkour-jump-zone': { minAge: 6, maxAge: 15, ageTags: ['junior', 'bigkids'], ageFilterLabel: 'Ages 6 - 15' },
  'adventure-tower': { minAge: 4, maxAge: 14, ageTags: ['junior', 'bigkids'], ageFilterLabel: 'Ages 4 - 14' },
  'volcano-climb': { minAge: 3, maxAge: 10, ageTags: ['toddler', 'junior', 'bigkids'], ageFilterLabel: 'Ages 3 - 10' },
  'wipeout-challenge': { minAge: 6, maxAge: 99, ageTags: ['junior', 'bigkids', 'family'], ageFilterLabel: 'Ages 6+' },
  'airbag-jump-zone': { minAge: 5, maxAge: 99, ageTags: ['junior', 'bigkids', 'family'], ageFilterLabel: 'Ages 5+ (All Jumpers)' }
};

// Enrich all zones with age filter properties
ATTRACTION_ZONES.forEach(zone => {
  const spec = AGE_SPECS[zone.id] || { minAge: 0, maxAge: 99, ageTags: ['family'], ageFilterLabel: 'All Ages' };
  zone.minAge = spec.minAge;
  zone.maxAge = spec.maxAge;
  zone.ageTags = spec.ageTags;
  zone.ageFilterLabel = spec.ageFilterLabel;
});

module.exports = {
  ATTRACTION_ZONES,
  AGE_SPECS
};
