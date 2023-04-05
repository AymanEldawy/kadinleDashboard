import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SuperForm from "../../Components/CustomForm/SuperForm";
import TableForm from "../../Components/Forms/TableForm/TableForm";
import { Button } from "../../Components/Global/Button";
import ContentBar from "../../Components/Global/ContentBar/ContentBar";
import FormHeadingTitle from "../../Components/Global/FormHeadingTitle";
import formsApi from "../../Helpers/Forms/formsApi";
import {
  CloseIcon,
  LockIcon,
  NotAllowIcon,
  PlusIcon,
} from "../../Helpers/Icons";
import MinusIcon from "../../Helpers/Icons/MinusIcon";
import ToolsTabs from "./ToolsTabs";
import { useCallback } from "react";
import { hexToDecimal } from "../../Helpers/functions";
const CACHE_LIST = {};
const getCachedList = (tableName) => {
  return CACHE_LIST[tableName];
};
const CACHE_LIST_COLORS = {};

const Tools = () => {
  const { num } = useParams();
  const [count, setCount] = useState(25);
  const [refresh, setRefresh] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [getValuesWithoutSubmit, setGetValuesWithoutSubmit] = useState();
  const fields = formsApi["FlatBuildingDetails"];
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
  const getApartments = async () => {
    setLoading(true);
    await axios
      .post(`/findPropertyOfBuilding`, {
        table: "Building",
        building: "31C8F1EE-6E04-441F-A76C-D15CE60D2327",
      })
      .then((res) => {
        console.log(res)
        setData(res?.data?.recordset[0]);
      });
    setLoading(false);
  };
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
    getApartments();
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

  const insertColor =
    //  useCallback(
    (tabName, indexY, indexX) => {
      if (selectedColor?.Color !== "") {
        setFlatsDetails((prev) => {
          return {
            ...prev,
            [tabName]: {
              ...prev?.[tabName],
              [indexY]: {
                ...prev?.[tabName]?.[indexY],
                [indexX]: {
                  ...prev?.[tabName]?.[indexY]?.[indexX],
                  index: selectedColor,
                },
              },
            },
          };
        });
        setRefresh((p) => !p);
      }
    };
  console.log(flatsDetails);
  // [refresh]
  // );
  const removeRow = useCallback(
    (tabName, row) => {
      let newFlatDetails = flatsDetails;
      delete newFlatDetails[tabName][row];
      setFlatsDetails(newFlatDetails);
      setRefresh((p) => !p);
    },
    [flatsDetails, refresh]
  );
  const removeMatrix = useCallback(
    (tabName, y, x) => {
      let newFlatDetails = flatsDetails;
      for (let index = 0; index < y; index++) {
        delete newFlatDetails[tabName][index][x];
      }
      setFlatsDetails(newFlatDetails);
      setRefresh((p) => !p);
    },
    [flatsDetails, refresh]
  );
  const removeOneItemColor = useCallback(
    (tabName, y, x) => {
      let newFlatDetails = flatsDetails;
      delete newFlatDetails?.[tabName]?.[y]?.[x];
      setFlatsDetails(newFlatDetails);
      setRefresh((p) => !p);
    },
    [flatsDetails, refresh]
  );
  const removeFromColor = useCallback(
    (tabName, indexY, indexX, direction) => {
      if (direction === "vertical") {
        removeMatrix(tabName, indexY, indexX);
      } else {
        removeRow(tabName, indexY);
      }
    },
    [flatsDetails]
  );
  // handel Submit
  const onSubmit = () => {
    // Structure of data
    // CACHE_LIST_COLORS Object 1 remove Number & BuildingGuid
    for (const key in CACHE_LIST_COLORS) {
      delete CACHE_LIST_COLORS?.[key]["Number"];
      delete CACHE_LIST_COLORS?.[key]["BuildingGuid"];
      CACHE_LIST_COLORS[key]["Color"] = hexToDecimal(
        CACHE_LIST_COLORS[key]?.Color?.substr(1)
      );
    }
    let newFlatDetails = flatsDetails;
    for (const row in flatsDetails) {
      for (const cols in flatsDetails[row]) {
        for (const currentIndex in flatsDetails[row][cols]) {
          let item = flatsDetails?.[row]?.[cols]?.[currentIndex];
          if (item) {
            newFlatDetails[row][cols][[currentIndex]] = {
              ...CACHE_LIST_COLORS[item?.index],
            };
          }
        }
      }
    }
    console.log(CACHE_LIST_COLORS, "submit");
    console.log(flatsDetails, "submit");
    console.log(newFlatDetails, "submit");
    // convert hex to decimal
    // FlatDetails Object two
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
      />
      <div className="mt-8 flex justify-end">
        <Button onClick={onSubmit} title="Submit" />
      </div>
    </BlockPaper>
  );
};

export default Tools;
