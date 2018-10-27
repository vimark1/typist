import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import Main from '../Main';
import About from '../About';
import Profile from '../Profile';
import Signin from '../Signin';
import SigninHeader from '../SigninHeader';
import Signup from '../Signup';

export default class App extends Component {

  render() {
    const { user } = this.props;

    return (
      <div>
      <div className="header">
        <h1>
          <Link to='/'>Typist</Link>
        </h1>
        <SigninHeader user={user} />
        <br class="clear" />
      </div>
      <div className="main">
        <Switch>
          <Route exact path='/' component={() => {
            return <Main user={user} />
          }} />
          <Route exact path='/about' component={About} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </div>
      </div>
    );
  }
}

