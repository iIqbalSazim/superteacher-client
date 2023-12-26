import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import App from "./App.jsx";
import "./index.css";
import { darkColors } from "./Shared/Constants/Colors.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={darkColors}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
