const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function updatePublicFiles(dir) {
  let count = 0;
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (file !== 'parent' && file !== 'admin' && file !== 'node_modules') {
        count += updatePublicFiles(full);
      }
    } else if (file.endsWith('.html') && file !== 'index.html' && file !== 'home-2.html') {
      let html = fs.readFileSync(full, 'utf8');
      if (html.includes('Book Jump') && html.includes('ps-header') && !html.includes('ps-nav-auth-btn')) {
        const isSub = full.includes('pages' + path.sep) || full.includes('documentation' + path.sep);
        const loginPath = isSub ? '../pages/login.html' : 'pages/login.html';

        // 1. Add Sign In option to nav actions before Book Jump
        const bookJumpPattern = /(<!-- Primary Booking CTA -->\s*<a href="[^"]*parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-sm">Book Jump<\/a>)/;
        if (bookJumpPattern.test(html)) {
          html = html.replace(bookJumpPattern, `<!-- Sign In Option -->\n      <a href="${loginPath}" class="ps-btn ps-btn-outline ps-btn-sm ps-nav-auth-btn">Sign In</a>\n\n      $1`);
        } else {
          const directPattern = /(<a href="[^"]*parent\/book-session\.html" class="ps-btn ps-btn-primary ps-btn-sm">Book Jump<\/a>)/;
          if (directPattern.test(html)) {
            html = html.replace(directPattern, `<a href="${loginPath}" class="ps-btn ps-btn-outline ps-btn-sm ps-nav-auth-btn">Sign In</a>\n      $1`);
          }
        }

        // 2. Add to mobile drawer before </nav>
        if (!html.includes('ps-nav-item-mobile-only')) {
          html = html.replace(/(\s*)<\/nav>/, `$1  <!-- 10. Sign In / Account (Mobile Drawer) -->$1  <div class="ps-nav-item ps-nav-item-mobile-only">$1    <a href="${loginPath}" class="ps-nav-link ps-nav-auth-btn ">Sign In</a>$1  </div>$1</nav>`);
        }

        fs.writeFileSync(full, html, 'utf8');
        count++;
      }
    }
  });
  return count;
}

const updated = updatePublicFiles(ROOT_DIR);
console.log('Successfully updated pages with Sign In navbar option:', updated);
