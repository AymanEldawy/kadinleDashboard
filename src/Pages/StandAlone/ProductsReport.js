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
  getCategoriesTopLevel,
  getProductsForCategory,
  getSuppliersList,
} from "../../Api/data";
import { ChevronIcon, TrashIcon } from "../../Helpers/Icons";
import ReactPaginate from "react-paginate";
import { useDelete } from "../../hooks/useDelete";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import { LoadingProcess } from "../../Components/Global/LoadingProcess";

const ProductsReport = () => {
  const { defaultLanguage } = useGlobalOptions();
  const [categoryId, setCategoryId] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 50,
    pageIndex: 0,
  });

  const fetchProducts = async (languageId, categoryId, pageIndex, pageSize) => {
    try {
      const response =
        languageId &&
        (await getProductsForCategory(
          languageId,
          categoryId,
          pageIndex,
          pageSize
        ));
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
      "product report",
      defaultLanguage?.id,
      categoryId,
      pagination.pageSize,
      pagination.pageIndex,
    ],
    queryFn: () =>
      fetchProducts(
        defaultLanguage?.id,
        categoryId,
        pagination.pageIndex,
        pagination.pageSize
      ),
  });

  const { data: categories } = useQuery({
    queryKey: ["category report", defaultLanguage?.id],
    queryFn: async () => {
      if (!defaultLanguage?.id) return [];
      const categoriesTopLevel = await getCategoriesTopLevel(
        defaultLanguage?.id
      );
      return categoriesTopLevel;
    },
  });

  const handlePageClick = (event) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: event,
    }));
  };

  return (
    <>
      <div className="relative">
        {isLoading ? <LoadingProcess /> : null}
        <BlockPaper
          headerClassName="flex items-center justify-between"
          title={"Product Report"}
          contentBar={
            <div className="flex gap-4 items-center font-medium text-lg text-gray-700">
              <Select
                menuPlacement="auto"
                menuPortalTarget={document?.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                className="max-w-[150px]"
                options={categories}
                getOptionValue={({ id }) => id}
                getOptionLabel={({ content }) => {
                  console.log("🚀 ~ ProductsReport ~ content:", content);
                  return content?.at(0)?.title;
                }}
                onChange={(value) => {
                  setCategoryId(value?.id);
                }}
              />
              <span>
                Total Products:{" "}
                <span className="bg-gray-100 rounded-md px-2 py-1 border border-gray-200">
                  {data?.count}
                </span>
              </span>
            </div>
          }
        >
          <div className="flex justify-between items-center  dark:text-white border-t  shadow p-3 bg-white dark:bg-bgmaindark">
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
          <div className="border-y flex items-center bg-gray-200 dark:text-white dark:bg-[#2d2d2d] dark:border-[#343333]">
            <div className="p-2 flex-[2]">Product</div>
            <div className="p-2 flex-1">Supplier</div>
            <div className="p-2 flex-1">Category</div>
            <div className="p-2 flex-1">Brand</div>
          </div>
          {data?.products?.map((product) => {
            return (
              <div
                className={`border-y flex items-center dark:border-[#343333]  dark:text-white`}
              >
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
                  <span className="text-green-500 border border-green-500 px-2 py-1 rounded-md">
                    {product?.brand?.name}
                  </span>
                </div>
              </div>
            );
          })}
        </BlockPaper>
      </div>
    </>
  );
};

export default ProductsReport;
