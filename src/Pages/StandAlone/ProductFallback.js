import React, { useEffect, useMemo, useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { CategoryMultiFilter } from "../../Components/TableBar/CategoryMultiFilter";
import { Button } from "../../Components/Global/Button";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useQuery } from "@tanstack/react-query";
import {
  getCacheCategory,
  getCategoryProducts,
  getOfferProducts,
} from "../../Api/data";
import { SelectedProductTable } from "../../Components/SelectedProductsComponents/SelectedProductTable";
import { ChevronIcon } from "../../Helpers/Icons";
import LongArrow from "../../Components/icons/LongArrow";
import { processBatch } from "../../Helpers/functions";
import { useDelete } from "../../hooks/useDelete";
import { useAdd } from "../../hooks/useAdd";
import { toast } from "react-toastify";

const ProductFallback = () => {
  const { addItem } = useAdd();
  const { deleteItem } = useDelete();
  const { getData } = useFetch();
  const { upsertItem, updateItem } = useUpdate();
  const { getDataWithContent } = useFetch();
  const { defaultLanguage } = useGlobalOptions();
  const [category, setCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [rowSelection, setRowSelection] = useState([]);

  const getCategoryFallback = async () => {
    const res = await getDataWithContent("category", categoryId);
    setCategory(res?.data?.at(0));
  };

  const { data: oldProducts } = useQuery({
    queryKey: ["product_fallback", "products_list", category?.id],
    queryFn: async () => {
      const response = await getCategoryProducts(category?.id);
      let hashProduct = {};
      let selection = {};
      for (const product of response?.data) {
        hashProduct[product?.product_id] = product;
        selection[product?.product_id] = true;
      }
      setRowSelection(selection);
      return hashProduct;
    },
    enabled: !!category?.id,
  });
  console.log(oldProducts, "Object.keys(list)");

  const onSubmit = async () => {
    let newList = Object.keys(rowSelection);
    if (!newList) return;
    let insertedList = [];
    let list = oldProducts;

    for (const item of newList) {
      if (list?.[item]) {
        delete list[item];
      } else {
        insertedList.push({
          product_id: item,
          category_id: category?.id,
        });
      }
    }

    let deletedList = Object.keys(list);
    
    try {
      await Promise.all([
        insertedList.length > 0 &&
          processBatch(insertedList, async (batchList) => {
            await addItem("product_fallback", batchList);
          }),

        deletedList.length > 0 &&
          processBatch(deletedList, async (batchList, i, totalBatches) => {
            console.log("should delete", batchList);

            await deleteItem(
              "product_fallback",
              batchList,
              "product_id",
              false
            );
            toast.success(`Processing batch ${i + 1} of ${totalBatches}...`);
          }),
      ]);
      console.log(list, "list --fd");

      console.log("Category fallback product list processing completed.");
    } catch (error) {
      console.error("Error processing Category fallback product list:", error);
      throw error;
    }
  };

  return (
    <BlockPaper title="Category Fallback">
      {category ? (
        <div>
          <div className="mb-4 pb-2 border-b flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCategory(null)}
                className="bg-red-50 text-red-500 text-sm px-4 py-1 rounded-md hover:bg-red-500 hover:text-white duration-300"
              >
                <LongArrow className="h-6 w-6 -rotate-180 text-inherit text-" />
              </button>
              |
              <h3>
                {
                  category?.category_content?.find(
                    (c) => c?.language_id === defaultLanguage?.id
                  )?.title
                }
              </h3>
            </div>
            <p className="flex gap-1">
              Selected Products:
              <span className="font-extrabold text-lg">
                {Object.keys(rowSelection)?.length}
              </span>
            </p>
          </div>
          <SelectedProductTable
            onSaveChanges={onSubmit}
            tableName={"products slider"}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            setSelectedCategory={setCategoryId}
            // categoryTitle={category?.title || ""}
          />
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <CategoryMultiFilter
            name="fallback_product"
            filterCategory={categoryId}
            setFilterCategory={setCategoryId}
          />
          <Button
            title="Submit"
            disabled={!categoryId}
            classes="text-xs capitalize"
            onClick={getCategoryFallback}
          />
        </div>
      )}
    </BlockPaper>
  );
};

export default ProductFallback;
