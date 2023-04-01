import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SuperForm from "../../Components/CustomForm/SuperForm";
import TableForm from "../../Components/Forms/TableForm/TableForm";
import { Button } from "../../Components/Global/Button";
import ContentBar from "../../Components/Global/ContentBar/ContentBar";
import FormHeadingTitle from "../../Components/Global/FormHeadingTitle";
import formsApi from "../../Helpers/Forms/formsApi";
import { PlusIcon } from "../../Helpers/Icons";
import MinusIcon from "../../Helpers/Icons/MinusIcon";

const itemsCount = Array(50).fill("transparent");

const cacheList = {};
const getCachedList = (tableName) => {
  return cacheList[tableName];
};

const Tools = () => {
  const { Guid } = useParams();
  const [count, setCount] = useState(25);
  const [refresh, setRefresh] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [getValuesWithoutSubmit, setGetValuesWithoutSubmit] = useState();
  const fields = formsApi["FlatBuildingDetails"];
  const [items, setItems] = useState(itemsCount);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([
    "#f03",
    "#973",
    "#f08",
    "#8d3",
    "#0ed",
    "#0da",
    "#0e5",
  ]);

  const getLists = async (tableName) => {
    console.log(tableName);
    await axios
      .post(`/list`, {
        table: tableName,
      })
      .then((res) => {
        cacheList[tableName] = res?.data?.recordset;
      });
  };
  const getApartments = async () => {
    console.log("run....");
    setLoading(true);
    await axios
      // .post(`/find/apartment`, {
      //   Guid: "31C8F1EE-6E04-441F-A76C-D15CE60D2327",
      // })
      .post(`/iteminfo`, {
        table: "Building",
        num: "31C8F1EE-6E04-441F-A76C-D15CE60D2327",
      })
      .then((res) => {
        console.table(res?.data?.recordset);
        setData(res?.data?.recordset);
      });
    setLoading(false);
  };

  useEffect(() => {
    getApartments();
    getLists("Building");
    getLists("cust");
  }, []);
  useEffect(() => {
    let customColors = [];
    if (getValuesWithoutSubmit) {
      for (const row of Object.values(getValuesWithoutSubmit)) {
        console.log(row);
        if (row["Color"]) {
          customColors.push(row["Color"]);
        }
      }
      console.log(customColors, getValuesWithoutSubmit);
      setColors(customColors);
    }
  }, [getValuesWithoutSubmit]);
  useEffect(() => {}, [refresh]);
  const onDecrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };
  const onIncrement = () => {
    if (count < 30) {
      setCount((prev) => prev + 1);
    }
  };
  // select color
  const onSelectColor = (color) => {
    setSelectedColor(color);
  };
  const insertColor = (index) => {
    let newItems = items;
    newItems[index] = selectedColor;
    console.log(index, newItems);
    setItems(newItems);
    setRefresh((p) => !p);
  };
  // handel Submit
  const onSubmit = () => {};

  return (
    <BlockPaper
      contentBar={
        <ContentBar title="Flat Building Details">
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
          <div className="flex gap-1">
            {colors?.map((color) => (
              <button
                onClick={() => onSelectColor(color)}
                className="h-7 min-w-[50px]"
                style={{ background: color }}
              ></button>
            ))}
          </div>
        </ContentBar>
      }
    >
      <TableForm
        initialFields={fields}
        rowLength={count}
        getCachedList={getCachedList}
        // selectColor={selectColor}
        getValuesWithoutSubmit={setGetValuesWithoutSubmit}
      />
      <div className="flex gap-2 flex-wrap">
        {items?.map((r, index) => (
          <div
            onClick={() => insertColor(index)}
            style={{ background: r }}
            className={`cursor-cell border-dashed h-7 min-w-[40px] rounded-md border border-gray-700`}
          ></div>
        ))}
      </div>
    </BlockPaper>
  );
};

export default Tools;
