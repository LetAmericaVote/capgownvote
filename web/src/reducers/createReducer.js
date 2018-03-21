const initialState = {
  api: {},
  auth: {
    id: null,
    token: null,
    isPublicComputer: false,
    expiration: null,
  },
  birthday: {
    month: null,
    year: null,
    date: null,
    formatted: null,
  },
  form: {},
  invite: {
    requiresInvite: false,
  },
  nav: {
    isOpen: false,
  },
  notification: {
    error: null,
  },
  registration: {
    standardFields: [],
    stateFields: {},
  },
  routing: {
    pathName: window.location.pathname || '/',
  },
  school: {
    inputValue: null,
    items: {},
    suggestions: [],
  },
  step: {
    order: [],
    current: null,
    fade: {
      to: null,
      timeoutId: null,
      startTime: null,
    },
  },
  user: {},
  validation: {},
};

const createReducer = (key, handlers) => {
  return (state = initialState[key], action) => {
    const handler = handlers[action.type];

    if (handler) {
      return handler(state, action);
    }

    return state;
  };
};

export default createReducer;
