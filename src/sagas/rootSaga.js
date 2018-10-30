import { all } from 'redux-saga/effects';
import * as userPreferencesSagas from './userPreferences';

export default function* rootSaga() {
  yield all([
    userPreferencesSagas.watchUserPreferencesFetch(),
    userPreferencesSagas.watchUserPreferencesUpdate(),
  ]);
}