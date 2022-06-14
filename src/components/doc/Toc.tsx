import * as React from 'react'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import { DocHeading } from '@/contentlayer/types/doc'
import { titleToSlug } from '@/utils/title-to-slug'

interface TocProps {
  headings: DocHeading[]
}

export const Toc: React.FC<TocProps> = ({ headings }) => {
  const { t } = useTranslation('docs')
  const [currentIndex, setCurrentIndex] = React.useState(0)

  return (
    <aside
      className={cn(
        'hidden flex-col space-y-4 px-6 py-8 max-w-xs w-full border-l',
        'border-l-gray-100 dark:border-l-gray-800',
        'xl:flex'
      )}>
      <h3 className={cn('uppercase font-medium')}>{t('toc')}</h3>
      <nav className={cn('grow')}>
        <ul className={cn('space-y-1.5')}>
          {headings?.length &&
            headings
              .filter((h) => h.level > 1)
              .map((h, i) => (
                <li
                  key={i}
                  className={cn(
                    'relative flex',
                    [, , , 'pl-2', 'pl-4', 'pl-6', 'pl-8'].map((pl, l) =>
                      h.level === l ? pl : ''
                    )
                  )}>
                  <a
                    href={`#${titleToSlug(h.title)}`}
                    className={cn(
                      'px-3 py-1 w-full rounded-md text-sm',
                      i === currentIndex
                        ? 'text-main-500 dark:text-main-500 bg-main-500/10 dark:bg-main-500/10'
                        : 'hover:bg-gray-200/40 hover:dark:bg-gray-800/40',
                      h.level > 2 && 'font-light'
                    )}
                    onClick={() => setCurrentIndex(i)}>
                    {h.title}
                  </a>
                </li>
              ))}
        </ul>
      </nav>
    </aside>
  )
}
