import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

import BlockPaper from "../../../Components/BlockPaper/BlockPaper";
import SelectField from "../../../Components/CustomForm/SelectField";
import TableForm from "../../../Components/Forms/TableForm/TableForm";
import { chart_data } from "../../../Helpers/Forms/databaseApi";
import { useAdd } from "../../../hooks/useAdd";
import { useFetch } from "../../../hooks/useFetch";
import { FormProductIncreasable } from "./FormProductIncreasable";
import { IncreasableBar } from "../../../Components/Global/IncreasableBar";

const CACHE_SIZE_CHART_CONTENT = {};
const AddSizeChart = ({
  getCachedList,
  productId,
  listChart,
  setListChart,
  activeTabChart,
  setActiveTabChart,
  values,
  setValues,
  chartIds,
  setChartIds,
  chartRowsLength,
  setChartRowsLength,
}) => {
  const { addItem } = useAdd();
  const { getData } = useFetch();
  const [selectedChart, setSelectedChart] = useState({});

  const getChartContent = async (id) => {
    const response = await getData("chart_content");
    for (const chart of response) {
      CACHE_SIZE_CHART_CONTENT[chart?.chart_id] = chart;
    }
  };

  useEffect(() => {
    getChartContent();
  }, []);

  useEffect(() => {
    console.log(selectedChart, "select");
  }, [selectedChart]);

  const changeChartLength = (row, count) => {
    setChartRowsLength((prev) => {
      return {
        ...prev,
        [row]: count,
      };
    });
  };

  const onSelectChart = (row, value) => {
    changeChartLength(row, 5);
    setSelectedChart((prev) => {
      return {
        ...prev,
        [row]: CACHE_SIZE_CHART_CONTENT[value],
      };
    });
    setChartIds((prev) => {
      return {
        ...prev,
        [row]: value,
      };
    });
  };

  const onDecrease = (row, index) => {
    let selected = selectedChart;
    delete selected[row];
    setSelectedChart(selected);
    let ids = chartIds;
    delete ids[row];
    setChartIds(ids);
    let rows = chartRowsLength;
    delete rows[row];
    setChartRowsLength(rows);
    let newValues = values;
    delete newValues[row];
    setValues(newValues);
  };
  return (
    <>
      <IncreasableBar
        title={"Chart"}
        list={listChart}
        setList={setListChart}
        activeTab={activeTabChart}
        setActiveTab={setActiveTabChart}
        onDecrease={onDecrease}
      />
      {listChart?.map((item, index) => {
        return (
          <div
            className={`relative z-10 ${
              activeTabChart !== item ? "hidden" : ""
            } `}
            kye={`${index}-chart`}
          >
            <SelectField
              className="mb-4"
              value={CACHE_SIZE_CHART_CONTENT?.[chartIds?.[item]]?.[0]?.name}
              label="Choose Chart"
              name="chart_id"
              list={!!getCachedList ? getCachedList("chart") : []}
              keyValue={"id"}
              keyLabel="number"
              required
              onChange={(e) => onSelectChart(item, e.target.value)}
            />
            {!!selectedChart?.[item] ? (
              <BlockPaper>
                <TableForm
                  selectedChart={selectedChart?.[item]}
                  getCachedList={getCachedList}
                  initialFields={chart_data}
                  rowLength={chartRowsLength?.[item]}
                  changeChartLength={changeChartLength}
                  grid={values}
                  setGrid={setValues}
                  tabKey={item}
                />
              </BlockPaper>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default AddSizeChart;
