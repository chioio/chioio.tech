import React from 'react'
import cn from 'classnames'
import { ExternalLink } from './ExternalLink'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export const SocialBanner: React.FC = () => {
  const { t } = useTranslation('common')
  const { asPath } = useRouter()

  return (
    <div
      className={cn(
        'z-50 py-1 w-full text-sm text-center',
        'bg-main-400 dark:bg-main-500'
      )}>
      <ExternalLink
        className={cn(
          'duration-300 hover:underline',
          asPath === '/' ? 'text-main-100' : 'text-main-900 dark:text-main-100'
        )}
        href="https://github.com/chioio/chioio.tech">
        🌟 {t('social.banner.echo')} 🌟
      </ExternalLink>
    </div>
  )
}
