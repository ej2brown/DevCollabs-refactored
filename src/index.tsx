import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./App";

const render = (Application) => {
  ReactDOM.render(
    <React.StrictMode>
      <Application />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

render(App);