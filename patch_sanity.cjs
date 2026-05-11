const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '2za38opa',
  dataset: 'production',
  token: 'skYJXOony03dhVdJtP26qYK4wYqxcfOUT6iX6wvOdD9hphusIZwiRLCogzKBl53C3TS6SjKt3euTQaFg5',
  useCdn: false,
  apiVersion: '2023-05-03'
});

async function main() {
  await client.patch('165f4af0-de6a-4859-8e52-2b0761845788')
    .set({ airbnbLink: 'https://www.airbnb.ae/rooms/1421830077142366652?check_in=2026-05-26&check_out=2026-05-30&search_mode=regular_search&source_impression_id=p3_1778542544_P3BWgikLNkXq3zPd&previous_page_section_name=1000&federated_search_id=05a63938-3c72-4c88-8469-bc8e6c766dbe' })
    .commit();
  console.log('Patched');
}

main().catch(console.error);
