export default async function sitemap() {
  const baseUrl = "https://www.nazworld.com"; // <-- UPDATE THIS TO YOUR FINAL DOMAIN

  // Fetch all products from your API
  // Use the full public URL so the server can fetch them during the build
  let products = [];
  try {
    const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
    products = await res.json();
  } catch (error) {
    console.error("Sitemap fetch error:", error);
  }

  // 1. Create entries for products
  const productEntries = products.map((product) => ({
    url: `${baseUrl}/products/${product._id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  // 2. Create entries for static pages
  const staticEntries = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/offers`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/gadgets`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/fashion`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/electronics`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
  ];

  return [...staticEntries, ...productEntries];
}