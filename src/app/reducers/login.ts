import { MoiAction } from '../store';
import { LOGIN } from '../actions';

export interface LoginState {
  lastUpdate: Date;
}

export default function loginReducer(state: LoginState = {} as any, action: MoiAction): LoginState {
  switch (action.type) {
    case LOGIN: {
      const newState = {
        ...state,
        lastUpdate: new Date()
      };
      return newState;
    }
    default: {
      return state;
    }
  }
}
