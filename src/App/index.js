import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Main from '../Main';
import About from '../About';
import Profile from '../Profile';
import Signin from '../Signin';
import Header from '../Header';
import Signup from '../Signup';
import ScoreBoard from '../ScoreBoard';
import LineChartStat from '../LineChartStat';

export default class App extends Component {

  render() {
    const { user } = this.props;

    return (
      <div>
      <Header user={user} />

      <div className="main">
        <Switch>
          <Route exact path='/' component={() => {
            return <Main user={user} />
          }} />
          <Route exact path='/about' component={About} />
          <Route exact path='/profile' component={() => {
            return <Profile user={user} />
          }} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/scoreboard' component={ScoreBoard} />
          <Route exact path='/linechart' component={LineChartStat} />
        </Switch>
      </div>
      </div>
    );
  }
}

