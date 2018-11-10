// #region action constants
export const SCOREBOARD_FETCH_REQUEST = 'SCOREBOARD_FETCH_REQUEST';
export const SCOREBOARD_FETCH_SUCCESS = 'SCOREBOARD_FETCH_SUCCESS';
export const SCOREBOARD_FETCH_FAILURE = 'SCOREBOARD_FETCH_FAILURE';

// #endregion

// #region action creators
const actionCreator = (type, payload) => ({ type, payload });

export const scoreboardFetchRequestAction = payload =>
  actionCreator(SCOREBOARD_FETCH_REQUEST, payload);

export const scoreboardFetchSuccessAction = payload =>
  actionCreator(SCOREBOARD_FETCH_SUCCESS, payload);

export const scoreboardFetchFailureAction = payload =>
  actionCreator(SCOREBOARD_FETCH_FAILURE, payload);

// #endregion
