import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import { css, injectGlobal } from 'styled-components';

import Home from './routes/Home';
import Register from './routes/Register';
import About from './routes/About';
import Auth from './routes/Auth';
import Router from './routing/Router';
import Route from './routing/Route';

import reducers from './reducers';
import step from './middleware/step';
import schools from './middleware/schools';
import validation from './middleware/validation';

import { readAuth } from './authStorage';
import { setAuthId, setAuthToken, getUserData } from './actions';

import './fonts';

const middlewares = [thunk, validation, schools, step];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

const { id, token, isExpired } = readAuth();

if (! isExpired) {
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

const Root = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/"><Home /></Route>
        <Route path="/register"><Register/></Route>
        <Route path="/about"><About /></Route>
        <Route path="/auth"><Auth /></Route>
      </div>
    </Router>
  </Provider>
);

injectGlobal(css`
  * {
    all: unset;
    box-sizing: border-box;
    -webkit-text-fill-color: initial;
  }

  title, script, style {
    display: none !important;
  }

  html, body, #root {
    width: 100%;
    font-size: 24px;
    display: block;
  }
`);

ReactDOM.render((
  <Root />
), document.getElementById('root'));
