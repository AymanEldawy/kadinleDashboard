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
  onSelectChange,
  itemsPerPage,
  columns,
  selectedList,
  hideDelete,
  allowFilter,
  filterCategory,
  setFilterCategory,
  customBarButtons,
  setSelectedColumn,
  selectedColumn,
  setSearchValue,
}) => {
  const { defaultLanguage, user } = useGlobalOptions();
  const { getData } = useFetch();
  const [categories, setCategories] = useState();

  useEffect(() => {
    if (allowFilter && defaultLanguage?.id) {
      getTableData("category_content", {
        languageId: defaultLanguage?.id,
      }).then((res) => {
        setCategories(res?.data);
      });
    }
  }, [allowFilter, defaultLanguage?.id]);

  return (
    <div className="flex justify-between gap-2 mb-4 flex-wrap max-[500px]:items-start ">
      <div className="flex gap-2 items-center">
        <div className="relative">
          <SearchBar
            columns={columns}
            searchKey={selectedColumn}
            setSearchKey={setSelectedColumn}
            setSearchValue={setSearchValue}
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
      {user?.role?.number > 2 && user?.role?.number < 5 ? (
        <div className="flex gap-2">
          {customBarButtons ? customBarButtons : null}
          {onAddClick ? (
            <button
              className="bg-blue-500 whitespace-nowrap text-sm text-white rounded p-2 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300"
              onClick={onAddClick}
            >
              add new
            </button>
          ) : null}
          {hideDelete ? null : (
            <button
              title="Delete all"
              className="bg-red-500 text-sm text-white rounded p-2 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300 disabled:bg-red-200"
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
      ) : null}
    </div>
  );
};
