import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import AddProductForm from "../../Components/CustomForm/AddProductForm";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";
import SuperForm from "../../Components/CustomForm/SuperForm";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";
import DynamicForm from "./../Dynamics/DynamicForm";
import { PlusIcon } from "../../Helpers/Icons";
import AddProductVariants from "./AddProductVariants";

const CACHED_TABLE = [];
const STAGES = ["details", "variant", "images"];
const AddProduct = ({ layout }) => {
  const params = useParams();
  const { addItem, status } = useAdd();
  const { getData } = useFetch();
  const { updateItem } = useUpdate();
  const [data, setData] = useState({});

  const [resetForm, setResetForm] = useState(false);
  const [itemId, setItemId] = useState();
  const [increasableVariantsCount, setIncreasableVariantsCount] = useState([1]);
  const [activeStage, setActiveStage] = useState(STAGES[0]);
  const [productValues, setProductValues] = useState({});
  const [productContentValues, setProductContentValues] = useState({});
  const [productImagesValues, setProductImagesValues] = useState({});
  const [productVariantValues, setProductVariantValues] = useState({});
  const [productWarehouseValues, setProductWarehouseValues] = useState({});

  const { name: tableName, id } = params;

  const fields = DB_API?.product;
  const fields_content = DB_API?.product_content;
  const fields_variant = DB_API?.product_variant;
  const fields_image = DB_API?.product_image;
  const fields_color = DB_API?.product_color;
  const fields_size = DB_API?.product_size;
  const fields_stock = DB_API?.stock;
  const fetchData = async (table, id) => {
    const response = await getData(table, id);
    console.log(response?.[0]);
    setData(response?.[0]);
  };
  useEffect(() => {
    if (layout === "update") fetchData("product", id);
  }, [id]);
  useEffect(() => {
    checkRefTable(fields);
    checkRefTable(fields_content);
    checkRefTable(fields_variant);
    checkRefTable(fields_image);
  }, []);
  async function checkRefTable(fields) {
    // console.log(fields);
    if (!fields?.length) return;
    for (const field of fields) {
      if (field.key === "ref") {
        const data = await getData(field?.tableName);
        CACHED_TABLE[field?.tableName] = data;
      }
    }
  }
  const getCachedList = (tableName) => {
    // console.log(tableName);
    return CACHED_TABLE?.[tableName];
  };
  // On Submit product
  const onSubmit = async (data) => {
    if (layout === "update") {
      await updateItem(tableName, data);
    } else {
      const response = await addItem("product", data);
      if (response) {
        setItemId(response?.data?.[0].id);
      }
      if (status === "success") setResetForm(true);
    }
  };
  // On Submit product content

  const onSubmitContent = async (data) => {
    const list = Object.values(data);
    if (list?.length && itemId) {
      for (const item of list) {
        const response = await addItem(`product_content`, {
          ...item,
          [`product_id`]: itemId,
        });
        console.log(response, " -- ", item);
      }
    }
    console.log(data);
    // itemId
  };
  // On Submit product variant
  // On Submit product images

  return (
    <div>
      <BlockPaper title={"Add Product"}>
        <div className="mb-4 border-b flex flex-wrap w-full">
          {STAGES?.map((stage, index) => (
            <button
              className={`text-gray-500 px-4 text-sm border-b-2 -mb-[2px] !gap-1 p-2 capitalize flex items-center ${
                stage === activeStage
                  ? "border-primary-red text-primary-red font-medium"
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

        {activeStage === STAGES[2] ? (
          <AddProductForm
            getCachedList={getCachedList}
            initialFields={fields_image}
            values={productImagesValues}
            setValues={setProductImagesValues}
            onSubmit={onSubmit}
          />
        ) : null}
      </BlockPaper>
      {activeStage === STAGES[1] ? (
        <AddProductVariants
          getCachedList={getCachedList}
          fields_variant={fields_variant}
          productVariantValues={productVariantValues}
          setProductVariantValues={setProductVariantValues}
          increasableVariantsCount={increasableVariantsCount}
          fields_stock={fields_stock}
          setIncreasableVariantsCount={setIncreasableVariantsCount}
          productWarehouseValues={productWarehouseValues}
          setProductWarehouseValues={setProductWarehouseValues}
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
          <FormIncreasable
            values={productContentValues}
            setValues={setProductContentValues}
            onSubmit={onSubmitContent}
            initialFields={fields_content}
          />
        </BlockPaper>
      ) : null}
    </div>
  );
};

export default AddProduct;
