import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from '../../components/Layout'

// types
import * as routeTypes from '../../config/routeTypes'

// Redux
import { connect } from 'react-redux'
import * as authActions  from '../../actions/authActions'
import * as userActions from '../../actions/userActions'

// syles
import styles from './index.module.css'

// Pages
import DashboardPage from '../DashboardPage';
// import NotFoundPage from '../NotFoundPage';
import Profile from '../Profile'

const AppPage = (props) => {
  return (
    <div className={styles.renderContainer}>
      <Layout>
        <Switch>
          <Route exact path={routeTypes.DASHBOARD} component={DashboardPage} />
          <Route exact path={routeTypes.PROFILE} component={Profile} />
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </Layout>
    </div>
  )
}

const mapDispatchToProps = {
  ...authActions,
  ...userActions,
}

export default connect(null,mapDispatchToProps)(AppPage)
