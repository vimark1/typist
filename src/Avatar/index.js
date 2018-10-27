import React, { Component } from 'react';
import { default as ReactAvatar } from 'react-avatar';

export default class Avatar extends Component {

  defaultSize = 40;

  get size() {
    const { size } = this.props;
    return size || this.defaultSize;
  }

  get round() {
    const { round } = this.props;
    return typeof round !== 'undefined' ? round : true;
  }

  get googleId() {
    const { user } = this.props;
    const googleData = user.providerData.find(item => item.providerId === 'google.com') || {};
    return googleData.uid;
  }

  render() {
    const { user } = this.props;
    return (
      <ReactAvatar name={user.displayName} email={user.email} googleId={this.googleId} round={this.round} size={this.size} />
    );
  }
}

