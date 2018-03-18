import createReducer from './createReducer';
import {
  SET_STANDARD_REGISTRATION_FIELDS, SET_STATE_REGISTRATION_FIELDS,
  SET_IS_REGISTERED, SET_IS_REGISTERED_CONFIRMED,
} from '../actions';

const registration = createReducer('registration', {
  [SET_IS_REGISTERED]: (state, action) => ({
    ...state,
    isRegistered: {
      ...state.isRegistered,
      value: action.isRegistered,
    },
  }),
  [SET_IS_REGISTERED_CONFIRMED]: (state, action) => ({
    ...state,
    isRegistered: {
      ...state.isRegistered,
      isConfirmed: action.isConfirmed,
    },
  }),
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
