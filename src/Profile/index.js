import cx from 'classnames';
import React, { Component } from 'react';
import ReactGA from 'react-ga'
import Avatar from '../Avatar';
import TimeAgo from 'react-timeago';
import TotalWords from '../TotalWords';
import firebase from 'firebase/app';

export default class Profile extends Component {

  constructor(props) {
    super(props);

    const { user } = props || {};
    this.state = {
      success: '',
      displayName: user.displayName,
      totalWords: user.totalWords || 5,
    };
  }

  componentDidMount() {
    ReactGA.pageview('/profile');
  }

  async doUpdateProfile(event) {
    event.preventDefault();
    const { user } = this.props;
    const { displayName } = this.state;
    await user.updateProfile({ displayName });
    this.setState({
      success: 'Profile updated'
    });
  }

  async doUpdatePreferences(event) {
    event.preventDefault();
    const { user } = this.props;
    const { totalWords } = this.state;
    await firebase
      .database()
      .ref('user-prefs')
      .child(user.uid)
      .set({ totalWords })
      .catch((error) => console.error(error));
    this.setState({
      success: 'Preferences updated'
    });
  }

  increment = () => {
    const { totalWords } = this.state;
    this.setState({
      totalWords: totalWords + 1,
    });
  }

  decrement = () => {
    const { totalWords } = this.state;

    if (totalWords > 1) {
      this.setState({
        totalWords: totalWords - 1,
      });
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
       {this.state.success && (
         <p style={{ color: 'white', background: 'green' }}>{this.state.success}</p>
       )}
       {user.uid && (
         <div>
           <Avatar user={user} size="230" round={false} />
           <h3>{user.displayName}</h3>
           <p>{user.email}</p>
           <p>
             Joined <TimeAgo date={user.metadata.creationTime} />
           </p>

           <form onSubmit={this.doUpdateProfile.bind(this)}>

            <div className={cx('u-form-group')}>
              <input
                type="displayName"
                value={this.state.displayName}
                placeholder="Display Name (optional)"
                onChange={event => this.setState({ displayName: event.target.value })}
              />
            </div>
            <button type="submit">Update profile</button>
           </form>

            <h4>Preferences</h4>
            <TotalWords
              size={this.state.totalWords}
              increment={this.increment}
              decrement={this.decrement}
            />
            <button onClick={this.doUpdatePreferences.bind(this)}>Update preferences</button>
         </div>
       )}
      </div>
    );
  }
}
