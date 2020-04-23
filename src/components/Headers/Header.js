import React, { Component } from "react";
import "./Header.css";
import TokenService from "../../services/token-service";
import { Link } from "react-router-dom";

export default class Header extends Component {
  handleLogout() {
    TokenService.clearAuthToken();
  }
  render() {
    return (
      <div className="header">
        <h1>NuutrEd</h1>
        <nav className="nav">
          <Link to="/charts">Caloric Charts</Link>
          <Link to="/graphs">Weight Graph</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/" className="logout" onClick={this.handleLogout}>
            Logout
          </Link>
        </nav>
      </div>
    );
  }
}
