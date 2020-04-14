import studentsReducer, { StudentsState } from '../reducers/students';
import { MoiAction } from '../store';
import { START_CANCEL_TUTOR_REQUEST, CANCEL_TUTOR_REQUEST_SUCCESS, CANCEL_TUTOR_REQUEST_ERROR } from '../actions';

describe('Reducer: studentsReducer', () => {
  let state: StudentsState;
  beforeEach(() => {
    state = {
      sending: false,
      loading: false,
      data: [
        {
          id: 1,
          email: 'test1@example.com',
          name: 'usuario 1',
          username: 'usuario1',
          status: null
        },
        {
          id: 2,
          email: 'test2@example.com',
          name: 'usuario 2',
          username: 'usuario2',
          status: null
        },
        {
          id: 3,
          email: 'test3@example.com',
          name: 'usuario 3',
          username: 'usuario3',
          status: null
        },
        {
          id: 4,
          email: 'test4@example.com',
          name: 'usuario 4',
          username: 'usuario4',
          status: null
        },
      ]
    };
  });

  it('should exist', () => {
    expect(studentsReducer).toBeTruthy();
  });

  it('should change the sending value to true', () => {
    const action: MoiAction = {
      type: START_CANCEL_TUTOR_REQUEST,
    };
    const result = studentsReducer(state, action);
    expect(result.sending).toBe(true);
  });

  it('should change the sending value to false', () => {
    const action: MoiAction = {
      type: CANCEL_TUTOR_REQUEST_ERROR,
    };
    const result = studentsReducer(state, action);
    expect(result.sending).toBe(false);
  });

  it('should remove student from list when cancel request', () => {
    const payload = {
      id: 2
    };
    const action: MoiAction = {
      type: CANCEL_TUTOR_REQUEST_SUCCESS,
      payload
    };
    const result = studentsReducer(state, action);
    const item = result.data.find((d) => d.id ===  payload.id);
    const item2 = result.data.find((d) => d.id ===  1);
    expect(result.data.length).toBe(3);
    expect(item).toBeFalsy();
    expect(item2).toBeTruthy();
    expect(result.sending).toBe(false);
  });

});
