import React from "react";
import { useState } from "react";
import { ChevronIcon, TrashIcon } from "../../Helpers/Icons";
import Backdrop from "../Backdrop/Backdrop";
import SelectField from "../CustomForm/SelectField";
import SearchBar from "../SearchBar/SearchBar";

export const TableBar = ({
  onAddClick,
  onDeleteClick,
  onFilterClick,
  onSearchChange,
  searchValue,
  onSelectChange,
  itemsPerPage,
  columns,
  searchKey,
  setSearchKey,
}) => {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-2 items-center">
        <div className="relative">
          <SearchBar
            value={searchValue}
            onSearchChange={onSearchChange}
            columns={columns}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        </div>
        <SelectField
          hideText
          value={itemsPerPage}
          onChange={(e) => onSelectChange(e.target.value)}
          list={[10, 20, 50, 100, 200, 500]}
          className="p-2 rounded-md"
        />
        <div className="py-2 dark:text-gray-300 text-sm text-gray-600 font-medium rounded-md flex gap-2">
          Number of rows:
          <span>{itemsPerPage}</span>
        </div>
      </div>
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
