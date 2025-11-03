import LazyImage from '@/components/LazyImage'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import NotionIcon from '@/components/NotionIcon'

/**
 * 文章详情页介绍
 * @param {*} props
 * @returns
 */
export default function ArticleInfo(props) {
  const { post, siteInfo } = props

  return (<>
        {/* title */}
        <h1 className="text-4xl md:text-5xl font-bold pt-12 pb-6 leading-tight text-black">{siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}{post?.title}</h1>

        {/* meta */}
        <section className="py-4 items-center text-sm text-gray-500 px-1 border-b border-gray-200 pb-6 mb-6">
            <div className='flex flex-wrap items-center gap-3 pb-3'>
                <span className='whitespace-nowrap'>{post?.publishDay}</span>
                {post?.lastEditedDay && post?.lastEditedDay !== post?.publishDay && (
                  <>
                    <span className='text-gray-300'>·</span>
                    <span className='whitespace-nowrap'>Updated {post?.lastEditedDay}</span>
                  </>
                )}
                <div className="hidden busuanzi_container_page_pv font-light whitespace-nowrap">
                    <span className='text-gray-300'>·</span>
                    <i className="mr-1 ml-1 fas fa-eye" /><span className="busuanzi_value_page_pv" />
                </div>
            </div>
            <Link href="/about" passHref legacyBehavior>
                <div className='flex items-center pt-2 hover:opacity-70 transition-opacity cursor-pointer'>
                    <LazyImage src={siteInfo?.icon} className='rounded-full' width={32} height={32} alt={siteConfig('AUTHOR')} />
                    <div className="ml-3 text-sm font-medium text-black">
                        {siteConfig('AUTHOR')}
                    </div>
                </div>
            </Link>
        </section>
    </>)
}
