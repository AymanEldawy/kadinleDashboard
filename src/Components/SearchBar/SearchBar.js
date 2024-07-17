import React, { useMemo } from "react";
import { useState } from "react";

import { ChevronIcon, FilterIcon, SearchIcon } from "../../Helpers/Icons";
import Backdrop from "../Backdrop/Backdrop";
import DebouncedInput from "./DebouncedInput";

const SearchBar = ({
  columns,
  searchKey,
  setSearchKey,
  searchValue,
  setSearchValue,
}) => {
  const [open, setOpen] = useState(false);
  const columnsKeys = useMemo(
    () =>
      columns()
        ?.filter((c) => c?.id !== "select")
        ?.map((c) => c?.accessorKey),
    [columns?.length]
  );

  return (
    <form className="relative flex items-center">
      <div className="absolute inset-y-0 left-0 flex items-center pl-2 overflow-hidden">
        {!!setSearchKey ? (
          <button
            onClick={() => setOpen(true)}
            className=" text-gray-600 scale-90 mr-1"
          >
            <FilterIcon />
          </button>
        ) : null}
      </div>
      <DebouncedInput
        type="text"
        value={searchValue}
        id="search-navbar"
        className={`block w-full p-2  text-sm rounded-md dark:text-white text-gray-900 border border-gray-300  bg-gray-100 active:ring-blue-200 focus-visible:ring-blue-200 focus:ring-blue-500 focus:border-blue-500 ${
          !!columns ? "pl-10" : "pl-8"
        }`}
        placeholder={!!searchKey ? `Search in ${searchKey}` : "Search..."}
        onChange={(value) => {
          setSearchValue(value);
        }}
        // onBlur={(e) => {
        //   if (e?.target?.value === "") {
        //     setSearchValue("");
        //   }
        // }}
      />

      <span className="absolute top-2 ltr:right-2">
        <SearchIcon />
      </span>
      {open && columns ? (
        <>
          <Backdrop open={open} onClose={() => setOpen(false)} />
          <ul className="absolute z-[100] py-4 top-4 px-2 overflow-auto dark:bg-bgmaindark  bg-white shadow rounded-md w-full ">
            {columnsKeys?.map((col) => {
              return (
                <li
                  className="whitespace-nowrap cursor-pointer capitalize flex gap-2 items-center px-2 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSearchKey(col);
                    setOpen(false);
                  }}
                >
                  <span className="pointer-events-none">
                    <SearchIcon />
                  </span>
                  {col}
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </form>
  );
};

export default SearchBar;
