import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/profile/', '/checkout/', '/api/'],
    },
    sitemap: 'https://nayaabgifts.me/sitemap.xml',
  }
}
