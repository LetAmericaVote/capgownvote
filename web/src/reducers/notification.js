import createReducer from './createReducer';
import {
  PUSH_ERROR_NOTIFICATION, PUSH_GENERAL_NOTIFICATION,
  CLOSE_NOTIFICATION,
} from '../actions';

const notification = createReducer('notification', {
  [PUSH_ERROR_NOTIFICATION]: (state, action) => ({
    ...state,
    type: 'error',
    message: action.message,
  }),
  [PUSH_GENERAL_NOTIFICATION]: (state, action) => ({
    ...state,
    type: 'general',
    message: action.message,
  }),
  [CLOSE_NOTIFICATION]: (state, action) => ({
    ...state,
    type: null,
    message: null,
  }),
});

export default notification;
