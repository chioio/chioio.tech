import type React from 'react'
import cn from 'classnames'
import { IoHeart } from 'react-icons/io5'

export const MadeBy: React.FC = () => (
  <p
    className={cn(
      'flex items-center',
      'text-center text-xs font-light',
      'sm:text-sm sm:font-normal'
    )}>
    {/* <span className="flex items-center"> */}
    Made with
    <span className="relative inline-block w-6">
      <IoHeart
        className={cn('absolute inset-0 m-auto text-red-500 animate-ping')}
      />
      <IoHeart className={cn('absolute inset-0 m-auto inline text-red-500')} />
    </span>
    by Tenn Chio.
    {/* </span> */}
  </p>
)
