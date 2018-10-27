import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import firebase from 'firebase/app';
import 'firebase/auth';

// import './style.css';

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
          title="Signin"
          path="signin"
          />
        )}
        {user.uid && (
          <li className={cx('menu-item')} onClick={() => this.signout()}>
          Logout
          </li>
        )}
        {user.uid && (
          <li className={cx('menu-item')} onClick={() => {}}>
          {user.displayName || user.email}
          </li>
        )}
        </ul>
      </div>
    );
  }
}
