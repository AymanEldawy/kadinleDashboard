import React from "react";
import { TrashIcon } from "../../Helpers/Icons";
import SearchBar from "../SearchBar/SearchBar";

export const TableBar = ({
  onAddClick,
  onDeleteClick,
  onFilterClick,
  onSearchChange,
  searchValue,
}) => {
  return (
    <div className="flex justify-between gap-2">
      <SearchBar value={searchValue} onSearchChange={onSearchChange} />
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-sm text-white rounded px-2 py-1 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300"
          onClick={onAddClick}
        >
          add new
        </button>
        <button
          className="bg-red-500 text-sm text-white rounded px-2 py-1 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300"
          onClick={onDeleteClick}
        >
          <TrashIcon />{" "}
        </button>
        <button
          className="bg-green-500 text-sm text-white rounded px-2 py-1 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300"
          onClick={onFilterClick}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
