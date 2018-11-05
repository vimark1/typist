// #region action constants
export const USER_PREFERENCES_FETCH_REQUEST = 'USER_PREFERENCES_FETCH_REQUEST';
export const USER_PREFERENCES_FETCH_SUCCESS = 'USER_PREFERENCES_FETCH_SUCCESS';
export const USER_PREFERENCES_FETCH_FAILURE = 'USER_PREFERENCES_FETCH_FAILURE';

export const USER_PREFERENCES_UPDATE_REQUEST = 'USER_PREFERENCES_UPDATE_REQUEST';
export const USER_PREFERENCES_UPDATE_SUCCESS = 'USER_PREFERENCES_UPDATE_SUCCESS';
export const USER_PREFERENCES_UPDATE_FAILURE = 'USER_PREFERENCES_UPDATE_FAILURE';
// #endregion

// #region action creators
const actionCreator = (type, payload) => ({ type, payload });

export const userPreferencesFetchRequestAction = payload =>
  actionCreator(USER_PREFERENCES_FETCH_REQUEST, payload);

export const userPreferencesFetchSuccessAction = payload =>
  actionCreator(USER_PREFERENCES_FETCH_SUCCESS, payload);

export const userPreferencesFetchFailureAction = payload =>
  actionCreator(USER_PREFERENCES_FETCH_FAILURE, payload);

export const userPreferencesUpdateRequestAction = payload =>
  actionCreator(USER_PREFERENCES_UPDATE_REQUEST, payload);

export const userPreferencesUpdateSuccessAction = payload =>
  actionCreator(USER_PREFERENCES_UPDATE_SUCCESS, payload);

export const userPreferencesUpdateFailureAction = payload =>
  actionCreator(USER_PREFERENCES_UPDATE_FAILURE, payload);
// #endregion
