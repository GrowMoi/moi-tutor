import React from 'react'
import { Card } from 'antd'
import LoginForm from './LoginForm';
import { FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions'

//styles
import styles from './index.module.css'
import { Spin } from 'antd';

const Login = (props) => {

  const onSubmit = (values) => {
    if(props.login) { props.login(values) }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div>
          <div className={styles.header}>
            <div className={styles.typography}>
              <h1 className={styles.title}>
                <FormattedMessage id="loginPage.loginForm.title"></FormattedMessage>
              </h1>
            </div>
          </div>
          <div className={styles.form}>
            {props.loading ? (
              <Spin />
            ): (
              <LoginForm onSubmit={onSubmit} />
            )}
          </div>
        </div>
      </Card>
    </div>
  )

}

const mapStateToProps = ({ authReducer }) => {
  return authReducer;
}

export default connect(mapStateToProps, authActions)(Login)
