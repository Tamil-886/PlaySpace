const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) res = res.concat(walk(full));
    else if (f.endsWith('.html')) res.push(full);
  });
  return res;
}

const files = walk(path.join(__dirname, '..'));
let updatedNav = 0;
let updatedScripts = 0;
let updatedSticky = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  // Determine relative basePath
  const rel = path.relative(path.join(__dirname, '..'), f).replace(/\\/g, '/');
  let basePath = '';
  if (rel.startsWith('pages/') || rel.startsWith('parent/') || rel.startsWith('admin/') || rel.startsWith('documentation/')) {
    basePath = '../';
  }

  // 1. Inject Cart toggle into .ps-nav-actions if not present
  if (content.includes('class="ps-nav-actions"') && !content.includes('class="ps-cart-toggle ps-btn-icon')) {
    const navCartHtml = `      <!-- Cart Button directly in Nav Bar -->
      <button class="ps-cart-toggle ps-btn-icon position-relative" aria-label="Shopping Cart" title="View Cart">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="ps-cart-badge">0</span>
      </button>

`;

    // Try inserting before '<!-- Sign In Option -->'
    if (content.includes('<!-- Sign In Option -->')) {
      content = content.replace('<!-- Sign In Option -->', navCartHtml + '      <!-- Sign In Option -->');
      changed = true;
      updatedNav++;
    } else if (content.includes('class="ps-nav-auth-btn"')) {
      const idx = content.indexOf('class="ps-nav-auth-btn"');
      const startOfTag = content.lastIndexOf('<a', idx);
      content = content.slice(0, startOfTag) + navCartHtml + content.slice(startOfTag);
      changed = true;
      updatedNav++;
    } else if (content.includes('class="ps-mobile-toggle"')) {
      const idx = content.indexOf('class="ps-mobile-toggle"');
      const startOfTag = content.lastIndexOf('<button', idx);
      content = content.slice(0, startOfTag) + navCartHtml + content.slice(startOfTag);
      changed = true;
      updatedNav++;
    }
  }

  // 2. Inject cart.js if not present
  if (!content.includes('cart.js')) {
    const scriptTag = `  <script src="${basePath}assets/js/cart.js"></script>\n`;
    if (content.includes(`<script src="${basePath}assets/js/app.js"></script>`)) {
      content = content.replace(`<script src="${basePath}assets/js/app.js"></script>`, scriptTag + `<script src="${basePath}assets/js/app.js"></script>`);
      changed = true;
      updatedScripts++;
    } else if (content.includes('</body>')) {
      content = content.replace('</body>', scriptTag + '</body>');
      changed = true;
      updatedScripts++;
    }
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
  }
});

console.log(`Done! Updated Navbar in: ${updatedNav} files; Sticky bar in: ${updatedSticky} files; Added cart.js in: ${updatedScripts} files.`);
