import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/UserContext";
import AppContextProvider from "./context/ContextWrapper";

ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,

  document.getElementById("root")
);
