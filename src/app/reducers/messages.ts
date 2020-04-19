import { MoiAction } from '../store';
import {
  SENDING_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR
} from '../actions';
import _ from 'lodash';

export interface MessagesState {
  sending: boolean;
}

export default function messagesReducer(state: MessagesState = {} as any, action: MoiAction): MessagesState {
  switch (action.type) {
    case SENDING_MESSAGE: {
      const newState = {
        ...state,
        sending: true
      };
      return newState;
    }
    case SEND_MESSAGE_SUCCESS: {
      const newState = {
        ...state,
        sending: false
      };
      return newState;
    }
    case SEND_MESSAGE_ERROR: {
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
