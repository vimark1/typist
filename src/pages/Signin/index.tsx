import React from 'react';
import ReactGA from 'react-ga';
import cx from 'classnames';
import firebase from 'firebase/app';

import GoogleButton from 'react-google-button';
import { signinWithGoogle } from '../../lib/google_signin';
import FormItem from '../../components/FormItem';
import bind from '../../utils/bind';

type SigninState = {
  email: string;
  password: string;
  loading: boolean;
  error: any;
};

type SigninProps = {
  history: {
    push: (path: string) => any
  }
};

class Signin extends React.Component<SigninProps, SigninState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      error: {},
    };
    bind(this, ['setEmail', 'setPassword', 'signin', 'signinWithGoogle']);
  }

  componentDidMount() {
    ReactGA.pageview('/signin');
  }

  onSubmit(event) {
    event.preventDefault();
  }

  onSuccess() {
    this.setState({ loading: false });
    this.props.history.push('/');
  }

  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  setPassword(event) {
    this.setState({ password: event.target.value })
  }

  signinWithGoogle() {
    signinWithGoogle((isLoading) => {
      this.setState({ ...this.state, loading: isLoading });
    }, (error) => {
      this.setState({ loading: false, error })
    }, this.onSuccess.bind(this))
  }

  async signin() {
    const { email, password } = this.state;
    if (!email) return;
    if (!password) return;
    this.setState({ loading: true, error: {} });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.onSuccess();
    } catch(error) {
      console.log('error', error);
      this.setState({ error, loading: false });
    }
  }

  render() {
    const { loading, error } = this.state;
    const buttonText = loading ? 'Please wait...' : 'Log In';
    return (
      <div className="email-signin">
        <form onSubmit={this.onSubmit}>
          <FormItem type="email" placeholder="Email" autoFocus handler={this.setEmail} />
          <FormItem type="password" placeholder="Password" handler={this.setPassword} />
          <FormItem type="button" placeholder={buttonText} handler={this.signin} />
        </form>
        <p>OR</p>
        <div>
          <GoogleButton style={{ margin: '0 auto' }} onClick={this.signinWithGoogle} />
        </div>
        <div className={cx('u-form-group error')}>
          {error.message}
        </div>
      </div>
    );
  }
}

export default Signin;
