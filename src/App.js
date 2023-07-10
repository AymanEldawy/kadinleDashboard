import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AlertProvider } from "./Context/AlertContext";
import { LangContextProvider } from "./Context/LangContext";
import { ThemeProvider } from "./Context/ThemeContext";
import Route from "./Routes/index";

import "react-toastify/dist/ReactToastify.css";

// import Routes from "./Routes";
function App() {
  return (
    <ThemeProvider>
      <LangContextProvider>
        <AlertProvider>
          <BrowserRouter>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              // newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Route />
          </BrowserRouter>
        </AlertProvider>
      </LangContextProvider>
    </ThemeProvider>
  );
}

export default App;
