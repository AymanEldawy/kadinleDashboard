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
import { getProductsList, getProductsView } from "../../Api/data";
import { CategoryMultiFilter } from "../TableBar/CategoryMultiFilter";
import SearchBar from "../SearchBar/SearchBar";

export const SelectedProductTable = ({
  additionalData,
  tableName,
  setRowSelection,
  rowSelection,
  setSelectedCategory,
  extraContent,
  hideCategoryFilter,
  onSaveChanges,
  categoryTitle,
  showIndex,
  param_ignore_ids,
  param_products_ids,
  param_price,
}) => {
  const { defaultLanguage, defaultRegion } = useGlobalOptions();
  const [searchValue, setSearchValue] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [filterCategory, setFilterCategory] = useState();
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

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
      param_products_ids,
      param_ignore_ids,
      param_price,
    ],
    keepPreviousData: true,
    queryFn: async () => {
      if (!defaultLanguage?.id) return [];
      let filter =
        filterCategory?.indexOf("Choose") !== -1 ? null : filterCategory;
      let filters = {};
      // param_name:"",
      // param_seller_sku,

      const response = await getProductsList({
        param_lang_id: defaultLanguage?.id,
        param_products_ids: open
          ? Object.keys(rowSelection)
          : param_products_ids
          ? param_products_ids
          : null,
        param_category_id: filter,
        param_offset: pagination?.pageIndex * pagination?.pageSize,
        param_limit: pagination?.pageSize,
        param_ignore_ids,
        param_price,
        ...filters,
      });

      setPageCount(
        Math.ceil(response?.total_count / parseInt(pagination?.pageSize))
      );
      return response?.products;
    },
  });

  useEffect(() => {
    if (!!setSelectedCategory) setSelectedCategory(filterCategory);
  }, [filterCategory]);

  const columns = COMBINE_DB_API.combine_collection_product;

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 mb-6">
        {extraContent ? extraContent : null}
        {hideCategoryFilter ? null : (
          <CategoryMultiFilter
            name={tableName}
            label={"select category"}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            categoryTitle={categoryTitle}
          />
        )}
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
        showIndex={showIndex}
        outerSelectedId={(row, relativeIndex, parent) => {
          return row?.product_id;
        }}
      />
    </div>
  );
};
