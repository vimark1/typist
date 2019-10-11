import firebase from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Container } from 'react-grid-system';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import About from './pages/About';
import Profile from './pages/Profile';
import ScoreBoard from './pages/ScoreBoard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TypingTest from './pages/TypingTest';

import 'firebase/auth';
import 'firebase/database';

import { User } from 'firebase';

import './index.scss';

import { userPreferencesFetchRequestAction } from './actions/userPreferences';
import firebaseCred from './firebase-cred.json';
import ga from './ga-cred.json';
import configureStore from './store/configureStore';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const config = firebaseCred;
const store = configureStore();

ReactGA.initialize(ga, { debug: false });
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  user = user || ({} as User);
  store.dispatch(userPreferencesFetchRequestAction({ uid: user.uid }));

  const App = () => (
    <BrowserRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <div>
            <Header user={user} />
            <Container className="main">
              <Switch>
                <Route exact={true} path="/" render={() => <TypingTest user={user} />} />
                <Route exact={true} path="/about" component={About} />
                <Route exact={true} path="/profile" render={() => <Profile user={user} />} />
                <Route exact={true} path="/signin" component={Signin} />
                <Route exact={true} path="/signup" component={Signup} />
                <Route exact={true} path="/scoreboard" component={ScoreBoard} />
              </Switch>
            </Container>
          </div>
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  );

  ReactDOM.render(<App />, document.getElementById('root'));
});
