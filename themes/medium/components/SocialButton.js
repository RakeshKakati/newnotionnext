import { siteConfig } from '@/lib/config'

/**
 * 社交联系方式按钮组
 * @returns {JSX.Element}
 * @constructor
 */
const SocialButton = () => {
  return (
    <div className='space-x-4 text-lg text-gray-500 flex-wrap flex justify-center '>
      {siteConfig('CONTACT_GITHUB') && (
        <a
          target='_blank'
          rel='noreferrer'
          title={'github'}
          href={siteConfig('CONTACT_GITHUB')}>
          <i className='fab fa-github hover:opacity-70 transition-opacity' />
        </a>
      )}
      {siteConfig('CONTACT_TWITTER') && (
        <a
          target='_blank'
          rel='noreferrer'
          title={'twitter'}
          href={siteConfig('CONTACT_TWITTER')}>
          <i className='fab fa-twitter hover:opacity-70 transition-opacity' />
        </a>
      )}
      {siteConfig('CONTACT_TELEGRAM') && (
        <a
          target='_blank'
          rel='noreferrer'
          href={siteConfig('CONTACT_TELEGRAM')}
          title={'telegram'}>
          <i className='fab fa-telegram hover:opacity-70 transition-opacity' />
        </a>
      )}
      {siteConfig('CONTACT_LINKEDIN') && (
        <a
          target='_blank'
          rel='noreferrer'
          href={siteConfig('CONTACT_LINKEDIN')}
          title={'linkedIn'}>
          <i className='fab fa-linkedin hover:opacity-70 transition-opacity' />
        </a>
      )}
      {siteConfig('CONTACT_WEIBO') && (
        <a
          target='_blank'
          rel='noreferrer'
          title={'weibo'}
          href={siteConfig('CONTACT_WEIBO')}>
          <i className='fab fa-weibo hover:opacity-70 transition-opacity' />
        </a>
      )}
      {siteConfig('CONTACT_INSTAGRAM') && (
        <a
          target='_blank'
          rel='noreferrer'
          title={'instagram'}
          href={siteConfig('CONTACT_INSTAGRAM')}>
          <i className='fab fa-instagram hover:opacity-70 transition-opacity' />
        </a>
      )}
      {siteConfig('CONTACT_EMAIL') && (
        <a
          target='_blank'
          rel='noreferrer'
          title={'email'}
          href={`mailto:${siteConfig('CONTACT_EMAIL')}`}>
          <i className='fas fa-envelope hover:opacity-70 transition-opacity' />
        </a>
      )}
      {JSON.parse(siteConfig('ENABLE_RSS')) && (
        <a
          target='_blank'
          rel='noreferrer'
          title={'RSS'}
          href={'/rss/feed.xml'}>
          <i className='fas fa-rss hover:opacity-70 transition-opacity' />
        </a>
      )}
      {siteConfig('CONTACT_BILIBILI') && (
        <a
          target='_blank'
          rel='noreferrer'
          title={'bilibili'}
          href={siteConfig('CONTACT_BILIBILI')}>
          <i className='fab fa-bilibili hover:opacity-70 transition-opacity' />
        </a>
      )}
      {siteConfig('CONTACT_YOUTUBE') && (
        <a
          target='_blank'
          rel='noreferrer'
          title={'youtube'}
          href={siteConfig('CONTACT_YOUTUBE')}>
          <i className='fab fa-youtube hover:opacity-70 transition-opacity' />
        </a>
      )}
    </div>
  )
}
export default SocialButton
