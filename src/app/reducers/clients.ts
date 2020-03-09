import { MoiAction } from '../store';
import { GET_CLIENTS, LOAD_CLIENTS, LOAD_CLIENTS_SUCCESS, LOAD_CLIENTS_ERROR } from '../actions';

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
    default: {
      return state;
    }
  }
}
