import createReducer from './createReducer';
import {
  SET_INVITE_SCHOOL_STATE, SET_INVITE_FIRST_NAME,
  SET_INVITE_EMAIL, COMPLETED_INVITE,
} from '../actions';

const invite = createReducer('invite', {
  [SET_INVITE_SCHOOL_STATE]: (state, action) => ({
    ...state,
    stateCode: action.stateCode,
  }),
  [SET_INVITE_FIRST_NAME]: (state, action) => ({
    ...state,
    invitedBy: {
      ...state.invitedBy,
      firstName: action.firstName,
    },
  }),
  [SET_INVITE_EMAIL]: (state, action) => ({
    ...state,
    invitedBy: {
      ...state.invitedBy,
      email: action.email,
    },
  }),
  [COMPLETED_INVITE]: (state, action) => ({
    ...state,
    isComplete: action.status,
  }),
});

export default invite;
