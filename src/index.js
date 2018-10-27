import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';



import 'firebase/auth';

import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import firebaseCred from './firebase-cred.json';
import configureStore from './store/configureStore';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const config = firebaseCred;

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render((
    <BrowserRouter>
      <Provider store={createStoreWithMiddleware(reducers)}>
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
