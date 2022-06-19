import type React from 'react'
import { useCallback, useContext, useEffect, useState } from 'react'
import cn from 'classnames'

import { ImSun } from 'react-icons/im'
import { FaRegMoon } from 'react-icons/fa'

import { global } from '@/components/app'
import { Actions } from './Global'

export const ModeSwitcher: React.FC = () => {
  const { isDark, dispatch } = useContext(global)
  const [clicked, setClicked] = useState(false)

  const toggleMode = useCallback(
    () => dispatch({ type: Actions.TOGGLE_MODE }),
    [dispatch]
  )

  useEffect(() => {
    setClicked(true)
    return () => setClicked(false)
  }, [isDark])

  return (
    <button
      onClick={toggleMode}
      className={cn(
        'p-1.5 rounded-full transition-transform duration-500',
        'hover:bg-gray-400/20 dark:hover:bg-white/20',
        'active:bg-theme-500/30 dark:active:bg-theme-500/30',
        clicked && isDark ? ' rotate-45' : 'rotate-0'
      )}>
      {isDark ? <ImSun /> : <FaRegMoon />}
    </button>
  )
}
