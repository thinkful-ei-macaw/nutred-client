import React from "react";
import { config } from "../../config";

export default class TokenService extends React.Component {
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  }
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  }
}
