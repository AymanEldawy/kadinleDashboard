import React from "react";
const Loading = ({ withBackdrop }) => {
  return (
    <div
      className={`relative flex items-center text-center tracking-wider text-sm delay-100 animate-pulse z-50`}
    >
      loading...
    </div>
  );
};

export default Loading;
