import createReducer from './createReducer';
import {
  SET_FADE_TO, SET_FADE_TIMEOUT_ID, SET_FADE_START_TIME,
  CLEAR_FADE, CHANGE_CURRENT_STEP, SET_STEP_ORDER,
} from '../actions';

const step = createReducer('step', {
  [SET_FADE_TO]: (state, action) => ({
    ...state,
    fade: {
      ...state.fade,
      to: action.to,
    },
  }),
  [SET_FADE_TIMEOUT_ID]: (state, action) => ({
    ...state,
    fade: {
      ...state.fade,
      timeoutId: action.timeoutId,
    },
  }),
  [SET_FADE_START_TIME]: (state, action) => ({
    ...state,
    fade: {
      ...state.fade,
      startTime: action.startTime,
    },
  }),
  [CLEAR_FADE]: (state, action) => ({
    ...state,
    fade: {
      to: null,
      timeoutId: null,
      startTime: null,
    },
  }),
  [CHANGE_CURRENT_STEP]: (state, action) => ({
    ...state,
    current: action.stepId,
    order: state.order.map(step => {
      if (step.id === action.stepId) {
        return {
          ...step,
          isViewed: true,
        };
      }

      return step;
    }),
  }),
  [SET_STEP_ORDER]: (state, action) => ({
    ...state,
    order: action.order,
  }),
});

export default step;
