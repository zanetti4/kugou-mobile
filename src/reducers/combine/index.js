import {combineReducers} from 'redux';
import play from './play';
import others from './others';

export default combineReducers({
  play,
  others
});