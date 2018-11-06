import * as actions from '../actions/scoreboard';

const defaultState = {
  data: [],
  loading: false,
  error: undefined,
};

const scoreboardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SCOREBOARD_FETCH_REQUEST:
      return { ...state, loading: true, error: undefined };
    case actions.SCOREBOARD_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.scoreboard || defaultState.data,
      };
    case actions.SCOREBOARD_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default scoreboardReducer;
