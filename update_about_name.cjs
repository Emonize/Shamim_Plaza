const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  if (content.includes('>About Us<')) {
    content = content.replace(/>About Us</g, '>About<');
    changed = true;
  }
  
  // also check without angle brackets
  if (content.includes('"About Us"')) {
    content = content.replace(/"About Us"/g, '"About"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content);
    console.log('Updated ' + f);
  }
});
