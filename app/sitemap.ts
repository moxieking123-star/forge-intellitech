import type { MetadataRoute } from 'next'

const BASE_URL = 'https://forgeintellitech.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/programs`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/techup`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${BASE_URL}/launchpad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4
    }
  ]
}
