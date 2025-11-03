import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <Link
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`cursor-pointer inline-block text-sm whitespace-nowrap transition-opacity duration-200
         ${selected
        ? 'text-black font-medium'
        : 'text-gray-500 hover:opacity-70'}` }>

      <span>{tag.name}{tag.count && ` (${tag.count})`}</span>

    </Link>
  )
}

export default TagItemMini
