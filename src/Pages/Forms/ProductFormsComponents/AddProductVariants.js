import React, { useEffect } from "react";
import { useState } from "react";

import { MultipleIncreasableBar } from "../../../Components/Global/MultipleIncreasableBar";
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
  dropzoneRef,
  layout,
  listCountGlobalVariant,
  setListCountGlobalVariant,
}) => {
  const [refresh, setRefresh] = useState(false);
  const [files, setFiles] = React.useState([]);

  const increaseVariant = () => {
    setListCountGlobalVariant((prev) => {
      return {
        ...prev,
        [Object.keys(prev).length]: {
          sizes: {
            0: {
              stocks: {
                0: 0,
              },
            },
          },
        },
      };
    });
    setRefresh((p) => !p);
  };
  const decreaseVariant = (item, index) => {
    let newValues = allValues;
    delete newValues[item];
    setAllValues(newValues);
    let newList = listCountGlobalVariant;
    delete newList[index];
    setListCountGlobalVariant(newList);
    setRefresh((p) => !p);
  };

  return (
    <div className="mb-8">
      <MultipleIncreasableBar
        title={"Color"}
        list={Object.keys(listCountGlobalVariant)}
        activeTab={activeTabVariant}
        setActiveTab={setActiveTabVariant}
        increase={increaseVariant}
        decrease={(item, index) => decreaseVariant(item, index)}
      />
      {Object.keys(listCountGlobalVariant)?.map((item, index) => {
        return (
          <div
            className={`relative z-10 ${
              +activeTabVariant !== +index ? "hidden" : ""
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
              dropzoneRef={dropzoneRef}
              setListCountGlobalVariant={setListCountGlobalVariant}
              listCountGlobalVariant={listCountGlobalVariant}
              layout={layout}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AddProductVariants;
