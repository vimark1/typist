import firebase from 'firebase/app';
import 'firebase/database';

export const fetchUserPreferences = (uid) => {
  // default to totalWords = 5
  let userPrefs = { totalWords: 5 };
  // fetch user preferences
  const userPrefsRef = firebase.database().ref(`user-prefs`).child(uid);
  return userPrefsRef.once('value', snapshot => (snapshot.exists ? snapshot.val() : userPrefs));
};

export const updateUserPreferences = (uid, preferences) => {
  const userPrefsRef = firebase.database().ref('user-prefs').child(uid);
  return userPrefsRef.set(preferences);
};