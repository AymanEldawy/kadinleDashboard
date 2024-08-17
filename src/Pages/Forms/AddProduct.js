import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import {
  getRowsById,
  getRowsByIds,
  getTableData,
} from "../../Api/globalActions";
import { uploadProductImage } from "../../Api/upload";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { useGlobalOptions } from "../../Context/GlobalOptions";
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
import AddProductVariants from "./ProductFormsComponents/AddProductVariants";
import AddSizeChart from "./ProductFormsComponents/AddSizeChart";
import { FormProductIncreasable } from "./ProductFormsComponents/FormProductIncreasable";
import { ChevronIcon } from "../../Helpers/Icons";

const CACHE_SIZE_CHART_CONTENT = {};
const CACHED_DATA_UPDATED = {};
const CACHED_TABLE = [];
const CACHED_TABLES_SKU = [];
const STAGES = ["details", "variant", "size_chart"];
const listStructure = {
  sizes: {
    0: {
      stocks: {
        0: 1,
      },
    },
  },
};

const IsUpdated = {
  PRODUCT: {},
  CONTENT: {},
  VARIANT: {},
  CHART: {},
};

const checkSkuTable = async (tableName, additionalData) => {
  const res = await getTableData(tableName, additionalData);
  let cache = {};
  for (const item of res?.data) {
    cache[item?.id] = tableName === "size" ? item?.size_sku : item?.color_sku;
  }
  CACHED_TABLES_SKU[tableName] = cache;
};
const checkRefTable = async (fields, additionalData) => {
  if (!fields?.length) return;
  for (const field of fields) {
    let tableName = field?.tableName;
    if (
      field.key === "ref" &&
      !CACHED_TABLE[tableName] &&
      !field?.hide_in_add_form_add
    ) {
      const res = await getTableData(tableName, additionalData);
      CACHED_TABLE[tableName] = res?.data;
    }
  }
};

const getCachedList = (tableName) => {
  return CACHED_TABLE?.[tableName];
};

// getRowsById(table, col, itemId)
const AddProduct = ({ layout }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { addItem, status } = useAdd();
  const { getData } = useFetch();
  const { updateItem } = useUpdate();
  const { CACHE_LANGUAGES, defaultLanguage, defaultRegion } =
    useGlobalOptions();

  const dropzoneRef = useRef();

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

  const [listCountGlobalVariant, setListCountGlobalVariant] = useState({
    0: listStructure,
  });

  const [activeTabVariant, setActiveTabVariant] = useState("0");
  const [activeTabSizes, setActiveTabSizes] = useState("0");
  const [activeTabStocks, setActiveTabStocks] = useState("0");
  const [productVariantValues, setProductVariantValues] = useState({});
  const [variantErrors, setVariantErrors] = useState({});

  const [listChart, setListChart] = useState(["0"]);
  const [activeTabChart, setActiveTabChart] = useState("0");
  const [productChartValues, setProductChartValues] = useState({});
  const [chartErrors, setChartErrors] = useState({});
  const [chartIds, setChartIds] = useState(null);
  const [chartRowsLength, setChartRowsLength] = useState();
  const [selectedChart, setSelectedChart] = useState({});

  const { id } = params;

  const fetchProductData = async () => {
    const response = await getData("product", id);
    setProductValues(response?.[0]);
    IsUpdated.PRODUCT = response?.[0];
  };
  const fetchProductContentData = async () => {
    const response = await getData("product", id, "content");
    let contentObject = {};
    for (const item of response) {
      contentObject[CACHE_LANGUAGES?.[item?.language_id]] = item;
    }
    const contentObjectKeys = Object.keys(contentObject);
    setProductContentValues(contentObject);
    setListContent(contentObjectKeys);
    setActiveTabContent(contentObjectKeys?.[0]);
    IsUpdated.CONTENT = contentObject;
  };

  const fetchProductVariant = async () => {
    const response = await getRowsById(
      "product_variant",
      "product_id",
      params?.id
    );

    const responseImages = await getRowsById(
      "product_image",
      "product_id",
      params?.id
    );

    let variantList = [];
    let filesList = [];

    for (const row of responseImages?.data) {
      const imageFile = new File([], row?.image);
      filesList.push({
        ...row,
        file: imageFile,
      });
    }

    const variants = response?.data;
    setActiveTabSizes(0);
    for (let i = 0; i < variants?.length; i++) {
      getStocksData(variants?.[i]?.id, i);
      setProductVariantValues((prev) => {
        return {
          ...prev,
          [i]: {
            ...variants?.[i],
            sizes: {
              0: {
                size_id: variants?.[i]?.size_id,
                weight: variants?.[i]?.weight,
              },
            },
            oldMedia: filesList?.filter(
              (img) =>
                img?.color_id === variants?.[i]?.color_id &&
                img?.size_id === variants?.[i]?.size_id
            ),
          },
        };
      });
      setListCountGlobalVariant((prev) => {
        return {
          ...prev,
          [i]: listStructure,
        };
      });

      variantList.push(i);
    }
    setActiveTabVariant(0);
    setActiveTabVariant(0);
    setActiveTabStocks(0);
    IsUpdated.VARIANT = productVariantValues;
  };

  const getStocksData = async (variantId, index) => {
    getRowsById("stock", "variant_id", variantId).then((res) => {
      const stocks = res?.data;
      for (let i = 0; i < stocks?.length; i++) {
        setProductVariantValues((prev) => {
          return {
            ...prev,
            [index]: {
              ...prev?.[index],
              sizes: {
                ...prev?.[index]?.sizes,
                0: {
                  ...prev?.[index]?.sizes?.["0"],
                  stocks: {
                    ...prev?.[index]?.sizes?.stocks,
                    [i]: stocks?.[i],
                  },
                },
              },
            },
          };
        });
      }
    });
  };

  const fetchProductChart = async () => {
    const responseChartData = await getRowsById(
      "chart_data",
      "product_id",
      params?.id
    );
    const chartIds = Array.from(
      new Set(responseChartData.data?.map((chart) => chart?.chart_id))
    );
    const responseChartHeader = await getRowsByIds(
      "chart_content",
      "chart_id",
      chartIds
    );
    let chartHeaderIds = {};
    let selectedChartContentData = {};
    for (const header of responseChartHeader?.data) {
      chartHeaderIds[header?.chart_id] = header?.chart_id;
      selectedChartContentData[header?.chart_id] = header;
    }
    let chartHeaderList = Object.keys(chartHeaderIds);
    setListChart(chartHeaderList);
    setChartIds(chartHeaderIds);
    setActiveTabChart(chartHeaderList?.[0]);
    setSelectedChart(selectedChartContentData);

    for (const chartRow of chartHeaderList) {
      let data = responseChartData?.data?.filter(
        (chart) => chart?.chart_id === chartRow
      );
      for (let i = 1; i <= data?.length; i++) {
        setProductChartValues((prev) => {
          return {
            ...prev,
            [chartRow]: {
              ...prev?.[chartRow],
              [i]: data[i - 1],
            },
          };
        });
      }
      setChartRowsLength((prev) => {
        return {
          ...prev,
          [chartRow]: data?.length,
        };
      });
    }
    IsUpdated.CHART = productChartValues;
  };
  const getChartContent = async (id) => {
    const response = await getTableData("chart_content", {
      languageId: defaultLanguage?.id,
    });
    for (const chart of response?.data) {
      CACHE_SIZE_CHART_CONTENT[chart?.chart_id] = chart;
    }
  };

  useEffect(() => {
    if (layout === "update") {
      fetchProductData();
      fetchProductContentData();
      fetchProductVariant();
      fetchProductChart();
    }
  }, [layout, params?.id]);

  useEffect(() => {
    if (!defaultLanguage?.id && !defaultRegion?.id) return;

    let loadingToast = toast.loading("Loading ...");
    setLoading(true);

    checkRefTable(fields_content, {
      languageId: defaultLanguage?.id,
      regionId: defaultRegion?.id,
    });

    checkRefTable(fields_variant, {
      languageId: defaultLanguage?.id,
      regionId: defaultRegion?.id,
    });

    checkRefTable(fields_image, {
      languageId: defaultLanguage?.id,
      regionId: defaultRegion?.id,
    });

    checkRefTable(stock_fields, {
      languageId: defaultLanguage?.id,
      regionId: defaultRegion?.id,
    });

    checkRefTable(fields, {
      languageId: defaultLanguage?.id,
      regionId: defaultRegion?.id,
    }).then((res) => {
      toast.update(loadingToast, {
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    });
    setLoading(false);

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
      { languageId: defaultLanguage?.id, regionId: defaultRegion?.id }
    );
    checkSkuTable("color", {
      languageId: defaultLanguage?.id,
      regionId: defaultRegion?.id,
    });
    checkSkuTable("size", {
      languageId: defaultLanguage?.id,
      regionId: defaultRegion?.id,
    });
    getChartContent();
  }, [defaultLanguage?.id, defaultRegion?.id]);

  useEffect(() => {
    if (productValues?.product_sku !== productSku) {
      setProductSku(productValues?.product_sku);
    }
  }, [productValues]);

  const onSubmit = async () => {
    if (!productValues) return;

    let loading = toast.loading("Loading ...");

    const response =
      layout !== "update"
        ? await addItem("product", productValues)
        : JSON.stringify(IsUpdated?.PRODUCT) !== JSON.stringify(productValues)
        ? await updateItem("product", productValues)
        : null;

    if (response || layout === "update") {
      const id = response?.data?.[0]?.id || params?.id;
      setProductId(id);
      await onSubmitContent(id);
      await onSubmitProductVariants(id);
      await onSubmitChart(id);
      if (layout === "update") {
        toast.update(loading, {
          render: "Great! Content has been updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(loading, {
          render: "Great! successfully added",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } else {
      if (
        JSON.stringify(IsUpdated?.PRODUCT) !== JSON.stringify(productValues)
      ) {
        toast.error("Opps, Failed to update the data please try again later");
      } else {
        toast.warning(
          "You didn't change the values, please update the product than press Submit"
        );
      }
    }
  };

  // On Submit product content
  const onSubmitContent = async (productId) => {
    if (!productId && layout !== "update") return;

    const list = Object.values(productContentValues);
    if (list?.length) {
      for (const item of list) {
        if (item?.id) {
          if (
            JSON.stringify(IsUpdated?.CONTENT) !==
            JSON.stringify(productContentValues)
          )
            await updateItem(`product_content`, item);
        } else {
          await addItem(`product_content`, {
            ...item,
            [`product_id`]: layout === "update" ? params?.id : productId,
          });
        }
      }
    }
  };

  const onSubmitProductVariants = async (productId) => {
    if (!productId && layout !== "update") {
      toast.error(`Failed to insert variant product_id is none`);
      return;
    }
    if (!productVariantValues) {
      toast.error(`Please fill the required fields`);
      return;
    }
    const valuesList = Object.values(productVariantValues);
    // the process for upload image it's running in the same update or add
    // because the files data is always contain the new data
    for (const values of valuesList) {
      const color_id = values?.color_id;
      const mainSizeId = values?.size_id;
      const pattern_sku = values?.pattern_sku;
      if (values?.color_id && mainSizeId) {
        const files = values?.files;
        const sizes = values?.sizes;
        let variantId = null;
        for (const size of Object.values(sizes)) {
          const sku = `${productSku} ${+CACHED_TABLES_SKU?.size?.[
            size?.size_id
          ]} ${CACHED_TABLES_SKU?.color?.[color_id]} ${pattern_sku}`;
          let item = {
            product_id: layout === "update" ? params?.id : productId,
            size_id: size?.size_id,
            pattern_sku,
            color_id,
            weight: size?.weight,
            sku,
          };
          if (values?.id) {
            if (
              JSON.stringify(IsUpdated?.VARIANT) !==
              JSON.stringify(productVariantValues)
            ) {
              await updateItem("product_variant", { ...item, id: values?.id });
            }
            variantId = values?.id;
          } else {
            const responseVariant = await addItem("product_variant", item);
            variantId = responseVariant?.data?.[0]?.id;
          }
          if (variantId) {
            for (const stock of Object.values(size?.stocks)) {
              if (stock?.id) {
                await updateItem("stock", stock);
              } else {
                await addItem("stock", {
                  ...stock,
                  variant_id: variantId,
                });
              }
            }
          }
        }

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
                product_id: layout === "update" ? params?.id : productId,
                color_id,
                size_id: mainSizeId,
                image: path?.url,
                pattern_sku,
              });
            }
          }
        } else {
          if (layout !== "update") {
            toast.error(`image is required`);
            return;
          }
        }
      }
    }
  };

  const onSubmitChart = async (productId) => {
    if (!productId && layout !== "update") return;

    const list = Object.values(productChartValues);
    const listHash = Object.keys(productChartValues);
    let length = list?.length;
    for (let i = 0; i < length; i++) {
      const chartId = chartIds?.[listHash[i]];
      for (const row of Object.values(list?.[i])) {
        if (row?.id) {
          if (
            JSON.stringify(IsUpdated?.CHART) !==
            JSON.stringify(productChartValues)
          )
            await updateItem("chart_data", row);
        } else {
          if (row?.size_id && chartId && productId) {
            await addItem("chart_data", {
              ...row,
              product_id: layout === "update" ? params?.id : productId,
              chart_id: chartId,
            });
          }
        }
      }
    }
  };

  return (
    <div>
      <div className="my-2">
        <button
          onClick={() => navigate(-1)}
          className="flex gap-2 items-center border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 duration-300 px-3 py-1 text-sm rounded-md"
        >
          <ChevronIcon className="rotate-90 w-4 h-4" /> Back
        </button>
      </div>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full z-[100] bg-[#0003]" />
      ) : null}
      <BlockPaper
        title={
          layout === "update"
            ? `Update product/ ${productValues?.product_sku || ""}`
            : "Add new Product"
        }
      >
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
      {fields_content?.length && STAGES[0] === activeStage ? (
        <BlockPaper
          title={
            layout === "update"
              ? "Update product Content"
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
            layout={layout}
          />
        </BlockPaper>
      ) : null}
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
          activeTabVariant={activeTabVariant}
          setActiveTabVariant={setActiveTabVariant}
          activeTabSizes={activeTabSizes}
          setActiveTabSizes={setActiveTabSizes}
          activeTabStocks={activeTabStocks}
          setActiveTabStocks={setActiveTabStocks}
          dropzoneRef={dropzoneRef}
          listCountGlobalVariant={listCountGlobalVariant}
          setListCountGlobalVariant={setListCountGlobalVariant}
          layout={layout}
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
          selectedChart={selectedChart}
          setSelectedChart={setSelectedChart}
          layout={layout}
          CACHE_SIZE_CHART_CONTENT={CACHE_SIZE_CHART_CONTENT}
        />
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
