import { combineReducers } from 'redux';
import authReducer from './authReducer';

//asta este de fapt state-ul nostru. combinatie de state din reduceri
export default combineReducers({
  auth: authReducer,
});
