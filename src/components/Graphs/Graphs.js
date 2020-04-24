import React from "react";
import AuthApiService from "../../services/auth-api-service";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import "./Graphs.css";

export default class Graphs extends React.Component {
  state = {
    weights: [],
    weightsData: [],
  };

  componentDidMount() {
    AuthApiService.getWeights().then((res) => {
      const newData = res.map((data) => {
        return {
          name: new Date(data.date_created).toLocaleString("en-US", {
            dateStyle: "short",
          }),
          weight: data.user_weight,
        };
      });
      this.setState({
        weights: res,
        weightsData: newData,
      });
    });
  }

  render() {
    return (
      <div style={{ width: "calc(100vw - 20px)", height: 300 }}>
        <ResponsiveContainer>
          <LineChart className="Graph" data={this.state.weightsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis name="Kilograms" type="number" domain={[50, 150]} />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="weight"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
