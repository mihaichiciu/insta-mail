import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

//asta este de fapt state-ul nostru. combinatie de state din reduceri
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys: surveysReducer,
});
