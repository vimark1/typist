import * as actions from '../actions/userPreferences';

const defaultState = {
  preferences: {
    totalWords: 5,
  },
  loading: false,
  error: undefined,
};

const userPreferencesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.USER_PREFERENCES_FETCH_REQUEST:
      return { ...state, loading: true, error: undefined };
    case actions.USER_PREFERENCES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        preferences: action.payload.preferences || defaultState.preferences,
      };
    case actions.USER_PREFERENCES_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case actions.USER_PREFERENCES_UPDATE_REQUEST:
      return { ...state, loading: true, error: undefined };
    case actions.USER_PREFERENCES_UPDATE_SUCCESS:
      return { ...state, loading: false, preferences: action.payload.preferences };
    case actions.USER_PREFERENCES_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default userPreferencesReducer;
