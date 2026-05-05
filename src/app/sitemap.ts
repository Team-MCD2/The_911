import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://the911.fr';

/**
 * Sitemap XML auto-généré par Next.js (file convention `sitemap.ts`).
 *
 * Note : les ancres (#menu, #delivery…) ne sont PAS des URLs distinctes pour
 * Google. On ne liste que les vraies pages. On ajoute manuellement la home
 * et la page mentions légales.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
