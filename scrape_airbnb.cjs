const https = require('https');
const fs = require('fs');

const url = 'https://www.airbnb.ae/rooms/1421830077142366652';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    // Look for image URLs from a0.muscache.com
    const regex = /https:\/\/a0\.muscache\.com\/im\/pictures\/[^"?'\\]+/g;
    const matches = data.match(regex);
    if (matches) {
      // Get unique high-res images
      const uniqueUrls = [...new Set(matches)]
        .filter(url => !url.includes('?')) // Avoid thumbnails if possible
        .slice(0, 5); // Let's grab 5 pictures
      
      console.log('Found images:');
      console.log(uniqueUrls);
      fs.writeFileSync('airbnb_images.json', JSON.stringify(uniqueUrls, null, 2));
    } else {
      console.log('No images found');
    }
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});
