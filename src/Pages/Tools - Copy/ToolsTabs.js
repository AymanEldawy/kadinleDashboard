import React, { useEffect } from "react";
import { useState } from "react";

import Checkbox from "../../Components/CustomForm/Checkbox";
import Table from "../../Components/CustomTable/Table";
import TableBody from "../../Components/CustomTable/TableBody";
import TableCol from "../../Components/CustomTable/TableCol";
import TableHead from "../../Components/CustomTable/TableHead";
import TableHeadCol from "../../Components/CustomTable/TableHeadCol";
import TableRow from "../../Components/CustomTable/TableRow";
import ToolsColColor from "./ToolsColColor";

const ToolsTabs = ({
  data,
  insertColor,
  canInsertColor,
  flatsDetails,
  setFlatsDetails,
  removeFromColor,
  removeOneItemColor,
  CACHE_LIST_COLORS,
  tabs,
  selectedTab,
  setSelectedTab,
}) => {
  const [isUpdatable, setIsUpdatable] = useState("");
  const [refresh, setRefresh] = useState(false);
  const changeApartmentName = (e, itemGuid) => {
    setFlatsDetails((prev) => {
      return {
        ...prev,
        [`${itemGuid}&${selectedTab?.tabName}`]: {
          ...prev[itemGuid],
          NO: e.target.value,
        },
      };
    });
    setRefresh((p) => !p);
  };
  useEffect(() => {}, [refresh]);
  const selectAll = (e, indexY, data, direction) => {
    const { tabName } = selectedTab;
    if (e.target.checked) {
      if (direction === "vertical") {
        for (const rows in data) {
          for (let index = 0; index < data[rows].length; index++) {
            if (index === indexY) insertColor(tabName, data[rows][index]);
          }
        }
      }
      for (const item of data) {
        insertColor(tabName, item);
      }
    } else {
      removeFromColor(indexY, data, direction, tabName);
    }
    setRefresh((p) => direction);
  };
  const displayTable = (tab) => {
    const { tabName } = tab;
    let sortData = {};
    if (!data?.length) return;
    for (const row of data) {
      if (!sortData[row?.FloorNo]) sortData[row?.FloorNo] = [];
      if (row?.FloorNo) {
        sortData[row.FloorNo].push(row);
      }
    }
    let apartmentsLength = 0;
    for (const key in sortData) {
      if (apartmentsLength < sortData[key]?.length) {
        apartmentsLength = sortData[key]?.length;
      }
    }
    return (
      <>
        <TableHead classes="!bg-[#0099a5] text-white">
          {canInsertColor ? (
            <TableHeadCol classes="bg-gray-200 border border-gray-400 min-w-[20px]"></TableHeadCol>
          ) : null}
          {Array(apartmentsLength)
            .fill(0)
            .map((row, indexY) => (
              <TableHeadCol
                key={`${row}-${indexY}`}
                classes="border border-gray-400 min-w-[90px] !py-2 text-sm !px-2"
              >
                <div className="flex gap-1 justify-between items-center">
                  {canInsertColor ? (
                    <Checkbox
                      name={tabName}
                      className="mr-2 !ml-0"
                      onChange={(e) =>
                        selectAll(e, indexY, sortData, "vertical")
                      }
                    />
                  ) : null}
                  0{indexY + 1}
                </div>
              </TableHeadCol>
            ))}
        </TableHead>

        <TableBody>
          {Object.values(sortData).map((row, indexX) => (
            <TableRow key={`${row}-${indexX}`}>
              {canInsertColor ? (
                <TableCol classes="!p-0 !px-2  border border-gray-400">
                  <Checkbox
                    name={tabName}
                    // checked={save_X_Y_selected?.[tabName]}
                    // onChange={(e) => selectAll(e, xCount, indexY)}
                    onChange={(e) => selectAll(e, indexX, row)}
                  />
                </TableCol>
              ) : null}
              {row
                ?.sort((a, b) => a?.NO - b?.NO)
                ?.map((col, index) => (
                  <ToolsColColor
                    item={col}
                    key={`${index}-${col?.NO}`}
                    tabName={tabName}
                    apartmentNumber={col?.NO}
                    isUpdatable={isUpdatable}
                    changeApartmentName={changeApartmentName}
                    insertColor={insertColor}
                    canInsertColor={canInsertColor}
                    setIsUpdatable={setIsUpdatable}
                    CACHE_LIST_COLORS={CACHE_LIST_COLORS}
                    flatsDetails={flatsDetails}
                    removeOneItemColor={removeOneItemColor}
                  />
                ))}
            </TableRow>
          ))}
        </TableBody>
      </>
    );
  };
  return (
    <div className="">
      <div className="flex items-center text-left bg-gray-100 dark:bg-bgmaindark ">
        {tabs?.map((tab, index) => (
          <button
            onClick={() => setSelectedTab(tab)}
            key={`${index}-${tab?.tabName}`}
            className={`${
              selectedTab?.tabName === tab?.tabName
                ? "!text-black !font-medium dark:bg-borderdark dark:text-white bg-white"
                : ""
            } border p-2 px-4 text-sm text-gray-500 font-normal flex-1 capitalize whitespace-nowrap`}
          >
            {tab?.tabName}
          </button>
        ))}
      </div>
      <Table className="max-w-fit">
        {displayTable(selectedTab, data, insertColor, flatsDetails)}
      </Table>
    </div>
  );
};

export default ToolsTabs;
