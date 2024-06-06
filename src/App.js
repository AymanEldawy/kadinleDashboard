import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Modal from "./Components/Modal/Modal";
import { GlobalOptions } from "./Context/GlobalOptions";
import { supabase } from "./Helpers/SupabaseConfig/SupabaseConfig";
import Route from "./Routes/index";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { openLanguageForm, setOpenLanguageForm } = useContext(GlobalOptions);


  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
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
      <Modal open={openLanguageForm} onClose={setOpenLanguageForm}></Modal>
    </BrowserRouter>
  );
}

export default App;
