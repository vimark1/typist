import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import firebase from 'firebase';
import 'firebase/auth';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      error: {},
    };
  }

  signup() {
    const { email, password } = this.state;
    console.log({ email, password });
    if (!email) return;
    if (!password) return;
    this.setState({ loading: true, error: {} });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        this.setState({ loading: false });
        this.props.signupSuccess();
      })
      .catch((error) => {
        console.log('error', error);
        this.setState({ error, loading: false });
      });
  }

  render() {
    const { loading, error } = this.state;

    return (
      <div className={cx('email-signup')}>
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
          />
        </div>
        <div className={cx('u-form-group')}>
          <button onClick={() => this.signup()}>
            {loading ? 'Please wait...' : 'Signup'}
          </button>
        </div>
        <div className={cx('u-form-group error')}>
          {error.message}
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  signupSuccess: PropTypes.func.isRequired,
};

export default Signup;
