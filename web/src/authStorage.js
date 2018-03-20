const AUTH_ID_KEY = 'AUTH_ID_KEY';
const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
const AUTH_TOKEN_EXPIRATION_KEY = 'AUTH_TOKEN_EXPIRATION_KEY';

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

export function writeAuthTokenExpiration(expiration) {
  if (! expiration) {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_EXPIRATION_KEY, expiration);
}

export function wipeAuthCredentials() {
  localStorage.removeItem(AUTH_ID_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_TOKEN_EXPIRATION_KEY);
}

export function readAuthId() {
  const value = localStorage.getItem(AUTH_ID_KEY);

  return value;
}

export function readAuthToken() {
  const value = localStorage.getItem(AUTH_TOKEN_KEY);

  return value;
}

export function readAuthTokenExpiration() {
  const value = parseInt(localStorage.getItem(AUTH_TOKEN_EXPIRATION_KEY), 10);

  return value;
}

export function readAuth() {
  return {
    id: readAuthId(),
    token: readAuthToken(),
    expiration: readAuthTokenExpiration(),
    isExpired: new Date(readAuthTokenExpiration()).getTime() < Date.now(),
  };
}
