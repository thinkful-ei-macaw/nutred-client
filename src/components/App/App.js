import React from "react";
import Header from "../Headers/Header";
import LandingPage from "../LandingPage/LandingPage";
import RegisterPage from "../Register/Register";
import { Route, Switch } from "react-router-dom";
// import "./App.css";

class App extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    return (
      <main className="App">
        <header>
          <Header />
        </header>
        <section>
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <Route path={"/register"} component={RegisterPage} />
          </Switch>
        </section>
      </main>
    );
  }
}

export default App;
