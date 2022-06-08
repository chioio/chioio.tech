import * as React from 'react'
import cn from 'classnames'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { motion } from 'framer-motion'
import { useMedia } from 'react-use'

import type { GetStaticProps } from 'next'

import { Logo, Navigation, MadeBy, PoweredBy } from '@/components/app'

const ReactNebula = dynamic(
  import('@flodlc/nebula').then((mod) => mod.ReactNebula),
  {
    ssr: false,
  }
) as typeof import('@flodlc/nebula').ReactNebula

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
})

export default function HomePage() {
  const sm = useMedia('(min-width: 640px)', true)

  const hero = {
    hidden: {
      opacity: 0,
      y: '4rem',
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <main
      className={cn(
        'grow flex items-center justify-center mx-auto w-full h-full'
      )}>
      <motion.p
        variants={hero}
        initial="hidden"
        animate="visible"
        className={cn(
          'grow flex flex-col justify-end mx-auto max-w-xs text-center font-extrabold font-[Jost]',
          'sm:max-w-4xl'
        )}>
        <span
          className={cn(
            'uppercase text-5xl leading-tight text-white tracking-wider',
            'sm:text-8xl'
          )}>
          An {sm || <br />} App-Stack
        </span>
        <code
          className={cn(
            'mx-auto mt-2 px-1.5 py-1 w-fit rounded-lg align-middle text-2xl font-bold shadow-inner duration-500',
            'sm:ml-auto sm:mr-0 sm:mt-4 sm:text-5xl sm:px-3 sm:py-2',
            'bg-gray-800/70 text-main-500'
          )}>
          Explorer
        </code>
      </motion.p>
    </main>
  )
}

HomePage.getLayout = (page: React.ReactElement) => {
  return (
    <>
      <ReactNebula
        config={{
          starsCount: 400,
          starsRotationSpeed: 2,
          cometFrequence: 20,
          nebulasIntensity: 0,
          sunScale: 0,
          planetsScale: 0,
          bgColor: 'rgb(8,8,8)',
        }}
      />
      <div
        className={cn(
          '!text-white', // body text color
          'grow flex flex-col w-screen h-screen z-10'
        )}>
        <header className={cn('flex items-center px-8 py-4')}>
          <Logo />
          <Navigation />
        </header>
        {page}
        <footer
          className={cn(
            'relative flex flex-col items-center px-8 pt-4 pb-16',
            'sm:pb-14'
          )}>
          {/* Powered By */}
          <PoweredBy />
          {/* Made By */}
          <MadeBy />
        </footer>
      </div>
    </>
  )
}
