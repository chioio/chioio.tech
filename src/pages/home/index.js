import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import FluidAnimation from './dynamic-animation';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tenn Chio</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <FluidAnimation />

      <main className={styles.main}>
        <h1 className={styles.title}>chioio</h1>
        <h2 className={styles.desc}>A FONT-END EXPLORER</h2>

        {/*
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
        */}
      </main>

      <footer className={styles.footer}>
        <p className={styles.baseInfo}>
          Deployed on{' '}
          <a href="https://www.aliyun.com/product/fc">Alicloud FC Service</a>
        </p>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Tenn Chio
        </p>
      </footer>
    </div>
  );
}

// export const getServerSideProps = async (context) => {
//   const { res, req } = context;
//   if (process.env.NODE_ENV === 'production') {
//     res.writeHead(302, { location: '/home' });
//     res.end('redirect ok!');
//     return { props: { res } };
//   } else return { props: {} };
// };
