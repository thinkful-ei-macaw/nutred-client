import React from "react";
import AuthApiService from "../../services/auth-api-service";

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
    const { cooking, exercise, food_nutrition, metabolism } = ev.target;
    const payload = {
      cooking: cooking.checked ? "1" : "0",
      exercise: exercise.checked ? "1" : "0",
      food_nutrition: food_nutrition.checked ? "1" : "0",
      metabolism: metabolism.checked ? "1" : "0",
    };

    AuthApiService.postInterests(payload)
      .then((res) => {
        this.handleRegistrationContSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });

    // needs to handle the boxes that have been checked and their values back into database
  };

  render() {
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <h2>Welcome, let us get to know your motivation:</h2>
        <div>
          <input type="checkbox" name="cooking" value="1" />
          <label htmlFor="interest">Cooking</label>
          <br />
          <input type="checkbox" name="exercise" value="1"></input>
          <label htmlFor="interest">Exercise</label>
          <br />
          <input type="checkbox" name="food_nutrition" value="1"></input>
          <label htmlFor="interest">Food Nutrition</label>
          <br />
          <input type="checkbox" name="metabolism" value="1"></input>
          <label htmlFor="interest">Metabolism</label>
          <br />
        </div>
        <br />
        <button type="submit">Get Started!</button>
      </form>
    );
  }
}
