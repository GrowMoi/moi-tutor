import React from 'react'
import styles from './index.module.css'

export default function Loading({ fullScreen, text }) {

  let loader = (
    <div className={styles.container}>
      <div className={styles['loadingio-spinner-dual-ball']}>
        <div className={styles["ldio-s87ykehnc3q"]}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );

  if(fullScreen) {
    return (
      <div className={styles.fullScreen}>
        {loader}
      </div>
    )
  }

  return loader
}


