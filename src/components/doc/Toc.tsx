import type React from 'react'
import { useState } from 'react'
import cn from 'classnames'
import { DocHeading } from '@/contentlayer/types/doc'
import { titleToSlug } from '@/utils/title-to-slug'

interface TocProps {
  headings: DocHeading[]
}

export const Toc: React.FC<TocProps> = ({ headings }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <nav className={cn('grow')}>
      <ul className={cn('space-y-1.5')}>
        {headings.length &&
          headings
            .filter((h) => h.level > 1)
            .map((h, i) => (
              <li
                role="link"
                key={i}
                className={cn(
                  'relative flex',
                  ['', '', '', 'pl-2', 'pl-4', 'pl-6', 'pl-8'].map((pl, l) =>
                    h.level === l ? pl : ''
                  )
                )}>
                <a
                  href={`#${titleToSlug(h.title)}`}
                  className={cn(
                    'px-3 py-1 w-full rounded-md text-sm',
                    i === currentIndex
                      ? 'text-theme-500 dark:text-theme-500 bg-theme-500/10 dark:bg-theme-500/10'
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
  )
}
