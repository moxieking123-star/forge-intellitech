import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // ⚠️ CHANGE THIS to your actual domain
  const baseUrl = 'https://forgeintellitech.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}