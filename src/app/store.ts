import { Reducer, combineReducers } from 'redux';
import loginReducer from './reducers/login';
import { LoginState } from './reducers/login';

export interface MoiTutorState {
  login: LoginState;
}

export interface MoiAction {
  type: string;
  payload: any;
}

export const INITIAL_STATE: MoiTutorState = {
  login: {
    lastUpdate: null
  }
};

export const rootReducer: Reducer<MoiTutorState> = combineReducers({
  login: loginReducer
});
