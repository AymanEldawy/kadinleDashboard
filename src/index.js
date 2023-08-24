import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import { LangContextProvider } from "./Context/LangContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { GlobalOptionsProvider } from "./Context/GlobalOptions";
import { AlertProvider } from "./Context/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LangContextProvider>
        <GlobalOptionsProvider>
          <AlertProvider>
            <LangContextProvider>
              <App />
            </LangContextProvider>
          </AlertProvider>
        </GlobalOptionsProvider>
      </LangContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
