import createReducer from './createReducer';
import { SET_IS_SUBSCRIBED } from '../actions';

const subscribe = createReducer('subscribe', {
  [SET_IS_SUBSCRIBED]: (state, action) => ({
    isSubscribed: action.value,
  }),
});

export default subscribe;
