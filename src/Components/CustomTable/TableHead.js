import React from "react";

const TableHead = ({ children, classes }) => {
  return (
    <thead
      className={`bg-[#e9ebec] text-xs text-secondary capitalize font-medium dark:text-gray-300 ${classes}`}
    >
      {children}
    </thead>
  );
};

export default TableHead;
