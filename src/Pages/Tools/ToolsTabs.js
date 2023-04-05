import React, { useEffect } from "react";
import { useState } from "react";
import Table from "../../Components/CustomTable/Table";
import TableHead from "../../Components/CustomTable/TableHead";
import TableHeadCol from "../../Components/CustomTable/TableHeadCol";
import TableBody from "../../Components/CustomTable/TableBody";
import TableRow from "../../Components/CustomTable/TableRow";
import TableCol from "../../Components/CustomTable/TableCol";
import Checkbox from "../../Components/CustomForm/Checkbox";
import ToolsColColor from "./ToolsColColor";
// BHouseFlatCount
const tabs = [
  { tabName: "Flats", x: "ApartmentCountOfFloor", y: "FloorCount" },
  { tabName: "Pent Houses", x: "BHouseFloor", y: "BHouseFlatCount" },
  { tabName: "Mezzanine", x: "MBalanceFloor", y: "MBalanceFlatCount" },

  { tabName: "Offices", x: "OfficeFloor", y: "OfficeCount" },

  { tabName: "Car parking", x: "ParkingFloor", y: "ParkingCount" },
  {
    tabName: "Underground parking",
    x: "ParkingFloorUnder",
    y: "ParkingCountUnder",
  },
  { tabName: "Shops", x: "ShopCount", y: "" },
  { tabName: "Driver flats", x: "FlatDriverCount", y: "" },
  { tabName: "Servant flats", x: "FlatServantCount", y: "" },
];

let save_X_Y_selected = {};

const ToolsTabs = ({
  data,
  insertColor,
  canInsertColor,
  flatsDetails,
  setFlatsDetails,
  removeFromColor,
  removeOneItemColor,
  CACHE_LIST_COLORS,
}) => {
  const [activeStage, setActiveStage] = useState(tabs[0]);
  const [isUpdatable, setIsUpdatable] = useState("");
  const [refresh, setRefresh] = useState(false);
  const changeApartmentName = (tabName, indexY, indexX, e) => {
    setFlatsDetails((prev) => {
      return {
        ...prev,
        [tabName]: {
          ...prev?.[tabName],
          [indexY]: {
            ...prev?.[tabName]?.[indexY],
            [indexX]: {
              ...prev?.[tabName]?.[indexY]?.[indexX],
              newValue: e.target.value,
            },
          },
        },
      };
    });
  };

  console.log("CACHE_LIST_COLORS", CACHE_LIST_COLORS);
  console.log("flatsDetails", flatsDetails);
  const changeTab = (tab) => {
    setActiveStage(tab);
  };
  const selectAll = (e, x, y, direction) => {
    const tabName = activeStage?.tabName;
    if (e.target.checked) {
      let count = direction == "vertical" ? y : x;
      for (let index = 0; index < count; index++) {
        if (direction === "vertical") {
          // save_X_Y_selected[tabName] = {
          //   ...save_X_Y_selected?.[tabName],
          //   x: x,
          //   yCount: y,
          // };
          insertColor(tabName, index, x);
        } else {
          insertColor(tabName, y, index);
          // save_X_Y_selected[tabName] = {
          //   ...save_X_Y_selected?.[tabName],
          //   y: y,
          //   xCount: x,
          // };
        }
      }
    } else {
      // let tabXY = save_X_Y_selected[tabName];
      // if (direction == "vertical") {
      //   delete tabXY?.["x"];
      //   delete tabXY?.["yCount"];
      // } else {
      //   delete tabXY?.["y"];
      //   delete tabXY?.["xCount"];
      // }
      removeFromColor(tabName, y, x, direction);
    }
    setRefresh((p) => direction);
  };
  // useEffect(() => {
  //   let tabName = activeStage?.tabName;
  //   let tabXY = save_X_Y_selected?.[tabName];
  //   if (tabXY && tabXY.hasOwnProperty("x") && tabXY.hasOwnProperty("y")) {
  //     for (let indexY = 0; indexY < tabXY.y; indexY++) {
  //       for (let indexX = 0; indexX < tabXY.x; indexX++) {
  //         insertColor(tabName, indexY, indexX);
  //       }
  //     }
  //   }
  // }, [refresh]);
  const displayTable = (tab) => {
    const { tabName, x, y } = tab;
    let xCount = data[x];
    let yCount = data[y];
    return (
      <>
        <TableHead classes="!bg-[#0099a5] text-white">
          {canInsertColor ? (
            <TableHeadCol classes="bg-gray-200 border border-gray-400 min-w-[20px]"></TableHeadCol>
          ) : null}
          {Array(xCount)
            ?.fill(0)
            ?.map((col, index) => (
              <TableHeadCol
                key={`${col}-${index}`}
                classes="border border-gray-400 min-w-[90px] !py-1"
              >
                <div className="flex gap-1 justify-between items-center">
                  {yCount && canInsertColor ? (
                    <Checkbox
                      name={tabName}
                      // checked={save_X_Y_selected?.[tabName]?.y === yCount}
                      className="mr-2 -ml-2"
                      onChange={(e) => selectAll(e, index, yCount, "vertical")}
                    />
                  ) : null}
                  0{index + 1}
                </div>
              </TableHeadCol>
            ))}
        </TableHead>
        {!!yCount ? (
          <TableBody>
            {Array(yCount)
              ?.fill(0)
              ?.map((colY, indexY) => (
                <TableRow key={`${colY}-${indexY}`}>
                  {canInsertColor ? (
                    <TableCol classes="!p-0 !px-2  border border-gray-400">
                      <Checkbox
                        name={tabName}
                        // checked={save_X_Y_selected?.[tabName]}
                        onChange={(e) => selectAll(e, xCount, indexY)}
                      />
                    </TableCol>
                  ) : null}
                  {Array(xCount)
                    ?.fill(0)
                    ?.map((colX, indexX) => (
                      <ToolsColColor
                        key={`${colX}-${indexX}`}
                        isUpdatable={isUpdatable}
                        changeApartmentName={changeApartmentName}
                        tabName={tabName}
                        indexY={indexY}
                        indexX={indexX}
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
        ) : (
          <TableBody>
            <TableRow>
              {canInsertColor ? (
                <TableCol classes="!p-0  border border-gray-400">
                  <Checkbox
                    name={tabName}
                    onChange={(e) => selectAll(e, xCount, 0)}
                  />
                </TableCol>
              ) : null}
              {Array(xCount)
                ?.fill(0)
                ?.map((colX, indexX) => (
                  <ToolsColColor
                    key={`${colX}-${indexX}`}
                    isUpdatable={isUpdatable}
                    changeApartmentName={changeApartmentName}
                    tabName={tabName}
                    indexY={0}
                    indexX={indexX}
                    insertColor={insertColor}
                    canInsertColor={canInsertColor}
                    setIsUpdatable={setIsUpdatable}
                    CACHE_LIST_COLORS={CACHE_LIST_COLORS}
                    flatsDetails={flatsDetails}
                    removeOneItemColor={removeOneItemColor}
                  />
                ))}
            </TableRow>
          </TableBody>
        )}
      </>
    );
  };
  return (
    <div className="">
      <div className="flex items-center text-left bg-gray-100 dark:bg-bgmaindark ">
        {tabs?.map((tab) => (
          <button
            onClick={() => changeTab(tab)}
            key={tab?.tabName}
            className={`${
              activeStage?.tabName === tab?.tabName
                ? "!text-black !font-medium dark:bg-borderdark dark:text-white bg-white"
                : ""
            } border p-2 px-4 text-sm text-gray-500 font-normal flex-1 capitalize whitespace-nowrap`}
          >
            {tab?.tabName}
          </button>
        ))}
      </div>
      <Table className="max-w-fit">
        {displayTable(activeStage, data, insertColor, flatsDetails)}
      </Table>
    </div>
  );
};

export default ToolsTabs;
