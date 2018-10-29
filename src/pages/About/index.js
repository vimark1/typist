import React, { Component } from 'react';
import ReactGA from 'react-ga';

export default class About extends Component {
  componentDidMount() {
    ReactGA.pageview('/about');
  }

  render() {
    return (
      <div>
        <h2>About this app</h2>
        <p>This app</p>
      </div>
    );
  }
}
