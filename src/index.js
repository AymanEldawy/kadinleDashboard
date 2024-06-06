import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import { LangContextProvider } from "./Context/LangContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { GlobalOptionsProvider } from "./Context/GlobalOptions";
import { AlertProvider } from "./Context/AlertContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </React.StrictMode>
);
