import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import {
  product as fields,
  product_content as fields_content,
  product_image as fields_image,
  product_variant as fields_variant,
  stock_fields,
} from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";
import AddProductForm from "./ProductFormsComponents/AddProductForm";
import AddProductImages from "./ProductFormsComponents/AddProductImages";
import AddProductVariants from "./ProductFormsComponents/AddProductVariants";
import AddSizeChart from "./ProductFormsComponents/AddSizeChart";
import { FormProductIncreasable } from "./ProductFormsComponents/FormProductIncreasable";

const CACHED_TABLE = [];
const CACHED_TABLES_SKU = [];
const STAGES = ["details", "variant", "size_chart"];

const checkSkuTable = async (tableName, getData) => {
  const data = await getData(tableName);
  let cache = {};
  for (const item of data) {
    cache[item?.id] = tableName === "size" ? item?.size_sku : item?.color_sku;
  }
  CACHED_TABLES_SKU[tableName] = cache;
};
const checkRefTable = async (fields, getData) => {
  if (!fields?.length) return;
  for (const field of fields) {
    let tableName = field?.tableName;
    if (
      field.key === "ref" &&
      !CACHED_TABLE[tableName] &&
      !field?.hide_in_add_form_add
    ) {
      const data = await getData(tableName);
      CACHED_TABLE[tableName] = data;
    }
  }
};

const getCachedList = (tableName) => {
  return CACHED_TABLE?.[tableName];
};

const AddProduct = ({ layout }) => {
  const params = useParams();
  const { addItem, status } = useAdd();
  const { getData } = useFetch();
  const { updateItem } = useUpdate();
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);

  const [productSku, setProductSku] = useState(null);
  const [productId, setProductId] = useState(null);
  const [activeStage, setActiveStage] = useState(STAGES[0]);
  const [productValues, setProductValues] = useState({});
  const [productContentValues, setProductContentValues] = useState({});
  const [allValues, setAllValues] = useState({});

  const { name: tableName, id } = params;
  const fetchData = async (table, id) => {
    if (CACHED_TABLE[tableName]) return;
    const response = await getData(table, id);
    setData(response?.[0]);
  };
  useEffect(() => {
    if (layout === "update") fetchData("product", id);
  }, []);

  useEffect(() => {
    let loadingToast = toast.loading("Loading ...");
    setLoading(true);
    checkRefTable(fields_content, getData);
    checkRefTable(fields_variant, getData);
    checkRefTable(fields_image, getData);
    checkRefTable(stock_fields, getData);
    checkRefTable(fields, getData).then((res) => {
      toast.update(loadingToast, {
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setLoading(false);
    }, []);
    checkRefTable(
      [
        {
          name: "chart",
          tableName: "chart",
          key: "ref",
          refId: "chart_id",
          refName: "number",
        },
      ],
      getData
    );
    checkSkuTable("color", getData);
    checkSkuTable("size", getData);
  }, []);

  useEffect(() => {
    if (productValues?.sku !== productSku) {
      setProductSku(productValues?.product_sku);
    }
    // if(productValues?.sku)
  }, [productValues]);

  // On Submit product
  const onSubmit = async (data) => {
    const response = await addItem("product", data);
    if (response) {
      setProductId(response?.data?.[0]?.id);
    }
  };

  // On Submit product content
  const onSubmitContent = async (data) => {
    const list = Object.values(data);
    if (list?.length && productId) {
      for (const item of list) {
        const response = await addItem(`product_content`, {
          ...item,
          [`product_id`]: productId,
        });
      }
    }
  };

  // submit product
  // submit contents
  // submit variants
  return (
    <div>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full z-[100] bg-[#0003]" />
      ) : null}
      <BlockPaper title={"Add Product"}>
        <div className="mb-4 border-b dark:border-[#333] flex flex-wrap w-full">
          {STAGES?.map((stage, index) => (
            <button
              className={`text-gray-500 px-4 text-sm border-b-2 dark:border-[#333] -mb-[2px] !gap-1 p-2 capitalize flex items-center ${
                stage === activeStage
                  ? "!border-primary-red text-primary-red font-medium"
                  : ""
              }`}
              onClick={() => setActiveStage(stage)}
            >
              {stage}
            </button>
          ))}
        </div>
        {activeStage === STAGES[0] ? (
          <AddProductForm
            getCachedList={getCachedList}
            initialFields={fields}
            values={productValues}
            setValues={setProductValues}
            onSubmit={onSubmit}
          />
        ) : null}
      </BlockPaper>
      {activeStage === STAGES[1] ? (
        <AddProductVariants
          getCachedList={getCachedList}
          fields_variant={fields_variant}
          fields_stock={stock_fields}
          productId={productId}
          productSku={productValues?.product_sku}
          CACHED_TABLES_SKU={CACHED_TABLES_SKU}
          allValues={allValues}
          setAllValues={setAllValues}
        />
      ) : null}
      {/* {activeStage === STAGES[2] ? (
        <AddProductImages
          getCachedList={getCachedList}
          fields_image={fields_image}
          productId={productId}
        />
      ) : null} */}
      {activeStage === STAGES[2] ? (
        <AddSizeChart getCachedList={getCachedList} productId={productId} />
      ) : null}
      {fields_content?.length && STAGES[0] === activeStage ? (
        <BlockPaper
          title={
            layout === "update"
              ? `Update ${tableName} Content / ${
                  data?.name || data?.title || data?.id
                }`
              : "Add Product Content"
          }
        >
          <FormProductIncreasable
            values={productContentValues}
            setValues={setProductContentValues}
            onSubmit={onSubmitContent}
            initialFields={fields_content}
            getCachedList={getCachedList}
            // maxCount={CACHED_TABLE?.language?.length || 3}
          />
        </BlockPaper>
      ) : null}
    </div>
  );
};

export default AddProduct;
