const AUTH_ID_KEY = 'AUTH_ID_KEY';
const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';

export function writeAuthId(id) {
  if (! id) {
    return;
  }

  localStorage.setItem(AUTH_ID_KEY, id);
}

export function writeAuthToken(token) {
  if (! token) {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function wipeAuthCredentials() {
  localStorage.removeItem(AUTH_ID_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function readAuthId() {
  const value = localStorage.getItem(AUTH_ID_KEY);

  return value;
}

export function readAuthToken() {
  const value = localStorage.getItem(AUTH_TOKEN_KEY);
  if (value === 'null') {
    return null;
  }

  return value;
}
