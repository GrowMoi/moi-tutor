import recommendationsReducer, { RecommendationsState } from '../reducers/recommendations';
import { MoiAction } from '../store';
import { LOAD_ACHIEVEMENTS_SUCCESS, LOAD_CONTENTS_SUCCESS, SEND_RECOMMENDATIONS_SUCCESS, SENDING_RECOMMENDATIONS } from '../actions';

describe('Reducer: recommendationsReducer', () => {
  let state: RecommendationsState;
  beforeEach(() => {
    state = {
      sending: false,
      loading: false,
      achievements: [],
      contents: [],
      loadingContents: false,
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

  it('should add contents', () => {
    const data = [
      {
        id: 1047,
        title: '¿Porqué son necesarios los Números?',
      },
      {
        id: 1048,
        title: '¿Cómo funciona un Ecosistema?',
      },
      {
        id: 1049,
        title: '¿Qué es el Aire?',
      },
    ];
    const action: MoiAction = {
      type: LOAD_CONTENTS_SUCCESS,
      payload: data
    };
    const result = recommendationsReducer(state, action);
    expect(result.contents.length).toBe(3);
    expect(result.contents).toEqual(data);
  });

  it('should start sending recommendations', () => {
    const action: MoiAction = {
      type: SENDING_RECOMMENDATIONS,
    };
    const result = recommendationsReducer(state, action);
    expect(result.sending).toBe(true);
  });

  it('should send recommendations', () => {
    const action: MoiAction = {
      type: SEND_RECOMMENDATIONS_SUCCESS,
    };
    const result = recommendationsReducer(state, action);
    expect(result.sending).toBe(false);
  });

});
