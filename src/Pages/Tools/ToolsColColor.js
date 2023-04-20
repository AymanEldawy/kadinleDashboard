import React from "react";
import { memo } from "react";
import { useEffect } from "react";

import InputField from "../../Components/CustomForm/InputField";
import TableCol from "../../Components/CustomTable/TableCol";
import { Button } from "../../Components/Global/Button";
import { getValueOfInputColor } from "../../Helpers/functions";
import { EditIcon } from "../../Helpers/Icons";

const ToolsColColor = ({
  isUpdatable,
  changeApartmentName,
  insertColor,
  canInsertColor,
  setIsUpdatable,
  flatsDetails,
  CACHE_LIST_COLORS,
  apartmentNumber,
  removeOneItemColor,
  itemHash,
  tabName,
  CACHE_APARTMENTS,
  defaultInsertColor,
}) => {
  let itemData =
    CACHE_LIST_COLORS[
      flatsDetails?.[`${itemHash}&${tabName}`]?.FlatBuildingDetailsIndex
    ];
  let ItemColor = itemData?.Color;
  let itemValue = flatsDetails?.[`${itemHash}&${tabName}`]?.NO;
  useEffect(() => {
    if (CACHE_APARTMENTS[apartmentNumber]) {
      console.log('run...')
      defaultInsertColor(
        itemHash,
        tabName,
        CACHE_APARTMENTS[apartmentNumber],
        // CACHE_APARTMENTS[apartmentNumber]?.FlatBuildingDetailsIndex
      );
    }
  }, [apartmentNumber]);
  return (
    <TableCol
      classes="!p-0  border border-gray-400
  "
    >
      {isUpdatable === itemHash ? (
        <div className="px-1">
          <InputField
            type="number"
            className="h-full w-[93px] border-0 rounded-none focus-within:border-blue-400 focus:border"
            onKeyDown={(e) => {
              if (e.keyCode === 13) setIsUpdatable("");
            }}
            onBlur={(e) => {
              setIsUpdatable("");
            }}
            onChange={(e) => changeApartmentName(e, itemHash)}
            value={itemValue || apartmentNumber}
          />
        </div>
      ) : (
        <div
          onClick={() => {
            if (canInsertColor && !ItemColor) insertColor(tabName, itemHash);
            if (ItemColor) removeOneItemColor(tabName, itemHash);
          }}
          style={{
            background:
              typeof ItemColor === "number"
                ? getValueOfInputColor(ItemColor)
                : ItemColor,
          }}
          className={`${
            ItemColor ? "cursor-default" : "cursor-cell"
          } h-8 p-1 px-1 flex items-center justify-between tools-tab-item`}
        >
          <span className="bg-[#0005] text-white px-1 h-[22px] rounded-sm">
            {itemValue || apartmentNumber}
          </span>
          <div className="flex ml-3 rtl:mr-3 rtl:ml-auto">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsUpdatable(itemHash);
              }}
              classes="!p-0 scale-75"
              title={
                <span className="scale-75 block">
                  <EditIcon />
                </span>
              }
            />
          </div>
        </div>
      )}
    </TableCol>
  );
};

export default memo(ToolsColColor);
