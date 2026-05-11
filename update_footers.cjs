const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const regex1 = /<p id="footer-text"[^>]*>.*?(?:\&copy;|©).*?<\/p>/gs;
  if (regex1.test(content)) {
    content = content.replace(regex1, '<p id="footer-text" class="text-white-muted" style="font-size: 0.9rem;"></p>');
    changed = true;
  }

  const regex2 = /<p class="text-white-muted" style="font-size: 0\.9rem;">\s*(?:\&copy;|©).*?<\/p>/gs;
  if (regex2.test(content)) {
    content = content.replace(regex2, '<p id="footer-text" class="text-white-muted" style="font-size: 0.9rem;"></p>');
    changed = true;
  }
  
  const regex3 = /<p style="text-align: center; color: var\(--color-white-muted\);">\s*(?:\&copy;|©).*?<\/p>/gs;
  if (regex3.test(content)) {
    content = content.replace(regex3, '<p id="footer-text" style="text-align: center; color: var(--color-white-muted);"></p>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
