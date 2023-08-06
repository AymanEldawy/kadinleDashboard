import React from "react";

const TableCol = ({ children, scope, classes, ...props }) => {
  return (
    <td
      colSpan={scope ? scope : 1}
      className={`p-2 ${classes} !border-inherit`}
      {...props}
    >
      <div className="flex items-center w-full text-center justify-center">
        {children}
      </div>
    </td>
  );
};

export default TableCol;
