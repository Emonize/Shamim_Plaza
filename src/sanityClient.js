import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: '2za38opa', // from sanity.cli.js
  dataset: 'production',
  useCdn: false, // Set to false to bypass cache and instantly see updates
  apiVersion: '2024-04-29', // use current date
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
