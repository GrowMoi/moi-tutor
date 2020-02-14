import React from 'react';
import styles from './index.module.css'

const Title = ({ children }) => (
  <h1 className={styles.test}>{children}</h1>
);
export default Title;
