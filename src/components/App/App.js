import React from "react";
import Header from "../Headers/Header";
import LandingPage from "../LandingPage/LandingPage";
import RegisterPage from "../Register/Register";
import InterestPage from "../Interest/InterestPage";
import BiometricGather from "../Biometric/Biometricgather";
import { Switch } from "react-router-dom";
import Login from "../Login/Login";
import PrivateRoute from "../../Utils/PrivateRoute";
import PublicOnlyRoute from "../../Utils/PublicOnlyRoute";
import Dashboard from "../Dashboard/Dashboard";
import Charts from "../Charts/Charts";
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
            <PublicOnlyRoute exact path={"/"} component={LandingPage} />
            <PublicOnlyRoute path={"/register"} component={RegisterPage} />
            <PublicOnlyRoute path={"/login"} component={Login} />
            {/* <PrivateRoute path={"/gatherinfo"} component={InterestPage} /> */}
            <PrivateRoute
              path={"/biometricgather"}
              component={BiometricGather}
            />
            <PrivateRoute path={"/dashboard"} component={Dashboard} />
            <PrivateRoute path={"/charts"} component={Charts} />
          </Switch>
        </section>
      </main>
    );
  }
}

export default App;
