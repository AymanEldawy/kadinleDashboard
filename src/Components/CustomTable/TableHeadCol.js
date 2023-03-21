import React from "react";
import { SortIcon } from "../../Helpers/Icons";

const TableHeadCol = ({ children, scope, classes, sort, sortBy }) => {
  return (
    <th
      scope={scope ? scope : "col"}
      className={`px-4 py-2 ${classes} ${sort ? "sorting-hover hover:bg-gray-300 dark:hover:bg-bgmaindark cursor-pointer" : ""}`}
      onClick={() => (!!sort ? sortBy(children) : undefined)}
    >
      <div className="flex  gap-2 items-center justify-between">
        {children}
        {!!sort ? (
          <span className="text-xs opacity-0 ">
            <SortIcon />
          </span>
        ) : null}
      </div>
    </th>
  );
};

export default TableHeadCol;
