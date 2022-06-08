import * as React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { motion, SVGMotionProps, useCycle } from 'framer-motion'
import { useMedia } from 'react-use'

import { ExternalLink, LocaleSwitcher, ModeSwitcher } from '@/components/app'
import { IconJuejin } from '@/components/icons'
import { FaGithubAlt } from 'react-icons/fa'

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

const navigation = {
  hidden: {
    opacity: 0,
    width: 0,
  },
  visible: {
    opacity: 1,
    width: '55%',
    transition: {
      duration: 0.3,
    },
  },
}

export const Navigation: React.FC = () => {
  // const { asPath, locale } = useRouter()
  const { t } = useTranslation('common')
  const sm = useMedia('(min-width: 640px)', true)

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
  return (
    <>
      {sm ? (
        <DesktopNavigation links={links} />
      ) : (
        <MobileNavigation links={links} />
      )}
    </>
  )
}

const DesktopNavigation: React.FC<{ links: any[] }> = ({ links }) => {
  const { asPath, locale } = useRouter()

  return (
    <nav
      className={cn('grow flex items-center justify-end text-right space-x-6')}>
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
      <div className={cn('flex space-x-6')}>
        <ExternalLink
          href="https://github.com/chioio"
          className={cn('row-span-3 flex items-center justify-center')}>
          <FaGithubAlt className={cn('w-6 h-6', 'hover:text-main-500')} />
        </ExternalLink>
        <ExternalLink
          href="https://juejin.cn/user/1521379825688637"
          className={cn('row-span-3 flex items-center justify-center')}>
          <IconJuejin className={cn('w-6 h-6', 'hover:text-main-500')} />
        </ExternalLink>
      </div>
      <div className={cn('flex text-2xl', asPath !== '/' && 'space-x-2')}>
        <LocaleSwitcher />
        {asPath !== '/' && <ModeSwitcher />}
      </div>
    </nav>
  )
}

const MobileNavigation: React.FC<{ links: any[] }> = ({ links }) => {
  const { asPath, locale } = useRouter()
  const [opened, toggle] = useCycle(false, true)

  return (
    <div className="grow flex justify-end">
      <MenuToggle toggle={toggle} opened={opened} />
      <motion.nav
        variants={navigation}
        initial="hidden"
        animate={opened ? 'visible' : 'hidden'}
        className={cn(
          'fixed right-0 inset-y-0 z-10 grow flex flex-col pt-24 pb-16 px-8',
          asPath === '/' ? 'bg-black' : 'bg-gray-100 dark:bg-black'
        )}>
        <ul className={cn('grow flex flex-col space-y-3.5 w-full')}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <a className={cn('relative')}>
                  <span
                    className={cn(
                      'text-lg text-center leading-normal hover:text-main-500',
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
            </li>
          ))}
          <li>
            <ExternalLink
              href="https://github.com/chioio"
              className={cn('row-span-3 flex items-center')}>
              <FaGithubAlt className={cn('w-6 h-6', 'hover:text-main-500')} />
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://juejin.cn/user/1521379825688637"
              className={cn('row-span-3 flex items-center')}>
              <IconJuejin className={cn('w-6 h-6', 'hover:text-main-500')} />
            </ExternalLink>
          </li>
        </ul>
        <div
          className={cn(
            ' flex justify-between text-2xl mb-4',
            asPath !== '/' && 'space-x-2'
          )}>
          <LocaleSwitcher />
          {asPath !== '/' && <ModeSwitcher />}
        </div>
      </motion.nav>
    </div>
  )
}

const Path: React.FC<SVGMotionProps<SVGPathElement>> = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
)

export const MenuToggle: React.FC<{
  opened: boolean
  toggle: () => void
}> = ({ opened, toggle }) => (
  <button onClick={toggle} className={cn('relative z-50', '')}>
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="currentColor"
      className={cn('relative')}>
      <Path
        initial="hidden"
        animate={opened ? 'visible' : 'hidden'}
        variants={{
          hidden: { d: 'M 2 2.5 L 20 2.5' },
          visible: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        initial="hidden"
        animate={opened ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        initial="hidden"
        animate={opened ? 'visible' : 'hidden'}
        variants={{
          hidden: { d: 'M 2 16.346 L 20 16.346' },
          visible: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
)
