import React from 'react'
import { Layout, Typography, Avatar } from 'antd'
import { connect } from 'react-redux'
// Actions
import * as profileActions from '../../actions/profileActions'

import styles from './index.module.css'

const { Content } = Layout
const { Title, Text } = Typography

function Profile(props) {

  props.getProfileData()

  return (
    <Content style={{ backgroundColor: 'white', padding: '1rem' }}>
      <Title level={4}>Información Básica</Title>

      <div className={styles.container}>
        <div className={styles.settingsContainer}>
          <Avatar size={64} style={{ backgroundColor: '#26838f' }}>
            {'JM'}
          </Avatar>

          <div className={styles.infoContainer}>
            <div>
              <div className={styles.row}>
                <Text strong className={styles.label}>Email:</Text>
                {/* <Text className={styles.labelText}>{me.email}</Text> */}
              </div>
              <div className={styles.row}>
                <Text strong className={styles.label}>Nombre de usuario:</Text>
                {/* <Text className={styles.labelText}>{me.username}</Text> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  )
}

const mapDispatchToProps = {
  ...profileActions,
}
export default connect(null, mapDispatchToProps)(Profile);
