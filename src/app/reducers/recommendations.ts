import { MoiAction } from '../store';
import {
  LOAD_ACHIEVEMENTS,
  LOAD_ACHIEVEMENTS_SUCCESS,
  LOAD_ACHIEVEMENTS_ERROR,
  LOAD_CONTENTS,
  LOAD_CONTENTS_SUCCESS,
  LOAD_CONTENTS_ERROR,
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

export interface Content {
  id: number;
  title: string;
}

export interface RecommendationsState {
  achievements: Array<Achievement>;
  contents: Array<Content>;
  loading: boolean;
  sending: boolean;
  loadingContents: boolean;
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
    case LOAD_CONTENTS: {
      const newState = {
        ...state,
        loadingContents: true
      };
      return newState;
    }
    case LOAD_CONTENTS_SUCCESS: {
      const payload = action.payload || [];
      const newState = {
        ...state,
        contents: payload,
        loadingContents: false
      };
      return newState;
    }
    case LOAD_CONTENTS_ERROR: {
      const newState = {
        ...state,
        loadingContents: false
      };
      return newState;
    }

    default: {
      return state;
    }
  }
}
