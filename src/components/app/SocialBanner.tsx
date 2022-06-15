import type React from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

const BANNER = '🇺🇦 Stop the war in Ukraine! 🇺🇦'

export const SocialBanner: React.FC = () => {
  const { asPath } = useRouter()

  return (
    <div
      className={cn(
        'z-50 py-1 w-full text-sm text-center',
        'bg-theme-400 dark:bg-theme-500'
      )}>
      <p
        className={cn(
          'duration-300',
          asPath === '/'
            ? 'text-theme-100'
            : 'text-theme-900 dark:text-theme-100'
        )}>
        {BANNER}
      </p>
    </div>
  )
}
