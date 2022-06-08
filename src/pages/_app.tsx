import * as React from 'react'
import { appWithTranslation } from 'next-i18next'

import { GlobalProvider } from '@/contexts'

import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

import '@/styles/globals.css'
import { SocialBanner } from '@/components/app'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function _App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <GlobalProvider>
      <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
    </GlobalProvider>
  )
}

const AppLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="fixed w-screen h-screen overflow-hidden flex flex-col">
      <SocialBanner />
      {children}
    </div>
  )
}

export default appWithTranslation(_App)
