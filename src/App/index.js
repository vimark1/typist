import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Main from '../Main';
import About from '../About';
import Profile from '../Profile';
import Signin from '../Signin';
import Header from '../Header';
import Signup from '../Signup';
import ScoreBoard from '../ScoreBoard';
import { fetchUserPreferences, updateUserPreferences } from '../lib/userPreferences';
import PreferencesContext from '../contexts/preferences';
const { Provider: PreferencesProvider, Consumer: PreferencesConsumer } = PreferencesContext;

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.updatePreferences = this.updatePreferences.bind(this)
    
    this.state = {
      preferences: {
        totalWords: 5,
      },
      updatePreferences: this.updatePreferences,
    };
  }

  async componentDidMount() {
    const preferences = await fetchUserPreferences(this.props.user.uid);
    this.setState({ preferences });
  }

  updatePreferences(preferences) {
    const { user } = this.props;
    this.setState({ preferences });
    updateUserPreferences(user.uid, preferences);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <PreferencesProvider value={this.state}>
          <Header user={user} />
          <div className="main">
            <Switch>
              <Route exact path='/' component={() => 
                <PreferencesConsumer>
                  { ({ preferences }) => <Main user={user} preferences={preferences} /> }
                </PreferencesConsumer>
              }/>
              <Route exact path='/about' component={About} />
              <Route exact path='/profile' component={() =>
                <PreferencesConsumer>
                  { (value) => <Profile user={user} preferences={value.preferences} updatePreferences={value.updatePreferences} /> }
                </PreferencesConsumer>
              }/>
              <Route exact path='/signin' component={Signin} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/scoreboard' component={ScoreBoard} />
            </Switch>
          </div>
        </PreferencesProvider>
      </div>
    );
  }
}

