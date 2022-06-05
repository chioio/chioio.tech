import * as React from 'react'
import cn from 'classnames'

import { FaGithubAlt } from 'react-icons/fa'
import { IconJuejin } from '@/components/icons'
import { ExternalLink } from './ExternalLink'

export const CommunityLinks: React.FC = () => (
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
)
