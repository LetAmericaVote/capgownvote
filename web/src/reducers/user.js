import createReducer from './createReducer';
import { STORE_USER_DATA } from '../actions';

const user = createReducer('user', {
  [STORE_USER_DATA]: (state, action) => {
    const { id } = action.user;
    if (! id) {
      return state;
    }

    const existingUser = (state[id] || {});

    return {
      ...state,
      [id]: {
        ...existingUser,
        ...action.user,
      },
    };
  },
});

export default user;
