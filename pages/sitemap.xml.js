// pages/sitemap.xml.js
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { extractLangId, extractLangPrefix } from '@/lib/utils/pageId'
import { getServerSideSitemap } from 'next-sitemap'

export const getServerSideProps = async ctx => {
  let fields = []
  const siteIds = BLOG.NOTION_PAGE_ID.split(',')

  for (let index = 0; index < siteIds.length; index++) {
    const siteId = siteIds[index]
    const id = extractLangId(siteId)
    const locale = extractLangPrefix(siteId)
    // 第一个id站点默认语言
    const siteData = await getGlobalData({
      pageId: id,
      from: 'sitemap.xml'
    })
    // Force use of BLOG.LINK from blog.config.js to ensure correct domain
    // Override any Notion config that might have the old domain
    let link = siteConfig(
      'LINK',
      BLOG.LINK, // Use blog.config.js as primary default
      siteData.NOTION_CONFIG
    )
    
    // If LINK still contains old domain, force override to govtdoor.com
    if (link && (link.includes('newswireindiaonline.com') || link.includes('newnotionnext.vercel.app'))) {
      link = 'https://govtdoor.com'
      console.log(`[Sitemap] Overriding old domain in LINK config to: ${link}`)
    }
    
    // Normalize link: ensure it doesn't end with trailing slash for consistency
    if (link && link.endsWith('/')) {
      link = link.slice(0, -1)
    }
    const localeFields = generateLocalesSitemap(link, siteData.allPages, locale)
    fields = fields.concat(localeFields)
  }

  fields = getUniqueFields(fields);

  // Log total URLs for debugging (especially useful for 500+ posts)
  console.log(`[Sitemap] Total URLs generated: ${fields.length}`)
  console.log(`[Sitemap] Blog posts included: ${fields.filter(f => f.loc.includes('/') && !f.loc.endsWith('/archive') && !f.loc.endsWith('/category') && !f.loc.endsWith('/tag') && !f.loc.endsWith('/search') && !f.loc.endsWith('/rss/feed.xml')).length - 1}`) // Subtract 1 for homepage

  // 缓存
  ctx.res.setHeader(
    'Cache-Control',
    'public, max-age=3600, stale-while-revalidate=59'
  )
  return getServerSideSitemap(ctx, fields)
}

function generateLocalesSitemap(link, allPages, locale) {
  if (locale && locale.length > 0 && locale.indexOf('/') !== 0) {
    locale = '/' + locale
  }
  const dateNow = new Date().toISOString().split('T')[0]
  const defaultFields = [
    {
      loc: `${link}${locale}`,
      lastmod: dateNow,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      loc: `${link}${locale}/archive`,
      lastmod: dateNow,
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      loc: `${link}${locale}/category`,
      lastmod: dateNow,
      changefreq: 'daily',
      priority: '0.6'
    },
    {
      loc: `${link}${locale}/rss/feed.xml`,
      lastmod: dateNow,
      changefreq: 'daily',
      priority: '0.5'
    },
    {
      loc: `${link}${locale}/search`,
      lastmod: dateNow,
      changefreq: 'daily',
      priority: '0.5'
    },
    {
      loc: `${link}${locale}/tag`,
      lastmod: dateNow,
      changefreq: 'daily',
      priority: '0.6'
    }
  ]
  
  // Filter for blog posts only: type === 'Post' AND status === 'Published'
  // This ensures only blog posts are included, matching how the site displays them
  const blogPosts = allPages?.filter(p => 
    p?.type === BLOG.NOTION_PROPERTY_NAME.type_post && 
    p?.status === BLOG.NOTION_PROPERTY_NAME.status_publish &&
    p?.slug // Ensure slug exists
  ) || []
  
  const postFields = blogPosts.map(post => {
    const slugWithoutLeadingSlash = post?.slug?.startsWith('/')
      ? post?.slug?.slice(1)
      : post.slug
    
    // Use publishDay, lastEditedDate, or current date as fallback
    const lastMod = post?.publishDay 
      ? new Date(post.publishDay).toISOString().split('T')[0]
      : (post?.lastEditedDate 
          ? new Date(post.lastEditedDate).toISOString().split('T')[0]
          : dateNow)
    
    return {
      loc: `${link}${locale}/${slugWithoutLeadingSlash}`,
      lastmod: lastMod,
      changefreq: 'weekly',
      priority: '0.8'
    }
  })

  console.log(`[Sitemap] Generated ${postFields.length} blog post URLs for locale: ${locale || 'default'}`)

  return defaultFields.concat(postFields)
}

function getUniqueFields(fields) {
  const uniqueFieldsMap = new Map();

  fields.forEach(field => {
    const existingField = uniqueFieldsMap.get(field.loc);

    if (!existingField || new Date(field.lastmod) > new Date(existingField.lastmod)) {
      uniqueFieldsMap.set(field.loc, field);
    }
  });

  return Array.from(uniqueFieldsMap.values());
}

export default () => {}
