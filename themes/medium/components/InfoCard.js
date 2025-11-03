import LazyImage from '@/components/LazyImage'
import Router from 'next/router'
import SocialButton from './SocialButton'
import { siteConfig } from '@/lib/config'

const InfoCard = (props) => {
  const { siteInfo } = props
  return <div id='info-card' className='py-6'>
    <div className='items-center justify-center'>
        <div className='cursor-pointer flex justify-center mb-4 hover:opacity-80 transition-opacity' onClick={ () => { Router.push('/about') }}>
            <LazyImage src={siteInfo?.icon} className='rounded-full' width={80} height={80} alt={siteConfig('AUTHOR')}/>
         </div>
        <div className='text-lg font-semibold py-2 flex justify-center text-black'>{siteConfig('AUTHOR')}</div>
        <div className='text-sm text-gray-600 mb-4 flex justify-center text-center leading-relaxed'>{siteConfig('BIO')}</div>
        <SocialButton/>
    </div>
  </div>
}

export default InfoCard
