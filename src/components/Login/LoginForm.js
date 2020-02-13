import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl'
import styles from './LoginForm.module.css'
import * as constants from '../../config/constants';

const LoginForm = (props) => {
  const { form: { getFieldDecorator }, onSubmit } = props;
  const submit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        if(onSubmit) { onSubmit(values) }
      }
    });
  }

  const intl = useIntl();

  return (
    <div className={styles.container}>
      <Form>
        <Form.Item>
          {getFieldDecorator('login', {
            rules: [{
              required: true, message: intl.formatMessage({id: 'commons.form.input.required'}),
            }],
          })(
            <Input size='large'
              placeholder={intl.formatMessage({id: 'loginPage.loginForm.usernameInput.placeholder'})} />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: intl.formatMessage({id: 'commons.form.input.required'}),
            }],
          })(
            <Input.Password size='large' placeholder={intl.formatMessage({id: 'loginPage.loginForm.passwordInput.placeholder'})} />
          )}
        </Form.Item>
        <Form.Item className={styles.itemRemember}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>
            <FormattedMessage id="loginPage.loginForm.rememberMe"></FormattedMessage>
          </Checkbox>)}
        </Form.Item>
      </Form>

      <Button
        className={styles.button}
        onClick={submit}
        type='primary'
        size='large'>
        <span>
          <FormattedMessage id="loginPage.loginForm.submit"></FormattedMessage>
        </span>
      </Button>
      <div className={styles.moreActionsContainer}>
        <div>
          <a href='/#'><FormattedMessage id="loginPage.loginForm.forgotPassword"></FormattedMessage></a>
        </div>
        <div>
          <a href={constants.PRODUCTS_URL} target="_blank" rel="noopener noreferrer"><FormattedMessage id="loginPage.loginForm.needUser"></FormattedMessage></a>
        </div>
      </div>
    </div>
  )
}

export default Form.create({ name: 'loginform' })(LoginForm)
