import Collapse from '@/components/Collapse'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRef, useState } from 'react'
import CONFIG from '../config'
import LogoBar from './LogoBar'
import { MenuBarMobile } from './MenuBarMobile'
import { MenuItemDrop } from './MenuItemDrop'

/**
 * 顶部导航栏 + 菜单
 * @param {} param0
 * @returns
 */
export default function TopNavBar(props) {
  const { className, customNav, customMenu } = props
  const [isOpen, changeShow] = useState(false)
  const collapseRef = useRef(null)

  const { locale } = useGlobal()

  const defaultLinks = [
    {
      icon: 'fas fa-th',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('MEDIUM_MENU_CATEGORY', null, CONFIG)
    },
    {
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('MEDIUM_MENU_TAG', null, CONFIG)
    },
    {
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('MEDIUM_MENU_ARCHIVE', null, CONFIG)
    },
    {
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('MEDIUM_MENU_SEARCH', null, CONFIG)
    }
  ]

  let links = defaultLinks.concat(customNav)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  // 如果 开启自定义菜单，则覆盖Page生成的菜单
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
    <div
      id='top-nav'
      className={'sticky top-0 lg:relative w-full z-40 ' + className}>
      {/* 移动端折叠菜单 */}
      <Collapse
        type='vertical'
        collapseRef={collapseRef}
        isOpen={isOpen}
        className='md:hidden'>
        <div className='bg-white pt-1 py-2 lg:hidden '>
          <MenuBarMobile
            {...props}
            onHeightChange={param =>
              collapseRef.current?.updateCollapseHeight(param)
            }
          />
        </div>
      </Collapse>

      {/* 导航栏菜单 - Medium style */}
      <div className='flex w-full h-14 bg-white px-4 md:px-8 items-center border-b border-gray-200 shadow-none'>
        {/* 左侧图标Logo */}
        <LogoBar {...props} />

        {/* 折叠按钮、仅移动端显示 */}
        <div className='ml-auto mr-2 flex md:hidden justify-end items-center text-base text-black'>
          <button onClick={toggleMenuOpen} className='cursor-pointer p-2 hover:opacity-70 transition-opacity'>
            {isOpen ? (
              <i className='fas fa-times' />
            ) : (
              <i className='fas fa-bars' />
            )}
          </button>
        </div>

        {/* 桌面端顶部菜单 */}
        <div className='hidden md:flex ml-auto items-center gap-6'>
          {links &&
            links?.map((link, index) => (
              <MenuItemDrop key={index} link={link} />
            ))}
        </div>
      </div>
    </div>
  )
}
