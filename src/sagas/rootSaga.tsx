import { all } from 'redux-saga/effects';
import * as scoreboardSagas from './scoreboard';
import * as userPreferencesSagas from './userPreferences';

export default function* rootSaga() {
  yield all([
    scoreboardSagas.watchScoreboardFetch(),
    userPreferencesSagas.watchUserPreferencesFetch(),
    userPreferencesSagas.watchUserPreferencesUpdate(),
  ]);
}
