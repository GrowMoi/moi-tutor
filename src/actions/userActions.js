import _ from 'lodash'
import { SET_USER_INFO } from '../types/userTypes'

export const setUserInfo = (user) => (dispatch, getState) => {
  const userState = getState().userReducer.user;

  if(_.isEmpty(userState)) {
    dispatch({
      type: SET_USER_INFO,
      payload: user,
    })
  }
}

