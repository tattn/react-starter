import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import item from './item';

const rootReducer = combineReducers({
  // app,
  item,

	routing: routerReducer
});

export default rootReducer;
