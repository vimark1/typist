import firebase from 'firebase/app';
import { call, put, takeLatest } from 'redux-saga/effects';

import { User } from 'firebase';

import * as actionTypes from '../actions/actionTypes';

const saveScore = async (userId: string, score: number) => {
  // a string in the format 2018-10-26
  const sessionId = new Date().toISOString().slice(0, 10);

  // store record in Firebase
  await firebase
    .database()
    .ref('user-score')
    .child(userId)
    .child(sessionId)
    .push({
      score,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });

  return score;
};

function* executeScoreSave(action) {
  const { userId, score } = action.payload;
  try {
    const scoreboard = yield call(saveScore, userId, score);
    yield put({ type: actionTypes.SCORE_SAVE_SUCCESS, payload: { score } });
  } catch (error) {
    yield put({ type: actionTypes.SCORE_SAVE_FAILURE, error });
  }
}

export function* watchScoreSave() {
  yield takeLatest(actionTypes.SCORE_SAVE_REQUEST, executeScoreSave);
}
