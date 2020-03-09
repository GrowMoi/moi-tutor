import { Reducer, combineReducers } from 'redux';
import loginReducer, { LoginState } from './reducers/login';
import clientsReducer, { ClientsState } from './reducers/clients';

export interface MoiTutorState {
  login: LoginState;
  clients: ClientsState;
}

export interface MoiAction {
  type: string;
  payload: any;
}

export const INITIAL_STATE: MoiTutorState = {
  login: {
    lastUpdate: null
  },
  clients: {
    data: [],
    loading: false
  }
};

export const rootReducer: Reducer<MoiTutorState> = combineReducers({
  login: loginReducer,
  clients: clientsReducer,
});
