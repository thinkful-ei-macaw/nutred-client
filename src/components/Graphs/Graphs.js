import React from "react";
import AuthApiService from "../../services/auth-api-service";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default class Graphs extends React.Component {
  state = {
    weights: [],
    weightsData: [],
  };

  componentDidMount() {
    AuthApiService.getWeights().then((res) => {
      this.setState({
        weights: res,
      });
    });
  }

  fillInData() {
    this.weights.map((data) => {
      return {
        name: data.date_created,
        pv: data.user_weight,
      };
    });
  }
  render() {
    return (
      <LineChart
        width={600}
        height={300}
        data={this.state.weights.map((data) => {
          return {
            name: data.date_created,
            pv: data.user_weight,
          };
        })}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
