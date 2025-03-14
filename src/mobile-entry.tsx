import React from "react";
import ReactDOM from "react-dom/client";
import MobileApp from "./mobile/App";
import "./index.css";
import "./mobile/index.css";
import { redirectToDesktopVersionIfNeeded } from "./utils/deviceDetection";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Check if we should redirect to desktop version
redirectToDesktopVersionIfNeeded("/");

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <MobileApp />
    </React.StrictMode>,
  );
}
