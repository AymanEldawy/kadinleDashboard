import React from "react";
import InputField from "../../Components/CustomForm/InputField";
import TableCol from "../../Components/CustomTable/TableCol";
import { CloseIcon, EditIcon } from "../../Helpers/Icons";
import { Button } from "../../Components/Global/Button";
import { memo } from "react";

const ToolsColColor = ({
  isUpdatable,
  changeApartmentName,
  tabName,
  indexY,
  indexX,
  insertColor,
  canInsertColor,
  setIsUpdatable,
  flatsDetails,
  CACHE_LIST_COLORS,
  removeOneItemColor,
}) => {
  let indexY_X =
    CACHE_LIST_COLORS[flatsDetails?.[tabName]?.[indexY]?.[indexX]?.index];
  let indexValue = flatsDetails?.[tabName]?.[indexY]?.[indexX]?.newValue;

  return (
    <TableCol
      classes="!p-0  border border-gray-400
  "
    >
      {isUpdatable === `${tabName}${indexY}${indexX}` ? (
        <div className="px-1">
          <InputField
            className="h-full w-[93px] border-0 rounded-none focus-within:border-blue-400 focus:border"
            onKeyDown={(e) => {
              if (e.keyCode === 13) setIsUpdatable("");
            }}
            onBlur={(e) => {
              setIsUpdatable("");
            }}
            onChange={(e) => changeApartmentName(tabName, indexY, indexX, e)}
            value={indexValue || indexX + 1}
          />
        </div>
      ) : (
        <div
          onClick={() => {
            if (canInsertColor && !indexY_X)
              insertColor(tabName, indexY, indexX);
            if (indexY_X) removeOneItemColor(tabName, indexY, indexX);
          }}
          style={{
            background: indexY_X?.Color,
          }}
          className={`${
            indexY_X ? "cursor-default" : "cursor-cell"
          } h-8 p-1 px-1 flex items-center justify-between tools-tab-item`}
        >
          <span className="bg-[#0005] text-white px-1 h-[22px] rounded-sm">
            {indexValue || indexX + 1}
          </span>
          <div className="flex ml-3 rtl:mr-3 rtl:ml-auto">
            {/* {indexY_X ? (
              <button
                className="px-1 bg-white text-red-500 rounded scale-75"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOneItemColor(tabName, indexY, indexX);
                }}
              >
                <CloseIcon className="h-4 w- scale-75 block" />
              </button>
            ) : null} */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsUpdatable(`${tabName}${indexY}${indexX}`);
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
