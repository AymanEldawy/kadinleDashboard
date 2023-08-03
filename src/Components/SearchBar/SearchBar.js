import Backdrop from "../Backdrop/Backdrop";
import React from "react";
import { useState } from "react";

import { ChevronIcon, FilterIcon, SearchIcon } from "../../Helpers/Icons";

const SearchBar = ({
  columns,
  searchKey,
  setSearchKey,
  setSearchValue,
}) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const onSubmitSearch = (reset) => {
    if (search === '' && !reset) return;
    setSearchValue(search)
  }
  return (
    <div className="relative flex items-center">
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
      <input
        type="text"
        value={search}
        id="search-navbar"
        className={`block w-full p-2  text-sm rounded-md dark:text-white text-gray-900 border border-gray-300  bg-gray-100 active:ring-blue-200 focus-visible:ring-blue-200 focus:ring-blue-500 focus:border-blue-500 ${!!columns ? "pl-10" : "pl-8"
          }`}
        placeholder={!!searchKey ? `Search in ${searchKey}` : "Search..."}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        onBlur={e => {
          if (e?.target?.value === '') {
            onSubmitSearch('reset')
          }
        }}
      />

      <button onClick={onSubmitSearch} className="absolute top-2 ltr:right-2">
        <SearchIcon />
      </button>
      {open && columns ? (
        <>
          <Backdrop open={open} onClose={() => setOpen(false)} />
          <ul className="absolute z-[100] pb-4 overflow-auto max-h-[200px] bg-white shadow rounded-md w-full ">
            {columns?.map((col) => (
              <li
                className="whitespace-nowrap capitalize flex gap-2 items-center px-2 py-2 hover:bg-gray-200"
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
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default SearchBar;
