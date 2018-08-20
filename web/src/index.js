import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import { css, injectGlobal } from 'styled-components';
import ReactGA from 'react-ga';

import Router from './routing/Router';
import Route from './routing/Route';

import reducers from './reducers';
import step from './middleware/step';
import schools from './middleware/schools';
import validation from './middleware/validation';

import init from './init';

import './fonts';

const { REACT_APP_GA_TRACKING_ID, NODE_ENV } = process.env;

const middlewares = [thunk, validation, schools, step];

if (NODE_ENV === `development`) {
  middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

init(store);

ReactGA.initialize(REACT_APP_GA_TRACKING_ID, {
  debug: NODE_ENV === `development`,
});

const Root = () => (
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route path="/" importComponent={() => import('./routes/Home')} />
        <Route path="/register" importComponent={() => import('./routes/Register')} />
        <Route path="/faq" importComponent={() => import('./routes/Faq')} />
        <Route path="/activist" importComponent={() => import('./routes/Activist')} />
        <Route path="/ambassador" importComponent={() => import('./routes/Ambassador')} />
        <Route path="/auth" importComponent={() => import('./routes/Auth')} />
        <Route path="/leaderboard" importComponent={() => import('./routes/Leaderboard')} />
      </React.Fragment>
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
