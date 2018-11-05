import cx from 'classnames';
import React, { Component } from 'react';
import ReactGA from 'react-ga'
import { Col, Row } from 'react-grid-system';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import Avatar from '../../components/Avatar';
import TotalWords from '../../components/TotalWords';

import { User } from 'firebase';

import { userPreferencesUpdateRequestAction } from '../../actions/userPreferences';

interface ProfileProps {
  user: User;
  preferences: any;
  updateUserPreferences: (userUid: string, options: { totalWords: number }) => any;
}

interface ProfileState {
  success: string;
  displayName: string;
  totalWords: number;
}

class Profile extends Component<ProfileProps, ProfileState> {
  constructor(props) {
    super(props);

    const { user } = props;
    const { preferences } = props;
    this.state = {
      success: '',
      displayName: user.displayName,
      totalWords: preferences.totalWords || 5,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    ReactGA.pageview('/profile');
  }

  componentDidUpdate(prevProps) {
    const { preferences } = this.props;

    if (prevProps.preferences.totalWords !== preferences.totalWords) {
      this.setState({ totalWords: preferences.totalWords });
    }
  }

  async doUpdateProfile(event) {
    event.preventDefault();
    const { user } = this.props;
    const { displayName } = this.state;
    await user.updateProfile({ displayName, photoURL: null });
    this.setState({
      success: 'Profile updated'
    });
  }

  async doUpdatePreferences(event) {
    event.preventDefault();
    const { user, updateUserPreferences } = this.props;
    const { totalWords } = this.state;
    updateUserPreferences(user.uid, { totalWords });
    this.setState({
      success: 'Preferences updated',
      totalWords,
    });
  }

  increment() {
    const { totalWords } = this.state;
    this.setState({
      totalWords: totalWords + 1,
    });
  }

  decrement() {
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
      <>
        {this.state.success && (
          <Row>
            <Col md={12}>
              <p style={{ padding: '10px', color: 'white', background: '#4BB543' }}>{this.state.success}</p>
            </Col>
          </Row>
        )}
        {user.uid && (
          <Row>
            <Col md={4}>
              <Avatar user={user} size="230" round={false} />
              <h3>{user.displayName}</h3>
              <p>{user.email}</p>
              <p>Joined <TimeAgo date={user.metadata.creationTime} /></p>
            </Col>
            <Col md={8}>
              <h2>Profile</h2>
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

              <h2>Preferences</h2>
              <TotalWords
                size={this.state.totalWords}
                increment={this.increment}
                decrement={this.decrement}
              />
              <button onClick={this.doUpdatePreferences.bind(this)}>Update preferences</button>
            </Col>
          </Row>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  preferences: state.userPreferences.preferences,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserPreferences: (uid, preferences) =>
    dispatch(userPreferencesUpdateRequestAction({ uid, preferences})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
