import createReducer from './createReducer';
import { SET_FORM_VALUE } from '../actions';

const form = createReducer('form', {
  [SET_FORM_VALUE]: (state, action) => ({
    ...state,
    [action.key]: action.value,
  }),
});

export default form;
