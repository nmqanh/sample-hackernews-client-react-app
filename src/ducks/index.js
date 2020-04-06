import { combineReducers } from 'redux';
import newsReducers from './news';

const rootReducer = combineReducers({
  news: newsReducers,
});
export default rootReducer;
