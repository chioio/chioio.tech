import * as React from 'react'
import cn from 'classnames'

export const Copyright: React.FC = () => (
  <p
    className={cn(
      'text-center text-xs font-light',
      'sm:text-sm sm:font-normal'
    )}>
    &copy; {new Date().getFullYear()} <span>Tenn Chio</span>
  </p>
)