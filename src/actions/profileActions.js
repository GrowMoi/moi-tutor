import { PROFILE_DATA, LOADING_PROFILE_DATA } from '../types/profileTypes'
import { http } from '../utils/http'

export const getProfileData = () => async dispatch => {

  dispatch({ type: LOADING_PROFILE_DATA });

  try {
    const response = await http({
      method: 'get',
      url: '/api/auth/user/validate_token',
    })
    const res = (response || {}).data || {};
    dispatch({ type: PROFILE_DATA, payload: res.data });
  } catch (error) {
    //Handle error
  }

}
