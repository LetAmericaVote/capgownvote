import createReducer from './createReducer';
import {
  SET_SCHOOL_INPUT_VALUE, PUSH_SCHOOL_DATA,
  SET_SCHOOL_SUGGESTIONS,
} from '../actions';

const school = createReducer('school', {
  [SET_SCHOOL_INPUT_VALUE]: (state, action) => ({
    ...state,
    inputValue: action.value,
  }),
  [PUSH_SCHOOL_DATA]: (state, action) => ({
    ...state,
    items: {
      ...state.items,
      [action.school.id]: action.school,
    },
  }),
  [SET_SCHOOL_SUGGESTIONS]: (state, action) => ({
    ...state,
    suggestions: action.suggestions,
  }),
});

export default school;
