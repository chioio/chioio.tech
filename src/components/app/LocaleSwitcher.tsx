import * as React from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { IoLanguageSharp } from 'react-icons/io5'

export const LocaleSwitcher: React.FC = () => {
  const { locale, push, route, asPath } = useRouter()

  const toggleLocale = () => {
    locale === 'en'
      ? push(route, asPath, { locale: 'zh' })
      : push(route, asPath, { locale: 'en' })
  }

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        'p-1.5 rounded-full bg-opacity-30',
        'hover:bg-gray-400/20 dark:hover:bg-white/20',
        'active:bg-main-500/30 dark:active:bg-main-500/30',
        locale === 'en' && 'rotate-y'
      )}>
      <IoLanguageSharp />
    </button>
  )
}
