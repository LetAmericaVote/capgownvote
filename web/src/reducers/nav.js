import createReducer from './createReducer';
import { TOGGLE_NAV_MENU } from '../actions';

const nav = createReducer('nav', {
  [TOGGLE_NAV_MENU]: (state, action) => {
    const isOpen = ! state.isOpen;

    document.getElementById('root').style.position = isOpen ? 'fixed' : 'relative';

    return {
      ...state,
      isOpen,
    };
  },
});

export default nav;
