import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import cx from 'classnames';
import firebase from 'firebase/app';

import Avatar from '../Avatar';

const MenuItem = ({children, path, title, onClick, display}) => display
  ? (<NavLink className="menu-item" to={path} onClick={onClick} title={title}>
    {children}
  </NavLink>)
  : null;

export default class Header extends Component {

  signout() {
    firebase.auth().signOut();
  }

  render() {
    const {user} = this.props;
    const loggedIn = user && !!user.uid;
    return (<div className="header">
      <div className="logo">
        <h1>
          <NavLink to='/'>Typist</NavLink>
        </h1>
      </div>
      <div className="menu options">
        <NavLink className="menu-item" to="/scoreboard">Scoreboard</NavLink>
      </div>
      <ul className={cx('menu')}>
        <MenuItem path="/signup" display={!loggedIn}>Register</MenuItem>
        <MenuItem path="/signin" display={!loggedIn}>Log in</MenuItem>
        <MenuItem path="/" display={loggedIn} onClick={() => this.signout()}>Logout</MenuItem>
        <MenuItem path="/profile" display={loggedIn} title={user.displayName || user.email}>
          <Avatar user={user} round={true} size="40"/>
        </MenuItem>
      </ul>
    </div>);
  }
}
