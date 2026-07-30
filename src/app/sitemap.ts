import type { MetadataRoute } from 'next';
import { DESTS } from '@/data';
import { SITE_URL } from '@/data/siteMetadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/destinations`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/events`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  return [
    ...staticRoutes,
    ...DESTS.map((destination) => ({
      url: `${SITE_URL}/destinations/${destination.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
