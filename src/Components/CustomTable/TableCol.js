import React from "react";

const TableCol = ({ children, scope, classes, head = false }) => {
  return (
    <>
      {head ? (
        <th scope={scope ? scope : "col"} className={`px-4 py-2 ${classes}`}>
          {children}
        </th>
      ) : (
        <td className={`px-4 py-2 ${classes}`}>{children}</td>
      )}
    </>
  );
};

export default TableCol;
