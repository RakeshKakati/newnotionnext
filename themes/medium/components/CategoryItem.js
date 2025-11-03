import Link from 'next/link'

export default function CategoryItem ({ selected, category, categoryCount }) {
  return (
    <Link
      href={`/category/${category}`}
      passHref
      className={(selected
        ? 'text-black font-medium '
        : 'text-gray-500 hover:text-black') +
      ' flex text-sm items-center duration-200 cursor-pointer py-0.5 font-normal whitespace-nowrap'}>

      <span>{category}{categoryCount && ` (${categoryCount})`}</span>

    </Link>
  );
}
