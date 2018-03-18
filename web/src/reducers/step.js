import createReducer from './createReducer';
import {
  SET_ACTIVE_STEP, SET_IS_FADING,
  GO_BACK_TO_PREVIOUS_STEP, DISABLE_STEP_BACK_LOCK,
} from '../actions';

const step = createReducer('step', {
  [SET_ACTIVE_STEP]: (state, action) => ({
    ...state,
    active: action.stepName,
    stepHistory: [
      state.active,
      ...state.stepHistory,
    ],
  }),
  [GO_BACK_TO_PREVIOUS_STEP]: (state, action) => ({
    ...state,
    active: state.stepHistory[0],
    backLock: true,
    stepHistory: state.stepHistory.slice(1),
  }),
  [SET_IS_FADING]: (state, action) => ({
    ...state,
    isFading: action.isFading,
  }),
  [DISABLE_STEP_BACK_LOCK]: (state, action) => ({
    ...state,
    backLock: false,
  }),
});

export default step;
