import * as React from 'react'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'

import { Toc } from './Toc'
import { Sandpack, SandpackToggle } from '../sandpack'
import { DocHeading } from '@/contentlayer/types/doc'
import { motion } from 'framer-motion'

export const AsideContext = React.createContext<{ isSandpack: boolean }>({
  isSandpack: false,
})

export const Aside: React.FC<{
  children: (isSandpack: boolean) => React.ReactNode
}> = ({ children }) => {
  const [isSandpack, setIsSandpack] = React.useState(false)

  return (
    <AsideContext.Provider value={{ isSandpack }}>
      {children(isSandpack)}
      <SandpackToggle toggle={() => setIsSandpack(!isSandpack)} />
    </AsideContext.Provider>
  )
}

type AsidesProps<T> = {
  visible: boolean
} & T

const variants = {
  visible: {
    width: '100%',
    transition: {
      duration: 1,
    },
  },
  hidden: {
    width: 0,
    transition: {
      duration: 1,
    },
  },
}

export const HeadingsAside: React.FC<
  AsidesProps<{ headings: DocHeading[] }>
> = ({ headings, visible }) => {
  const { t } = useTranslation('docs')

  return (
    <motion.aside
      variants={variants}
      initial={visible ? 'visible' : 'hidden'}
      animate={visible ? 'visible' : 'hidden'}
      className={cn(
        visible ? 'hidden xl:flex flex-col' : 'hidden',
        'space-y-4 px-6 py-8 max-w-xs w-full',
        'border-l border-l-gray-100 dark:border-l-gray-800'
      )}>
      <h3 className={cn('uppercase font-medium')}>{t('toc')}</h3>
      <Toc headings={headings} />
    </motion.aside>
  )
}

export const SandpackAside: React.FC<AsidesProps<{}>> = ({ visible }) => {
  return (
    <motion.aside
      variants={variants}
      initial={visible ? 'visible' : 'hidden'}
      animate={visible ? 'visible' : 'hidden'}
      className={cn(
        visible ? 'hidden xl:flex flex-col' : 'hidden',
        'space-y-4 px-6 py-8 max-w-xl w-full',
        'border-l border-l-gray-100 dark:border-l-gray-800'
      )}>
      <h3 className={cn('uppercase font-medium')}>Sandpack</h3>
      <Sandpack />
    </motion.aside>
  )
}
