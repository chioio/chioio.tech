import React from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

const BANNER = '🇺🇦 Stop the war in Ukraine! 🇺🇦'

export const SocialBanner: React.FC = () => {
  const { asPath } = useRouter()

  return (
    <div
      className={cn(
        'z-50 py-1 w-full text-sm text-center',
        'bg-main-400 dark:bg-main-500'
      )}>
      <p
        className={cn(
          'duration-300',
          asPath === '/' ? 'text-main-100' : 'text-main-900 dark:text-main-100'
        )}>
        {BANNER}
      </p>
    </div>
  )
}
