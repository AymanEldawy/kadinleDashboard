import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Alert from "../Components/Alert/Alert";
import Backdrop from "../Components/Backdrop/Backdrop";
import PopupForm from "../Components/PopupForm/PopupForm";
import { AlertContext } from "../Context/AlertContext";
import { PopupFormContext } from "../Context/PopupFormContext";
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
    <React.Fragment>
      <div id="layout-wrapper" className="flex flex-col h-full">
        <Header setOpen={setOpen} mode={mode} setMode={setMode} />
        <Menu />
        <Backdrop open={open} onClose={() => setOpen(false)} />
        <Sidebar setOpen={setOpen} open={open} />
        <div className="main-content my-8 flex-1">{children}</div>
        <Footer />
      </div>
      <Alert alertMessage={alertMessage} dispatchAlert={dispatchAlert} />
      <PopupForm />
    </React.Fragment>
  );
};

export default Layout;
