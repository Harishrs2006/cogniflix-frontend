/*
FILE: main.jsx

PURPOSE:
React DOM rendering entry point.

FLOW:
Browser Load -> main.jsx -> App Render

USED BY:
index.html

NEXT FLOW:
App.tsx

*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
fetch("https://cogniflix-backend.onrender.com/test");

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);