import React from "react";

const TableHead = ({ children, classes }) => {
  return (
    <thead
      className={`text-xs text-gray-700 uppercase dark:bg-borderdark dark:text-gray-300 bg-gray-200 ${classes}`}
    >
      {/* <tr>{children}</tr> */}
      {children}
    </thead>
  );
};

export default TableHead;
