import * as React from 'react'
import cn from 'classnames'

import { ImSun } from 'react-icons/im'
import { FaRegMoon } from 'react-icons/fa'

import { GlobalContext } from '@/contexts'

export const ModeSwitcher: React.FC = () => {
  const { isDark, dispatch } = React.useContext(GlobalContext)

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_MODE' })}
      className={cn(
        'p-1.5 rounded-full transition-transform duration-500',
        'hover:bg-gray-400/20 dark:hover:bg-white/20',
        'active:bg-main-500/30 dark:active:bg-main-500/30',
        isDark ? ' rotate-45' : 'rotate-0'
      )}>
      {isDark ? <ImSun /> : <FaRegMoon />}
    </button>
  )
}
