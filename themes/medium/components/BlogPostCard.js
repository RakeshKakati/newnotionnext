import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import CONFIG from '../config'
import CategoryItem from './CategoryItem'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ post, showSummary }) => {
  const showPreview =
    siteConfig('MEDIUM_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  const { locale } = useGlobal()
  return (
    <div
      key={post.id}
      className='mb-12 pb-8 border-b border-gray-200'>
      <header className='flex flex-col w-full'>
        <Link
          href={post?.href}
          passHref
          className='group cursor-pointer'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6 text-black group-hover:opacity-70 transition-opacity'>
            {siteConfig('MEDIUM_POST_LIST_COVER', null, CONFIG) && post.pageCoverThumbnail && (
              <div className='w-full h-64 md:h-96 object-cover overflow-hidden mb-6 rounded-sm'>
                <LazyImage
                  src={post.pageCoverThumbnail}
                  className='w-full h-full object-cover'
                  alt={post.title}
                />
              </div>
            )}
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post.pageIcon} />
            )}
            <span>{post.title}</span>
          </h2>
        </Link>

        <div className='flex items-center flex-wrap gap-2 text-sm text-gray-500 mb-6'>
          <span className='text-black font-medium'>{post.date?.start_date}</span>
          {siteConfig('MEDIUM_POST_LIST_CATEGORY', null, CONFIG) && post.category && (
            <>
              <span className='text-gray-400 mx-1'>·</span>
              <CategoryItem category={post.category} />
            </>
          )}
          {siteConfig('MEDIUM_POST_LIST_TAG', null, CONFIG) &&
            post?.tagItems?.map(tag => (
              <span key={tag.name}>
                <span className='text-gray-400 mx-1'>·</span>
                <TagItemMini tag={tag} />
              </span>
            ))}
          {siteConfig('MEDIUM_POST_LIST_TAG', null, CONFIG) && post?.tagItems?.length > 0 && (
            <>
              <span className='text-gray-400 mx-1'>·</span>
              <TwikooCommentCount post={post} className='text-gray-500' />
            </>
          )}
        </div>

        {(!showPreview || showSummary) && post.summary && (
          <main className='mt-4 text-base text-gray-700 leading-relaxed font-normal'>
            {post.summary}
          </main>
        )}

        {showPreview && (
          <div className='mt-4'>
            <NotionPage post={post} />
            <div className='pt-6 mt-6 border-t border-gray-200'>
              <Link
                href={post?.href}
                passHref
                className='inline-flex items-center text-sm font-medium text-gray-700 hover:opacity-70 transition-opacity'>
                {locale.COMMON.ARTICLE_DETAIL}
                <i className='ml-2 fas fa-arrow-right text-xs' />
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default BlogPostCard
