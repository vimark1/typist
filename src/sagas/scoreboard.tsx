import firebase from 'firebase/app';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions/scoreboard';

const fetchScoreboard = () => {
  const topScorersRef = firebase.database().ref('top-scorers');
  return topScorersRef.once('value')
    .then(snapshot => snapshot.val());
};

function* executeScoreboardFetch(action) {
  try {
    const scoreboard = yield call(fetchScoreboard);
    yield put(actions.scoreboardFetchSuccessAction({ scoreboard }));
  } catch (error) {
    yield put(actions.scoreboardFetchFailureAction({ error }));
  }
}

export function* watchScoreboardFetch() {
  yield takeLatest(actions.SCOREBOARD_FETCH_REQUEST, executeScoreboardFetch);
}

