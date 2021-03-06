import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import "./Register.css";

export default class RegistrationPage extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
    history: {
      push: () => {},
    },
  };

  state = { error: null };

  handleRegistrationSuccess = (user) => {
    const { history } = this.props;
    history.push("/biometricgather");
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { full_name, user_name, password } = ev.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      full_name: full_name.value,
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        full_name.value = "";
        user_name.value = "";
        password.value = "";
        this.handleRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="full_name">
          <label htmlFor="RegistrationForm__full_name" required>
            Full name
          </label>
          <input
            name="full_name"
            type="text"
            required
            id="RegistrationForm__full_name"
          ></input>
        </div>
        <div className="user_name">
          <label
            className="user-label"
            htmlFor="RegistrationForm__user_name"
            required
          >
            User name
          </label>
          <input
            name="user_name"
            type="text"
            required
            id="RegistrationForm__user_name"
          ></input>
        </div>
        <div className="password">
          <label
            className="Registration"
            htmlFor="RegistrationForm__password"
            required
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            id="RegistrationForm__password"
          ></input>
        </div>

        <button type="submit">Register</button>
      </form>
    );
  }
}
