import React from "react";
import { createRoot } from "react-dom/client";
// import './index.css'; // You might not need this if not using local CSS
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
