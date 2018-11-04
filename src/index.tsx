import firebase from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from 'react-grid-system';
import { Provider } from 'react-redux';

import About from './pages/About';
import Header from './components/Header';
import Profile from './pages/Profile';
import ScoreBoard from './pages/ScoreBoard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TypingTest from './pages/TypingTest';

import 'firebase/auth';
import 'firebase/database';

import { User } from 'firebase';

import './index.scss';

import configureStore from './store/configureStore';
import firebaseCred from './firebase-cred.json';
import { userPreferencesFetchRequestAction } from './actions/userPreferences'
import ga from './ga-cred.json';

const config = firebaseCred;
const store = configureStore();

ReactGA.initialize(ga, {debug: false});
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  user = user || {} as User;
  store.dispatch(userPreferencesFetchRequestAction({ uid: user.uid }));
  ReactDOM.render((
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <Header user={user} />
          <Container className="main">
            <Switch>
              <Route exact={true} path='/' render={() => <TypingTest user={user}/>}/>
              <Route exact={true} path='/about' component={About}/>
              <Route exact={true} path='/profile' render={() => <Profile user={user}/>}/>
              <Route exact={true} path='/signin' component={Signin}/>
              <Route exact={true} path='/signup' component={Signup}/>
              <Route exact={true} path='/scoreboard' component={ScoreBoard}/>
            </Switch>
          </Container>
        </div>
      </Provider>
    </BrowserRouter>
    ),
    document.getElementById('root')
  );
});
