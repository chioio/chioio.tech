import styles from './index.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <img src="@assets/icons.svg" alt=""/>
      </div>
      <p className={styles.deployInfo}>
        Deployed on{' '}
        <a href="https://www.aliyun.com/product/fc">Alicloud FC Service</a>
      </p>
      <p className={styles.copyright}>© {new Date().getFullYear()} Tenn Chio</p>
    </footer>
  )
}
