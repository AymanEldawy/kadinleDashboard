import React from "react";

const TableCol = ({ children, scope, classes }) => {
  // console.log(children)
  return (
    <td scope={scope ? scope : 1} className={`px-4 py-2 ${classes}`}>
      {children}
    </td>
  );
};

export default TableCol;
