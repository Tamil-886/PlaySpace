const fs = require('fs');
const path = require('path');

const ROOT_DIR = fs.existsSync(path.resolve(__dirname, '..', 'pages'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..', 'playspace');

let modifiedCount = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const rel = filePath.replace(/\\/g, '/');

  if (rel.includes('/pages/')) {
    // In pages/ directory, links to booking are relative to pages/
    content = content.split('../parent/book-session.html').join('booking.html');
  } else if (rel.includes('/documentation/') || rel.includes('/admin/')) {
    content = content.split('../parent/book-session.html').join('../pages/booking.html');
  } else if (rel.includes('/parent/')) {
    if (!rel.endsWith('book-session.html')) {
      content = content.split('href="book-session.html"').join('href="../pages/booking.html"');
    }
  } else {
    // Root files (index.html, home-2.html)
    content = content.split('parent/book-session.html').join('pages/booking.html');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log('Updated:', rel);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== '.git') walkDir(full);
    } else if (e.name.endsWith('.html')) {
      processFile(full);
    }
  }
}

walkDir(ROOT_DIR);
console.log('Total files updated:', modifiedCount);
