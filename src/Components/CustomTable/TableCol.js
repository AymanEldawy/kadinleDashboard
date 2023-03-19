import React from "react";
import { SortIcon } from "../../Helpers/Icons";

const TableCol = ({ children, scope, classes, sort, sortBy, head = false }) => {
  return (
    <td scope={scope ? scope : 1} className={`px-4 py-2 ${classes}`}>
      {children}
    </td>
  );
};

export default TableCol;
