//React
import React from "react";
import ReactDOM from "react-dom";

//network
import userDB from "./service/http";

//Component
import App from "./components/App/App";

//Style
import "./assets/css/reset.css";

ReactDOM.render(
   <React.StrictMode>
      <App userDB={userDB} />
   </React.StrictMode>,
   document.getElementById("root")
);
