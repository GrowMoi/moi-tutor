import { LOGIN } from './actions';

export interface Action {
  type: string;
  payload: any;
}

export interface MoiTutorState {
  lastUpdate: Date;
}

export const INITIAL_STATE: MoiTutorState = {
  lastUpdate: null,
};

export function rootReducer(state: MoiTutorState, action: Action): MoiTutorState {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        lastUpdate: new Date()
      });
  }
  return state;
}
