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
import {
  get_seller_products,
  getProductsForCategory,
  getSuppliersList,
} from "../../Api/data";
import { ChevronIcon, TrashIcon } from "../../Helpers/Icons";
import ReactPaginate from "react-paginate";
import { useDelete } from "../../hooks/useDelete";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import { LoadingProcess } from "../../Components/Global/LoadingProcess";

const MoveCategory = () => {
  let name = "products_slider";
  const { defaultLanguage } = useGlobalOptions();
  const { updateItem, updateInItems } = useUpdate();
  const { deleteItem: onDelete } = useDelete();
  const [isProgress, setIsProgress] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedList, setSelectedList] = useState({});
  const [supplierId, setSupplierId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [sellerSku, setSellerSku] = useState(null);
  const [category, setCategory] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 50,
    pageIndex: 0,
  });

  const [newCategoriesList, setNewCategoryList] = useState({});
  const [newCategory, setNewCategory] = useState(null);

  const { data: suppliers } = useQuery({
    queryKey: ["list", "suppliers"],
    queryFn: async () => {
      const data = await getSuppliersList();
      return data;
    },
  });

  const fetchProducts = async () => {
    try {
      const response = await get_seller_products(
        defaultLanguage?.id,
        supplierId || null,
        categoryId || null,
        sellerSku || null,
        pagination?.pageIndex,
        pagination?.pageSize
      );
      let products = response?.data?.products;
      let total_count = response?.data?.total_count;

      setPageCount(Math.ceil(total_count / parseInt(pagination?.pageSize)));

      return {
        count: total_count,
        products: products || [],
      };
    } catch (error) {
      // Handle errors as needed
      throw new Error("Failed to fetch products");
    }
  };

  const { isLoading, refetch, data } = useQuery({
    queryKey: [
      name,
      defaultLanguage?.id,
      categoryId,
      supplierId,
      sellerSku,
      pagination.pageSize,
      pagination.pageIndex,
    ],
    queryFn: () => fetchProducts(),
    // keepPreviousData: true, // Optional: keeps old data while fetching new data
    // staleTime: 0, // O
  });

  console.log(data,'-dsd');
  

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
    setIsProgress(true);
    let list = Object.keys(selectedList);
    const response = await updateInItems(
      "product",
      {
        category_id: newCategory?.id,
      },
      "id",
      list
    );

    if (response?.error) {
      toast.error(`Failed to update category for selected products`);
    } else {
      toast.success(`Successfully update category for selected products`);
    }
    setIsProgress(false);
  };

  const onMoveOne = async (productId, productSku) => {
    setIsProgress(true);

    const response = await updateProductCategory(
      productId,
      newCategoriesList?.[productId]
    );
    if (response?.error) {
      toast.error(`Failed to update category for product ${productSku}`);
    } else {
      toast.success(`Successfully update category for product ${productSku}`);
    }
    setIsProgress(false);
  };

  const updateProductCategory = async (id, category_id) => {
    return await updateItem("product", {
      id,
      category_id,
    });
  };

  const deleteSelectedProducts = async () => {
    setIsProgress(true);
    const response = await onDelete("product", Object.keys(selectedList));
    if (response?.error) {
      toast.error(`Failed to deleted products`);
    } else {
      toast.success(`Successfully deleted products`);
    }
    setSelectedList({});
    setIsProgress(false);
    setOpenConfirmation(false);
  };

  return (
    <>
      <ConfirmModal
        onConfirm={deleteSelectedProducts}
        open={openConfirmation}
        setOpen={setOpenConfirmation}
      />
      <div className="relative">
        {isProgress && openConfirmation ? <LoadingProcess /> : null}
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
              name={"change category"}
              filterCategory={category}
              setFilterCategory={setCategory}
            />
            <div className="flex items-center gap-2">
              Move To:{" "}
              <CategoryMultiFilter
                name={"select category"}
                setFilterCategory={() => {}}
                filterCategory={newCategory}
                outerChange={(value) => setNewCategory(value)}
              />
              <Button
                disabled={!newCategory || !Object.keys(selectedList)?.length}
                onClick={handleMoveAll}
                classes=""
                title="Save All"
              />
            </div>
            <button
              onClick={() => setOpenConfirmation(true)}
              disabled={!Object.keys(selectedList)?.length}
              className="ml-auto disabled:bg-red-200 disabled:cursor-not-allowed bg-red-500 hover:bg-red-700 p-2 rounded-md"
            >
              <TrashIcon className="text-white h-6 w-6" />
            </button>
          </div>

          <div className="flex justify-between items-center  dark:text-white border-t  shadow p-3 bg-white dark:bg-bgmaindark">
            <p>
              Selected Products:{" "}
              <span className="font-extrabold text-lg">
                {Object.keys(selectedList)?.length}
              </span>{" "}
            </p>
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
              className="pagination flex gap-6 items-center"
              activeClassName="bg-blue-500 p-1 px-2 rounded text-sm text-white"
              previousClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
              nextClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
              disabledClassName="text-gray-200 dark:text-gray-600"
            />
          </div>

          <div className="border-y flex items-center bg-gray-200 dark:text-white dark:bg-[#2d2d2d] dark:border-[#343333]">
            <div className="p-2 w-[50px]">
              <input
                type="checkbox"
                className="h-5 w-5"
                onChange={onSelectAll}
              />
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
                    to={`https://kadinle.com/product/${
                      product?.product_variant?.at(0)?.id
                    }`}
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
                          {newCategory?.category_content?.at(0)?.title}
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

          <div className="flex justify-between items-center  dark:text-white border-t  shadow p-3 bg-white dark:bg-bgmaindark">
            <p>
              Selected Products:{" "}
              <span className="font-extrabold text-lg">
                {Object.keys(selectedList)?.length}
              </span>{" "}
            </p>
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
              className="pagination flex  gap-6 items-center"
              activeClassName="bg-blue-500 p-1 px-2 rounded text-sm text-white"
              previousClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
              nextClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
              disabledClassName="text-gray-200 dark:text-gray-600"
            />
          </div>
        </BlockPaper>
      </div>
    </>
  );
};

export default MoveCategory;
