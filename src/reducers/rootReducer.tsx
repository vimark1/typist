import { combineReducers } from 'redux';
import scoreReducer from './score';
import scoreboardReducer from './scoreboard';
import userPreferencesReducer from './userPreferences';

const rootReducer = combineReducers({
  score: scoreReducer,
  scoreboard: scoreboardReducer,
  userPreferences: userPreferencesReducer,
});

export default rootReducer;
