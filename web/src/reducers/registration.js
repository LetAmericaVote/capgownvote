import createReducer from './createReducer';
import {
  SET_STANDARD_REGISTRATION_FIELDS,
  SET_STATE_REGISTRATION_FIELDS,
} from '../actions';

const registration = createReducer('registration', {
  [SET_STANDARD_REGISTRATION_FIELDS]: (state, action) => ({
    ...state,
    standardFields: action.fields,
  }),
  [SET_STATE_REGISTRATION_FIELDS]: (state, action) => ({
    ...state,
    stateFields: {
      ...state.stateFields,
      [action.state]: action.fields,
    },
  }),
});

export default registration;
