import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import firebaseCred from './firebase-cred.json';

const config = firebaseCred;

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(<App user={user || {}} />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
