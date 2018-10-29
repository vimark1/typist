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
