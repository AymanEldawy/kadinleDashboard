import React, { useEffect, useState } from "react";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { BookMarkIcon } from "../../Helpers/Icons";
import { useFetch } from "../../hooks/useFetch";
import { TableBar } from "../TableBar/TableBar";
import { getRowsById, removeItemsFrom } from "../../Api/globalActions";
import { toast } from "react-toastify";
import CustomTable from "../CustomTable/CustomTable";
import { useQuery } from "@tanstack/react-query";
import { getProductsView } from "../../Api/data";
import { CategoryMultiFilter } from "../TableBar/CategoryMultiFilter";
import SearchBar from "../SearchBar/SearchBar";

export const SelectedProductTable = ({
  additionalData,
  tableName,
  setRowSelection,
  rowSelection,
  setSelectedCategory,
  extraContent,
  onSaveChanges,
  categoryTitle
}) => {
  console.log("🚀 ~ categoryTitle:", categoryTitle)
  const { defaultLanguage, defaultRegion } = useGlobalOptions();
  const { getDataWithPagination } = useFetch();
  const [searchValue, setSearchValue] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [filterCategory, setFilterCategory] = useState();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [
      pageCount,
      filterCategory,
      defaultLanguage?.id,
      defaultRegion?.id,
      pagination?.pageIndex,
      pagination?.pageSize,
      searchValue,
      selectedColumn,
      open,
    ],
    keepPreviousData: true,
    queryFn: async () => {
      if (!defaultLanguage?.id) return [];
      let filter =
        filterCategory?.indexOf("Choose") !== -1 ? "" : filterCategory;
      const response = open
        ? await getProductsView(defaultLanguage?.id, Object.keys(rowSelection))
        : await getDataWithPagination(
            "product",
            pagination?.pageIndex + 1,
            pagination?.pageSize,
            {
              languageId: defaultLanguage?.id,
              regionId: defaultRegion?.id,
              filter,
              search: { key: selectedColumn, value: searchValue },
              ...additionalData,
            }
          );
      setPageCount(Math.ceil(response?.count / parseInt(pagination?.pageSize)));
      return response?.data;
    },
  });

  useEffect(() => {
    if (!!setSelectedCategory) setSelectedCategory(filterCategory);
  }, [filterCategory]);

  const columns = COMBINE_DB_API.combine_collection_product;

  return (
    <div>
      <div className="flex items-end gap-4 mb-6">
        {extraContent ? extraContent : null}

        <CategoryMultiFilter
          name={tableName}
          label={"select category"}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categoryTitle={categoryTitle}
        />
        <div className="relative">
          <SearchBar
            searchValue={searchValue}
            columns={columns}
            searchKey={selectedColumn}
            setSearchKey={setSelectedColumn}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="ml-auto flex gap-4">
          <button
            type="button"
            onClick={onSaveChanges}
            disabled={!Object.keys(rowSelection)?.length}
            title="Save Changes"
            className="p-2 rounded-md disabled:bg-gray-200 disabled:text-gray-600 bg-primary-blue text-white flex items-center gap-2 text-base"
          >
            <BookMarkIcon className="h-5 w-5" />
            Save
          </button>

          {open ? (
            <button
              onClick={() => setOpen(false)}
              className="bg-red-500 text-white whitespace-nowrap text-sm py-1 px-2 rounded-md"
            >
              Hide View
            </button>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="bg-green-500 text-white whitespace-nowrap text-sm py-1 px-2 rounded-md"
            >
              View Products
            </button>
          )}
        </div>
      </div>

      <CustomTable
        columns={columns}
        tableName={tableName}
        isLoading={isLoading}
        data={data}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </div>
  );
};
