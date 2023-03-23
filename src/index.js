import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { AlertProvider } from "./Context/AlertContext";
import { PopupFormProvider } from "./Context/PopupFormContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PopupFormProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </PopupFormProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
