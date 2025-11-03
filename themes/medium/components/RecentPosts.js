import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import LazyImage from '@/components/LazyImage'

/**
 * Recent Posts Sidebar Component
 * Shows recent blog posts in the sidebar
 */
const RecentPosts = ({ latestPosts, currentPost }) => {
  const { locale } = useGlobal()
  
  if (!latestPosts || latestPosts.length === 0) {
    return null
  }

  // Filter out current post and limit to 5 most recent posts
  const filteredPosts = currentPost 
    ? latestPosts.filter(p => p.id !== currentPost.id)
    : latestPosts
  const postsToShow = filteredPosts.slice(0, 5)

  return (
    <div className='mb-8'>
      <h3 className='text-sm font-semibold text-black mb-4 uppercase tracking-wide'>
        {locale.COMMON.LATEST_POSTS || 'Recent Posts'}
      </h3>
      <div className='space-y-4'>
        {postsToShow.map(post => (
          <Link
            key={post.id}
            href={post?.href || `/${post?.slug}`}
            className='group block hover:opacity-70 transition-opacity'>
            <div className='flex gap-3'>
              {post?.pageCoverThumbnail && (
                <div className='flex-shrink-0 w-16 h-16 overflow-hidden rounded-sm'>
                  <LazyImage
                    src={post.pageCoverThumbnail}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                    alt={post.title}
                  />
                </div>
              )}
              <div className='flex-1 min-w-0'>
                <h4 className='text-sm font-medium text-black line-clamp-2 group-hover:opacity-70 transition-opacity leading-snug'>
                  {post.title}
                </h4>
                {post.date?.start_date && (
                  <p className='text-xs text-gray-500 mt-1'>
                    {post.date.start_date}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecentPosts

