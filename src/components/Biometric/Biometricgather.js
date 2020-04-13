import React, { Component } from "react";
// import { Button, Input, Required } from "../Utils/Utils";

export default class BiometricPbodytype extends Component {
  static defaultProps = {
    onBiometricSuccess: () => {},
    history: {
      push: () => {},
    },
  };

  state = { error: null };

  handleBiometricSuccess = (user) => {
    const { history } = this.props;
    history.push("/login");
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { height, bodytype, weight, activity } = ev.target;

    console.log("Biometric form submitted");
    console.log({ height, bodytype, weight, activity });

    height.value = "";
    bodytype.value = "";
    weight.value = "";
    activity.value = "";
    this.handleBiometricSuccess();
  };

  render() {
    const { error } = this.state;
    return (
      <form className="BiometricForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="height">
          <label htmlFor="BiometricForm__height">
            Height <required />
          </label>
          <input
            name="height"
            type="text"
            required
            id="BiometricForm__height"
          ></input>
        </div>
        <div className="weight">
          <label htmlFor="BiometricForm__weight">
            weight <required />
          </label>
          <input
            name="weight"
            type="text"
            required
            id="BiometricForm__weight"
          ></input>
        </div>
        <div className="activity">
          <label htmlFor="BiometricForm__activity">
            activity <required />
          </label>
          <input
            name="activity"
            type="activity"
            required
            id="BiometricForm__activity"
          ></input>
        </div>
        <div className="bodytype">
          <label htmlFor="BiometricForm__bodytype">bodytype</label>
          <input
            name="bodytype"
            type="text"
            required
            id="BiometricForm__bodytype"
          ></input>
        </div>
        <button type="submit">To Dashboard</button>
      </form>
    );
  }
}
