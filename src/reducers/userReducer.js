import { SET_USER_INFO } from '../types/userTypes'
import { RESET_APP } from '../types/authTypes'

const INITIAL_STATE = {
  user: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_INFO: {
      return { ...state, user: action.payload }
    }
    case RESET_APP: {
      return INITIAL_STATE
    }

    default: {
      return state
    }
  }
}
