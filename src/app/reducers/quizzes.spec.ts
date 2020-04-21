import quizzesReducer, { QuizzesState } from '../reducers/quizzes';
import { MoiAction } from '../store';
import { LOAD_LEVELS_SUCCESS } from '../actions';

describe('Reducer: quizzesReducer', () => {
  let state: QuizzesState;
  beforeEach(() => {
    state = {
      sending: false,
      loading: false,
      levels: [],
      loadingContents: false,
    };
  });

  it('should exist', () => {
    expect(quizzesReducer).toBeTruthy();
  });

  it('should add achievements', () => {
    const originalData = [
      {
        id: 30,
        name: 'level 1',
        description: 'description 1',
        content_ids: [
          '',
          '1379',
          '980',
          '1382',
          '1376'
        ]
      },
      {
        id: 31,
        name: 'level 2',
        description: 'description 2',
        content_ids: [
          '',
          '34',
          '22',
          '55',
          '345'
        ]
      },
      {
        id: 32,
        name: 'level 3',
        description: 'description 3',
        content_ids: [
          '',
          '999',
          '888',
          '222',
          '1111'
        ]
      },
    ];

    const fixedData = [
      {
        id: 30,
        name: 'level 1',
        description: 'description 1',
        content_ids: [
          '1379',
          '980',
          '1382',
          '1376'
        ]
      },
      {
        id: 31,
        name: 'level 2',
        description: 'description 2',
        content_ids: [
          '34',
          '22',
          '55',
          '345'
        ]
      },
      {
        id: 32,
        name: 'level 3',
        description: 'description 3',
        content_ids: [
          '999',
          '888',
          '222',
          '1111'
        ]
      },
    ];
    const action: MoiAction = {
      type: LOAD_LEVELS_SUCCESS,
      payload: originalData
    };
    const result = quizzesReducer(state, action);
    expect(result.levels.length).toBe(3);
    expect(result.levels).toEqual(fixedData);
  });

});
