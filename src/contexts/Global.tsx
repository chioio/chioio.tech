import * as React from 'react'
import { useImmerReducer } from 'use-immer'

import tailwind from '@/configs/tailwind'
import { hexToRgb } from '@/utils/hex-to-rgb'
import { useMounted } from '@/hooks'

type State = {
  isDark: boolean
}

type ActionType =
  | {
      type: 'TOGGLE_MODE'
    }
  | {
      type: 'SET_MODE'
      payload: boolean
    }

const initState: State = {
  isDark: true,
}

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

type GlobalContextProps = React.PropsWithChildren<
  {
    dispatch: React.Dispatch<ActionType>
  } & State
>

const GlobalContext = React.createContext<GlobalContextProps>(null!)

const reducer = (draft: State, action: ActionType) => {
  switch (action.type) {
    case 'TOGGLE_MODE':
      const theme = JSON.parse(window.localStorage.getItem('theme')!)
      window.localStorage.setItem(
        'theme',
        JSON.stringify({ ...theme, mode: !draft.isDark })
      )
      draft.isDark = !draft.isDark
      break
    case 'SET_MODE':
      draft.isDark = action.payload
      break
    default:
      break
  }
}

const GlobalProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, dispatch] = useImmerReducer(reducer, initState)

  useMounted(() => {
    const storeTheme = (mode?: boolean) => {
      const randomColor: { [key: string]: string } =
        colorful[Math.floor(Math.random() * colorful.length)]

      for (const key in randomColor) {
        const { r, g, b } = hexToRgb(randomColor[key])
        document.documentElement.style.setProperty(
          `--color-main-${key}`,
          `${r} ${g} ${b}`
        )
      }

      window.localStorage.setItem(
        'theme',
        JSON.stringify({
          mode: mode ?? state.isDark,
          timestamp: new Date().getTime(),
          colors: randomColor,
        })
      )
    }

    const theme = window.localStorage.getItem('theme')

    if (theme) {
      const { mode, timestamp, colors } = JSON.parse(theme)
      const newTimestamp = new Date().getTime()

      dispatch({ type: 'SET_MODE', payload: mode })
      document.documentElement.classList.toggle('dark', mode)

      if (newTimestamp - timestamp < 1000 * 60 * 60 * 1) {
        for (const key in colors) {
          const { r, g, b } = hexToRgb(colors[key])
          document.documentElement.style.setProperty(
            `--color-main-${key}`,
            `${r} ${g} ${b}`
          )
        }
      } else storeTheme(mode)
    } else storeTheme()
  })

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', state.isDark)
  }, [state.isDark])

  return (
    <GlobalContext.Provider value={{ isDark: state.isDark, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalProvider, GlobalContext }
