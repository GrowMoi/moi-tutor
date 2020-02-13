import { LOGIN_IS_AUTHENTICATING, LOGIN, LOGIN_HAS_ERROR, LOGOUT, RESET_APP } from '../types/authTypes'

const INITIAL_STATE = {
  loading: false,
  error: '',
  isLoguedIn: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, loading: false, error: '', isLoguedIn: true }
    }
    case LOGOUT: {
      return { ...state, error: '', isLoguedIn: false  }
    }
    case LOGIN_IS_AUTHENTICATING: {
      return { ...state, loading: true }
    }
    case LOGIN_HAS_ERROR: {
      return { ...state, loading: false, error: action.payload }
    }
    case RESET_APP: {
      return INITIAL_STATE
    }
    default: {
      return state
    }
  }
}
