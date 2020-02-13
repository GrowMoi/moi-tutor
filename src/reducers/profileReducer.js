import { LOADING_PROFILE_DATA, PROFILE_DATA } from '../types/profileTypes'

const INITIAL_STATE = {
  loading: false,
  data: {},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_PROFILE_DATA: {
      return { ...state, loading: true }
    }

    case PROFILE_DATA: {
      return { ...state, data: action.payload, loading: false }
    }

    default: {
      return state
    }
  }
}
