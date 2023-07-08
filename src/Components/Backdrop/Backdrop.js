import React from "react";

const Backdrop = ({ open, onClose, classes, hideInLarge }) => {
  return (
    <div
      onClick={onClose}
      className={`bg-black  fixed top-0 left-0 bottom-0 right-0 z-30 ${classes} ${
        open
          ? "opacity-60 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } ${hideInLarge ? "md:!hidden" : ""} `}
    ></div>
  );
};

export default Backdrop;
