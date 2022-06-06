import * as React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaGithubAlt } from 'react-icons/fa'

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'

import {
  Copyright,
  ExternalLink,
  LocaleSwitcher,
  Logo,
  ModeSwitcher,
} from '@/components/app'
import { IconJuejin } from '@/components/icons'
import { generatePaths } from '@/utils/generate-paths'
import { DocMeta } from '@/contentlayer/types/doc'
import { allDocs, Doc } from '.contentlayer'
import { LocaleType } from '@/typings'
import { generateDocsTree } from '@/utils/build-docs-tree'
import { DocNavigation, DocsSearch } from '@/components/doc'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    ...generatePaths<DocMeta>(allDocs, 'en'),
    ...generatePaths<DocMeta>(allDocs, 'zh'),
  ],
  fallback: false,
})

export const getStaticProps: GetStaticProps = async (context) => {
  const [params, locale] = [
    context.params as { slug?: string[] },
    context.locale as LocaleType,
  ]

  const pageRoute = params?.slug?.join('/') ?? ''

  const doc =
    allDocs.find((d) => d.route === pageRoute && d.locale === locale) ||
    allDocs.find((d) => d.route === pageRoute)!

  // remove route duplicated docs
  const uniqueDocs = allDocs.reduce((p, d) => {
    const routes = p.map((n) => n.route)
    if (!routes.includes(d.route)) p.push(d)

    return p
  }, [] as Doc[])

  // remove locale and route duplicated docs
  const localeDocs = allDocs.reduce((p, d) => {
    const routes = p.map((n) => n.route)
    if (!routes.includes(d.route) && d.locale === locale) p.push(d)

    return p
  }, [] as Doc[])

  if (localeDocs.length < uniqueDocs.length) {
    uniqueDocs.map((ud) => {
      if (!localeDocs.find((ld) => ld.route === ud.route)) {
        localeDocs.push(ud)
      }
    })
  }

  const tree = generateDocsTree(localeDocs)
  // const childTree = generateDocsTree(
  //   allDocs,
  //   doc.meta.map((m: DocMeta) => m.slug)
  // )

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      doc,
      tree,
    },
  }
}

export default function DocsPage({
  doc,
  tree,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('common')

  const links = [
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
    <div
      className={cn('flex flex-row w-screen', 'bg-white dark:bg-gray-900/50')}>
      <aside
        className={cn(
          'flex flex-col max-w-xs h-screen w-full border-r',
          'border-r-gray-200/70 dark:border-r-gray-800'
        )}>
        <div className={cn('flex flex-col pl-8 pr-4 py-4')}>
          <div className={cn('flex items-center justify-between pb-2')}>
            <Logo />
            <div className={cn('space-x-1 text-lg')}>
              <LocaleSwitcher />
              <ModeSwitcher />
            </div>
          </div>
          <nav
            className={cn(
              'flex items-center py-2 rounded-md',
              'shadow-inner-light dark:shadow-inner-dark',
              'divide-x-2 divide-gray-200/80 dark:divide-gray-800',
              'bg-gray-200/60 dark:bg-gray-800/60'
            )}>
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    'flex-1 leading-normal text-sm text-center',
                    'hover:text-main-500 dark:hover:text-main-500'
                  )}>
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
        <hr className={cn('border-gray-200/70 dark:border-gray-800')} />
        <div className={cn('flex flex-col pl-8 pr-4 py-4')}>
          <DocsSearch />
        </div>
        <hr className={cn('border-gray-200/70 dark:border-gray-800')} />
        <div className="grow flex flex-col space-y-4 pl-8 pr-4 py-4 overflow-y-hidden">
          <DocNavigation tree={tree} />
          <div className={cn('flex flex-col items-center space-y-2')}>
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
            <Copyright />
          </div>
        </div>
      </aside>
      <main className={cn('grow flex w-full')}>
        <div className={cn('grow px-10 py-6')}>
          <div className={cn('prose dark:prose-invert')}>
            <h1 className={cn('')}>{doc.title}</h1>
          </div>
        </div>
        <nav
          className={cn(
            'px-6 py-8 max-w-xs w-full border-l',
            'border-l-gray-100 dark:border-l-gray-800'
          )}>
          <span>Page navigate</span>
        </nav>
      </main>
    </div>
  )
}
