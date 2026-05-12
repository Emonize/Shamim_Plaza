export default async function handler(req, res) {
  // Add CORS headers to allow requests from the frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { path } = req.body || {};
    
    // Vercel automatically injects geolocation headers
    const country = req.headers['x-vercel-ip-country'] || 'Unknown';
    const city = req.headers['x-vercel-ip-city'] || 'Unknown';
    const userAgent = req.headers['user-agent'] || 'Unknown';
    
    // Determine basic device type from user agent
    let device = 'Desktop';
    if (/mobile/i.test(userAgent)) device = 'Mobile';
    if (/tablet/i.test(userAgent)) device = 'Tablet';

    // Get Sanity config from env vars
    const projectId = process.env.VITE_SANITY_PROJECT_ID || 'kyd2f6ed';
    const dataset = process.env.VITE_SANITY_DATASET || 'production';
    const token = process.env.SANITY_WRITE_TOKEN;

    if (!token) {
      console.warn('Missing SANITY_WRITE_TOKEN, skipping analytics tracking.');
      return res.status(200).json({ status: 'skipped, no token' });
    }

    const mutation = {
      mutations: [
        {
          create: {
            _type: 'siteVisit',
            visitedAt: new Date().toISOString(),
            country: decodeURIComponent(country),
            city: decodeURIComponent(city),
            device,
            path: path || '/'
          }
        }
      ]
    };

    const response = await fetch(`https://${projectId}.api.sanity.io/v2023-01-01/data/mutate/${dataset}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(mutation)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Sanity API Error:', errorText);
      return res.status(500).json({ error: 'Failed to log visit' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Tracking Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
