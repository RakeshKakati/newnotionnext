import dynamic from 'next/dynamic'

const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

// Only load UserProfile component when Clerk is enabled
const UserProfile = enableClerk
  ? dynamic(() => import('@clerk/nextjs').then(m => m.UserProfile), { ssr: false })
  : null

/**
 * 控制台用户账号面板
 * @returns
 */
export default function DashboardUser() {
  if (!enableClerk || !UserProfile) {
    return null
  }
  return (
    <UserProfile
      appearance={{
        elements: {
          cardBox: 'w-full',
          rootBox: 'w-full'
        }
      }}
      className='bg-blue-300'
      routing='path'
      path='/dashboard/user-profile'
    />
  )
}
