import React from 'react';
import cx from 'classnames';
import firebase from 'firebase/app';
import 'firebase/auth';

import { GoogleButton } from 'react-google-button';
import { signinWithGoogle } from '../lib/google_signin';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
      loading: false,
      error: {},
    };
  }

  signupEnter(e) {
    if (e.keyCode === 13) {
      this.signup()
    }

  }

  async signup() {
    const { email, password, displayName } = this.state;
    if (!email) return;
    if (!password) return;
    if (!displayName) {
      this.setState({ displayName: email })
    }
    this.setState({ loading: true, error: {} });

    try {
      // create user
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // set display name
      await user.updateProfile({
        displayName: displayName,
        photoURL: null
      });

    } catch (error) {
      console.log('error', error);
      this.setState({ error, loading: false });
      return;
    }

    this.setState({ loading: false });
    this.onSuccess();
  }

  signupWithGoogle() {
    signinWithGoogle((isLoading) => {
      this.setState({ ...this.state, loading: isLoading });
    }, (error) => {
      this.setState({ loading: false, error })
    }, this.onSuccess.bind(this))
  }

  onSuccess() {
    this.setState({ loading: false });
    this.props.history.push('/');
  }

  render() {
    const { loading, error } = this.state;

    return (
      <div className={cx('email-signup')}>
        <div className={cx('u-form-group')}>
          <input
            type="displayName"
            placeholder="Display Name (optional)"
            autoFocus
            onChange={event => this.setState({ displayName: event.target.value })}
          />
        </div>
        <div className={cx('u-form-group')}>
          <input
            type="email"
            placeholder="Email"
            onChange={event => this.setState({ email: event.target.value })}
          />
        </div>
        <div className={cx('u-form-group')}>
          <input
            type="password"
            placeholder="Password"
            onChange={event => this.setState({ password: event.target.value })}
            onKeyDown={this.signupEnter.bind(this)}
          />
        </div>
        <div className={cx('u-form-group')}>
          <button onClick={() => this.signup()}>
            {loading ? 'Please wait...' : 'Sign up'}
          </button>
        </div>
        <p>OR</p>
        <div>
          <GoogleButton style={{ margin: '0 auto' }} onClick={() => this.signupWithGoogle()} />
        </div>
        <div className={cx('u-form-group error')}>
          {error.message}
        </div>
      </div>
    );
  }
}

export default Signup;
