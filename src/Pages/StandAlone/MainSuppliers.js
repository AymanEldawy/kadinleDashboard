import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link, NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import {
  getTableData,
  getTableDataWithPagination,
} from "../../Api/globalActions";
import { CategoryMultiFilter } from "../../Components/TableBar/CategoryMultiFilter";
import { Button } from "../../Components/Global/Button";
import SearchCategoryField from "../../Components/CustomForm/SearchCategoryField";
import Select from "react-select";
import { useUpdate } from "../../hooks/useUpdate";
import { toast } from "react-toastify";
import { getSuppliersList } from "../../Api/data";
import { ChevronIcon } from "../../Helpers/Icons";
import ReactPaginate from "react-paginate";
  
const MoveCategory = () => {
  let name = "products_slider";
  const { defaultLanguage } = useGlobalOptions();
  const { upsertItem } = useUpdate();
  const [selectedList, setSelectedList] = useState({});
  const [supplierId, setSupplierId] = useState("");
  const [category, setCategory] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 50,
    pageIndex: 0,
  });

  const [newCategoriesList, setNewCategoryList] = useState({});
  const [newCategory, setNewCategory] = useState("");

  const { data: suppliers } = useQuery({
    queryKey: ["list", "suppliers"],
    queryFn: async () => {
      const data = await getSuppliersList();
      return data;
    },
  });

  const fetchProducts = async (
    pageIndex,
    pageSize,
    languageId,
    category,
    supplierId
  ) => {
    try {
      const response = await getTableDataWithPagination(
        "supplier_products",
        pageIndex + 1, // Assuming pageIndex is zero-based and API expects 1-based
        pageSize,
        {
          languageId,
          filter: category === "Select category" ? "" : category,
          supplierId,
        }
      );
      setPageCount(Math.ceil(response?.count / parseInt(pagination?.pageSize)));

      return {
        count: response?.count,
        products: response?.data,
      };
    } catch (error) {
      // Handle errors as needed
      throw new Error("Failed to fetch products");
    }
  };

  const { isLoading, refetch, data } = useQuery({
    queryKey: [
      "product",
      defaultLanguage?.id,
      category,
      supplierId,
      pagination.pageSize,
      pagination.pageIndex,
    ],
    queryFn: () =>
      fetchProducts(
        pagination.pageIndex,
        pagination.pageSize,
        defaultLanguage?.id,
        category,
        supplierId
      ),
    keepPreviousData: true, // Optional: keeps old data while fetching new data
    staleTime: 0, // O
  });

  const handlePageClick = (event) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: event,
    }));
  };

  const onSelectRow = (e) => {
    let value = e.target.value;
    if (e.target.checked) {
      setSelectedList((prev) => ({
        ...prev,
        [value]: true,
      }));
    } else {
      const list = selectedList;
      delete list[e.target.value];
      setSelectedList({ ...list });
    }
  };

  const onSelectAll = (e) => {
    if (e.target.checked) {
      let hash = {};
      for (const product of data?.products) {
        hash[product?.id] = true;
      }
      setSelectedList(hash);
    } else {
      setSelectedList({});
    }
  };

  const handleMoveAll = async () => {
    let list = Object.keys(selectedList);
    let bulk = [];
    for (const id of list) {
      bulk.push({
        id,
        category_id: newCategory?.category_id,
      });
    }

    const response = await upsertItem("product", bulk);
    if (response?.error) {
      toast.success(`Failed to update category for selected products`);
    } else {
      toast.success(`Successfully update category for selected products`);
    }
  };

  const onMoveOne = async (productId, productSku) => {
    const response = await updateProductCategory(
      productId,
      newCategoriesList?.[productId]
    );
    if (response?.error) {
      toast.success(`Failed to update category for product ${productSku}`);
    } else {
      toast.success(`Successfully update category for product ${productSku}`);
    }
  };

  const updateProductCategory = async (id, category_id) => {
    return await upsertItem("product", {
      id,
      category_id,
    });
  };

  return (
    <BlockPaper
      headerClassName="flex items-center justify-between"
      title={"Changing Category"}
      contentBar={
        <div className="flex gap-4 items-center font-medium text-lg text-gray-700">
          <Select
            className="max-w-[150px]"
            options={suppliers}
            getOptionLabel={({ seller_file_id }) => seller_file_id}
            getOptionValue={({ seller_file_id }) => seller_file_id}
            onChange={(value) => {
              setSupplierId(value?.seller_file_id);
            }}
          />
          <span>
            Supplier id:{" "}
            <span className="bg-gray-100 rounded-md px-2 py-1 border border-gray-200">
              {supplierId}
            </span>{" "}
          </span>
          |
          <span>
            Total Products:{" "}
            <span className="bg-gray-100 rounded-md px-2 py-1 border border-gray-200">
              {data?.count}
            </span>
          </span>
        </div>
      }
    >
      <div className="my-4 flex items-center gap-4">
        <CategoryMultiFilter
          filterCategory={category}
          setFilterCategory={setCategory}
        />
        <div className="flex items-center gap-2 ">
          Move To:{" "}
          <SearchCategoryField
            value={newCategory}
            onChange={(value) => {
              setNewCategory(value);
            }}
          />
          <Button
            disabled={!newCategory || !Object.keys(selectedList)?.length}
            onClick={handleMoveAll}
            classes=""
            title="Save All"
          />
        </div>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="flex scale-75 ltr:rotate-180 rtl:-rotate-180">
            <ChevronIcon />
          </span>
        }
        onPageChange={({ selected }) => handlePageClick(selected)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        // forcePage={itemOffset}
        previousLabel={
          <span className="flex scale-75 rtl:rotate-180">
            <ChevronIcon />
          </span>
        }
        renderOnZeroPageCount={null}
        className="pagination flex  dark:text-white justify-end border-t  gap-6 items-center shadow p-3 bg-white dark:bg-bgmaindark"
        activeClassName="bg-blue-500 p-1 px-2 rounded text-sm text-white"
        previousClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
        nextClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
        disabledClassName="text-gray-200 dark:text-gray-600"
      />
      <div className="border-y flex items-center bg-gray-200 dark:text-white dark:bg-[#2d2d2d] dark:border-[#343333]">
        <div className="p-2 w-[50px]">
          <input type="checkbox" className="h-5 w-5" onChange={onSelectAll} />
        </div>
        <div className="p-2 flex-[2]">Product</div>
        <div className="p-2 flex-1">Supplier</div>
        <div className="p-2 flex-1">Category</div>
        <div className="p-2 flex-1">New Category</div>
        <div className="p-2 flex-1">Actions</div>
      </div>
      {data?.products?.map((product) => {
        let isSelected = selectedList?.[product?.id];
        return (
          <div
            className={`border-y flex items-center dark:border-[#343333]  dark:text-white ${
              isSelected ? "bg-gray-100" : ""
            }`}
          >
            <div className="p-2 w-[50px]">
              <input
                type="checkbox"
                checked={isSelected}
                value={product?.id}
                className="h-5 w-5"
                onChange={onSelectRow}
              />
            </div>
            <div className="p-2 flex-[2] hover:text-blue-500 hover:bg-gray-100 hover:shadow">
              <Link
                className="flex gap-2"
                to={`https://kadinle.com/product/${product?.product_sku}`}
                target="_blank"
              >
                <img
                  src={product?.product_image?.at(0)?.image}
                  alt=""
                  className="w-20 h-20 object-contain"
                />
                <ul className="capitalize font-medium text-sm">
                  <li>product sku: {product?.product_sku}</li>
                  <li>{product?.product_content?.at(0)?.name}</li>
                </ul>
              </Link>
            </div>
            <div className="p-2 flex-1">
              <ul>
                <li>Supplier sku: {product?.seller_sku}</li>
                <li>Supplier id: {product?.seller_file_id}</li>
              </ul>
            </div>
            <div className="p-2 flex-1">
              <span className="bg-orange-500 text-white px-2 py-1 text-sm rounded-md">
                {product?.category?.category_content?.at(0)?.name}
              </span>
            </div>
            <div className="p-2 flex-1">
              {isSelected ? (
                <>
                  {newCategory ? (
                    <span className="text-green-500 border border-green-500 px-2 py-1 rounded-md">
                      {newCategory?.title}
                    </span>
                  ) : (
                    <span className="text-red-500 border border-red-500 px-2 py-1 rounded-md">
                      Non-category
                    </span>
                  )}
                </>
              ) : (
                <SearchCategoryField
                  value={newCategoriesList?.[product?.id]}
                  onChange={(value) => {
                    setNewCategoryList((prev) => ({
                      ...prev,
                      [product?.id]: value.category_id,
                    }));
                  }}
                />
              )}
            </div>
            <div className="p-2 flex-1">
              <Button
                onClick={() => onMoveOne(product?.id, product?.product_sku)}
                classes=""
                title="Save"
                disabled={isSelected || !newCategoriesList?.[product?.id]}
              />
            </div>
          </div>
        );
      })}

      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <span className="flex  scale-75 ltr:rotate-180 rtl:-rotate-180">
              <ChevronIcon />
            </span>
          }
          onPageChange={({ selected }) => handlePageClick(selected)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          // forcePage={itemOffset}
          previousLabel={
            <span className="flex scale-75 rtl:rotate-180">
              <ChevronIcon />
            </span>
          }
          renderOnZeroPageCount={null}
          className="pagination flex  dark:text-white justify-end gap-6 items-center shadow p-3 bg-white dark:bg-bgmaindark"
          activeClassName="bg-blue-500 p-1 px-2 rounded text-sm text-white"
          previousClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
          nextClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
          disabledClassName="text-gray-200 dark:text-gray-600"
        />
      </div>
    </BlockPaper>
  );
};

export default MoveCategory;
