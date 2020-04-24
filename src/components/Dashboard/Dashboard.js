import React from "react";
import AuthApiService from "../../services/auth-api-service";
//import { Redirect } from 'react-router-dom'
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default class Dashboard extends React.Component {
  // componentDidMount(
  //     //fetch call
  //     //store in context? state for now
  // )

  // render() {
  //     if(// biometrics = [] in state)
  //     // render redirect to /login
  //     else return `jsx`
  // }

  state = {
    biometrics: [],
    basal: "",
    loss: "",
    gain: "",
    editing: false,
    // data01: [],
    // data02: [],
    // lossData1: [],
    // lossData2: [],
    // gainData1: [],
    // gainData2: [],
    // lowCarbData1: [],
    // lowCarbData2: [],
  };

  componentDidMount() {
    AuthApiService.getBiometrics().then((res) => {
      this.setState({
        biometrics: res,
      });
      this.calculateBasal();
      // this.calculateRDIs();
    });
  }

  calculateBasal() {
    let bmr = 0;
    if (this.state.biometrics.gender === "male") {
      if (this.state.biometrics.activity === "1") {
        bmr = Math.round(
          1.2 * this.state.biometrics.height * 6.25 +
            this.state.biometrics.user_weight * 9.99 -
            this.state.biometrics.age * 4.92 +
            5
        );
      }
      if (this.state.biometrics.activity === "2") {
        bmr = Math.round(
          1.375 * this.state.biometrics.height * 6.25 +
            this.state.biometrics.user_weight * 9.99 -
            this.state.biometrics.age * 4.92 +
            5
        );
      }
      if (this.state.biometrics.activity === "3") {
        bmr = Math.round(
          1.55 * this.state.biometrics.height * 6.25 +
            this.state.biometrics.user_weight * 9.99 -
            this.state.biometrics.age * 4.92 +
            5
        );
      }
      if (this.state.biometrics.activity === "4") {
        bmr = Math.round(
          1.725 * this.state.biometrics.height * 6.25 +
            this.state.biometrics.user_weight * 9.99 -
            this.state.biometrics.age * 4.92 +
            5
        );
      }
      if (this.state.biometrics.activity === "5") {
        bmr = Math.round(
          1.9 * this.state.biometrics.height * 6.25 +
            this.state.biometrics.user_weight * 9.99 -
            this.state.biometrics.age * 4.92 +
            5
        );
      }
      this.setState({
        basal: bmr,
        loss: bmr - 500,
        gain: bmr + 500,
      });
    } else {
      if (this.state.biometrics.activity === "1") {
        bmr = Math.round(
          1.1 * this.state.biometrics.height * 6.25 +
            this.state.biometrics.user_weight * 9.99 -
            this.state.biometrics.age * 4.92 -
            161
        );
      }
      if (this.state.biometrics.activity === "2") {
        bmr = Math.round(
          1.275 * this.state.biometrics.height * 6.25 +
            this.state.biometrics.user_weight * 9.99 -
            this.state.biometrics.age * 4.92 -
            161
        );
      }
      if (this.state.biometrics.activity === "3") {
        bmr = Math.round(
          1.35 * this.state.biometrics.height * 6.25 +
            this.state.biometrics.user_weight * 9.99 -
            this.state.biometrics.age * 4.92 -
            161
        );
      }
      if (this.state.biometrics.activity === "4") {
        bmr = Math.round(
          1.35 * this.state.biometrics.height * 6.25 +
            this.state.biometrics.user_weight * 9.99 -
            this.state.biometrics.age * 4.92 -
            161
        );
      }
      if (this.state.biometrics.activity === "5") {
        bmr = Math.round(
          1.525 * this.state.biometrics.height * 6.25 +
            this.state.biometrics.user_weight * 9.99 -
            this.state.biometrics.age * 4.92 -
            161
        );
      }

      this.setState({
        basal: bmr,
        loss: bmr - 500,
        gain: bmr + 500,
      });
    }
  }

  handleEdit = () => {
    this.setState({
      editing: true,
    });
  };

  editingFalse() {
    return (
      <section>
        <div className="user-stats">
          <h3>Your Stats:</h3>
          <p>Height: {this.state.biometrics.height}cm</p>
          <p>Weight: {this.state.biometrics.user_weight}kg</p>
          <p>Activity Level: {this.state.biometrics.activity}</p>
        </div>
        <button onClick={this.handleEdit}>Update Weight</button>
        <div className="user-TDE">
          <h3>Estimated daily caloric expenditure:</h3>
          <p>{this.state.basal}</p>
        </div>
      </section>
    );
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { weight } = ev.target;
    const payload = {
      height: this.state.biometrics.height,
      user_weight: weight.value,
      activity: this.state.biometrics.activity,
      gender: this.state.biometrics.gender,
      age: this.state.biometrics.age,
    };
    console.log("Biometric form submitted");
    console.log(payload);
    AuthApiService.postBiometrics(payload)
      .then((res) => {
        weight.value = "";
        this.setState({
          editing: false,
        });
        return AuthApiService.getBiometrics().then((res) => {
          this.setState({
            biometrics: res,
          });
          this.calculateBasal();
          // this.calculateRDIs();
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  editingTrue() {
    return (
      <form className="weightupdateform" onSubmit={this.handleSubmit}>
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
        <button type="submit">Submit new weight</button>
      </form>
    );
  }

  render() {
    if (this.state.editing === true) {
      return this.editingTrue();
    } else {
      return this.editingFalse();
    }
  }
}
