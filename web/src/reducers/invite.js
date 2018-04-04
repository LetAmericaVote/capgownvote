import createReducer from './createReducer';
import { SET_REQUIRES_INVITE, SET_ACKNOWLEDGED_INVITE } from '../actions';

const invite = createReducer('invite', {
  [SET_REQUIRES_INVITE]: (state, action) => ({
    ...state,
    requiresInvite: action.requiresInvite,
  }),
  [SET_ACKNOWLEDGED_INVITE]: (state, action) => ({
    ...state,
    acknowledgedInvite: action.acknowledgedInvite,
  })
});

export default invite;
