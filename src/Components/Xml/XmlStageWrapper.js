import React from "react";

export const XmlStageWrapper = ({ title, children }) => {
  return (
    <div className={`w-full`}>
      {/* <h2 className="text-center font-semibold my-5">{title}</h2> */}
      {children}
    </div>
  );
};
