import * as React from 'react'
import { appWithTranslation } from 'next-i18next'

import { GlobalProvider } from '@/contexts'

import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

import '@/styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function _App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <GlobalProvider>{getLayout(<Component {...pageProps} />)}</GlobalProvider>
  )
}

export default appWithTranslation(_App)
