import { combineReducers } from 'redux';
import api from './api';
import auth from './auth';
import birthday from './birthday';
import form from './form';
import invite from './invite';
import nav from './nav';
import notification from './notification';
import registration from './registration';
import routing from './routing';
import school from './school';
import step from './step';
import subscribe from './subscribe';
import user from './user';
import validation from './validation';

const reducers = combineReducers({
  api, auth, birthday, form, invite, nav,
  notification, registration, routing,
  school, step, subscribe, user, validation,
});

export default reducers;
