import { getFromApi } from './api';

export const SET_SCHOOL_INPUT_VALUE = 'SET_SCHOOL_INPUT_VALUE';
export function setSchoolInputValue(value) {
  return { type: SET_SCHOOL_INPUT_VALUE, value };
}

export const PUSH_SCHOOL_DATA = 'PUSH_SCHOOL_DATA';
export function pushSchoolData(school) {
  return { type: PUSH_SCHOOL_DATA, school };
}

export const PUSH_MANY_SCHOOL_DATA = 'PUSH_MANY_SCHOOL_DATA';
export function pushManySchoolData(schools) {
  return { type: PUSH_MANY_SCHOOL_DATA, schools };
}

export const GET_SCHOOL_DATA = 'GET_SCHOOL_DATA';
export function getSchoolData(schoolId) {
  return (dispatch, getState) => {
    const requestId = `${GET_SCHOOL_DATA}_${schoolId}`;

    dispatch(getFromApi(requestId, `/v1/schools/${schoolId}`))
      .then(res => {
        if (res && res.data) {
          dispatch(pushSchoolData(res.data));
        }
      });
  };
}

export const GET_SCHOOL_STATS = 'GET_SCHOOL_STATS';
export function getSchoolStats() {
  return (dispatch, getState) => {
    const requestId = GET_SCHOOL_STATS;

    dispatch(getFromApi(requestId, '/v1/schools?sortByPoints=true'))
      .then(res => {
        if (res && res.data) {
          dispatch(pushManySchoolData(res.data));
        }
      });
  };
}

export const SET_SCHOOL_SUGGESTIONS = 'SET_SCHOOL_SUGGESTIONS';
export function setSchoolSuggestions(suggestions) {
  return { type: SET_SCHOOL_SUGGESTIONS, suggestions };
}
