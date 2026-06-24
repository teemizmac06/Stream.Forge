import { MetadataRoute } from 'next'
import { STREAMERS } from '@/lib/streamersData'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://streamforge.gg'
  const now = new Date()
  return [
    { url: base,                         lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/pricing`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/proofs`,             lastModified: now, changeFrequency: 'daily',   priority: 0.95 },
    { url: `${base}/community`,          lastModified: now, changeFrequency: 'daily',   priority: 0.92 },
    { url: `${base}/streamers`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.90 },
    { url: `${base}/faq`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.88 },
    { url: `${base}/blog`,               lastModified: now, changeFrequency: 'daily',   priority: 0.90 },
    { url: `${base}/blog/how-to-grow-on-twitch`,              lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${base}/blog/how-to-get-more-viewers-on-twitch`,  lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/twitch-algorithm-explained`,         lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog/why-your-stream-is-not-growing`,     lastModified: now, changeFrequency: 'monthly', priority: 0.83 },
    { url: `${base}/blog/is-streamforge-real`,                lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${base}/blog/what-is-streamforge`,                lastModified: now, changeFrequency: 'monthly', priority: 0.86 },
    ...STREAMERS.map(s => ({
      url: `${base}/streamers/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ]
}
