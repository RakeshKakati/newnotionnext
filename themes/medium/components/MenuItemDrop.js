import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  //   const show = true
  //   const changeShow = () => {}
  const router = useRouter()

  if (!link || !link.show) {
    return null
  }
  const hasSubMenu = link?.subMenus?.length > 0
  const selected = router.pathname === link.href || router.asPath === link.href

  return (
    <li
      className='cursor-pointer list-none items-center flex mx-2'
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {hasSubMenu && (
        <div
          className={
            'px-3 h-full whitespace-nowrap duration-300 text-sm justify-between text-black cursor-pointer flex flex-nowrap items-center ' +
            (selected
              ? 'font-semibold'
              : 'hover:opacity-70')
          }>
          <div>
            {link?.icon && <i className={link?.icon} />} {link?.name}
            {hasSubMenu && (
              <i
                className={`px-2 fas fa-chevron-down duration-500 transition-all ${show ? ' rotate-180' : ''}`}></i>
            )}
          </div>
        </div>
      )}

      {!hasSubMenu && (
        <div
          className={
            'px-3 h-full whitespace-nowrap duration-300 text-sm justify-between text-black cursor-pointer flex flex-nowrap items-center ' +
            (selected
              ? 'font-semibold'
              : 'hover:opacity-70')
          }>
          <Link href={link?.href} target={link?.target} className='flex items-center'>
            {link?.icon && <i className={link?.icon} />} <span className={link?.icon ? 'ml-1' : ''}>{link?.name}</span>
          </Link>
        </div>
      )}

      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          className={`${show ? 'visible opacity-100 top-14 ' : 'invisible opacity-0 top-12 '} border border-gray-200 bg-white transition-all duration-300 z-20 absolute block shadow-lg rounded-sm`}>
          {link?.subMenus?.map(sLink => {
            return (
              <li
                key={sLink.id}
                className='not:last-child:border-b-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition-all duration-200 py-3 pr-6 pl-3'>
                <Link href={sLink.href} target={link?.target}>
                  <span className='text-sm'>
                    {link?.icon && <i className={sLink?.icon}> &nbsp; </i>}
                    {sLink.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}
