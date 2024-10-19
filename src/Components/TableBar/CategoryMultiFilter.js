import React from "react";
import { CategoryFilter } from "./CategoryFilter";

export const CategoryMultiFilter = ({
  filterCategory,
  setFilterCategory,
  outerChange,
  name,
  label,
  categoryTitle
}) => {
  return (
    <CategoryFilter
      filterCategory={filterCategory}
      setFilterCategory={setFilterCategory}
      outerChange={outerChange}
      name={name}
      label={label}
      categoryTitle={categoryTitle}
    />
  );
};
