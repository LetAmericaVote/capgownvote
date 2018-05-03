import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import { css, injectGlobal } from 'styled-components';
import ReactGA from 'react-ga';

import Home from './routes/Home';
import Register from './routes/Register';
import Toolkit from './routes/Toolkit';
import Auth from './routes/Auth';
import Leaderboard from './routes/Leaderboard';
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
      <div>
        <Route path="/"><Home /></Route>
        <Route path="/register"><Register/></Route>
        <Route path="/about"><Toolkit /></Route>
        <Route path="/toolkit"><Toolkit /></Route>
        <Route path="/auth"><Auth /></Route>
        <Route path="/leaderboard"><Leaderboard /></Route>
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
