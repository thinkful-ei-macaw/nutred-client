import React from "react";

export default class InterestPage extends React.Component {
  render() {
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <h2>Welcome, let us get to know your motivation:</h2>
        <input type="checkbox" name="interest">
          Interest 1
        </input>
        <br />
        <input type="checkbox" name="interest">
          Interest 2
        </input>
        <br />
        <input type="radio" name="interest">
          Interest 3
        </input>
        <br />
        <input type="radio" name="interest">
          Interest 4
        </input>
        <br />
        <input type="radio" name="interest">
          Interest 5
        </input>
        <br />
        <button type="submit">Sign Up!</button>
      </form>
    );
  }
}
