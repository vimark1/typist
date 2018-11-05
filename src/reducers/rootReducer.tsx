import { combineReducers } from 'redux';
import userPreferencesReducer from './userPreferences';

const rootReducer = combineReducers({
  userPreferences: userPreferencesReducer,
});

export default rootReducer;
