import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Main from '../Main';
import About from '../About';
import Profile from '../Profile';
import Signin from '../Signin';
import Header from '../Header';
import Signup from '../Signup';
import ScoreBoard from '../ScoreBoard';
import Pref from '../Preferences';


export default class App extends Component {

  constructor(props){
    super(props);
    const { user } = this.props
    this.state = {
      pref: {
        words: 5
      }
    }
    firebase.database().ref('user-pref').child(user.uid).on('value', (snap) => {
      this.setState({
        pref: snap.val()
      })
      console.log("New Data :",snap.val());
    })
    
  }

  fetchPref = async (user) => {
    if (user) {
      const data = await firebase.database().ref('user-pref').child(user.uid).once('value')
      return data.val()
    } else {
      return null;
    }
  }

  async componentWillMount() {
    const { user } = this.props;
    const pref = await this.fetchPref(user);
    this.setState({
      pref: pref ? pref : { words: 5 }
    })
  }

  render() {
    const { user } = this.props;
    return (
      <div>
      <Header user={user} />

      <div className="main">
        <Switch>
          <Route exact path='/' component={() => {
            return <Main user={user} pref={this.state.pref}/>
          }} />
          <Route exact path='/about' component={About} />
          <Route exact path='/profile' component={() => {
            return <Profile user={user} />
          }} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/scoreboard' component={ScoreBoard} />
          < Route exact path = '/preferences' component = {() => <Pref pref={this.state.pref} user={user}/> }/ >
        </Switch>
      </div>
      </div>
    );
  }
}

