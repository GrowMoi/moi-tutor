import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Avatar } from 'antd'

// redux
import { connect } from 'react-redux'

// styles
import styles from './Header.module.css'
import HeaderMenu from './HeaderMenu';

const { Header: HeaderAntd } = Layout

const Header = (props) => {
  return (
    <HeaderAntd className={styles.container}>
      <React.Fragment>
        <div className={styles.pageHeader}>

        </div>

        <div className={styles.profile}>
          <Avatar style={{ backgroundColor: "#04838f" }} shape='square'>
            {('Nombre de usuario').substring(0,2)}
          </Avatar>

          <HeaderMenu>
            <div className={styles.text}>
              <h4 className={styles.username}>{'Nombre de usuario'}</h4>
              <small className={styles.role}>{'Rol de usuario'}</small>
            </div>
          </HeaderMenu>
        </div>
      </React.Fragment>
    </HeaderAntd>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  hasBackButton: PropTypes.bool,
  onBack: PropTypes.func,
}

const mapStateToProps = (state) => ({
})


export default connect(mapStateToProps)(Header)
