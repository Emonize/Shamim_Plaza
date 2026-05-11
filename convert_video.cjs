const { createClient } = require('@sanity/client');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const https = require('https');

const client = createClient({
  projectId: '2za38opa',
  dataset: 'production',
  token: 'skFh2m8iY2a8wJcZVj3mR7j9wR6P8m9QzQ2nN2bX9rYxP8m9QzQ2nN2bX9rYx', // Need to get valid token or just use what user has in environment or let me see if I can use MCP tools.
  useCdn: false,
  apiVersion: '2023-05-03'
});

async function main() {
  const movUrl = 'https://cdn.sanity.io/files/2za38opa/production/af53ca50084303a03fae6ff8af311f57f4ab8b17.mov';
  const movPath = path.join(__dirname, 'property_video.mov');
  const mp4Path = path.join(__dirname, 'property_video.mp4');

  console.log('Downloading .mov file...');
  await new Promise((resolve, reject) => {
    const file = fs.createWriteStream(movPath);
    https.get(movUrl, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(movPath, () => reject(err));
    });
  });

  console.log('Converting to .mp4...');
  // Find ffmpeg.exe
  const ffmpegPath = path.join(__dirname, 'ffmpeg-master-latest-win64-gpl', 'bin', 'ffmpeg.exe');
  
  if (!fs.existsSync(ffmpegPath)) {
    throw new Error('ffmpeg.exe not found at ' + ffmpegPath);
  }

  execSync(`"${ffmpegPath}" -y -i "${movPath}" -vcodec libx264 -acodec aac -movflags +faststart "${mp4Path}"`);

  console.log('Conversion complete. You can now upload via MCP tools or via client.');
}

main().catch(console.error);
