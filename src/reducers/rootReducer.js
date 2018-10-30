import {combineReducers} from 'redux';
import userPreferencesReducer from './userPreferences';

const sampleReducer = (state = null, action) => state;
const rootReducer = combineReducers({
  state: sampleReducer,
  userPreferences: userPreferencesReducer,
});

export default rootReducer;