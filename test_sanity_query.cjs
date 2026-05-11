const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '2za38opa',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03'
});

client.fetch('*[_type == "property"] | order(_createdAt asc) { ..., "videoUrl": videoFile.asset->url }')
  .then(p => console.log(JSON.stringify(p, null, 2)))
  .catch(console.error);
