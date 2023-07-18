import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { uploadProductImage } from "../../Api/upload";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";
import SuperForm from "../../Components/CustomForm/SuperForm";
import { product as fields, product_content as fields_content, product_image as fields_image, product_variant as fields_variant, stock_fields } from "../../Helpers/Forms/databaseApi";
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

// getRowsById(table, col, itemId)
const AddProduct = ({ layout }) => {
  const params = useParams();
  const { addItem, status } = useAdd();
  const { getData } = useFetch();
  // const { updateItem } = useUpdate();
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);
  const [productSku, setProductSku] = useState(null);
  const [productId, setProductId] = useState(null);
  const [activeStage, setActiveStage] = useState(STAGES[0]);

  // values & increasable list
  const [productValues, setProductValues] = useState({});
  const [productErrors, setProductErrors] = useState({});

  const [listContent, setListContent] = useState([uuidv4()]);
  const [activeTabContent, setActiveTabContent] = useState(listContent[0]);
  const [productContentValues, setProductContentValues] = useState({});
  const [contentErrors, setContentErrors] = useState({});

  const [listVariant, setListVariant] = useState([uuidv4()]);
  const [activeTabVariant, setActiveTabVariant] = useState(listVariant[0]);

  const [listSizes, setListSizes] = useState([uuidv4()]);
  const [activeTabSizes, setActiveTabSizes] = useState(listSizes[0]);

  const [listStocks, setListStocks] = useState([uuidv4()]);
  const [activeTabStocks, setActiveTabStocks] = useState(listStocks[0]);

  const [productVariantValues, setProductVariantValues] = useState({});
  const [variantErrors, setVariantErrors] = useState({});

  const [listChart, setListChart] = useState([uuidv4()]);
  const [activeTabChart, setActiveTabChart] = useState(listChart[0]);
  const [productChartValues, setProductChartValues] = useState({});
  const [chartErrors, setChartErrors] = useState({});
  const [chartIds, setChartIds] = useState(null);
  const [chartRowsLength, setChartRowsLength] = useState({
    [listChart]: 5,
  });

  const { name: tableName, id } = params;

  const fetchData = async (table, id) => {
    if (CACHED_TABLE[tableName]) return;
    const response = await getData(table, id);
    setData(response?.[0]);
  };

  useEffect(() => {
    if (layout === "update") {
      fetchData("product", id);
      fetchData("product", id, "content");
    }
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
  }, [productValues]);

  // On Submit product
  const onSubmit = async () => {
    console.log(productValues);
    console.log(productContentValues);
    console.log(productVariantValues);
    console.log(productChartValues);
    if (!productValues) return;
    const response = await addItem("product", productValues);
    if (response) {
      const id = response?.data?.[0]?.id;
      setProductId(response?.data?.[0]?.id);
      await onSubmitContent(id);
      await onSubmitProductVariants(id);
      await onSubmitChart(response?.data?.[0]?.id);
    }
  };

  // On Submit product content
  const onSubmitContent = async (productId) => {
    if (!productId) return;
    const list = Object.values(data);
    if (list?.length && productId) {
      for (const item of list) {
        await addItem(`product_content`, {
          ...item,
          [`product_id`]: productId,
        });
      }
    }
  };
  const onSubmitProductVariants = async (productId) => {
    if (!productId) {
      toast.error(`Failed to insert variant product_id is none`);
      return;
    }
    if (!productVariantValues) {
      toast.error(`Please fill the required fields`);
      return;
    }
    const valuesList = Object.values(productVariantValues);
    for (const values of valuesList) {
      const color_id = values?.color_id;
      const model_size = values?.model_size;
      const pattern_sku = values?.pattern_sku;
      if (values?.color_id && model_size) {
        const files = values?.files;
        const sizes = values?.sizes;
        const stocks = values?.stocks;
        if (values?.files) {
          for (const file of files) {
            // upload files
            const path = await uploadProductImage({
              productSku,
              colorSku: CACHED_TABLES_SKU?.color?.[color_id],
              file: file?.file,
            });

            if (!path?.url) {
              toast.error(`Failed to upload ${file?.name}`);
            } else {
              await addItem("product_image", {
                product_id: productId,
                color_id,
                size_id: model_size,
                image: path?.url,
                pattern_sku,
              });
            }
          }
        } else {
          toast.error(`image is required`);
        }

        // add variant
        for (const size of Object.values(sizes)) {
          const sku = `${productSku} ${CACHED_TABLES_SKU?.size?.[size?.id]} ${
            CACHED_TABLES_SKU?.color?.[color_id]
          } ${pattern_sku}`;
          const responseVariant = await addItem("product_variant", {
            product_id: productId,
            size_id: size?.size_id,
            pattern_sku,
            color_id,
            weight: size?.weight,
            sku,
          });
          const variantId = responseVariant?.data?.[0]?.id;
          if (variantId) {
            for (const stock of Object.values(stocks)) {
              await addItem("stock", {
                ...stock,
                variant_id: variantId,
              });
            }
          }
        }
      }
    }
  };

  const onSubmitChart = async (productId) => {
    if (!productId) return;
    const list = Object.values(productChartValues);
    const listHash = Object.keys(productChartValues);
    console.log(list, listHash);
    let length = list?.length;
    for (let i = 0; i < length; i++) {
      const chartId = chartIds?.[listHash[i]];
      for (const row of Object.values(list?.[i])) {
        console.log(row, row?.size_id, chartId, productId);
        if (row?.size_id && chartId && productId) {
          await addItem("chart_data", {
            ...row,
            product_id: productId,
            chart_id: chartId,
          });
        }
      }
    }
  };

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
            errors={productErrors}
            setErrors={setProductErrors}
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
          allValues={productVariantValues}
          setAllValues={setProductVariantValues}
          variantErrors={variantErrors}
          setVariantErrors={setVariantErrors}
          listVariant={listVariant}
          setListVariant={setListVariant}
          activeTabVariant={activeTabVariant}
          setActiveTabVariant={setActiveTabVariant}
          listSizes={listSizes}
          setListSizes={setListSizes}
          setListStocks={setListStocks}
          listStocks={listStocks}
          activeTabSizes={activeTabSizes}
          setActiveTabSizes={setActiveTabSizes}
          activeTabStocks={activeTabStocks}
          setActiveTabStocks={setActiveTabStocks}
        />
      ) : null}
      {activeStage === STAGES[2] ? (
        <AddSizeChart
          getCachedList={getCachedList}
          productId={productId}
          values={productChartValues}
          setValues={setProductChartValues}
          errors={chartErrors}
          setErrors={setChartErrors}
          listChart={listChart}
          chartIds={chartIds}
          setChartIds={setChartIds}
          setListChart={setListChart}
          activeTabChart={activeTabChart}
          setActiveTabChart={setActiveTabChart}
          chartRowsLength={chartRowsLength}
          setChartRowsLength={setChartRowsLength}
        />
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
            initialFields={fields_content}
            getCachedList={getCachedList}
            listCount={listContent}
            setListCount={setListContent}
            activeTab={activeTabContent}
            setActiveTab={setActiveTabContent}
            maxCount={CACHED_TABLE?.language?.length}
            errors={contentErrors}
            setErrors={setContentErrors}
          />
        </BlockPaper>
      ) : null}
      <div className="flex mt-12 gap-5 items-center justify-between">
        <button
          disabled={activeStage === STAGES[0]}
          className="p-2 rounded px-8 bg-primary-blue text-white disabled:bg-gray-200 disabled:text-gray-500"
          type="button"
          onClick={() => {
            let index = STAGES?.indexOf(activeStage);
            setActiveStage(STAGES?.[index - 1]);
          }}
        >
          Back
        </button>
        {activeStage === STAGES?.[2] ? (
          <button
            className="p-2 rounded px-8 bg-primary-blue text-white disabled:bg-gray-200 disabled:text-gray-500"
            onClick={onSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="p-2 rounded px-8 bg-primary-blue text-white disabled:bg-gray-200 disabled:text-gray-500"
            type="button"
            onClick={() => {
              let index = STAGES?.indexOf(activeStage);
              setActiveStage(STAGES?.[index + 1]);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
