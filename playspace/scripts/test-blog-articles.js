const fs = require('fs');
const path = require('path');

console.log('--- Testing Blog & Article Page Features ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  PASS: ${message}`);
    passed++;
  } else {
    console.error(`  FAIL: ${message}`);
    failed++;
  }
}

const EXPECTED_ARTICLES = [
  {
    title: 'Top Benefits of Trampoline Play for Kids',
    category: 'Play & Activities',
    desc: 'Discover how supervised trampoline activities can support balance, coordination, and active play.'
  },
  {
    title: 'Why Indoor Play Is Great for Growing Kids',
    category: 'Parenting Tips',
    desc: 'Explore ways indoor play can encourage movement, creativity, and social interaction.'
  },
  {
    title: 'How to Plan the Perfect Kids\' Birthday Party',
    category: 'Birthday Party Ideas',
    desc: 'Learn how to choose a party theme, plan activities, and organize a memorable celebration.'
  },
  {
    title: 'Essential Indoor Playground Safety Tips',
    category: 'Safety & Wellness',
    desc: 'Understand age guidelines, appropriate play equipment, and the importance of following staff instructions.'
  },
  {
    title: 'Fun Indoor Activities for Toddlers',
    category: 'Play & Activities',
    desc: 'Find age-appropriate ideas for exploring, crawling, climbing, and sensory play.'
  },
  {
    title: 'Planning an Exciting School Field Trip',
    category: 'Events & Updates',
    desc: 'Discover how to organize group visits, coordinate schedules, and prepare children for an indoor adventure.'
  },
  {
    title: 'Meet the Most Exciting Adventure Zones at PLAYSPACE',
    category: 'Indoor Adventures',
    desc: 'Discover trampoline arenas, ninja courses, climbing zones, slides, and other available attractions.'
  },
  {
    title: 'Five Ways to Make Family Playtime More Memorable',
    category: 'Parenting Tips',
    desc: 'Get simple ideas for enjoying quality time, playing together, and creating happy family memories.'
  }
];

const ROOT_DIR = fs.existsSync(path.resolve(__dirname, '..', 'pages'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..', 'playspace');

// 1. Check blog.html
const blogHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'blog.html'), 'utf8');

EXPECTED_ARTICLES.forEach((item, index) => {
  assert(blogHtml.includes(item.title), `blog.html contains title #${index + 1}: "${item.title}"`);
  assert(blogHtml.includes(item.desc), `blog.html contains description #${index + 1}: "${item.desc.slice(0, 40)}..."`);
});

assert(blogHtml.includes('id="ps-blog-search"'), 'blog.html has search input element');
assert(blogHtml.includes('id="ps-blog-filters"'), 'blog.html has category filter buttons');
assert(blogHtml.includes('data-category="play-activities"'), 'blog.html has Play & Activities filter');
assert(blogHtml.includes('data-category="parenting-tips"'), 'blog.html has Parenting Tips filter');
assert(blogHtml.includes('data-category="birthday-party-ideas"'), 'blog.html has Birthday Party Ideas filter');
assert(blogHtml.includes('data-category="safety-wellness"'), 'blog.html has Safety & Wellness filter');
assert(blogHtml.includes('data-category="events-updates"'), 'blog.html has Events & Updates filter');
assert(blogHtml.includes('data-category="indoor-adventures"'), 'blog.html has Indoor Adventures filter');

// 2. Check blog.js
const blogJs = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'js', 'blog.js'), 'utf8');
assert(blogJs.includes('var ARTICLES = [') || blogJs.includes('const ARTICLES = ['), 'blog.js defines ARTICLES data array');

EXPECTED_ARTICLES.forEach((item, index) => {
  assert(blogJs.includes(item.title), `blog.js contains article #${index + 1} title`);
});

assert(blogJs.includes('initBlogListing'), 'blog.js implements listing search & filter');
assert(blogJs.includes('initBlogDetail'), 'blog.js implements dynamic detail loading');

// 3. Check blog-details.html
const blogDetailsHtml = fs.readFileSync(path.join(ROOT_DIR, 'pages', 'blog-details.html'), 'utf8');
assert(blogDetailsHtml.includes('id="ps-article-container"'), 'blog-details.html has detail container');
assert(blogDetailsHtml.includes('id="ps-article-title"'), 'blog-details.html has dynamic title element');
assert(blogDetailsHtml.includes('id="ps-article-body"'), 'blog-details.html has dynamic body element');
assert(blogDetailsHtml.includes('id="ps-article-related-grid"'), 'blog-details.html has related articles grid');
assert(blogDetailsHtml.includes('blog.js'), 'blog-details.html loads blog.js');

// 4. Check admin blog-management.html
const adminHtml = fs.readFileSync(path.join(ROOT_DIR, 'admin', 'blog-management.html'), 'utf8');
EXPECTED_ARTICLES.forEach((item, index) => {
  assert(adminHtml.includes(item.title), `admin blog-management.html lists article #${index + 1}`);
});

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
