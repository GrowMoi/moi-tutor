import { MoiAction } from '../store';
import {
  LOAD_ACHIEVEMENTS,
  LOAD_ACHIEVEMENTS_SUCCESS,
  LOAD_ACHIEVEMENTS_ERROR
} from '../actions';
import _ from 'lodash';

export interface Achievement {
  id: number;
  tutor_id: number;
  name: string;
  description: string;
  image: {
    url: string;
  };
}
export interface RecommendationsState {
  achievements: Array<Achievement>;
  loading: boolean;
  sending: boolean;
}

export default function recommendationsReducer(state: RecommendationsState = {} as any, action: MoiAction): RecommendationsState {
  switch (action.type) {
    case LOAD_ACHIEVEMENTS: {
      const newState = {
        ...state,
        loading: true
      };
      return newState;
    }
    case LOAD_ACHIEVEMENTS_SUCCESS: {
      const payload = action.payload || [];
      const newState = {
        ...state,
        achievements: payload,
        loading: false
      };
      return newState;
    }
    case LOAD_ACHIEVEMENTS_ERROR: {
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
