import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { AlertProvider } from "./Context/AlertContext";
import { PopupFormProvider } from "./Context/PopupFormContext";
import { ListsGuidsProvider } from "./Context/ListsGuidsContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PopupFormProvider>
          <AlertProvider>
            <ListsGuidsProvider>
              <App />
            </ListsGuidsProvider>
          </AlertProvider>
        </PopupFormProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
