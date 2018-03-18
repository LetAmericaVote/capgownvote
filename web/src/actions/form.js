export const SET_FORM_VALUE = 'SET_FORM_VALUE';
export function setFormValue(key, value) {
  return { type: SET_FORM_VALUE, key, value };
}
