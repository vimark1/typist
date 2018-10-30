import cx from "classnames";
import React, { Component } from "react";
import ReactGA from "react-ga";
import firebase from "firebase/app";
import "firebase/database";

export default class Preferences extends Component {
  constructor(props) {
    super(props);
    const { pref } = this.props;
    this.state = pref;
  }

  componentDidMount() {
    ReactGA.pageview("/preferences");
  }

  savePreferences = event => {
    const { user } = this.props;
    event.preventDefault();
    console.log("State :", this.state);
    console.log("User Id :", user.uid);
    firebase
      .database()
      .ref("user-pref")
      .child(user.uid)
      .set({ ...this.state.pref })
      .then(() => alert("Saved!!"))
      .catch(e => {
        alert("Failed Saving your Preferences");
        console.error("Error", e);
      });
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.savePreferences}>
            <div className={cx("u-form-group")}>
              <label htmlFor="">Number of Words</label>
              <br />
              <input
                type="number"
                value={this.state.words}
                placeholder="Number of Words"
                onChange={event =>
                  this.setState({
                    words: event.target.value ? event.target.value : 1
                  })
                }
              />
            </div>
            <button type="submit"> Save Preference </button>
          </form>
        </div>
      </div>
    );
  }
}
