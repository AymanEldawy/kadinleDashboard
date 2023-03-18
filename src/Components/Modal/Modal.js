import React, { useEffect } from "react";

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    if(open)
      document.body.style.overflow = "hidden";
  }, []);
  return (
    <div
      className={`
      fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center backdrop-blur-sm bg-[#0008]
      ${
        open ? "pointer-events-auto opacity-1" : "pointer-events-none opacity-0"
      }
      `}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#282828] shadow rounded-md p-4 min-w-[250px] min-h-[100px] max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
