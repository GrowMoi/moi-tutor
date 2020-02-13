import { combineReducers } from 'redux';
import authReducer from './authReducer'
import userReducer from './userReducer'
import profileReducer from './profileReducer'

const rootReducers = combineReducers({
  authReducer,
  userReducer,
  profileReducer
})

export default rootReducers;
