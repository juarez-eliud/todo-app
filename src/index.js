import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <App saludo="Hello"> 
    <h1>World</h1>
  </App>,
  document.getElementById("root")
);
