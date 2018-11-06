import { combineReducers } from 'redux';
import scoreboardReducer from './scoreboard';
import userPreferencesReducer from './userPreferences';

const rootReducer = combineReducers({
  scoreboard: scoreboardReducer,
  userPreferences: userPreferencesReducer,
});

export default rootReducer;
