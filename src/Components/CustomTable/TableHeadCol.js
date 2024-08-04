import React from "react";

import { SortIcon } from "../../Helpers/Icons";

const TableHeadCol = ({
  children,
  scope,
  classes,
  contentClassName,
  sort,
  sortBy,
  ...props
}) => {
  return (
    <th
      scope={scope ? scope : "col"}
      className={`p-2 whitespace-nowrap w-fit border !border-inherit ${classes} text-xs ${
        sort
          ? "sorting-hover hover:bg-gray-100 dark:hover:bg-bgmaindark cursor-pointer"
          : ""
      }`}
      onClick={() => (!!sort ? sortBy(children) : undefined)}
      {...props}
    >
      <div
        className={`flex gap-2 items-center justify-center ${contentClassName}`}
      >
        {children}
        {!!sort ? (
          <span className="text-xs opacity-0 ">
            <SortIcon className="text-secondary" />
          </span>
        ) : null}
      </div>
    </th>
  );
};

export default TableHeadCol;
