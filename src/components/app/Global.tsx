import type React from 'react'
import { createContext, useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import { useLocalStorage, useMount } from 'react-use'

import tailwind from '@/configs/tailwind'
import { hexToRgb } from '@/utils/hex-to-rgb'
import { keyMatch } from '@/utils/key-match'
import { Reducers } from '@/typings'

const colors = tailwind.theme.colors

const colorful = [
  colors.red,
  colors.orange,
  colors.amber,
  colors.yellow,
  colors.lime,
  colors.green,
  colors.emerald,
  colors.teal,
  colors.cyan,
  colors.sky,
  colors.blue,
  colors.indigo,
  colors.violet,
  colors.purple,
  colors.fuchsia,
  colors.pink,
  colors.rose,
]

type State = {
  isDark: boolean
}

export enum Actions {
  TOGGLE_MODE,
  SET_MODE,
}

type Action =
  | {
      type: Actions.TOGGLE_MODE
    }
  | {
      type: Actions.SET_MODE
      payload: boolean
    }

type ContextProps = React.PropsWithChildren<
  {
    dispatch: React.Dispatch<Action>
  } & State
>

const reducers: Reducers<State, Action, Actions> = {
  [Actions.TOGGLE_MODE]: (draft) => {
    const theme = JSON.parse(window.localStorage.getItem('theme')!)
    draft.isDark = !draft.isDark
    window.localStorage.setItem(
      'theme',
      JSON.stringify({
        ...theme,
        mode: draft.isDark,
      })
    )
  },
  [Actions.SET_MODE]: (draft, action) => {
    draft.isDark = action.payload
  },
}

const reducer = (state: State, action: Action) =>
  keyMatch(action.type, reducers, state, action)

export const global = createContext<ContextProps>(null!)

export const Global: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<{
    mode: boolean
    timestamp: number
    colors: { [key: string]: string }
  }>('theme', null!)

  const [state, dispatch] = useImmerReducer(reducer, {
    isDark: false,
  })

  useMount(() => {
    const setStyle = (colors: { [key: string]: string }) => {
      for (const key in colors) {
        const { r, g, b } = hexToRgb(colors[key])
        document.documentElement.style.setProperty(
          `--color-theme-${key}`,
          `${r} ${g} ${b}`
        )
      }
    }

    const storeTheme = (mode?: boolean) => {
      const randomColors: { [key: string]: string } =
        colorful[Math.floor(Math.random() * colorful.length)]

      setStyle(randomColors)
      setTheme({
        mode: mode ?? state.isDark,
        timestamp: new Date().getTime(),
        colors: randomColors,
      })
    }

    if (theme) {
      const { mode, timestamp, colors } = theme
      const newTimestamp = new Date().getTime()

      dispatch({ type: Actions.SET_MODE, payload: mode })
      document.documentElement.classList.toggle('dark', mode)

      // Change theme color every hour.
      newTimestamp - timestamp > 1000 * 60 * 60 * 1
        ? setStyle(colors)
        : storeTheme(mode)
    } else storeTheme()
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.isDark)
  }, [state.isDark])

  return (
    <global.Provider value={{ isDark: state.isDark, dispatch }}>
      {children}
    </global.Provider>
  )
}
