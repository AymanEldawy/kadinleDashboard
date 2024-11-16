import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { getTableData } from "../../../Api/globalActions";
import BlockPaper from "../../../Components/BlockPaper/BlockPaper";
import SelectField from "../../../Components/CustomForm/SelectField";
import TableForm from "../../../Components/Forms/TableForm/TableForm";
import { IncreasableBar } from "../../../Components/Global/IncreasableBar";
import { useGlobalOptions } from "../../../Context/GlobalOptions";
import { chart_data } from "../../../Helpers/Forms/databaseApi";
import { useAdd } from "../../../hooks/useAdd";
import { useDelete } from "../../../hooks/useDelete";
import { useFetch } from "../../../hooks/useFetch";

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
  selectedChart,
  setSelectedChart,
  layout,
  CACHE_SIZE_CHART_CONTENT,
}) => {
  const { deleteItem } = useDelete();

  useEffect(() => {}, [selectedChart]);

  const changeChartLength = (row, count) => {
    let checkRow = chartRowsLength?.[row];
    setChartRowsLength((prev) => {
      return {
        ...prev,
        [row]: count,
      };
    });
    if (checkRow > count) {
      let newValues = values;
      delete newValues[row][checkRow];
      setValues(newValues);
    }
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

  const onDecrease = async (row) => {
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
    if (layout === "update") {
      for (const subRow in newValues[row]) {
        if (newValues[row][subRow]?.id)
          await deleteItem("chart_data", [subRow?.id]);
      }
    }
    delete newValues[row];
    setValues(newValues);
  };

  return (
    <>
      {layout === "update" ? (
        <p className="text-yellow-500 text-xs bg-yellow-100 p-1 rounded-md my-1">
          <strong className="text-yellow-400 font-medium">Warning: </strong>
          by Removing the chart tab will remove the whole data in the tab
        </p>
      ) : null}

      <IncreasableBar
        title={"Chart"}
        list={listChart}
        setList={setListChart}
        activeTab={activeTabChart}
        setActiveTab={setActiveTabChart}
        onDecrease={onDecrease}
      />
      {listChart?.map((item, index) => {
        let name = CACHE_SIZE_CHART_CONTENT?.[chartIds?.[item]]?.name;
        return (
          <div
            className={`relative z-10 ${
              activeTabChart !== item ? "hidden" : ""
            } `}
            kye={`${index}-chart`}
          >
            <SelectField
              className="mb-4"
              value={name}
              label="Choose Chart"
              name="chart_id"
              firstOptionText={name}
              list={!!getCachedList ? getCachedList("chart") : []}
              keyValue={"id"}
              keyLabel="number"
              required
              onChange={(option) => onSelectChart(item, option?.id)}
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
                  layout={layout}
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
