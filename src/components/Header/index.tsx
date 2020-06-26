import cx from 'classnames';
import firebase from 'firebase/app';
import React, { Component } from 'react';
import { Hidden } from 'react-grid-system';
import { NavLink } from 'react-router-dom';

import { User } from 'firebase';
import Avatar from '../Avatar';

interface MenuItemArguments {
  children: any;
  path: string;
  onClick?: () => any;
  display: boolean;
}

interface HeaderProps {
  user: User;
}

const MenuItem = ({ children, path, onClick, display }: MenuItemArguments) =>
  display ? (
    <NavLink className="menu-item" to={path} onClick={onClick}>
      {children}
    </NavLink>
  ) : null;

export default class Header extends Component<HeaderProps> {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  signout() {
    firebase.auth().signOut();
  }

  render() {
    const { user } = this.props;
    const loggedIn = user && !!user.uid;
    return (
      <div className="header">
        <Hidden sm={true} xs={true}>
          <div className="logo">
            <h1>
              <NavLink to="/">Typist</NavLink>
            </h1>
          </div>
        </Hidden>
        <div className="menu options">
          <NavLink className="menu-item" to="/scoreboard">
            Scoreboard
          </NavLink>
        </div>
        <ul className="menu">
          <MenuItem path="/signup" display={!loggedIn}>
            Register
          </MenuItem>
          <MenuItem path="/signin" display={!loggedIn}>
            Log in
          </MenuItem>
          <li
            role="button"
            className={cx('menu-item', { hidden: !loggedIn })}
            onClick={this.signout}
          >
            Logout
          </li>
          <MenuItem path="/profile" display={loggedIn}>
            <Avatar user={user} round={true} size="40" />
          </MenuItem>
        </ul>
      </div>
    );
  }
}
