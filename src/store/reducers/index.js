import { combineReducers } from 'redux'
import burgerBuilder from './burgerBuilder';
import purchase from './purchase';
import order from './order';

export default combineReducers({
  burgerBuilder,
  purchase,
  order
});