import createReducer from './createReducer';
import {
  SET_VALIDATION_ERROR, RESOLVE_VALIDATION_ERROR,
} from '../actions';

const validation = createReducer('validation', {
  [SET_VALIDATION_ERROR]: (state, action) => ({
    ...state,
    [action.key]: action.message,
  }),
  [RESOLVE_VALIDATION_ERROR]: (state, action) => ({
    ...state,
    [action.key]: null,
  }),
});

export default validation;
