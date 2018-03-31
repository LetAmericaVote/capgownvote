import createReducer from './createReducer';
import {
  SET_SCHOOL_INPUT_VALUE, PUSH_SCHOOL_DATA,
  SET_SCHOOL_SUGGESTIONS, PUSH_MANY_SCHOOL_DATA,
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
  [PUSH_MANY_SCHOOL_DATA]: (state, action) => {
    return {
      ...state,
      items: {
        ...state.items,
        ...action.schools.reduce((acc, school) => {
          acc[school.id] = school;

          return acc;
        }, {}),
      },
    };
  },
});

export default school;
