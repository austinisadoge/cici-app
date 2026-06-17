import type { MetadataRoute } from 'next'
import { fetchCatalog } from '@/lib/catalog'
import { SERIES, CATEGORIES } from '@/lib/products'

import { BRAND } from '@/lib/brand'

const BASE = BRAND.url

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await fetchCatalog()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/shop`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/custom`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/advantages`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/style-map`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/design`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/works`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/guide`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/returns`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const seriesPages: MetadataRoute.Sitemap = SERIES.map(s => ({
    url: `${BASE}/shop?series=${s.id}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(c => ({
    url: `${BASE}/shop?category=${c.id}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  const productPages: MetadataRoute.Sitemap = catalog.map(p => ({
    url: `${BASE}/product/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...productPages, ...seriesPages, ...categoryPages]
}
