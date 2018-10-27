import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import firebase from 'firebase/app';
import 'firebase/auth';

import Avatar from 'react-avatar';

// import './style.css';

export default class SigninHeader extends Component {

  signout() {
    firebase.auth().signOut();
  }

  get googleId() {
    const { user } = this.props;
    const googleData = user.providerData.find(item => item.providerId === 'google.com') || {};
    return googleData.uid;
  }

  render() {
    const { user } = this.props;
    const MenuItem = ({ title, path }) => (
      <li className={cx('menu-item')}>
        <Link to={ path }>
          {title}
        </Link>
      </li>
    );
    return (
      <div className={cx('navbar')}>
        <ul className={cx('menu')}>
        {!user.uid && (
          <MenuItem
          title="Sign up"
          path="signup"
          />
        )}
        {!user.uid && (
          <MenuItem
          title="Sign In"
          path="signin"
          />
        )}
        {user.uid && (
          <li className={cx('menu-item')} onClick={() => this.signout()}>
          Logout
          </li>
        )}
        {user.uid && (
          <li className={cx('menu-item')} title={user.displayName || user.email}>
            <Avatar name={user.displayName} email={user.email} googleId={this.googleId} round={true} size="40" />
          </li>
        )}
        </ul>
      </div>
    );
  }
}
