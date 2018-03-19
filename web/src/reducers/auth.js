import createReducer from './createReducer';
import {
  writeAuthId, writeAuthToken,
  wipeAuthCredentials, writeAuthTokenExpiration,
} from '../authStorage';
import {
  SET_AUTH_ID, SET_AUTH_TOKEN, SET_IS_PUBLIC_COMPUTER,
  LOGIN, LOGOUT, SET_AUTH_TOKEN_EXPIRATION,
} from '../actions';

const subscribe = createReducer('auth', {
  [SET_AUTH_ID]: (state, action) => {
    if (! state.isPublicComputer) {
      writeAuthId(action.id);
    }

    return {
      ...state,
      id: action.id,
    };
  },
  [SET_AUTH_TOKEN]: (state, action) => {
    if (! state.isPublicComputer) {
      writeAuthToken(action.token);
    }

    return {
      ...state,
      token: action.token,
    };
  },
  [SET_AUTH_TOKEN_EXPIRATION]: (state, action) => {
    if (! state.isPublicComputer) {
      writeAuthTokenExpiration(action.expiration);
    }

    return {
      ...state,
      expiration: action.expiration,
    };
  },
  [SET_IS_PUBLIC_COMPUTER]: (state, action) => {
    if (action.isPublicComputer) {
      wipeAuthCredentials();
    } else {
      writeAuthId(state.id);
      writeAuthToken(state.token);
      writeAuthTokenExpiration(state.expiration);
    }

    return {
      ...state,
      isPublicComputer: action.isPublicComputer,
    };
  },
  [LOGIN]: (state, action) => state,
  [LOGOUT]: (state, action) => state,
});

export default subscribe;
