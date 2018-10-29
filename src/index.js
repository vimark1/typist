import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import 'firebase/auth';
import 'firebase/database';

import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import firebaseCred from './firebase-cred.json';
import configureStore from './store/configureStore';
import ga from './ga-cred.json';

const config = firebaseCred;
const store = configureStore();

ReactGA.initialize(ga, {debug: false});
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(async (user) => {
  // default to totalWords = 5
  let userPrefs = { totalWords: 5 };
  
  // fetch user preferences
  const userPrefsRef = firebase.database().ref(`user-prefs`).child(user.uid);
  await userPrefsRef.once('value', snapshot => {
    userPrefs = snapshot.val();
  }).catch((err) => console.error(err));
  
  // update user.preferences based off of preferences stored in firebase
  user.preferences = userPrefs;
  
  ReactDOM.render((
    <BrowserRouter>
      <Provider store={store}>
        <App user={user || {}} />
      </Provider>
    </BrowserRouter>
    ),
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
