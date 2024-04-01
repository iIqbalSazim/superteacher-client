import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import App from "./App";
import "./index.css";
import { persistor, store } from "./Shared/Redux/Store.ts";
import { darkTheme } from "./Shared/Constants/Themes.ts";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MantineProvider theme={darkTheme}>
            <Notifications position="top-center" limit={5} mt={"xl"} />
            <App />
          </MantineProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
