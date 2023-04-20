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
  row,
  selectedTab,
  setSelectedTab,
  CACHE_APARTMENTS,
}) => {
  const [isUpdatable, setIsUpdatable] = useState("");
  const [refresh, setRefresh] = useState(false);
  const changeApartmentName = (e, itemHash) => {
    setFlatsDetails((prev) => {
      return {
        ...prev,
        [`${itemHash}&${selectedTab?.tabName}`]: {
          ...prev[`${itemHash}&${selectedTab?.tabName}`],
          NO: e.target.value,
        },
      };
    });
    setRefresh((p) => !p);
  };
  const defaultInsertColor = (itemHash, tabName, data, index) => {
    console.log(itemHash, tabName, index);
    setFlatsDetails((prev) => {
      return {
        ...prev,
        [`${itemHash}&${tabName}`]: {
          ...data,
          // FlatBuildingDetailsIndex: index,
        },
      };
    });
    console.log(flatsDetails);
  };
  useEffect(() => {}, [refresh]);
  const selectAll = (e, index, count, direction) => {
    const { tabName } = selectedTab;
    if (e.target.checked) {
      if (direction === "vertical") {
        for (let i = 0; i < count; i++) {
          let itemHash = `${tabName}-${i + 1}0${index + 1}`;
          insertColor(tabName, itemHash);
          console.log(itemHash);
        }
      } else {
        for (let i = 0; i < count; i++) {
          let itemHash = `${tabName}-${index + 1}0${i + 1}`;
          insertColor(tabName, itemHash);
          console.log(itemHash);
        }
      }
    } else {
      removeFromColor(index, count, direction, tabName);
    }
    setRefresh((p) => direction);
  };
  const displayTable = (tab) => {
    const { tabName } = tab;
    let xCount = row[tab?.x];
    let yCount = row[tab?.y];
    console.log(xCount, yCount);
    return (
      <>
        <TableHead classes="!bg-[#0099a5] text-white">
          {canInsertColor ? (
            <TableHeadCol classes="bg-gray-200 border border-gray-400 min-w-[20px]"></TableHeadCol>
          ) : null}
          {Array(yCount)
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
                      onChange={(e) => selectAll(e, indexY, yCount, "vertical")}
                    />
                  ) : null}
                  0{indexY + 1}
                </div>
              </TableHeadCol>
            ))}
        </TableHead>

        <TableBody>
          {Array(yCount)
            .fill(0)
            .map((r, indexX) => (
              <TableRow key={`${r}-${indexX}`}>
                {canInsertColor ? (
                  <TableCol classes="!p-0 !px-2  border border-gray-400">
                    <Checkbox
                      name={tabName}
                      onChange={(e) => selectAll(e, indexX, yCount)}
                    />
                  </TableCol>
                ) : null}
                {Array(yCount)
                  .fill(0)
                  .map((r, indexY) => (
                    <>
                      <ToolsColColor
                        item={{}}
                        // item={col}
                        key={`${indexY}-${row}`}
                        itemHash={`${tabName}-${indexX + 1}0${indexY + 1}`}
                        tabName={tabName}
                        apartmentNumber={`${tabName[0]} ${indexX + 1}0${
                          indexY + 1
                        }`}
                        defaultInsertColor={defaultInsertColor}
                        CACHE_APARTMENTS={CACHE_APARTMENTS}
                        isUpdatable={isUpdatable}
                        changeApartmentName={changeApartmentName}
                        insertColor={insertColor}
                        canInsertColor={canInsertColor}
                        setIsUpdatable={setIsUpdatable}
                        CACHE_LIST_COLORS={CACHE_LIST_COLORS}
                        flatsDetails={flatsDetails}
                        removeOneItemColor={removeOneItemColor}
                      />
                    </>
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
