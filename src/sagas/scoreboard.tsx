import firebase from 'firebase/app';
import { call, put, takeLatest } from 'redux-saga/effects';

import { User } from 'firebase';

import * as actionTypes from '../actions/actionTypes';

const fetchScoreboard = () => {
  const topScorersRef = firebase.database().ref('top-scorers');
  return topScorersRef.once('value').then(snapshot => snapshot.val() || []);
};

const updateScoreboard = async (user: User, score: number) => {
  const limit = 10;

  const topScores = await fetchScoreboard();
  topScores.push({
    score,
    user: { displayName: user.displayName, uid: user.uid },
  });
  topScores.sort((a, b) => {
    if (a.score === b.score) {
      return 0;
    }
    return a.score > b.score ? -1 : 1;
  });
  const newTopScores = topScores.slice(0, limit);
  const topScorersRef = firebase.database().ref('top-scorers');
  await topScorersRef.set(newTopScores);
  return newTopScores;
};

function* executeScoreboardFetch(action) {
  try {
    const scoreboard = yield call(fetchScoreboard);
    yield put({ type: actionTypes.SCOREBOARD_FETCH_SUCCESS, payload: { scoreboard } });
  } catch (error) {
    yield put({ type: actionTypes.SCOREBOARD_FETCH_FAILURE, error });
  }
}

function* executeScoreboardUpdate(action) {
  const { user, score } = action.payload;
  try {
    const scoreboard = yield call(updateScoreboard, user, score);
    yield put({ type: actionTypes.SCOREBOARD_UPDATE_SUCCESS, payload: { scoreboard } });
  } catch (error) {
    yield put({ type: actionTypes.SCOREBOARD_UPDATE_FAILURE, error });
  }
}

export function* watchScoreboardFetch() {
  yield takeLatest(actionTypes.SCOREBOARD_FETCH_REQUEST, executeScoreboardFetch);
}

export function* watchScoreboardUpdate() {
  yield takeLatest(actionTypes.SCOREBOARD_UPDATE_REQUEST, executeScoreboardUpdate);
}
