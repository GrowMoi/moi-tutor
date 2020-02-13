import React from 'react'
import { connect } from 'react-redux'

// styles
import styles from './index.module.css'


const DashboardPage = (props) => {
  // props.setHeaderConfig({ title: 'Dashboard' })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {'Dashboard'}
      </div>
    </div>
  )
}

const mapDispatchToProps = {
}


export default connect(null, mapDispatchToProps)(DashboardPage);
