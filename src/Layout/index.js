import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

import Alert from "../Components/Alert/Alert";
import Backdrop from "../Components/Backdrop/Backdrop";
import { AlertContext } from "../Context/AlertContext";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

// import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const location = useLocation();

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
      <div id="layout-wrapper" className="flex flex-col min-h-screen">
        <div className="flex">
          {location?.pathname === '/login' ? null :
            <Sidebar open={open} setOpen={setOpen} />
          }
          <div className="w-full dark:bg-[#2d2d2d]">
            {location?.pathname === '/login' ? null :
              <Header
                open={open}
                setOpen={setOpen}
                mode={mode}
                setMode={setMode}
              />
            }
            {/* <Menu /> */}
            <Backdrop open={open} onClose={() => setOpen(false)} hideInLarge />
            <div className={`main-content ${location?.pathname === '/login' || location?.pathname === '/support'  ? '' : 'px-4 my-8 flex-1'}`}>{children}</div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
