import { all } from 'redux-saga/effects';
import * as scoreSagas from './score';
import * as scoreboardSagas from './scoreboard';
import * as userPreferencesSagas from './userPreferences';

export default function* rootSaga() {
  yield all([
    scoreSagas.watchScoreSave(),
    scoreboardSagas.watchScoreboardFetch(),
    scoreboardSagas.watchScoreboardUpdate(),
    userPreferencesSagas.watchUserPreferencesFetch(),
    userPreferencesSagas.watchUserPreferencesUpdate(),
  ]);
}
