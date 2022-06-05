import React from 'react'
import cn from 'classnames'
import { ExternalLink } from './ExternalLink'
import { useTranslation } from 'next-i18next'

export const SocialBanner: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <div
      className={cn(
        'py-1.5 w-full text-sm text-center',
        'bg-main-500 dark:bg-main-500'
      )}>
      <ExternalLink
        className={cn('text-main-100 hover:underline')}
        href="https://github.com/chioio/chioio.tech">
        🌟 {t('social.banner.echo')} 🌟
      </ExternalLink>
    </div>
  )
}
