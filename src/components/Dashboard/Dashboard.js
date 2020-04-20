import React from "react";
import AuthApiService from "../../services/auth-api-service";
//import { Redirect } from 'react-router-dom'
import { PieChart, Pie, Sector, Cell } from "recharts";

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
    data01: [],
    data02: [],
  };

  componentDidMount() {
    AuthApiService.getBiometrics().then((res) => {
      this.setState({
        biometrics: res,
      });
      this.calculateBasal();
      this.calculateRDI();
    });
  }

  calculateBasal() {
    if (this.state.biometrics.gender === "male") {
      const bmr =
        this.state.biometrics.height * 6.25 +
        this.state.biometrics.user_weight * 9.99 -
        this.state.biometrics.age * 4.92 +
        5;
      this.setState({ basal: bmr });
    } else {
      const bmr =
        this.state.biometrics.height * 6.25 +
        this.state.biometrics.user_weight * 9.99 -
        this.state.biometrics.age * 4.92 -
        161;
      this.setState({ basal: bmr });
    }
  }

  calculateRDI() {
    const caloriePercent = [
      { name: "Fats", value: 35 },
      { name: "Carbs", value: 30 },
      { name: "Protein", value: 35 },
    ];

    const gram2 = [
      { name: "Fats", value: 80 },
      { name: "Carbs", value: 100 },
      { name: "Protein", value: 120 },
    ];

    this.setState({
      data01: caloriePercent,
      data02: gram2,
    });
  }

  render() {
    return (
      <section>
        <div className="user-stats">
          <h3>Your Stats:</h3>
          <p>Height: {this.state.biometrics.height}</p>
          <p>Weight: {this.state.biometrics.user_weight}</p>
          <p>Activity Level: {this.state.biometrics.activity}</p>
        </div>
        <div className="user-TDE">
          <h3>Estimated daily caloric expenditure:</h3>
          <p>{this.state.basal}</p>
        </div>
        <div className="user-recommendations">
          <h3>Macronutrient Recommended Daily Intake</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={this.state.data01}
              dataKey="value"
              cx={200}
              cy={200}
              outerRadius={60}
              fill="#8884d8"
            />
            <Pie
              data={this.state.data02}
              dataKey="value"
              cx={200}
              cy={200}
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </div>
      </section>
    );
  }
}
