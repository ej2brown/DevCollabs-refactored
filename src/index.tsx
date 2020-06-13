import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./App";

import { Provider } from "react-redux";

const render = (App) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

render(App);