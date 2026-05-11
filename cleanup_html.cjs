const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\mohdy\\Shamim_Plaza';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const regex = /<span style="--i:2">H<\/span>[\s\S]*?<\/span>\s*<\/span>/;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Cleaned up ' + file);
  } else {
    console.log('No match in ' + file);
  }
}
