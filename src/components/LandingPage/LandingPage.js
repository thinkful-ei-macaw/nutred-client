import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default class LandingPage extends React.Component {
  render() {
    return (
      <section className="landing">
        <h1>Time to get to a better you</h1>
        <h2>
          Welcome to Nuutred, we're excited to start this health journey with
          you!
        </h2>
        <p className="app-desc">
          In this app we will approach your health and body with science to
          improve everday activities and make life long health changes. After
          submitting a few pieces of information we will provide you with daily
          recommended caloric intake values. These suggested values will be
          broken down to the amount of macronutrients required to intake to meet
          the specific goal you want to pursue for yourself
        </p>
        <div></div>
        <p>Demo user: bpetit Password: P@ssw0rd</p>
        <Link className="link" to={`/register`} className="begin-app">
          Register
        </Link>
        <Link className="link" to={`/login`} className="begin-app">
          Login
        </Link>
      </section>
    );
  }
}
