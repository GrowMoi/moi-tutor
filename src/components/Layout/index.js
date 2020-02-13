import React from 'react'
import { Layout as LayoutAntd } from 'antd'
import Header from './Header'

// styles
import styles from './index.module.css'

const { Content } = LayoutAntd

const Layout = (props) => {
  return (
    <LayoutAntd className={styles.layout}>
      <LayoutAntd className={styles.innerLayout}>
        <Header />
        <Content className={styles.content}>{props.children}</Content>
      </LayoutAntd>
    </LayoutAntd>
  )
}

export default Layout
