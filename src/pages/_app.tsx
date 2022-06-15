import type React from 'react'
import { appWithTranslation } from 'next-i18next'

import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

import { Global, SocialBanner } from '@/components/app'

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
    <Global>
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
    </Global>
  )
}

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="fixed inset-0 overflow-hidden flex flex-col">
      <SocialBanner />
      {children}
    </div>
  )
}

export default appWithTranslation(_App)
