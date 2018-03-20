import createReducer from './createReducer';
import { SET_REQUIRES_INVITE } from '../actions';

const invite = createReducer('invite', {
  [SET_REQUIRES_INVITE]: (state, action) => ({
    ...state,
    requiresInvite: action.requiresInvite,
  }),
});

export default invite;
