import { call, put, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions/userPreferences';
import { fetchUserPreferences, updateUserPreferences } from '../lib/userPreferences';

function* executeUserPreferencesFetch(action) {
  try {
    const { uid } = action.payload;
    if (uid) {
      const preferences = yield call(fetchUserPreferences, uid);
      yield put(actions.userPreferencesFetchSuccessAction({ preferences }));
    } else {
      throw new Error('UID required in action payload.');
    }
  } catch (error) {
    yield put(actions.userPreferencesFetchFailureAction({ error }));
  }
}

function* executeUserPreferencesUpdate(action) {
  try {
    const { uid, preferences } = action.payload;
    if (uid && preferences) {
      // Should validate preferences here
      yield call(updateUserPreferences, uid, preferences);
      yield put(actions.userPreferencesUpdateSuccessAction({ preferences }));
    } else {
      throw new Error('Action payload missing UID or preferenes');
    }
  } catch (error) {
    yield put(actions.userPreferencesUpdateFailureAction({ error }));
  }
}

export function* watchUserPreferencesFetch() {
  yield takeLatest(actions.USER_PREFERENCES_FETCH_REQUEST, executeUserPreferencesFetch);
}

export function* watchUserPreferencesUpdate() {
  yield takeLatest(actions.USER_PREFERENCES_UPDATE_REQUEST, executeUserPreferencesUpdate);
}
