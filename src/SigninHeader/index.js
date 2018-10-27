import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import firebase from 'firebase/app';
import 'firebase/auth';

import Avatar from '../Avatar';

import './style.css';

export default class SigninHeader extends Component {

  signout() {
    firebase.auth().signOut();
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
          <Link to='/profile'>
            <Avatar user={user} round={true} size="40" />
          </Link>
        </li>
      )}
      </ul>
    );
  }
}
