import React from "react";
import { Link } from "react-router-dom";

export default class LandingPage extends React.Component {
  render() {
    return (
      <section>
        <h1>Time to Start</h1>
        <h2>
          Welcome to Nutred, we're excited to start this fitness/health journey
          with you
        </h2>
        <h3>
          In this app we will approach your health and body with science to
          improve everday activities and make life long health changes
        </h3>
        <Link to={`/register`} className="begin-app">
          Register
        </Link>
        <Link to={`/login`} className="begin-app">
          Login
        </Link>
      </section>
    );
  }
}
