import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import { Provider } from 'react-redux';
import 'firebase/auth';

import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import firebaseCred from './firebase-cred.json';
import configureStore from './store/configureStore';

const config = firebaseCred;
const store = configureStore();

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(<Provider store={store}><App user={user || {}} /></Provider>, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
