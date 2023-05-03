import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// import house context provider
import HouseContextProvider from "./components/HouseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HouseContextProvider>
      <Router>
        <App />
      </Router>
    </HouseContextProvider>
  </React.StrictMode>
);
