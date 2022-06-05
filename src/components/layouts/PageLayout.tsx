import * as React from 'react'
import cn from 'classnames'

import {
  CommunityLinks,
  Copyright,
  Logo,
  LocaleSwitcher,
  Navigation,
  ModeSwitcher,
  SocialBanner,
} from '@/components/app'

export const PageLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div
      className={cn(
        'fixed flex flex-col w-screen h-screen z-10',
        'bg-white dark:bg-gray-900/50'
      )}>
      <SocialBanner />
      <header className={cn('flex items-center px-8 py-4 space-x-8')}>
        <Logo />
        <Navigation />
        <CommunityLinks />
        {/* Controls */}
        <div className={cn('flex items-center space-x-4 text-2xl')}>
          <LocaleSwitcher />
          <ModeSwitcher />
        </div>
      </header>
      {children}
      <footer className={cn('flex flex-col items-center px-8 py-4')}>
        <Copyright />
      </footer>
    </div>
  )
}
