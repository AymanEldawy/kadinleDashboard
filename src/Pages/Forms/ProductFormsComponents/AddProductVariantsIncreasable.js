import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import BlockPaper from "../../../Components/BlockPaper/BlockPaper";
import InputField from "../../../Components/CustomForm/InputField";
import SelectField from "../../../Components/CustomForm/SelectField";
import { IncreasableBar } from "../../../Components/Global/IncreasableBar";
import { UploadIcon } from "../../../Helpers/Icons";
import { AddStockIncreasable } from "./AddStockIncreasable";

const AddProductVariantsIncreasable = ({
  getCachedList,
  key,
  CACHED_TABLES_SKU,
  productSku,
  itemKey,
  allValues,
  setAllValues,
}) => {
  const [listSize, setListSize] = useState([0]);
  const [activeTabSize, setActiveTabSize] = useState(listSize[0]);

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

  console.log(allValues);
  console.log(getCachedList);
  return (
    <div className="mb-8" key={key}>
      <div>
        <BlockPaper containerClassName="!overflow-visible relative">
          <div className="grid grid-cols-2 gap-4 items-center pt-4 w-full">
            <SelectField
              values={allValues?.[itemKey]?.color_id}
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
              values={setAllValues?.[itemKey]?.size_id}
              label="Model size"
              name="model_size"
              list={!!getCachedList ? getCachedList("size_content") : []}
              keyValue={"size_id"}
              required
              className="flex-1 w-full"
              onChange={(e) =>
                handelChangeTopField("model_size", e.target.value, itemKey)
              }
            />
          </div>
          <div className="my-8">
            <Dropzone
              onChange={handleFiles}
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
          </div>
          <IncreasableBar
            title={"Size"}
            list={listSize}
            setList={setListSize}
            activeTab={activeTabSize}
            setActiveTab={setActiveTabSize}
          />
          {listSize?.map((item, index) => {
            let skuValue = `${productSku || ""} ${
              CACHED_TABLES_SKU?.["size"]?.[
                allValues?.[itemKey]?.sizes?.[item]?.size_id
              ] || ""
            } ${
              CACHED_TABLES_SKU?.["color"]?.[allValues?.[itemKey]?.color_id] ||
              ""
            } ${allValues?.[itemKey]?.sizes?.[item]?.pattern || ""} `;
            return (
              <div
                className={`relative z-10 ${
                  activeTabSize !== item ? "hidden" : ""
                } `}
                kye={`${index}-size`}
              >
                <div className="flex gap-4 flex-wrap mb-4">
                  <InputField
                    label={"Sku"}
                    name="sku"
                    value={skuValue}
                    readOnly
                  />
                  <InputField
                    values={setAllValues?.[itemKey]?.pattern}
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
                  />
                  <InputField
                    values={setAllValues?.[itemKey]?.weight}
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
                    values={setAllValues?.[itemKey]?.size_id}
                    label="Choose size"
                    name="size_id"
                    list={!!getCachedList ? getCachedList("size_content") : []}
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
                  getCachedList={getCachedList}
                  itemKey={itemKey}
                  subItemKey={item}
                  allValues={allValues}
                  setAllValues={setAllValues}
                />
              </div>
            );
          })}
        </BlockPaper>
      </div>
    </div>
  );
};

export default AddProductVariantsIncreasable;
