import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const MoveCategory = () => {
  let name = "products_slider";
  const { defaultLanguage } = useGlobalOptions();
  const { updateItem } = useUpdate();
  const [selectedList, setSelectedList] = useState({});
  const [supplierId, setSupplierId] = useState("");
  const [category, setCategory] = useState("");
  const [pagination, setPagination] = useState({
    pageSize: 50,
    pageIndex: 0,
  });

  const [newCategoriesList, setNewCategoryList] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (productId, category_id) => {
      return updateProductCategory(productId, category_id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "product",
          "supplier",
          defaultLanguage?.id,
          category,
          supplierId,
        ]);
        toast.success(`Successfully update category for product`);
      },
      onError: (error) => {
        toast.success(`Failed to update category for product`);
      },
    }
  );
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
    console.log("🚀 ~ onSelectRow ~ e:", e);
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
    console.log(list, newCategory);
  };

  const onMoveOne = async (productId, productSku) => {
    // const response = await updateProductCategory(
    //   productId,
    //   newCategoriesList?.[productId]
    // );
    await mutation.mutateAsync(productId, newCategoriesList?.[productId]);

    // if (response?.error) {
    //   toast.success(`Failed to update category for product ${productSku}`);
    // } else {
    //   toast.success(`Successfully update category for product ${productSku}`);
    // }
  };

  const updateProductCategory = async (id, category_id) => {
    return await updateItem("product", {
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
            options={[
              { name: "Supplier 77", id: "77" },
              { name: "Supplier 22", id: "22" },
              { name: "Supplier 11", id: "11" },
            ]}
            getOptionLabel={({ name }) => name}
            getOptionValue={({ id }) => id}
            onChange={(value) => {
              setSupplierId(value?.id);
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
          <Button onClick={handleMoveAll} classes="" title="Save All" />
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
            <div className="p-2 flex-[2]">
              <div className="flex gap-2">
                <img
                  src={product?.product_image?.at(0)?.image}
                  alt=""
                  className="w-20 h-20 object-contain"
                />
                <ul className="capitalize font-medium text-sm">
                  <li>product sku: {product?.product_sku}</li>
                  <li>{product?.product_content?.at(0)?.name}</li>
                </ul>
              </div>
            </div>
            <div className="p-2 flex-1">
              <ul>
                <li>Supplier sku: {product?.seller_sku}</li>
                <li>Supplier id: {product?.supplier_id}</li>
              </ul>
            </div>
            <div className="p-2 flex-1">
              <span className="bg-orange-500 text-white px-2 py-1 text-sm rounded-md">
                {product?.category?.category_content?.at(0)?.name}
              </span>
            </div>
            <div className="p-2 flex-1">
              {isSelected ? (
                <span className="text-green-500 border border-green-500 px-2 py-1 rounded-md">
                  {newCategory?.title}
                </span>
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
                onClick={() => onMoveOne(product?.id)}
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
