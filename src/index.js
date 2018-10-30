import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header';
import TypingTest from './pages/TypingTest/container';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ScoreBoard from './pages/ScoreBoard';

import 'firebase/auth';
import 'firebase/database';

import './index.css';

import firebaseCred from './firebase-cred.json';
import configureStore from './store/configureStore';
import { userPreferencesFetchRequestAction } from './actions/userPreferences'
import ga from './ga-cred.json';

const config = firebaseCred;
const store = configureStore();

ReactGA.initialize(ga, {debug: false});
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  user = user || {};
  store.dispatch(userPreferencesFetchRequestAction({ uid: user.uid }));
  ReactDOM.render((
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <Header user={user}/>
          <div className="main">
            <Switch>
              <Route exact path='/' render={() => <TypingTest user={user}/>}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/profile' render={() => <Profile user={user}/>}/>
              <Route exact path='/signin' component={Signin}/>
              <Route exact path='/signup' component={Signup}/>
              <Route exact path='/scoreboard' component={ScoreBoard}/>
            </Switch>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
    ),
    document.getElementById('root')
  );
});
