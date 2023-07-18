import React, { useState } from "react";

import InputField from "../../../Components/CustomForm/InputField";
import SelectField from "../../../Components/CustomForm/SelectField";
import { IncreasableBar } from "../../../Components/Global/IncreasableBar";

export const AddStockIncreasable = ({
  getCachedList,
  itemKey,
  allValues,
  setAllValues,
  subItemKey,
  listStocks,
  setListStocks,
  activeTabStocks,
  setActiveTabStocks,
}) => {
  const handelChangeWarehouseField = (name, value, row, subRow) => {
    setAllValues((prev) => {
      return {
        ...prev,
        [row]: {
          ...prev?.[row],
          stocks: {
            ...prev?.[row]?.stocks,
            // [subRow]: {
            //   ...prev?.[row]?.stocks?.[subRow],
            [subRow]: {
              ...prev?.[row]?.stocks?.[subRow],
              [name]: value,
              // },
            },
          },
        },
      };
    });
  };
  const onDecrease = (row, index) => {
    console.log(row, "row");
    let stocks = allValues;
    delete stocks?.[itemKey]?.stocks?.[row];
    setAllValues(stocks);
  };

  return (
    <div>
      <IncreasableBar
        title={"Choose Warehouse"}
        list={listStocks}
        setList={setListStocks}
        activeTab={activeTabStocks}
        setActiveTab={setActiveTabStocks}
        onDecrease={onDecrease}
      />
      {listStocks?.map((item, index) => {
        return (
          <div
            className={`relative z-10 ${
              activeTabStocks !== item ? "hidden" : ""
            } `}
            kye={`${index}-warehouse`}
          >
            <div className="md:grid-cols-3 grid gap-4 flex-wrap mb-4">
              <SelectField
                value={allValues?.[itemKey]?.[item]?.warehouse_id}
                label="Product warehouse"
                name="warehouse_id"
                list={!!getCachedList ? getCachedList("warehouse") : []}
                keyValue={"id"}
                required
                onChange={(e) =>
                  handelChangeWarehouseField(
                    "warehouse_id",
                    e.target.value,
                    itemKey,
                    item
                  )
                }
              />
              <InputField
                value={allValues?.[itemKey]?.[item]?.stock}
                label={"stock"}
                name="stock"
                type="number"
                onChange={(e) =>
                  handelChangeWarehouseField(
                    "stock",
                    +e.target.value,
                    itemKey,
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
