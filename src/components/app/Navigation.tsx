import * as React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'

export const Navigation: React.FC = () => {
  const { t } = useTranslation('common')
  const { asPath, locale } = useRouter()

  const links = [
    {
      href: '/docs',
      label: t('navigation.notes'),
    },
    {
      href: '/posts',
      label: t('navigation.posts'),
    },
    {
      href: '/wow',
      label: t('navigation.wow'),
    },
    {
      href: '/readme',
      label: t('navigation.readme'),
    },
  ]

  const indicator = {
    hidden: {
      width: 0,
    },
    visible: {
      width: '100%',
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <nav className={cn('grow text-right space-x-6')}>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <a className={cn('relative')}>
            <span
              className={cn(
                'text-lg leading-normal hover:text-main-500',
                locale === 'en' || 'font-medium'
              )}>
              {link.label}
            </span>
            <motion.span
              variants={indicator}
              initial="hidden"
              animate={asPath === link.href ? 'visible' : 'hidden'}
              className={cn(
                'absolute -bottom-1 inset-x-0 mx-auto w-full h-[0.2rem] rounded-full bg-main-500'
              )}
            />
          </a>
        </Link>
      ))}
    </nav>
  )
}
