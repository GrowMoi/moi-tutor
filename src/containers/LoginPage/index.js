import React, { Component } from 'react'
import LoginForm from '../../components/Login'
import { Redirect } from 'react-router-dom'

//Redux
import { connect } from 'react-redux'
import * as authActions from '../../actions/authActions'

// styles
import styles from './index.module.css'

class LoginPage extends Component {

  componentDidMount() {
    this.props.setUserLogged()
  }

  render() {
    if(this.props.isLoguedIn) {
      return <Redirect to='/dashboard' />
    }

    return (
      <div className={styles.containerMain}>
        <div className={styles.container}>
          <LoginForm className={styles.loginForm}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authReducer }) => {
  return authReducer;
}

export default connect(
  mapStateToProps,
  {
    setUserLogged: authActions.setUserLogged,
  }
)(LoginPage)
