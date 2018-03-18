import createReducer from './createReducer';
import {
  PUSH_ERROR_NOTIFICATION, CLOSE_ERROR_NOTIFICATION,
} from '../actions';

const notification = createReducer('notification', {
  [PUSH_ERROR_NOTIFICATION]: (state, action) => ({
    ...state,
    error: action.message,
  }),
  [CLOSE_ERROR_NOTIFICATION]: (state, action) => ({
    ...state,
    error: null,
  }),
});

export default notification;
