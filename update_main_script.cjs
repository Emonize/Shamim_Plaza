const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/src="\/main\.js(\?v=\d+)?"/g, 'src="/main.js?v=' + Date.now() + '"');
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
