import React from "react";

export default class InterestPage extends React.Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
    history: {
      push: () => {},
    },
  };

  state = { error: null };

  handleRegistrationContSuccess = (user) => {
    const { history } = this.props;
    history.push("/biometricgather");
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { full_name, age, user_name, password } = ev.target;

    console.log("registration cont form submitted");
    console.log({ full_name, age, user_name, password });

    // needs to handle the boxes that have been checked and their values back into database
    this.handleRegistrationContSuccess();
  };

  render() {
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <h2>Welcome, let us get to know your motivation:</h2>
        <div>
          <input type="checkbox" name="interest" value="Cooking" />
          <label htmlFor="interest">Cooking</label>
          <br />
          <input type="checkbox" name="interest"></input>
          <label htmlFor="interest">Exercise</label>
          <br />
          <input type="checkbox" name="interest"></input>
          <label htmlFor="interest">Food Nutrition</label>
          <br />
          <input type="checkbox" name="interest"></input>
          <label htmlFor="interest">Metabolism</label>
          <br />
        </div>
        <br />
        <button type="submit">Get Started!</button>
      </form>
    );
  }
}
