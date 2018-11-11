import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  score: null,
  loading: false,
  error: undefined,
};

const scoreReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SCORE_SAVE_REQUEST:
      return { ...state, loading: true, error: undefined };
    case actionTypes.SCORE_SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        score: action.payload.score || defaultState.score,
      };
    case actionTypes.SCORE_SAVE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default scoreReducer;
