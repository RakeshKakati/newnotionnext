import BLOG from '@/blog.config'
import fs from 'fs'
import { siteConfig } from './config'
/**
 * 生成站点地图
 * @param {*} param0
 */
export async function generateSitemapXml({ allPages, NOTION_CONFIG }) {
  let link = siteConfig('LINK', BLOG.LINK, NOTION_CONFIG)
  
  // Force override to govtdoor.com if old domain detected
  if (link && (link.includes('newswireindiaonline.com') || link.includes('newnotionnext.vercel.app'))) {
    link = 'https://govtdoor.com'
    console.log(`[Sitemap] Overriding old domain in static sitemap to: ${link}`)
  }
  
  // Normalize link: ensure it doesn't end with trailing slash for consistency
  if (link && link.endsWith('/')) {
    link = link.slice(0, -1)
  }
  const urls = [
    {
      loc: `${link}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${link}/archive`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 0.8
    },
    {
      loc: `${link}/category`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 0.6
    },
    {
      loc: `${link}/tag`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 0.6
    },
    {
      loc: `${link}/search`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 0.5
    }
  ]
  // 循环页面生成 - 只包含已发布的博客文章
  const blogPosts = allPages?.filter(p => 
    p?.type === BLOG.NOTION_PROPERTY_NAME.type_post && 
    p?.status === BLOG.NOTION_PROPERTY_NAME.status_publish &&
    p?.slug // Ensure slug exists
  ) || []
  
  blogPosts.forEach(post => {
    const slugWithoutLeadingSlash = post?.slug?.startsWith('/')
      ? post?.slug?.slice(1)
      : post.slug
    
    // Use publishDay, lastEditedDate, or current date as fallback
    const lastMod = post?.publishDay 
      ? new Date(post.publishDay).toISOString().split('T')[0]
      : (post?.lastEditedDate 
          ? new Date(post.lastEditedDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0])
    
    urls.push({
      loc: `${link}/${slugWithoutLeadingSlash}`,
      lastmod: lastMod,
      changefreq: 'weekly',
      priority: 0.8
    })
  })
  
  console.log(`[Sitemap] Generated ${blogPosts.length} blog post URLs`)
  const xml = createSitemapXml(urls)
  try {
    fs.writeFileSync('sitemap.xml', xml)
    fs.writeFileSync('./public/sitemap.xml', xml)
  } catch (error) {
    console.warn('Not Found', error)
  }
}

/**
 * 生成站点地图
 * @param {*} urls
 * @returns
 */
function createSitemapXml(urls) {
  let urlsXml = ''
  urls.forEach(u => {
    urlsXml += `<url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>${u.priority ? `\n    <priority>${u.priority}</priority>` : ''}
    </url>
    `
  })

  return `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${urlsXml}
    </urlset>
    `
}
