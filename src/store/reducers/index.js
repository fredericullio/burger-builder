import { combineReducers } from 'redux'
import burgerBuilder from './burgerBuilder';
import purchase from './purchase';
import order from './order';
import auth from './auth';

export default combineReducers({
  burgerBuilder,
  purchase,
  order,
  auth
});