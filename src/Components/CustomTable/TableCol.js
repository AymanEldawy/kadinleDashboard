import React from "react";

const TableCol = ({ children, scope, classes }) => {
  // console.log(children)
  return (
    <td scope={scope ? scope : 1} className={`p-2 ${classes}`}>
      <div className="flex items-center w-full text-center">{children}</div>
    </td>
  );
};

export default TableCol;
