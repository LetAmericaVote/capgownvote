export const SET_AUTH_ID = 'SET_AUTH_ID';
export function setAuthId(id) {
  return { type: SET_AUTH_ID, id };
}

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export function setAuthToken(token) {
  return { type: SET_AUTH_TOKEN, token };
}

export const SET_IS_PUBLIC_COMPUTER = 'SET_IS_PUBLIC_COMPUTER';
export function setIsPublicComputer(isPublicComputer) {
  return { type: SET_IS_PUBLIC_COMPUTER, isPublicComputer };
}

export const LOGIN = 'LOGIN';
export function login(email, password) {
  // TODO..
}

export const LOGOUT = 'LOGOUT';
export function logout(email, password) {
  // TODO..
}
