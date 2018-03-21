import createReducer from './createReducer';
import { TOGGLE_NAV_MENU } from '../actions';

const nav = createReducer('nav', {
  [TOGGLE_NAV_MENU]: (state, action) => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const isOpen = ! state.isOpen && isMobile;

    document.getElementById('root').style.position = isOpen ? 'fixed' : 'relative';

    return {
      ...state,
      isOpen,
    };
  },
});

export default nav;
