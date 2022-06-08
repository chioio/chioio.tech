import * as React from 'react'
import cn from 'classnames'
import { IoHeart } from 'react-icons/io5'

export const MadeBy: React.FC = () => (
  <p
    className={cn(
      'text-center text-xs font-light',
      'sm:text-sm sm:font-normal'
    )}>
    <span>
      Made with <IoHeart className={cn('inline text-red-500')} /> by Tenn Chio.
    </span>
  </p>
)
