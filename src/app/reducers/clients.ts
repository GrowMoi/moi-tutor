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
  RESET_CLIENTS,
} from '../actions';
import { Student } from './students';

export interface Client {
  id: number;
  email: string;
  name: string;
  role: string;
  username: string;
  image: {
    url: string
  };
}
export interface ClientMeta {
  total_items: number;
  total_pages: number;
}
export interface ClientsState {
  data: Array<Client>;
  meta: ClientMeta;
  loading: boolean;
  sending: boolean;
}

export default function clientsReducer(state: ClientsState = {} as any, action: MoiAction): ClientsState {
  switch (action.type) {
    case GET_CLIENTS: {
      const { data = [], meta = {} } = action.payload;
      const newState = {
        ...state,
        data: [
          ...state.data,
          ...data
        ],
        meta,
      };
      return newState;
    }
    case RESET_CLIENTS: {
      const newState = {
        ...state,
        data: [],
        meta: {
          total_items: 0,
          total_pages: 0
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

      _.remove(clients, (client: Student) => {
        return ids.includes(client.id);
      });

      const newState = {
        ...state,
        data: clients,
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
