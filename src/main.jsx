import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import App from "./App.jsx";
import "./index.css";
import { darkColors } from "./Shared/Constants/Colors.js";
import { persistor, store } from "./Stores/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider theme={darkColors}>
          <Notifications position="top-center" limit={5} mt={"xl"} />
          <App />
        </MantineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
