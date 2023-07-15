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
}) => {
  const [listWarehouse, setListWarehouse] = useState([0]);

  const [activeTabWarehouse, setActiveTabWarehouse] = useState(
    listWarehouse[0]
  );

  const handelChangeWarehouseField = (name, value, row, subRow) => {
    setAllValues((prev) => {
      return {
        ...prev,
        [row]: {
          ...prev?.[row],
          stocks: {
            ...prev?.[row]?.stocks,
            [subRow]: {
              ...prev?.[row]?.stocks?.[subRow],
              [name]: value,
            },
          },
        },
      };
    });
  };
  console.log(allValues?.[itemKey]?.stocks?.[subItemKey]);
  return (
    <div>
      <IncreasableBar
        title={"Choose Warehouse"}
        list={listWarehouse}
        setList={setListWarehouse}
        activeTab={activeTabWarehouse}
        setActiveTab={setActiveTabWarehouse}
      />
      {listWarehouse?.map((item, index) => {
        return (
          <div
            className={`relative z-10 ${
              activeTabWarehouse !== item ? "hidden" : ""
            } `}
            kye={`${index}-warehouse`}
          >
            <div className="flex gap-4 flex-wrap mb-4">
              <SelectField
                values={allValues?.[itemKey]?.[item]?.warehouse_id}
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
                    subItemKey,
                    item
                  )
                }
              />
              <InputField
                values={allValues?.[itemKey]?.[item]?.stock}
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
