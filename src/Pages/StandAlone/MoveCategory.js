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

const MoveCategory = () => {
  let name = "products_slider";
  const { defaultLanguage } = useGlobalOptions();
  const { updateItem, upsertItem } = useUpdate();
  const [selectedList, setSelectedList] = useState({});
  const [supplierId, setSupplierId] = useState("");
  const [category, setCategory] = useState("");
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
      console.log("🚀 ~ queryFn: ~ response:", data)
      return data;
    },
  });

  const { isLoading, refetch, data } = useQuery({
    queryKey: [
      "product",
      "supplier",
      defaultLanguage?.id,
      category,
      supplierId,
    ],
    queryFn: async () => {
      const response = await getTableDataWithPagination(
        "supplier_products",
        pagination?.pageIndex + 1,
        pagination?.pageSize,
        {
          languageId: defaultLanguage?.id,
          filter: category === "Select category" ? "" : category,
          supplierId: supplierId,
        }
      );

      return {
        count: response?.count,
        products: response?.data,
      };
    },
  });

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

      <div className="border-y flex items-center bg-gray-200">
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
            className={`border-y flex items-center ${
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
              <Link className="flex gap-2" to={`https://kadinle.com/product/${product?.product_sku}`} target="_blank">
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
    </BlockPaper>
  );
};

export default MoveCategory;
