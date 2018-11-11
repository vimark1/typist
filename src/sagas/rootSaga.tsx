import { all } from 'redux-saga/effects';
import * as scoreSagas from './score';
import * as scoreboardSagas from './scoreboard';
import * as sessionsCompleted from './sessionsCompleted';
import * as userPreferencesSagas from './userPreferences';

export default function* rootSaga() {
  yield all([
    scoreSagas.watchScoreSave(),
    scoreboardSagas.watchScoreboardFetch(),
    scoreboardSagas.watchScoreboardUpdate(),
    sessionsCompleted.watchFetchSessionsCompleted(),
    userPreferencesSagas.watchUserPreferencesFetch(),
    userPreferencesSagas.watchUserPreferencesUpdate(),
  ]);
}
