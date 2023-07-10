import React from "react";

const TableRow = ({ children, classes, ...props }) => {
  return (
    <tr className={`${classes} border-inherit`} {...props}>
      {children}
    </tr>
  );
};

export default TableRow;
