import React from 'react';
import ReactGA from 'react-ga';
import cx from 'classnames';
import firebase from 'firebase/app';

import { GoogleButton } from 'react-google-button';
import { signinWithGoogle } from '../lib/google_signin';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      error: {},
    };
  }

  componentDidMount() {
    ReactGA.pageview('/signin');
  }

  onSuccess() {
    this.setState({ loading: false });
    this.props.history.push('/');
  }

  signinWithGoogle() {
    signinWithGoogle((isLoading) => {
      this.setState({ ...this.state, loading: isLoading });
    }, (error) => {
      this.setState({ loading: false, error })
    }, this.onSuccess.bind(this))
  }

  signin() {
    const { email, password } = this.state;
    if (!email) return;
    if (!password) return;
    this.setState({ loading: true, error: {} });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        this.onSuccess();
      })
      .catch((error) => {
        console.log('error', error);
        this.setState({ error, loading: false });
      });
  }

  render() {
    const { loading, error } = this.state;

    return (
      <div className={cx('email-signin')}>
        <div className={cx('u-form-group')}>
          <input
            type="email"
            placeholder="Email"
            autoFocus
            onChange={event => this.setState({ email: event.target.value })}
          />
        </div>
        <div className={cx('u-form-group')}>
          <input
            type="password"
            placeholder="Password"
            onChange={event => this.setState({ password: event.target.value })}
          />
        </div>
        <div className={cx('u-form-group')}>
          <button onClick={() => this.signin()}>
            {loading ? 'Please wait...' : 'Sign In'}
          </button>
        </div>
        <p>OR</p>
        <div>
          <GoogleButton style={{ margin: '0 auto' }} onClick={() => this.signinWithGoogle()} />
        </div>
        <div className={cx('u-form-group error')}>
          {error.message}
        </div>
      </div>
    );
  }
}

export default Signin;
