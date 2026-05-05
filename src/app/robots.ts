import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://the911.fr';

/**
 * /robots.txt généré par Next.js (file convention `robots.ts`).
 * On indexe tout, sauf les éventuelles routes `_next` & `api/` privées.
 * On indique la sitemap pour que Googlebot la prenne tout de suite.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
