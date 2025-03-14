import React from "react";
import ReactDOM from "react-dom/client";
import MobileApp from "./App";
import "../index.css";
import "./index.css";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <MobileApp />
    </React.StrictMode>,
  );
}
