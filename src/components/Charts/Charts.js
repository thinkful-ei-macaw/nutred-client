import React from "react";
import AuthApiService from "../../services/auth-api-service";
//import { Redirect } from 'react-router-dom'
import { PieChart, Pie, Cell, LabelList } from "recharts";

const labelCreator = (
  data,
  { cx, cy, midAngle, innerRadius, outerRadius, value, index }
) => {
  const RADIAN = Math.PI / 180;
  // eslint-disable-next-line
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  // eslint-disable-next-line
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  // eslint-disable-next-line
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#8884d8"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {data[index].name} ({value})
    </text>
  );
};

const labelCreator2 = (
  data,
  { cx, cy, midAngle, innerRadius, outerRadius, value, index }
) => {
  const RADIAN = Math.PI / 180;
  // eslint-disable-next-line
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  // eslint-disable-next-line
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  // eslint-disable-next-line
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {value}
    </text>
  );
};

export default class Charts extends React.Component {
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
    data01: [],
    data02: [],
    lossData1: [],
    lossData2: [],
    gainData1: [],
    gainData2: [],
    lowCarbData1: [],
    lowCarbData2: [],
  };

  componentDidMount() {
    AuthApiService.getBiometrics().then((res) => {
      this.setState({
        biometrics: res,
      });
      this.calculateBasal();
      this.calculateRDIs();
    });
  }

  calculateBasal() {
    if (this.state.biometrics.gender === "male") {
      const bmr = Math.round(
        this.state.biometrics.height * 6.25 +
          this.state.biometrics.user_weight * 9.99 -
          this.state.biometrics.age * 4.92 +
          5
      );
      this.setState({
        basal: bmr,
        loss: bmr - 500,
        gain: bmr + 500,
      });
    } else {
      const bmr =
        this.state.biometrics.height * 6.25 +
        this.state.biometrics.user_weight * 9.99 -
        this.state.biometrics.age * 4.92 -
        161;
      this.setState({
        basal: bmr,
        loss: bmr - 500,
        gain: bmr + 500,
      });
    }
  }

  calculateRDIs() {
    const caloriePercent = [
      { name: "Fats", value: 25 },
      { name: "Carbs", value: 50 },
      { name: "Protein", value: 25 },
    ];

    const gram2 = [
      { name: "Fats", value: this.state.basal / 4 / 9 },
      { name: "Carbs", value: this.state.basal / 2 / 4 },
      { name: "Protein", value: this.state.basal / 4 / 4 },
    ];

    const lossGrams = [
      { name: "Fats", value: this.state.loss / 4 / 9 },
      { name: "Carbs", value: this.state.loss / 2 / 4 },
      { name: "Protein", value: this.state.loss / 4 / 4 },
    ];

    const gainGrams = [
      { name: "Fats", value: this.state.gain / 4 / 9 },
      { name: "Carbs", value: this.state.gain / 2 / 4 },
      { name: "Protein", value: this.state.gain / 4 / 4 },
    ];

    const lowCarbCaloriePercent = [
      { name: "Fats", value: 30 },
      { name: "Carbs", value: 25 },
      { name: "Protein", value: 45 },
    ];

    const lowCarbGrams = [
      { name: "Fats", value: this.state.basal / 3 / 9 },
      { name: "Carbs", value: this.state.basal / 4 / 4 },
      { name: "Protein", value: this.state.basal / 4.5 / 4 },
    ];

    this.setState({
      data01: caloriePercent,
      data02: gram2,
      lossData1: caloriePercent,
      lossData2: lossGrams,
      gainData1: caloriePercent,
      gainData2: gainGrams,
      lowCarbData1: lowCarbCaloriePercent,
      lowCarbData2: lowCarbGrams,
    });
  }

  render() {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    return (
      <section>
        <h3>Macronutrient Recommended Daily Intake for different goals</h3>
        <div className="maintence-recommendations">
          <h4>Maintence Goal: {this.state.basal} calories</h4>
          <PieChart width={400} height={400}>
            <Pie
              data={this.state.data01}
              dataKey="value"
              cx={200}
              cy={200}
              label={(labelprops) =>
                labelCreator2(this.state.data01, labelprops)
              }
              //   labelLine={false}
              outerRadius={60}
              fill="#8884d8"
            >
              {this.state.data01.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}{" "}
            </Pie>
            <Pie
              data={this.state.data02}
              dataKey="value"
              cx={200}
              cy={200}
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label={(labelprops) =>
                labelCreator(this.state.data02, labelprops)
              }
            />
          </PieChart>
        </div>
        <div className="loss-recommendations">
          <h4>Weight-loss goal: {this.state.loss} calories</h4>
          <PieChart width={400} height={400}>
            <Pie
              data={this.state.lossData1}
              dataKey="value"
              cx={200}
              cy={200}
              outerRadius={60}
              fill="#8884d8"
            />
            <Pie
              data={this.state.lossData2}
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
        <div className="gain-recommendations">
          <h4>Mass-gaining goal: {this.state.gain} calories</h4>
          <PieChart width={400} height={400}>
            <Pie
              data={this.state.gainData1}
              dataKey="value"
              cx={200}
              cy={200}
              outerRadius={60}
              fill="#8884d8"
            />
            <Pie
              data={this.state.gainData2}
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
        <div className="low-recommendations">
          <h4>low-carb goal: {this.state.basal} calories</h4>
          <PieChart width={400} height={400}>
            <Pie
              data={this.state.lowCarbData1}
              dataKey="value"
              cx={200}
              cy={200}
              outerRadius={60}
              fill="#8884d8"
            />
            <Pie
              data={this.state.lowCarbData2}
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
        {/* <div className="loss-recommendations">
          <h4>ketogenic goal: Base TDEE with adjusted percentages</h4>
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
        </div> */}
      </section>
    );
  }
}
