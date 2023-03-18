import React from "react";

const TableBody = ({ children, classes, bodyClasses }) => {
  return <tbody className={bodyClasses}>{children}</tbody>;
};

export default TableBody;
