import createReducer from './createReducer';
import {
  API_CALL_PENDING, API_CALL_SUCCESS, API_CALL_FAILURE,
} from '../actions';

const requestBlankSlate = () => ({
  isPending: false,
  hasFailed: false,
  hasSucceeded: false,
});

const api = createReducer('api', {
  [API_CALL_PENDING]: (state, action) => {
    const { requestId } = action;
    const request = state[requestId] || requestBlankSlate();

    return {
      ...state,
      [requestId]: {
        ...request,
        isPending: true,
        hasFailed: false,
        hasSucceeded: false,
      },
    };
  },
  [API_CALL_SUCCESS]: (state, action) => {
    const { requestId } = action;
    const request = state[requestId] || requestBlankSlate();

    return {
      ...state,
      [requestId]: {
        ...request,
        isPending: false,
        hasFailed: false,
        hasSucceeded: true,
      },
    };
  },
  [API_CALL_FAILURE]: (state, action) => {
    const { requestId } = action;
    const request = state[requestId] || requestBlankSlate();

    return {
      ...state,
      [requestId]: {
        ...request,
        isPending: false,
        hasFailed: true,
        hasSucceeded: false,
      },
    };
  },
});

export default api;
