import React from "react";
import { CategoryFilter } from "./CategoryFilter";

export const CategoryMultiFilter = ({
  filterCategory,
  setFilterCategory,
  outerChange,
  name,
}) => {
  return (
    <div className="overflow-hidden">
      <CategoryFilter
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        outerChange={outerChange}
        name={name}
      />
    </div>
  );
};
