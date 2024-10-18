import React from "react";
import { CategoryFilter } from "./CategoryFilter";

export const CategoryMultiFilter = ({
  filterCategory,
  setFilterCategory,
  outerChange,
  name,
  label,
}) => {
  return (
    <div className="flex gap-1 flex-col">
      {label ? (
        <label
          className={`overflow-hidden text-ellipsis flex items-center gap-1 text-sm font-normal capitalize`}
        >
          {label}
        </label>
      ) : null}
      <CategoryFilter
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        outerChange={outerChange}
        name={name}
      />
    </div>
  );
};
