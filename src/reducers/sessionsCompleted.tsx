import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  sessionsCompleted: 0,
  loading: false,
  error: undefined,
};

const sessionsCompletedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SESSIONS_COMPLETED_FETCH_REQUEST:
      return { ...state, loading: true, error: undefined };
    case actionTypes.SESSIONS_COMPLETED_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionsCompleted: action.payload.sessionsCompleted || defaultState.sessionsCompleted,
      };
    case actionTypes.SESSIONS_COMPLETED_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default sessionsCompletedReducer;
