import React from "react";

const TableHead = ({ children, classes }) => {
  return (
    <thead
      className={`bg-[#e9ebec] dark:bg-[#434343] border border-inherit text-xs text-secondary capitalize font-medium dark:text-gray-300 ${classes}`}
    >
      {children}
    </thead>
  );
};

export default TableHead;
