import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
// import { Button, Input, Required } from "../Utils/Utils";

export default class BiometricGather extends Component {
  static defaultProps = {
    onBiometricSuccess: () => {},
    history: {
      push: () => {},
    },
  };

  state = { error: null };

  handleBiometricSuccess = (user) => {
    const { history } = this.props;
    history.push("/dashboard");
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { height, weight, activity, gender, age } = ev.target;
    const payload = {
      height: height.value,
      user_weight: weight.value,
      activity: activity.value,
      gender: gender.value,
      age: age.value,
    };
    console.log("Biometric form submitted");
    console.log(payload);
    AuthApiService.postBiometrics(payload)
      .then((res) => {
        height.value = "";
        weight.value = "";
        activity.value = "";
        gender.value = "";
        age.value = "";
        this.handleBiometricSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="BiometricForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="heightbox">
          <label htmlFor="BiometricForm__height" required>
            Height (Please use cm)
          </label>
          <input
            name="height"
            type="text"
            required
            id="BiometricForm__height"
          ></input>
        </div>
        <div className="weight">
          <label htmlFor="BiometricForm__weight" required>
            weight (Please use kg)
          </label>
          <input
            name="weight"
            type="text"
            required
            id="BiometricForm__weight"
          ></input>
        </div>
        <div className="activity">
          <label htmlFor="BiometricForm__activity" required>
            activity
          </label>
          <select
            name="activity"
            type="activity"
            required
            id="BiometricForm__activity"
          >
            <option value="1">Limited Activity</option>
            <option value="2">Light Activity</option>
            <option value="3">Medium Activity</option>
            <option value="4">Heavy Activity</option>
            <option value="5">Extreme Activity</option>
          </select>
        </div>
        <div className="age">
          <label htmlFor="RegistrationForm__age">Age</label>
          <input
            name="age"
            type="text"
            required
            id="RegistrationForm__age"
          ></input>
        </div>
        <div className="gender">
          <label htmlFor="BiometricForm__gender">Gender</label>
          <select name="gender" type="text" required id="BiometricForm__gender">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <button type="submit">To Dashboard</button>
      </form>
    );
  }
}
