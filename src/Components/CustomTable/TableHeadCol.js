import React from "react";
import { SortIcon } from "../../Helpers/Icons";

const TableHeadCol = ({ children, scope, classes, sort, sortBy }) => {
  return (
    <th
      scope={scope ? scope : "col"}
      className={`px-4 py-2 ${classes} ${sort ? "cursor-pointer" : ""}`}
      onClick={() => (!!sort ? sortBy(children) : undefined)}
    >
      <div className="flex gap-2 items-center">
        {children}
        <span className="text-xs">
          <SortIcon />
        </span>
      </div>
    </th>
  );
};

export default TableHeadCol;
