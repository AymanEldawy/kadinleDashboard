import React, { useState } from "react";

import InputField from "../../../Components/CustomForm/InputField";
import SelectField from "../../../Components/CustomForm/SelectField";
import { MultipleIncreasableBar } from "../../../Components/Global/MultipleIncreasableBar";
import { useDelete } from "../../../hooks/useDelete";

export const AddStockIncreasable = ({
  getCachedList,
  layout,
  itemKey,
  allValues,
  setAllValues,
  subItemKey,
  activeTabStocks,
  setActiveTabStocks,
  listCountGlobalVariant,
  setListCountGlobalVariant,
}) => {
  const { deleteItem } = useDelete();
  const [refresh, setRefresh] = useState(false);

  const handelChangeWarehouseField = (name, value, row, subRow, subSubRow) => {
    setAllValues((prev) => {
      return {
        ...prev,
        [row]: {
          ...prev?.[row],
          sizes: {
            ...prev?.[row]?.sizes,
            [subRow]: {
              ...prev?.[row]?.sizes?.[subRow],
              stocks: {
                ...prev?.[row]?.sizes?.[subRow]?.stocks,
                [subSubRow]: {
                  ...prev?.[row]?.sizes?.[subRow]?.stocks?.[subSubRow],
                  [name]: value,
                }
              },
            },
          },
        },
      };
    });
  };

  const increaseStock = () => {
    let key = Object.keys(
      listCountGlobalVariant?.[itemKey]?.sizes?.[subItemKey]?.stocks
    ).length;
    setListCountGlobalVariant((prev) => {
      return {
        ...prev,
        [itemKey]: {
          ...prev?.[itemKey],
          sizes: {
            ...prev?.[itemKey]?.sizes,
            [subItemKey]: {
              ...prev?.[itemKey]?.sizes?.[subItemKey],
              stocks: {
                ...prev?.[itemKey]?.sizes?.[subItemKey]?.stocks,
                [key]: key,
              },
            },
          },
        },
      };
    });
    setRefresh((p) => !p);
  };
  const decreaseStock = async (item, index) => {
    let newValues = allValues;
    let id = newValues?.[itemKey]?.sizes?.[subItemKey]?.stocks?.[item];
    if (id && layout === "update") {
      // delete item
      await deleteItem("stock", [id]);
    }
    delete newValues?.[itemKey]?.sizes?.[subItemKey]?.stocks?.[item];
    setAllValues(newValues);
    let newList = listCountGlobalVariant;
    delete newList?.[itemKey]?.sizes?.[subItemKey]?.stocks?.[item];
    setListCountGlobalVariant(newList);
    setRefresh((p) => !p);
  };

  return (
    <div>
      {layout === "update" ? (
        <p className="text-yellow-500 text-xs bg-yellow-100 p-1 mt-8 rounded-md my-1">
          <strong className="text-yellow-400 font-medium">Warning: </strong>
          by Removing the Warehouse tab will remove the whole data in the tab
        </p>
      ) : null}

      <MultipleIncreasableBar
        title={"Choose Warehouse"}
        list={Object.keys(
          listCountGlobalVariant?.[itemKey]?.sizes?.[subItemKey]?.stocks
        )}
        activeTab={activeTabStocks}
        setActiveTab={setActiveTabStocks}
        increase={increaseStock}
        decrease={(item, index) => decreaseStock(item, index)}
      />
      {Object.keys(
        listCountGlobalVariant?.[itemKey]?.sizes?.[subItemKey]?.stocks
      )?.map((item, index) => {
        let value = allValues?.[itemKey]?.sizes?.[subItemKey]?.stocks?.[item]
        return (
          <div
            className={`relative z-10 ${+activeTabStocks !== +index ? "hidden" : ""
              } `}
            kye={`${index}-warehouse`}
          >
            <div className="md:grid-cols-3 grid gap-4 flex-wrap mb-4">
              <SelectField
                value={value?.warehouse_id}
                label="Product warehouse"
                name="warehouse_id"
                list={!!getCachedList ? getCachedList("warehouse") : []}
                keyValue={"id"}
                required
                onChange={(option) =>
                  handelChangeWarehouseField(
                    "warehouse_id",
                    option?.id,
                    itemKey,
                    subItemKey,
                    item
                  )
                }
              />
              <InputField
                value={value?.stock}
                label={"stock"}
                name="stock"
                type="number"
                onChange={(e) =>
                  handelChangeWarehouseField(
                    "stock",
                    +e.target.value,
                    itemKey,
                    subItemKey,
                    item
                  )
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
