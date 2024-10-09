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

export const SelectedProductTable = ({
  insertMany,
  additionalData,
  tableName,
  id,
  hideSearch,
  hideTableBar,
  setRowSelection,
  rowSelection,
  layout
}) => {
  console.log("🚀 ~ rowSelection:", rowSelection);
  const { defaultLanguage, defaultRegion } = useGlobalOptions();
  const { getDataWithPagination } = useFetch();
  const { getData } = useFetch();
  const [products, setProducts] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [filterCategory, setFilterCategory] = useState();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      pageCount,
      filterCategory,
      defaultLanguage?.id,
      defaultRegion?.id,
      pagination?.pageIndex,
      pagination?.pageSize,
      searchValue,
      selectedColumn,
    ],
    keepPreviousData: true,
    queryFn: async () => {
      if (!defaultLanguage?.id) return [];
      let filter =
        filterCategory?.indexOf("Choose") !== -1 ? "" : filterCategory;
      const response = await getDataWithPagination(
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

  const getProductsIds = async () => {
    const response =
      tableName === "sale"
        ? await getData("sale")
        : await getRowsById(`${tableName}_product`, `${tableName}_id`, id);
    let CACHE_PRODUCTS = {};
    let data = tableName === "sale" ? response : response?.data;
    for (const product of data) {
      CACHE_PRODUCTS[product?.product_id] = product?.product_id;
    }
    setRowSelection({ ...CACHE_PRODUCTS });
    setProducts({ ...CACHE_PRODUCTS });
  };

  useEffect(() => {
    if (layout !== "slider") getProductsIds();
  }, [id, layout]);

  const columns = COMBINE_DB_API.combine_collection_product;

  const handleDeleteItem = async (list = rowSelection) => {
    let loadLanguage = toast.loading("Please wait...");
    let table = tableName === "sale" ? tableName : `${tableName}_product`;
    const response = await removeItemsFrom(table, {
      table_id: id,
      ids: Object.keys(list),
      col: tableName !== "sale" ? `${tableName}_id` : undefined,
    });
    if (response.error) {
      toast.update(loadLanguage, {
        render: response.error || "Field remove, please try again",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.update(loadLanguage, {
        render: "Successfully removed",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      getProductsIds();
      setRefresh((p) => !p);
    }
  };

  const saveChanges = async () => {
    //loop of selected if
    console.log(rowSelection, "---", products);

    let productsList = Object.keys(products);
    let listOfIds = Object.keys(rowSelection);
    let deleteList = {};
    let insertList = {};
    if (productsList?.length) {
      for (const id of productsList) {
        if (!rowSelection?.[id]) {
          deleteList[id] = id;
        }
      }
      handleDeleteItem(deleteList);
    }
    if (listOfIds?.length) {
      for (const id of listOfIds) {
        if (!products?.[id]) {
          insertList[id] = id;
        }
      }
      await insertMany(insertList);
      getProductsIds();
    }
  };

  return (
    <div>
      {hideTableBar ? null : (
        <TableBar
          onDeleteClick={handleDeleteItem}
          setSearchValue={setSearchValue}
          // onSelectChange={setItemsPerPage}
          // itemsPerPage={itemsPerPage}
          selectedList={rowSelection}
          hideSearch={hideSearch}
          allowFilter
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          hideDelete
          customBarButtons={
            <>
              <button
                type="button"
                onClick={saveChanges}
                title="Save Changes"
                className="p-2 rounded-md bg-primary-blue text-white flex items-center gap-2 text-base"
              >
                <BookMarkIcon className="h-5 w-5" />
                Save
              </button>
            </>
          }
          columns={() => [
            { header: "name", accessorKey: "name" },
            { header: "product_sku", accessorKey: "product_sku" },
          ]}
          selectedColumn={selectedColumn}
          setSelectedColumn={setSelectedColumn}
        />
      )}

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
