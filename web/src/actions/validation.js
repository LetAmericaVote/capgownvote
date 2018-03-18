export const SET_VALIDATION_ERROR = 'SET_VALIDATION_ERROR';
export function setValidationError(key, message) {
  return { type: SET_VALIDATION_ERROR, key, message };
}

export const RESOLVE_VALIDATION_ERROR = 'RESOLVE_VALIDATION_ERROR';
export function resolveValidationError(key) {
  return { type: RESOLVE_VALIDATION_ERROR, key };
}
