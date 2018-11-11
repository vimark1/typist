import { combineReducers } from 'redux';
import scoreReducer from './score';
import scoreboardReducer from './scoreboard';
import sessionsCompletedReducer from './sessionsCompleted';
import userPreferencesReducer from './userPreferences';

const rootReducer = combineReducers({
  score: scoreReducer,
  scoreboard: scoreboardReducer,
  sessionsCompleted: sessionsCompletedReducer,
  userPreferences: userPreferencesReducer,
});

export default rootReducer;
