import createReducer from './createReducer';
import { months } from '../helpers';
import {
  SET_BIRTHDAY_DATE, SET_BIRTHDAY_YEAR, SET_BIRTHDAY_MONTH,
} from '../actions';

const calculateFormattedBirthday = (state) => {
  if (! state.month || ! state.date || ! state.year) {
    return state;
  }

  const monthIndex = months.indexOf(state.month) + 1;
  const month = (monthIndex.toString().length > 1 ? '' : '0') + monthIndex;
  const date = (state.date.toString().length > 1 ? '' : '0') + state.date;

  return {
    ...state,
    formatted: `${month}-${date}-${state.year}`
  };
};

const birthday = createReducer('birthday', {
  [SET_BIRTHDAY_DATE]: (state, action) =>
    calculateFormattedBirthday({
      ...state,
      date: action.date,
    }),
  [SET_BIRTHDAY_YEAR]: (state, action) =>
    calculateFormattedBirthday({
      ...state,
      year: action.year,
    }),
  [SET_BIRTHDAY_MONTH]: (state, action) =>
    calculateFormattedBirthday({
      ...state,
      month: action.month,
    }),
});

export default birthday;
