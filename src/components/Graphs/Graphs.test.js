import React from "react";
import ReactDOM from "react-dom";
import Graphs from "./Graphs";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Graphs />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
