import {combineReducers} from 'redux';
import pageReducer from './Pagechange';
import userReducer from './userchange';
import accountReducer from './account';
import bankReducer from './bank';
import ratebtnReducter from './ratebtn';
import RatingReducer from './Rating';
import countReducer from './count';
import postbtnReducer from './postbtn';
import anonReducer from './anon';
const allReducers = combineReducers({
  page:pageReducer,
  currentuser: userReducer,
  account: accountReducer,
  bank: bankReducer,
  ratebtn:ratebtnReducter,
  postbtn: postbtnReducer,
  rating:RatingReducer,
  count:countReducer,
  anon:anonReducer
})

export default allReducers;
