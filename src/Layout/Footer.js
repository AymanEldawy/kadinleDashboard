import React, { useState } from "react";
import { useEffect } from "react";
const Footer = () => {
  const [extraClasses, setExtraClasses] = useState("");
  useEffect(() => {
    let bodyHeight = document.body.getClientRects()[0].height;
    let warperHeight = document.getElementById("layout-wrapper").clientHeight;
    if (bodyHeight > warperHeight) {
      setExtraClasses("fixed bottom-0 left-0 w-full");
    }
  }, []);
  return (
    <React.Fragment>
      <footer className={extraClasses}>
        <div className="bg-white dark:bg-bgmaindark text-xs">
          <div className="container">
            <div className="flex justify-between gap-2 items-center p-2 text-gray-400 font-normal">
              <div>{new Date().getFullYear()} © AB Repair.</div>
              <div className="text-right">Developed by Why Not Tech</div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
