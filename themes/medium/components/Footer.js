import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import { siteConfig } from '@/lib/config'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className='z-10 bg-white flex-shrink-0 justify-center text-center m-auto w-full leading-6 text-sm py-12 px-6 mt-16 border-t border-gray-200'>
      <div className='text-gray-500 space-y-2'>
        <div>
          © {copyrightDate} <a href={siteConfig('LINK')} className='hover:opacity-70 transition-opacity text-black'>{siteConfig('AUTHOR')}</a>
        </div>
        {siteConfig('BEI_AN') && (
          <div className='text-xs'>
            <a href='https://beian.miit.gov.cn/' className='hover:opacity-70 transition-opacity'>
              {siteConfig('BEI_AN')}
            </a>
          </div>
        )}
        <BeiAnGongAn />
        <div className='hidden busuanzi_container_site_pv text-xs'>
          <i className='fas fa-eye' />
          <span className='px-1 busuanzi_value_site_pv'> </span>
        </div>
        <div className='hidden busuanzi_container_site_uv text-xs'>
          <i className='fas fa-users' />
          <span className='px-1 busuanzi_value_site_uv'> </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
