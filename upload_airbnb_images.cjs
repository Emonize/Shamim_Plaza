const { createClient } = require('@sanity/client');
const https = require('https');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: '2za38opa',
  dataset: 'production',
  token: 'skYJXOony03dhVdJtP26qYK4wYqxcfOUT6iX6wvOdD9hphusIZwiRLCogzKBl53C3TS6SjKt3euTQaFg5',
  useCdn: false,
  apiVersion: '2023-05-03'
});

const imageUrls = [
  'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQyMTgzMDA3NzE0MjM2NjY1Mg==/original/3fc75594-36d3-4d75-b680-aa2432c08c70.jpeg',
  'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQyMTgzMDA3NzE0MjM2NjY1Mg==/original/444af658-da5a-453b-a0e2-59568f503bcf.jpeg',
  'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQyMTgzMDA3NzE0MjM2NjY1Mg==/original/13e39491-4359-4ba3-9fd7-e0c7ad932f8a.jpeg',
  'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQyMTgzMDA3NzE0MjM2NjY1Mg==/original/816bfa5c-3053-457f-8381-6766e6ea7fcd.jpeg'
];

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      const fileStream = fs.createWriteStream(filename);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filename);
      });
    });
    req.on('error', reject);
  });
}

async function main() {
  const propertyId = '165f4af0-de6a-4859-8e52-2b0761845788';
  
  // First get current document to see if images array exists
  const doc = await client.getDocument(propertyId);
  const currentImages = doc.images || [];

  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const filename = `airbnb_img_${i}.jpg`;
    console.log(`Downloading ${filename}...`);
    await downloadImage(url, filename);
    
    console.log(`Uploading ${filename} to Sanity...`);
    const asset = await client.assets.upload('image', fs.createReadStream(filename), {
      filename: filename
    });
    
    console.log(`Uploaded as ${asset._id}`);
    
    currentImages.push({
      _type: 'image',
      _key: Math.random().toString(36).substring(7),
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    });
    
    // Clean up local file
    fs.unlinkSync(filename);
  }

  console.log('Patching document with new images...');
  await client.patch(propertyId)
    .set({ images: currentImages })
    .commit();
    
  console.log('Successfully uploaded and attached Airbnb images to the property!');
}

main().catch(console.error);
