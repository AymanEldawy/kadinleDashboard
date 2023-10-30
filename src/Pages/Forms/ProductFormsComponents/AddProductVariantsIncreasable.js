import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import BlockPaper from "../../../Components/BlockPaper/BlockPaper";
import InputField from "../../../Components/CustomForm/InputField";
import SelectField from "../../../Components/CustomForm/SelectField";
import { FullImage } from "../../../Components/Global/FullImage/FullImage";
import { MultipleIncreasableBar } from "../../../Components/Global/MultipleIncreasableBar";
import { CloseIcon, UploadIcon } from "../../../Helpers/Icons";
import { useDelete } from "./../../../hooks/useDelete";
import { AddStockIncreasable } from "./AddStockIncreasable";

const AddProductVariantsIncreasable = ({
  getCachedList,
  key,
  layout,
  dropzoneRef,
  CACHED_TABLES_SKU,
  productSku,
  itemKey,
  allValues,
  setAllValues,
  activeTabSizes,
  setActiveTabSizes,
  listStocks,
  setListStocks,
  activeTabStocks,
  setActiveTabStocks,
  setListCountGlobalVariant,
  listCountGlobalVariant,
}) => {
  const { deleteItem } = useDelete();
  const [refresh, setRefresh] = useState();
  const handelChangeTopField = (name, value, row) => {
    setAllValues((prev) => {
      return {
        ...prev,
        [row]: {
          ...prev?.[row],
          [name]: value,
        },
      };
    });
  };
  const handelChangeSubField = (name, value, row, subRow) => {
    setAllValues((prev) => {
      return {
        ...prev,
        [row]: {
          ...prev?.[row],
          sizes: {
            ...prev?.[row]?.sizes,
            [subRow]: {
              ...prev?.[row]?.sizes?.[subRow],
              [name]: value,
            },
          },
        },
      };
    });
  };
  const handleFiles = (files) => handelChangeTopField("files", files, itemKey);
  const handleDeleteImage = async (row, imageId) => {
    setAllValues((prev) => {
      return {
        ...prev,
        [row]: {
          ...prev?.[row],
          oldMedia: prev?.[row]?.oldMedia?.filter(
            (item) => item?.id !== imageId
          ),
        },
      };
    });
    await deleteItem("product_image", [imageId]);
  };
  const increaseSize = () => {
    setListCountGlobalVariant((prev) => {
      return {
        ...prev,
        [itemKey]: {
          ...prev?.[itemKey],
          sizes: {
            ...prev?.[itemKey]?.sizes,
            [Object.keys(prev?.[itemKey]?.sizes).length]: {
              stocks: {
                0: 1,
              },
            },
          },
        },
      };
    });
    setRefresh((p) => !p);
  };
  const decreaseSize = (item, index) => {
    let newValues = allValues;
    delete newValues?.[itemKey]?.sizes?.[item];
    setAllValues(newValues);
    let newList = listCountGlobalVariant;
    delete newList?.[itemKey]?.sizes?.[item];
    setListCountGlobalVariant(newList);
    setRefresh((p) => !p);
  };

  return (
    <div className="mb-8" key={key}>
      <div>
        <BlockPaper containerClassName="!overflow-visible relative">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center pt-4 w-full">
            <SelectField
              value={allValues?.[itemKey]?.color_id}
              label="Product Color"
              name="color_id"
              list={!!getCachedList ? getCachedList("color_content") : []}
              keyValue={"color_id"}
              required
              className="flex-1 w-full"
              onChange={(e) =>
                handelChangeTopField("color_id", e.target.value, itemKey)
              }
            />
            <SelectField
              value={allValues?.[itemKey]?.size_id}
              label="Model size"
              name="size_id"
              list={!!getCachedList ? getCachedList("size_content") : []}
              keyValue={"size_id"}
              required
              className="flex-1 w-full"
              onChange={(e) =>
                handelChangeTopField("size_id", e.target.value, itemKey)
              }
            />
            <InputField
              label={"Pattern sku"}
              name="pattern_sku"
              value={allValues?.[itemKey]?.pattern_sku}
              onChange={(e) =>
                handelChangeTopField("pattern_sku", e.target.value, itemKey)
              }
            />
          </div>
          <div className="my-8">
            <Dropzone
              disableRipple={true}
              ref={dropzoneRef}
              onChange={handleFiles}
              multiple={true}
              // value={allValues?.[itemKey]?.files}
              className="hover:bg-gray-100 !border-solid rounded-md"
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <span className="scale-150">
                  <UploadIcon />
                </span>
                <p>Drop files here or click to upload.</p>
              </div>
            </Dropzone>
            <p className="mb-4 text-primary-red mt-2">
              {allValues?.[itemKey]?.files?.length} Selected Files
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {allValues?.[itemKey]?.files?.map((file) => (
                <FileMosaic
                  {...file}
                  key={file?.id}
                  preview
                  className="rounded-md bg-gray-100 p-1 border-b pb-2"
                  onDelete={() => {
                    setAllValues((prev) => {
                      return {
                        ...prev,
                        [itemKey]: {
                          ...prev?.[itemKey],
                          files: prev?.[itemKey]?.files?.filter(
                            (f) => f?.id !== file?.id
                          ),
                        },
                      };
                    });
                  }}
                />
              ))}
            </div>
            {layout === "update" ? (
              <div className="my-8 border-y pt-2 pb-4">
                <h4 className="text-gray-800 font-semibold text-lg">
                  Old Images
                </h4>
                <p className="text-yellow-500 text-xs bg-yellow-100 p-1 rounded-md my-1">
                  <strong className="text-yellow-400 font-medium">
                    Warning:{" "}
                  </strong>
                  by Removing the image will remove the old data storage for
                  this image
                </p>
                <div className="flex gap-4">
                  {allValues?.[itemKey]?.oldMedia?.map((img) => {
                    return (
                      <div key={img?.id} className="border p-[2px] bg-white dark:bg-bgmaindark rounded-sm shadow relative">
                        <button
                          onClick={() => handleDeleteImage(itemKey, img?.id)}
                          className="bg-gray-600 text-white h-4 w-4 absolute top-2 left-2 z-10 rounded-full flex items-center justify-center"
                        >
                          <CloseIcon className="h-3 w-3" />
                        </button>
                        <FullImage
                          src={img?.image}
                          alt="old media"
                          className="w-[140px] object-contain"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
          <MultipleIncreasableBar
            title={"Size"}
            list={
              listCountGlobalVariant?.[itemKey]?.sizes &&
              Object.keys(listCountGlobalVariant?.[itemKey]?.sizes)
            }
            activeTab={activeTabSizes}
            setActiveTab={setActiveTabSizes}
            increase={increaseSize}
            decrease={(item, index) => decreaseSize(item, index)}
          />
          {Object.keys(listCountGlobalVariant?.[itemKey]?.sizes)?.map(
            (item, index) => {
              let skuValue = `${productSku || ""} ${
                CACHED_TABLES_SKU?.["size"]?.[
                  allValues?.[itemKey]?.sizes?.[item]?.size_id
                ] || ""
              } ${
                CACHED_TABLES_SKU?.["color"]?.[
                  allValues?.[itemKey]?.color_id
                ] || ""
              } ${allValues?.[itemKey]?.pattern_sku || ""} `;
              return (
                <div
                  className={`relative z-10 ${
                    +activeTabSizes !== +index ? "hidden" : ""
                  } `}
                  kye={`${index}-size`}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-wrap mb-4">
                    <InputField
                      label={"Sku"}
                      name="sku"
                      value={skuValue}
                      readOnly
                    />
                    {/* <InputField
                    value={allValues?.[itemKey]?.sizes?.[item]?.pattern}
                    label={"pattern"}
                    name="pattern"
                    onChange={(e) =>
                      handelChangeSubField(
                        "pattern",
                        +e.target.value,
                        itemKey,
                        item
                      )
                    }
                  /> */}
                    <InputField
                      value={allValues?.[itemKey]?.sizes?.[item]?.weight}
                      label={"weight"}
                      name="weight"
                      onChange={(e) =>
                        handelChangeSubField(
                          "weight",
                          e.target.value,
                          itemKey,
                          item
                        )
                      }
                    />
                    <SelectField
                      value={allValues?.[itemKey]?.sizes?.[item]?.size_id}
                      label="Choose size"
                      name="size_id"
                      list={
                        !!getCachedList ? getCachedList("size_content") : []
                      }
                      keyValue={"size_id"}
                      required
                      onChange={(e) =>
                        handelChangeSubField(
                          "size_id",
                          e.target.value,
                          itemKey,
                          item
                        )
                      }
                    />
                  </div>
                  <AddStockIncreasable
                    layout={layout}
                    getCachedList={getCachedList}
                    itemKey={itemKey}
                    subItemKey={item}
                    allValues={allValues}
                    setAllValues={setAllValues}
                    listStocks={listStocks}
                    setListStocks={setListStocks}
                    activeTabStocks={activeTabStocks}
                    setActiveTabStocks={setActiveTabStocks}
                    listCountGlobalVariant={listCountGlobalVariant}
                    setListCountGlobalVariant={setListCountGlobalVariant}
                  />
                </div>
              );
            }
          )}
        </BlockPaper>
      </div>
    </div>
  );
};

export default AddProductVariantsIncreasable;
