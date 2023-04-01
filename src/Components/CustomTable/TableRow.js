import React from "react";

const TableRow = ({ children, classes, ...props }) => {
  return <tr className={classes} {...props}>{children}</tr>;
};

export default TableRow;
