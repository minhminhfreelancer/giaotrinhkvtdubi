import React from "react";
import ReactDOM from "react-dom/client";
import MobileApp from "./mobile/App";
import "./index.css";
import "./mobile/index.css";

// Import the TempoDevtools
import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Prevent any automatic redirection
const preventRedirection = () => {
  // Override any redirection functions
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    // Check if we're trying to navigate away from mobile
    if (
      args[2] &&
      typeof args[2] === "string" &&
      !args[2].includes("/mobile")
    ) {
      // Modify the URL to keep it in mobile
      args[2] = "/mobile" + (args[2].startsWith("/") ? args[2] : "/" + args[2]);
    }
    return originalPushState.apply(this, args);
  };

  history.replaceState = function (...args) {
    // Check if we're trying to navigate away from mobile
    if (
      args[2] &&
      typeof args[2] === "string" &&
      !args[2].includes("/mobile")
    ) {
      // Modify the URL to keep it in mobile
      args[2] = "/mobile" + (args[2].startsWith("/") ? args[2] : "/" + args[2]);
    }
    return originalReplaceState.apply(this, args);
  };

  // Also intercept window.location changes
  const originalAssign = window.location.assign;
  const originalReplace = window.location.replace;

  window.location.assign = function (url) {
    if (url && typeof url === "string" && !url.includes("/mobile")) {
      url = "/mobile" + (url.startsWith("/") ? url : "/" + url);
    }
    return originalAssign.call(this, url);
  };

  window.location.replace = function (url) {
    if (url && typeof url === "string" && !url.includes("/mobile")) {
      url = "/mobile" + (url.startsWith("/") ? url : "/" + url);
    }
    return originalReplace.call(this, url);
  };
};

// Run the prevention immediately
preventRedirection();

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <MobileApp />
    </React.StrictMode>,
  );
}
