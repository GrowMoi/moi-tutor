import React from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// Actions
import * as authActions from '../../actions/authActions'

// styles
import styles from './HeaderMenu.module.css'

// types
import * as routeTypes from '../../config/routeTypes'

export const Item = ({children, onClick = () => null, iconType = '', ...rest}) => {
  return (
    <div onClick={onClick} className={styles.itemContainer}>
      {iconType && <Icon style={{ marginRight: '0.5rem' }} type={iconType} />}
      <p className={styles.itemText}>{children}</p>
    </div>
  );
  }

const HeaderMenu = (props) => {
  const menu = (
    <Menu className={styles.menuContainer}>
      <Item iconType='user' onClick={() => {props.history.push(routeTypes.PROFILE)}}>
        Perfil
      </Item>

      <Item
      iconType='logout'
      onClick={() => {
        props.logout();
        props.history.push(routeTypes.AUTH_LOGIN);
      }}>
        Cerrar Sesión
      </Item>
    </Menu>
  );

  return (
    <Dropdown placement="bottomRight" overlay={menu} trigger={['click']}>
      <span tabIndex="0" className={styles.container}>
        {props.children}
        <Icon className={styles.downIcon} theme='filled' type="caret-down" />
      </span>
  </Dropdown>
  )
}

const mapDispatchToProps = {
  ...authActions,
}

export default withRouter(connect(null, mapDispatchToProps)(HeaderMenu))
