import createReducer from './createReducer';
import { SET_ROUTING_PATH_NAME } from '../actions';

const routing = createReducer('routing', {
  [SET_ROUTING_PATH_NAME]: (state, action) => ({
    ...state,
    pathName: action.pathName,
    history: [
      ...state.history,
      state.pathName,
    ],
  }),
});

export default routing;
