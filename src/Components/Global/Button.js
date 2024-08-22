import React from "react";

export const Button = ({ title, onClick, classes, ...props }) => {
  return (
    <button
      onClick={!!onClick ? onClick : undefined}
      className={`rounded-md px-4 py-2 bg-blue-500 border border-transparent hover:border-blue-500 hover:text-blue-500 hover:bg-white duration-300 text-sm font-medium disabled:bg-gray-400 disabled:opacity-70 hover:disabled:bg-gray-400 hover:disabled:text-white hover:disabled:border-transparent text-white ${classes}`}
      {...props}
    >
      {title}
    </button>
  );
};
