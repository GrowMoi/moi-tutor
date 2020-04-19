import recommendationsReducer, { RecommendationsState } from '../reducers/recommendations';
import { MoiAction } from '../store';
import { LOAD_ACHIEVEMENTS_SUCCESS } from '../actions';

describe('Reducer: recommendationsReducer', () => {
  let state: RecommendationsState;
  beforeEach(() => {
    state = {
      sending: false,
      loading: false,
      achievements: []
    };
  });

  it('should exist', () => {
    expect(recommendationsReducer).toBeTruthy();
  });

  it('should add achievements', () => {
    const data = [
      {
        id: 30,
        tutor_id: 5902,
        name: 'recompensa 1',
        description: 'description',
        image: {
          url: 'http://image.com/image.png'
        }
      },
      {
        id: 31,
        tutor_id: 5903,
        name: 'recompensa 1',
        description: 'description',
        image: {
          url: 'http://image.com/image.png'
        }
      },
      {
        id: 32,
        tutor_id: 5904,
        name: 'recompensa 1',
        description: 'description',
        image: {
          url: null
        }
      },
    ];
    const action: MoiAction = {
      type: LOAD_ACHIEVEMENTS_SUCCESS,
      payload: data
    };
    const result = recommendationsReducer(state, action);
    expect(result.achievements.length).toBe(3);
    expect(result.achievements).toEqual(data);
  });

});
