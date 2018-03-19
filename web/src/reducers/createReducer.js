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
    stateCode: null,
    invitedBy: {
      firstName: null,
      email: null,
    },
    isComplete: false,
  },
  nav: {
    isOpen: false,
  },
  notification: {
    error: null,
  },
  registration: {
    isRegistered: {
      value: false,
      isConfirmed: false,
    },
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
    active: null,
    backLock: false,
    stepHistory: [],
    isFading: false,
  },
  subscribe: {
    isSubscribed: false,
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
