import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://streamforge.gg'
  const now = new Date('2026-05-11')

  return [
    // ── Core pages ──
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.92,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.90,
    },

    // ── Blog posts ──
    {
      url: `${baseUrl}/blog/how-to-grow-on-twitch`,
      lastModified: new Date('2026-05-04'),
      changeFrequency: 'monthly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/blog/how-to-get-more-viewers-on-twitch`,
      lastModified: new Date('2026-05-03'),
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/blog/twitch-algorithm-explained`,
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/blog/why-your-stream-is-not-growing`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/is-streamforge-real`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/blog/what-is-streamforge`,
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'monthly',
      priority: 0.88,
    },
  ]
}
