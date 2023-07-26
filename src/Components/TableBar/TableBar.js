import React, { useEffect } from "react";
import { useState } from "react";

import { getTableData } from "../../Api/globalActions";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { ChevronIcon, TrashIcon } from "../../Helpers/Icons";
import { useFetch } from "../../hooks/useFetch";
import Backdrop from "../Backdrop/Backdrop";
import SelectField from "../CustomForm/SelectField";
import SearchBar from "../SearchBar/SearchBar";

const itemsListPerPages = [
  { id: "10", name: "Number of rows 10" },
  { id: "20", name: "Number of rows 20" },
  { id: "50", name: "Number of rows 50" },
  { id: "100", name: "Number of rows 100" },
  { id: "200", name: "Number of rows 200" },
  { id: "500", name: "Number of rows 500" },
];
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
  selectedList,
  hideDelete,
  allowFilter,
  filterCategory,
  setFilterCategory,
}) => {
  const { defaultLanguage } = useGlobalOptions();
  const { getData } = useFetch();
  const [categories, setCategories] = useState();

  useEffect(() => {
    if (allowFilter && defaultLanguage?.id) {
      getTableData("category_content", {
        languageId: defaultLanguage?.id,
      }).then((res) => {
        console.log("🚀 ~ file: TableBar.js:41 ~ getData ~ res:", res);
        setCategories(res?.data);
      });
    }
  }, [allowFilter, defaultLanguage?.id]);

  return (
    <div className="flex justify-between gap-2 mb-4">
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

        {allowFilter ? (
          <SelectField
            name="category"
            list={categories}
            keyValue="category_id"
            keyLabel="title"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 rounded-md"
          />
        ) : null}
        <SelectField
          hideText
          value={itemsPerPage}
          onChange={(e) => onSelectChange(e.target.value)}
          list={itemsListPerPages}
          className="p-2 rounded-md"
        />
      </div>
      <div className="flex gap-2">
        {onAddClick ? (
          <button
            className="bg-blue-500 whitespace-nowrap text-sm text-white rounded px-2 py-1 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300"
            onClick={onAddClick}
          >
            add new
          </button>
        ) : null}
        {hideDelete ? null : (
          <button
            className="bg-red-500 text-sm text-white rounded px-2 py-1 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300 disabled:bg-red-200"
            onClick={onDeleteClick}
            disabled={!Object.keys(selectedList)?.length}
          >
            <TrashIcon />{" "}
          </button>
        )}
        {/* <button
          className="bg-green-500 text-sm text-white rounded px-2 py-1 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300"
          onClick={onFilterClick}
        >
          Filter
        </button> */}
      </div>
    </div>
  );
};
