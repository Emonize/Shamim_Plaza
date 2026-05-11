const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const newBlock = `<div class="mobile-dropdown-container" style="width: 100%;">
          <button id="mobile-portfolio-toggle" style="background: none; border: none; color: inherit; font-family: var(--font-heading); font-size: 2rem; padding: 0; cursor: pointer; display: flex; align-items: center; justify-content: space-between; width: 100%; text-align: left;">
            Portfolio <i data-lucide="chevron-down" id="mobile-portfolio-icon" style="transition: transform 0.3s; width: 28px; height: 28px;"></i>
          </button>
          <div id="mobile-portfolio-sub" class="mobile-sub-nav" style="display: none; padding-top: 15px; border-left: 1px solid rgba(255,255,255,0.1); margin-left: 15px; padding-left: 15px;">
            <a href="/portfolio.html" style="color: var(--color-gold); font-weight: 600;">All Spaces</a>
            <a href="/furnished.html">Furnished Apartment</a>
            <a href="/unfurnished.html">Non Furnished Apartment</a>
            <a href="/office.html">Office Space</a>
            <a href="/retail.html">Retail Space</a>
          </div>
        </div>`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('Portfolio</a>')) {
    const regex = /<a href="\/portfolio\.html"[^>]*>Portfolio<\/a>\s*<div class="mobile-sub-nav">[\s\S]*?<\/div>/g;
    content = content.replace(regex, newBlock);
    fs.writeFileSync(f, content);
    console.log('Updated ' + f);
  }
});
