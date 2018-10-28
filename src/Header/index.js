import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import firebase from 'firebase/app';
import 'firebase/auth';

import Avatar from '../Avatar';

export default class Header extends Component {

  signout() {
    firebase.auth().signOut();
  }

  render() {
    const { user } = this.props;
    const MenuItem = ({ title, path }) => (
      <li className={cx('menu-item')}>
        <Link activeClassName='active' to={ path }>
          {title}
        </Link>
      </li>
    );
    return (
      <div className="header">
        <div className="logo">
          <h1> <Link to='/'>Typist</Link> </h1>
        </div>
        <div className="menu options">
          <Link className="menu-item" to="/scoreboard">Scoreboard</Link>
        </div>
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
      </div>
    );
  }
}
