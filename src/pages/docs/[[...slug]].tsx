import type React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaGithubAlt } from 'react-icons/fa'
import { useMDXComponent } from 'next-contentlayer/hooks'

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'

import {
  ExternalLink,
  LocaleSwitcher,
  Logo,
  MadeBy,
  ModeSwitcher,
} from '@/components/app'
import {
  Aside,
  Breadcrumbs,
  HeadingsAside,
  SandpackAside,
  Search,
  Tree,
} from '@/components/doc'
import { IconJuejin } from '@/components/icons'
import { generatePaths } from '@/utils/generate-paths'
import { DocMeta } from '@/contentlayer/types/doc'
import { allDocs, Doc } from '.contentlayer'
import { generateDocsTree, TreeNode } from '@/utils/generate-docs-tree'
import { Locale } from '@/typings'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    ...generatePaths<DocMeta>(allDocs, Locale.EN),
    ...generatePaths<DocMeta>(allDocs, Locale.ZH),
  ],
  fallback: false,
})

export const getStaticProps: GetStaticProps<
  {
    doc: Doc
    tree: Array<TreeNode>
    crumbs: Array<{ title: string; route: string }>
  },
  { slug?: string[] }
> = async (context) => {
  const [params, locale] = [context.params, context.locale]

  const pageRoute = params?.slug?.join('/') ?? ''

  // const localeDocs = allDocs
  //   .sort((a) => (a.locale === locale ? -1 : 1))
  //   .reduce((acc, doc) => {
  //     const routes = acc.map((d) => d.route)
  //     if (!routes.includes(doc.route)) acc.push(doc)
  //     return acc
  //   }, [] as Doc[])

  const map: { [key: string]: number } = {}
  const localeDocs = allDocs
    .sort((a) => (a.locale === locale ? -1 : 1))
    .filter((d) => (map[d.route] ? 0 : (map[d.route] = 1)))

  const doc = localeDocs.find((d) => d.route === pageRoute)!

  const crumb = {
    title: '',
    route: '',
  }

  const crumbs = [
    {
      route: '/docs',
      title: 'NOTES',
    },
    ...doc.meta.map(({ slug }: DocMeta) => {
      crumb.route += crumb.route === '' ? slug : '/' + slug
      const title = localeDocs.find((d) => d.route === crumb.route)?.title

      return { route: '/docs/' + crumb.route, title }
    }),
  ]

  const tree = generateDocsTree(localeDocs)

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'docs'])),
      doc,
      tree,
      crumbs,
    },
  }
}

export default function DocsPage({
  doc,
  tree,
  crumbs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('common')
  const MDXContent = useMDXComponent(doc.body.code || '')

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
      className={cn(
        'grow flex flex-row w-screen overflow-auto',
        'bg-white dark:bg-gray-900/50'
      )}>
      <aside
        className={cn(
          'flex flex-col max-w-xs w-full border-r',
          'border-r-gray-200/70 dark:border-r-gray-800'
        )}>
        <div className={cn('flex flex-col space-y-4 pl-8 pr-4 py-4')}>
          <div className={cn('flex items-center justify-between')}>
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
                    'hover:text-theme-500 dark:hover:text-theme-500'
                  )}>
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
        <hr className={cn('border-gray-200/70 dark:border-gray-800')} />
        <div className={cn('flex flex-col pl-8 pr-4 py-4')}>
          <Search />
        </div>
        <hr className={cn('border-gray-200/70 dark:border-gray-800')} />
        <div className="grow flex flex-col space-y-4 pl-8 pr-4 py-4 overflow-y-hidden">
          <nav className={cn('relative grow overflow-y-scroll scrollbar')}>
            <Tree tree={tree} level={0} />
          </nav>
          <div className={cn('flex flex-col items-center space-y-2')}>
            <div className={cn('flex space-x-6')}>
              <ExternalLink
                href="https://github.com/chioio"
                className={cn('row-span-3 flex items-center justify-center')}>
                <FaGithubAlt
                  className={cn('w-6 h-6', 'hover:text-theme-500')}
                />
              </ExternalLink>
              <ExternalLink
                href="https://juejin.cn/user/1521379825688637"
                className={cn('row-span-3 flex items-center justify-center')}>
                <IconJuejin className={cn('w-6 h-6', 'hover:text-theme-500')} />
              </ExternalLink>
            </div>
            <MadeBy />
          </div>
        </div>
      </aside>
      <article className={cn('grow flex flex-col overflow-hidden')}>
        <header className={cn('px-10 pt-4')}>
          <Breadcrumbs crumbs={crumbs} />
        </header>
        <main
          className={cn(
            'relative grow px-16 max-w-none w-full overflow-y-scroll scrollbar-lg',
            'prose dark:prose-invert',
            'prose-headings:font-medium'
          )}>
          <h1 className={cn('leading-snug text-5xl font-medium')}>
            {doc.title}
          </h1>
          <MDXContent />
        </main>
      </article>
      <Aside>
        {(isSandpack) => (
          <>
            <HeadingsAside headings={doc.headings} visible={!isSandpack} />
            <SandpackAside visible={isSandpack} />
          </>
        )}
      </Aside>
    </div>
  )
}
