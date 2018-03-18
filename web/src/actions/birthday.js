export const SET_BIRTHDAY_MONTH = 'SET_BIRTHDAY_MONTH';
export function setBirthdayMonth(month) {
  return { type: SET_BIRTHDAY_MONTH, month };
}

export const SET_BIRTHDAY_YEAR = 'SET_BIRTHDAY_YEAR';
export function setBirthdayYear(year) {
  return { type: SET_BIRTHDAY_YEAR, year };
}

export const SET_BIRTHDAY_DATE = 'SET_BIRTHDAY_DATE';
export function setBirthdayDate(date) {
  return { type: SET_BIRTHDAY_DATE, date };
}
