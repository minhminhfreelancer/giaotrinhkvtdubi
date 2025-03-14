import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { redirectToMobileVersionIfNeeded } from "./utils/deviceDetection";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Check if we should redirect to mobile version
redirectToMobileVersionIfNeeded("/mobile");

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
