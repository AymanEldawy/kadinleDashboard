import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { uploadProductImage } from "../../../Api/upload";
import { Button } from "../../../Components/Global/Button";
import { CloseIcon, PlusIcon } from "../../../Helpers/Icons";
import { useAdd } from "../../../hooks/useAdd";
import { IncreasableBar } from "./../../../Components/Global/IncreasableBar";
import AddProductVariantsIncreasable from "./AddProductVariantsIncreasable";

const AddProductVariants = ({
  getCachedList,
  productId,
  CACHED_TABLES_SKU,
  productSku,
  setAllValues,
  allValues,
  variantErrors,
  setVariantErrors,
  listVariant,
  setListVariant,
  activeTabVariant,
  setActiveTabVariant,
  listSizes,
  setListSizes,
  activeTabSizes,
  setActiveTabSizes,
  listStocks,
  setListStocks,
  activeTabStocks,
  setActiveTabStocks,
}) => {
  const { addItem } = useAdd();
  const [files, setFiles] = React.useState([]);

  const onDecrease = (row, index) => {
    console.log(row, "row");
    let newValues = allValues;
    delete newValues?.[row];
    setAllValues(newValues);
  };

  return (
    <div className="mb-8">
      <IncreasableBar
        title={"Color"}
        list={listVariant}
        setList={setListVariant}
        activeTab={activeTabVariant}
        setActiveTab={setActiveTabVariant}
        onDecrease={onDecrease}
      />
      {listVariant?.map((item, index) => {
        return (
          <div
            className={`relative z-10 ${
              activeTabVariant !== item ? "hidden" : ""
            } `}
            kye={`${index}-index`}
          >
            <AddProductVariantsIncreasable
              getCachedList={getCachedList}
              productId={productId}
              CACHED_TABLES_SKU={CACHED_TABLES_SKU}
              productSku={productSku}
              files={files}
              setFiles={setFiles}
              itemKey={item}
              allValues={allValues}
              setAllValues={setAllValues}
              variantErrors={variantErrors}
              setVariantErrors={setVariantErrors}
              listSizes={listSizes}
              setListSizes={setListSizes}
              activeTabSizes={activeTabSizes}
              setActiveTabSizes={setActiveTabSizes}
              listStocks={listStocks}
              setListStocks={setListStocks}
              activeTabStocks={activeTabStocks}
              setActiveTabStocks={setActiveTabStocks}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AddProductVariants;
