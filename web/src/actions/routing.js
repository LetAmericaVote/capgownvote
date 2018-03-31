import ReactGA from 'react-ga';

export const SET_ROUTING_PATH_NAME = 'SET_ROUTING_PATH_NAME';
export function setRoutingPathName(pathName) {
  ReactGA.pageview(pathName);

  return { type: SET_ROUTING_PATH_NAME, pathName };
}
