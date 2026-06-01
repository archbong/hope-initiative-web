// This file would be used in a build script or server-side
// For static sites, we'll use the static sitemap.xml

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

export const generateSitemap = () => {
  const baseUrl = 'https://hopeforthehopeless.org'

  const staticPages: SitemapUrl[] = [
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/about', changefreq: 'monthly', priority: 0.9 },
    { loc: '/programs', changefreq: 'weekly', priority: 0.9 },
    { loc: '/success-stories', changefreq: 'weekly', priority: 0.8 },
    { loc: '/gallery', changefreq: 'monthly', priority: 0.7 },
    { loc: '/volunteer', changefreq: 'monthly', priority: 0.8 },
    { loc: '/donate', changefreq: 'monthly', priority: 0.9 },
    { loc: '/partners', changefreq: 'monthly', priority: 0.7 },
    { loc: '/news-events', changefreq: 'daily', priority: 0.8 },
    { loc: '/contact', changefreq: 'monthly', priority: 0.7 },
    { loc: '/privacy', changefreq: 'yearly', priority: 0.4 },
    { loc: '/terms', changefreq: 'yearly', priority: 0.4 },
    { loc: '/cookies', changefreq: 'yearly', priority: 0.4 },
  ]

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`

  return xml
}