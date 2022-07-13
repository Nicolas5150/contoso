import React from "react";
import { createRoot } from "react-dom/client";
import { FoodContextProvider } from "./store/foodContext";

import App from "./App";

import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <FoodContextProvider>
    <App />
  </FoodContextProvider>
);
