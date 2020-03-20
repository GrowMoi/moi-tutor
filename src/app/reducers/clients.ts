import _ from 'lodash';
import { MoiAction } from '../store';
import {
  GET_CLIENTS,
  LOAD_CLIENTS,
  LOAD_CLIENTS_SUCCESS,
  LOAD_CLIENTS_ERROR,
  START_REMOVE_SELECTED_CLIENTS_FROM_LIST,
  REMOVE_SELECTED_CLIENTS_FROM_LIST_SUCCESS,
  REMOVE_SELECTED_CLIENTS_FROM_LIST_ERROR,
} from '../actions';

interface Client {
  id: number;
  email: string;
  name: string;
  role: string;
  username: string;
  image: {
    url: string
  };
}
export interface ClientsState {
  data: Array<Client>;
  loading: boolean;
  sending: boolean;
}

export default function clientsReducer(state: ClientsState = {} as any, action: MoiAction): ClientsState {
  switch (action.type) {
    case GET_CLIENTS: {
      const newState = {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      };
      return newState;
    }
    case LOAD_CLIENTS: {
      const newState = {
        ...state,
        loading: true
      };
      return newState;
    }
    case LOAD_CLIENTS_SUCCESS: {
      const newState = {
        ...state,
        loading: false
      };
      return newState;
    }
    case LOAD_CLIENTS_ERROR: {
      const newState = {
        ...state,
        loading: false
      };
      return newState;
    }
    case START_REMOVE_SELECTED_CLIENTS_FROM_LIST: {
      const newState = {
        ...state,
        sending: true
      };
      return newState;
    }
    case REMOVE_SELECTED_CLIENTS_FROM_LIST_SUCCESS: {
      const ids = action.payload;
      const clients = state.data;
      _.forEach(clients, (value, key: number) => {
        if (ids.includes(value.id)) {
          delete clients[key];
        }
      });
      const newState = {
        ...state,
        data: {
          ...clients
        },
        sending: false
      };
      return newState;
    }
    case REMOVE_SELECTED_CLIENTS_FROM_LIST_ERROR: {
      const newState = {
        ...state,
        sending: false
      };
      return newState;
    }
    default: {
      return state;
    }
  }
}
