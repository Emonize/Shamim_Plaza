const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  if (content.includes('>Resident Portal<')) {
    content = content.replace(/>Resident Portal</g, '>Tenants<');
    changed = true;
  }
  
  // also check without case
  if (content.includes('Resident Portal')) {
    content = content.replace(/Resident Portal/g, 'Tenants');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content);
    console.log('Updated ' + f);
  }
});
