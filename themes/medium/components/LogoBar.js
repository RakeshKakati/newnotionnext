import { siteConfig } from '@/lib/config'
import Link from 'next/link'

export default function LogoBar(props) {
  return (
    <div id='top-wrapper' className='flex items-center'>
      <Link href='/' className='logo text-lg md:text-xl font-semibold text-black hover:opacity-70 transition-opacity'>
        {siteConfig('TITLE')}
      </Link>
    </div>
  )
}
