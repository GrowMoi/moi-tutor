import { Reducer, combineReducers } from 'redux';
import loginReducer, { LoginState } from './reducers/login';
import clientsReducer, { ClientsState } from './reducers/clients';
import studentsReducer, { StudentsState } from './reducers/students';
import { USER_LOGOUT } from './actions/user';
import messagesReducer, { MessagesState } from './reducers/messages';

export interface MoiTutorState {
  login: LoginState;
  clients: ClientsState;
  students: StudentsState;
  messages: MessagesState;
}

export interface MoiAction {
  type: string;
  payload?: any;
}

export const INITIAL_STATE: MoiTutorState = {
  login: {
    lastUpdate: null
  },
  clients: {
    data: [],
    meta: {
      total_items: 0,
      total_pages: 0
    },
    loading: false,
    sending: false,
  },
  students: {
    data: [],
    sending: false,
    loading: false
  },
  messages: {
    sending: false,
  }
};

const appReducer = combineReducers({
  login: loginReducer,
  clients: clientsReducer,
  students: studentsReducer,
  messages: messagesReducer,
});

export const rootReducer: Reducer<MoiTutorState> = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};
