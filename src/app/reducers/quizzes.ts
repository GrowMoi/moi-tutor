import { MoiAction } from '../store';
import { LOAD_LEVELS, LOAD_LEVELS_SUCCESS, LOAD_LEVELS_ERROR } from '../actions';
import _ from 'lodash';

export interface Level {
  id: number;
  name: string;
  description: string;
  content_ids: string[];
}

export interface Content {
  id: number;
  title: string;
}

export interface QuizzesState {
  levels: Level[];
  loading: boolean;
  sending: boolean;
  loadingContents: boolean;
}

export default function quizzesReducer(state: QuizzesState = {} as any, action: MoiAction): QuizzesState {
  switch (action.type) {
    case LOAD_LEVELS: {
      const newState = {
        ...state,
        loading: true
      };
      return newState;
    }
    case LOAD_LEVELS_SUCCESS: {
      const payload = action.payload || [];
      const levels = [];
      payload.forEach(item => {
        const level = {
          ...item,
          content_ids: item.content_ids.filter((d: string) => !_.isEmpty(d))
        };
        levels.push(level);
      });
      const newState = {
        ...state,
        levels,
        loading: false
      };
      return newState;
    }
    case LOAD_LEVELS_ERROR: {
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
