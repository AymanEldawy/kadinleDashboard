import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import Alert from "../Components/Alert/Alert";
import Backdrop from "../Components/Backdrop/Backdrop";
import { AlertContext } from "../Context/AlertContext";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

// import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [mode, setMode] = useState("dark");
  const [open, setOpen] = React.useState(false);
  const { alertMessage, dispatchAlert } = useContext(AlertContext);
  let resize = () => {
    if (window.innerWidth > 1024 && open) {
      setOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <>
      <Alert alertMessage={alertMessage} dispatchAlert={dispatchAlert} />
      <div id="layout-wrapper" className="flex flex-col h-full">
        <div className="flex">
          <Sidebar open={open} setOpen={setOpen} />
          <div className="flex-1 overflow-hidden shrink">
            <Header setOpen={setOpen} mode={mode} setMode={setMode} />
            <Menu />
            <Backdrop open={open} onClose={() => setOpen(false)} hideInLarge />
            <div className="main-content px-4 my-8 flex-1">{children}</div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
