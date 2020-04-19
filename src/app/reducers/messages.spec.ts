import messagesReducer, { MessagesState } from '../reducers/messages';
import { MoiAction } from '../store';
import { SENDING_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_ERROR } from '../actions';

describe('Reducer: messagesReducer', () => {
  let state: MessagesState;
  beforeEach(() => {
    state = {
      sending: false,
    };
  });

  it('should exist', () => {
    expect(messagesReducer).toBeTruthy();
  });

  it('should change the sending value to true', () => {
    const action: MoiAction = {
      type: SENDING_MESSAGE,
    };
    const result = messagesReducer(state, action);
    expect(result.sending).toBe(true);
  });

  it('should change the sending value to false', () => {
    const action: MoiAction = {
      type: SEND_MESSAGE_ERROR,
    };
    const result = messagesReducer(state, action);
    expect(result.sending).toBe(false);
  });

  it('should change the sending value to false', () => {
    const action: MoiAction = {
      type: SEND_MESSAGE_SUCCESS,
    };
    const result = messagesReducer(state, action);
    expect(result.sending).toBe(false);
  });


});
