import ReactGA from 'react-ga';
import { readAuth, wipeAuthCredentials } from './authStorage';
import { setAuthId, setAuthToken, getUserData } from './actions';

function getUrlParams(search) {
  const hashes = search.slice(search.indexOf('?') + 1).split('&');

  return hashes.reduce((acc, hash) => {
    const [key, val] = hash.split('=');
    acc[key] = decodeURIComponent(val);

    return acc;
  }, {});
}

function auth(store, id, token) {
  if (id) {
    store.dispatch(setAuthId(id));
  }

  if (token) {
    store.dispatch(setAuthToken(token));
  }

  if (id && token) {
    store.dispatch(getUserData(id));
  }
}

function init(store) {
  const { id: paramId, token: paramToken, redirect } = getUrlParams(window.location.search);
  const { id, token, isExpired } = readAuth();

  if (document.location.pathname === '/' && redirect) {
    document.location.assign(`${document.location.origin}/${redirect}`);
  }

  if (paramId && paramToken) {
    auth(store, paramId, paramToken);
    window.history.replaceState({}, document.title, window.location.pathname);

    ReactGA.event({
      category: 'Auth',
      action: 'Authenticated with one time login',
      nonInteraction: true,
    });
  } else if (isExpired) {
    wipeAuthCredentials();

    ReactGA.event({
      category: 'Auth',
      action: 'Client had expired credentials',
      nonInteraction: true,
    });
  } else {
    auth(store, id, token);

    ReactGA.event({
      category: 'Auth',
      action: 'Client had auth credentials',
      nonInteraction: true,
    });
  }
}

export default init;
