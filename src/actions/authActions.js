import { LOGIN_HAS_ERROR, LOGIN_IS_AUTHENTICATING, LOGIN, LOGOUT, RESET_APP } from '../types/authTypes'
import auth from '../utils/auth'
import common from '../utils/common'
import { http } from '../utils/http'

export const login = (values) => async dispatch => {
  dispatch({ type: LOGIN_IS_AUTHENTICATING });
  const body = values;

  try {
    auth.setRemember(body.remember);
    const response = await http({
      method: 'post',
      url: '/api/auth/user/sign_in',
      data: body
    })

    const res = (response || {}).data || {};
    auth.setUserInfo(res.data, body.remember);
    dispatch({ type: LOGIN });
  } catch (error) {
    const message = common.getErrorMesssage(error);
    dispatch({
      type: LOGIN_HAS_ERROR,
      payload: message,
    });
  }
}

export const logout = (cb = () => null) => dispatch => {
  auth.clearAppStorage();
  dispatch({ type: LOGOUT })
  dispatch({ type: RESET_APP })
  cb();
}

export const setUserLogged = () => (dispatch, getState) => {
  const isLoguedIn = auth.userIsLoguedIn();
  if (isLoguedIn) {
    dispatch({ type: LOGIN })
  }
}
