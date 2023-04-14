import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SuperForm from "../../Components/CustomForm/SuperForm";
import TableForm from "../../Components/Forms/TableForm/TableForm";
import { Button } from "../../Components/Global/Button";
import ContentBar from "../../Components/Global/ContentBar/ContentBar";
import FormHeadingTitle from "../../Components/Global/FormHeadingTitle";
import formsApi from "../../Helpers/Forms/formsApi";
import { hexToDecimal } from "../../Helpers/functions";
import { CloseIcon, LockIcon, NotAllowIcon, PlusIcon } from "../../Helpers/Icons";
import MinusIcon from "../../Helpers/Icons/MinusIcon";
import ToolsTabs from "./ToolsTabs";

const CACHE_LIST = {};
const getCachedList = (tableName) => {
  return CACHE_LIST[tableName];
};
const CACHE_LIST_COLORS = {};
const CACHE_TABS = {};
const CACHE_COL = {};

const tabs = [
  // { tabName: "Apartment", x: "ApartmentCountOfFloor", y: "FloorCount" },
  { tabName: "Apartment", x: "ApartmentCountOfFloor", y: "FloorCount" },
  { tabName: "Pent Houses", x: "BHouseFloor", y: "BHouseFlatCount" },
  { tabName: "Mezzanine", x: "MBalanceFloor", y: "MBalanceFlatCount" },

  { tabName: "Office", x: "OfficeFloor", y: "OfficeCount" },

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

const Tools = () => {
  const { Guid } = useParams();
  const [count, setCount] = useState(25);
  const [refresh, setRefresh] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedColor, setSelectedColor] = useState("");
  const [getValuesWithoutSubmit, setGetValuesWithoutSubmit] = useState();
  const fields = formsApi["flatbuildingdetails"];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [flatsDetails, setFlatsDetails] = useState({});
  const [canInsertColor, setCanInsertColor] = useState(false);

  const getLists = async (tableName) => {
    await axios
      .post(`/list`, {
        table: tableName,
      })
      .then((res) => {
        CACHE_LIST[tableName] = res?.data?.recordset;
      });
  };

  useEffect(() => {
    if (CACHE_TABS[selectedTab?.tabName]) {
      setData(CACHE_TABS[selectedTab?.tabName]);
    } else {
      const getTabData = async (tabName) => {
        setLoading(true);
        await axios
          .post(`/findPropertyOfBuilding`, {
            table: tabName,
            building: Guid,
            // building: "31C8F1EE-6E04-441F-A76C-D15CE60D2327",
          })
          .then((res) => {
            let data = res?.data?.recordset;
            setData(data);
            CACHE_TABS[tabName] = data;
            for (const key of data) {
              console.log('----run')
              CACHE_COL[key?.Guid] = key;
            }
            console.log(CACHE_COL)
          });
        setLoading(false);
      };
      getTabData(selectedTab?.tabName);
    }
  }, [selectedTab, Guid]);
  // const getApartments = async () => {
  //   setLoading(true);
  //   await axios
  //     .post(`/iteminfo`, {
  //       table: "Building",
  //       num: "31C8F1EE-6E04-441F-A76C-D15CE60D2327",
  //     })
  //     .then((res) => {
  //       setData(res?.data?.recordset[0]);
  //     });
  //   setLoading(false);
  // };

  useEffect(() => {
    // getApartments();
    getLists("Building");
    getLists("cust");
  }, []);
  useEffect(() => {}, [refresh]); // Refresh / force rerender
  useEffect(() => {
    for (const key in getValuesWithoutSubmit) {
      CACHE_LIST_COLORS[key] = getValuesWithoutSubmit[key];
    }
    setRefresh((p) => !p);
  }, [getValuesWithoutSubmit]);
  const onDecrement = useCallback(() => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  });
  const onIncrement = useCallback(() => {
    if (count < 30) {
      setCount((prev) => prev + 1);
    }
  });
  // select color
  const onSelectColor = useCallback(
    (key) => {
      setSelectedColor(key);
      setCanInsertColor(true);
    },
    [selectedColor]
  );
  const preventInsertColor = () => {
    setSelectedColor("");
    setCanInsertColor(false);
  };

  const insertColor = (tabName, item) => {
    if (flatsDetails[`${item?.Guid}&${tabName}`]) {
      setFlatsDetails((prev) => {
        return {
          ...prev,
          // [tabName]: {
          //   ...prev?.[tabName],
          [`${item?.Guid}&${tabName}`]: {
            ...CACHE_COL?.[item?.Guid],
            ...prev?.[`${item?.Guid}&${tabName}`],
            CardKind: selectedColor,
            // },
          },
        };
      });
    } else {
      for (const currentItem of data) {
        if (currentItem?.Guid === item?.Guid) {
          setFlatsDetails((prev) => {
            return {
              ...prev,

              [`${item?.Guid}&${tabName}`]: {
                ...CACHE_COL?.[item?.Guid],
                CardKind: selectedColor,
              },
            };
          });
        }
      }
    }
    setRefresh((p) => !p);
  };
  const removeOneItemColor = useCallback(
    (tabName, itemGuid) => {
      let newList = flatsDetails;
      if (!!newList[`${itemGuid}&${tabName}`])
        newList[`${itemGuid}&${tabName}`].CardKind = null;
      setFlatsDetails(newList);
      setRefresh((p) => !p);
    },
    [flatsDetails]
  );
  const removeFromColor = useCallback(
    (indexY, data, direction, tabName) => {
      if (direction === "vertical") {
        for (const rows in data) {
          for (let index = 0; index < data[rows].length; index++) {
            if (index === indexY)
              removeOneItemColor(tabName, data[rows][index]?.Guid);
          }
        }
      } else {
        for (const item of data) {
          removeOneItemColor(tabName, item?.Guid);
        }
      }
      setRefresh((p) => !p);
    },

    [flatsDetails]
  );
  const onSubmit = async () => {
    for (const key in CACHE_LIST_COLORS) {
      if (typeof CACHE_LIST_COLORS?.[key]?.["Color"] === "string")
        CACHE_LIST_COLORS[key]["Color"] = hexToDecimal(
          CACHE_LIST_COLORS[key]?.Color?.substr(1)
        );
    }
    let newFlatDetails = {};
    for (const row in flatsDetails) {
      let splitRow = row?.split("&");
      let tabName = splitRow?.[1];
      if (!newFlatDetails[tabName]) newFlatDetails[tabName] = [];

      console.log(flatsDetails[row]);
      newFlatDetails[tabName] = [
        ...newFlatDetails?.[tabName],
        {
          ...flatsDetails?.[row],
          ...CACHE_LIST_COLORS[flatsDetails[row]?.CardKind],
        },
      ];
      delete newFlatDetails?.[row]?.Color;
    }

    console.log(CACHE_LIST_COLORS, "submit");
    console.log(flatsDetails, "submit");
    console.log(newFlatDetails, "submit");
    await axios
      .post("/handleColoring", {
        colors: !!CACHE_LIST_COLORS ? Object.values(CACHE_LIST_COLORS) : [],
        data: newFlatDetails,
      })
      .then((res) => {
        console.log("res", res);
      });
  };

  return (
    <BlockPaper
      contentBar={
        <ContentBar
          title="Flat Building Details"
          description={
            <Link
              to={`updates/building/${12345}`}
              className="text-blue-500 dark:text-white hover:underline text-sm"
            >
              {data?.Name ? data?.Name : "Edit Building"}
            </Link>
          }
        >
          <div className="flex gap-1">
            {!!CACHE_LIST_COLORS
              ? Object.entries(CACHE_LIST_COLORS)?.map(([key, value]) => (
                  <>
                    {value?.Color ? (
                      <button
                        onClick={() => onSelectColor(key)}
                        className={`h-7 min-w-[50px] ${
                          selectedColor === key
                            ? "rounded-3xl border-2 border-gray-50"
                            : ""
                        } `}
                        style={{ background: value?.Color }}
                      ></button>
                    ) : null}
                  </>
                ))
              : null}
            <button
              onClick={preventInsertColor}
              className={`px-4 py-1 bg-green-500 rounded-sm text-white ${
                !canInsertColor ? " bg-red-500 " : ""
              }`}
            >
              <LockIcon open={!canInsertColor} className="h-5 w-5" />
            </button>
          </div>
          <div className="flex bg-white dark:bg-borderdark shadow-sm rounded min-w-[70px] overflow-hidden">
            <button
              className="hover:text-blue-500 dark:hover:text-white flex-1 p-1 disabled:bg-gray-50 scale-90"
              onClick={onDecrement}
              disabled={count === 1}
            >
              <MinusIcon />
            </button>
            <button
              className="hover:text-blue-500 dark:hover:text-white flex-1 p-1 scale-90"
              onClick={onIncrement}
            >
              <PlusIcon />
            </button>
          </div>
        </ContentBar>
      }
    >
      <TableForm
        initialFields={fields}
        rowLength={count}
        getCachedList={getCachedList}
        getValuesWithoutSubmit={setGetValuesWithoutSubmit}
      />

      <ToolsTabs
        data={data}
        insertColor={insertColor}
        canInsertColor={canInsertColor}
        flatsDetails={flatsDetails}
        setFlatsDetails={setFlatsDetails}
        removeFromColor={removeFromColor}
        CACHE_LIST_COLORS={CACHE_LIST_COLORS}
        removeOneItemColor={removeOneItemColor}
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="mt-8 flex justify-end">
        <Button onClick={onSubmit} title="Submit" />
      </div>
    </BlockPaper>
  );
};

export default Tools;
