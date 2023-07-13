import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Modal from "./Components/Modal/Modal";
import { GlobalOptions } from "./Context/GlobalOptions";
import Route from "./Routes/index";

import "react-toastify/dist/ReactToastify.css";
import { supabase } from "./Helpers/SupabaseConfig/SupabaseConfig";
import { bestSelling, getRecentOrders } from "./Api/statictes";

// import Routes from "./Routes";
function App() {
  const { openLanguageForm, setOpenLanguageForm } = useContext(GlobalOptions);

  useEffect(() => {
    async function fetchData() {
      console.log("callled");
      const { data: result, error } = await supabase
        .from("order_content")
        .select("id, COUNT(variant_id)")
        .groupBy("id");
      if (error) {
        console.log("Error fetching data:", error);
      } else {
        // setData(result);
      }
      console.log(result, error);
    }
    fetchData();
    bestSelling().then((res) => {
      console.log(res);
    });
  }, []);
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
