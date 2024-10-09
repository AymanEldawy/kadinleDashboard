import React from "react";

const Table = ({ children, containerClassName, tableClassName }) => {
  return (
    <div
      className={`relative overflow-x-auto text-center border-collapse ${containerClassName}`}
    >
      <table
        className={`border-collapse border-gray-300 w-full text-sm text-left text-gray-500 dark:text-gray-400 border rounded-md dark:border-[#333] ${tableClassName}`}
      >
        {children}
      </table>
    </div>
  );
};

export default Table;
