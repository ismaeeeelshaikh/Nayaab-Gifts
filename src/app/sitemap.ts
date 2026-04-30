import { MetadataRoute } from 'next'
import prisma from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nayaabgifts.me'

  // Fetch all products to index them dynamically
  const products = await prisma.product.findMany({
    select: {
      id: true,
      updatedAt: true,
    }
  })

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticUrls = [
    '',
    '/products',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
    '/refund-policy',
    '/shipping-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'monthly' as const,
    priority: route === '' ? 1 : 0.5,
  }))

  return [...staticUrls, ...productUrls]
}
