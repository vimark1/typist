import cx from 'classnames';
import firebase from 'firebase/app';
import React from 'react';
import ReactGA from 'react-ga';

import GoogleButton from 'react-google-button';
import FormItem from '../../components/FormItem';
import { signinWithGoogle } from '../../lib/google_signin';
import bind from '../../utils/bind';

interface SignupState {
  email: string;
  password: string;
  displayName: string;
  loading: boolean;
  error: any;
}

interface SignupProps {
  history: {
    push: (path: string) => any
  }
}

class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
      loading: false,
      error: {},
    };
    bind(this, ['setDisplayName', 'setEmail', 'setPassword', 'signup', 'signupWithGoogle']);
  }

  componentDidMount() {
    ReactGA.pageview('/signup');
  }

  onSubmit(event) {
    event.preventDefault();
  }

  setDisplayName(event) {
    this.setState({ displayName: event.target.value });
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  async signup() {
    const { email, password, displayName } = this.state;

    if (!email) { return; }
    if (!password) { return; }
    if (!displayName) {
        this.setState({displayName: email})
    }
    this.setState({ loading: true, error: {} });

    try {
      // create user
      const { user } = await firebase.auth()
        .createUserWithEmailAndPassword(email, password);

      // set display name
      await user.updateProfile({
        displayName,
        photoURL: null
      });

      this.onSuccess();
    } catch(error) {
      console.log('error', error);
      this.setState({ error });
    }

    this.setState({ loading: false });
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
    const buttonText = loading ? 'Please wait...' : 'Register';

    return (
      <div className={cx('email-signup')}>
        <form method="POST" onSubmit={this.onSubmit}>
          <FormItem type="text" placeholder="Display Name (optional)" autoFocus={true} handler={this.setDisplayName} />
          <FormItem type="email" placeholder="Email" handler={this.setEmail} />
          <FormItem type="password" placeholder="Password" handler={this.setPassword} />
          <FormItem type="button" placeholder={buttonText} handler={this.signup} disabled={loading} />
        </form>
       <p>OR</p>
        <div>
          <GoogleButton style={{ margin: '0 auto' }} onClick={this.signupWithGoogle} />
        </div>
        <div className={cx('u-form-group error')}>
          {error.message}
        </div>
      </div>
    );
  }
}

export default Signup;
