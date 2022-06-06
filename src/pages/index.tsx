import * as React from 'react'
import cn from 'classnames'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { motion } from 'framer-motion'

import type { GetStaticProps } from 'next'

import {
  Copyright,
  Logo,
  Navigation,
  PoweredBy,
  SocialBanner,
} from '@/components/app'

const ReactNebula = dynamic(
  import('@flodlc/nebula').then((mod) => mod.ReactNebula),
  {
    ssr: false,
  }
) as typeof import('@flodlc/nebula').ReactNebula

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['home', 'common'])),
  },
})

export default function HomePage() {
  const { t } = useTranslation('home')
  const { locale } = useRouter()

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
          'grow flex flex-col justify-end mx-auto max-w-sm text-center',
          'sm:max-w-4xl'
        )}>
        <span
          className={cn(
            'text-4xl text-white tracking-wider',
            'sm:text-8xl',
            locale === 'en' ? 'font-extrabold font-[Jost]' : 'font-black'
          )}>
          {t('hero.pre')}
        </span>
        <code
          className={cn(
            'ml-auto px-1.5 py-1 w-fit rounded-lg align-middle text-lg font-bold shadow-inner duration-500',
            'sm:text-5xl sm:px-3 sm:py-2',
            'bg-gray-800/70 text-main-500',
            locale === 'en' ? 'mr-0' : 'mt-4 mr-0'
          )}>
          {t('hero.explorer')}
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
          nebulasIntensity: 9,
          sunScale: 0,
          planetsScale: 0,
          bgColor: 'rgb(8,8,8)',
        }}
      />
      <div
        className={cn(
          '!text-white', // body text color
          'fixed flex flex-col w-screen h-screen z-10'
        )}>
        <SocialBanner />
        <header className={cn('flex items-center px-8 py-4')}>
          <Logo />
          <Navigation />
        </header>
        {page}
        <footer className={cn('relative flex flex-col items-center px-8 py-4')}>
          {/* Powered By */}
          <PoweredBy />
          {/* Copyright */}
          <Copyright />
        </footer>
      </div>
    </>
  )
}