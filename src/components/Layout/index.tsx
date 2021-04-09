import Header from '@components/Header'
import Footer from '@components/Footer'
import Head from 'next/head'

import styles from './index.module.scss'

type Props = {
  pageTitle?: string
  themeColor?: string
  children: React.ReactNode
}

export default function Layout(props: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {props.pageTitle ? `chioio | ${props.pageTitle}` : 'chioio'}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="theme-color"
          content={
            props.themeColor ? props.themeColor : "#000"
          }
        />
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  )
}
