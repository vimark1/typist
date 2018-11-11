import firebase from 'firebase/app';
import { call, put, takeLatest } from 'redux-saga/effects';

import { User } from 'firebase';

import * as actionTypes from '../actions/actionTypes';

const fetchSessionsCompleted = async (userId: string) => {
  const sessionsCompletedRef = firebase
    .database()
    .ref('user-score')
    .child(userId);

  const snapshot = await sessionsCompletedRef.once('value');
  const data = snapshot.val();
  const dates = Object.keys(data);
  const sessionsCompleted = dates.reduce(
    (totalSessions, date) => totalSessions + Object.keys(data[date]).length,
    0
  );
  return sessionsCompleted;
}

function* executeFetchSessionsCompleted(action) {
  const { userId } = action.payload;
  try {
    const sessionsCompleted = yield call(fetchSessionsCompleted, userId);
    yield put({ type: actionTypes.SESSIONS_COMPLETED_FETCH_SUCCESS, payload: { sessionsCompleted } });
  } catch (error) {
    yield put({ type: actionTypes.SESSIONS_COMPLETED_FETCH_FAILURE, error });
  }
}

export function* watchFetchSessionsCompleted() {
  yield takeLatest(actionTypes.SESSIONS_COMPLETED_FETCH_REQUEST, executeFetchSessionsCompleted);
}

