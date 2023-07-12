import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Modal from "./Components/Modal/Modal";
import { GlobalOptions } from "./Context/GlobalOptions";
import Route from "./Routes/index";

import "react-toastify/dist/ReactToastify.css";

// import Routes from "./Routes";
function App() {
  const { openLanguageForm, setOpenLanguageForm } = useContext(GlobalOptions);
  return (
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
      <Modal open={openLanguageForm} onClose={setOpenLanguageForm}></Modal>

      <Route />
    </BrowserRouter>
  );
}

export default App;
