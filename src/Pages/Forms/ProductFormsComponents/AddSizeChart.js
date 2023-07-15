import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

import BlockPaper from "../../../Components/BlockPaper/BlockPaper";
import { FormIncreasable } from "../../../Components/CustomForm/FormIncreasable";
import SelectField from "../../../Components/CustomForm/SelectField";
import TableForm from "../../../Components/Forms/TableForm/TableForm";
import { chart_content, chart_data } from "../../../Helpers/Forms/databaseApi";
import { PlusIcon } from "../../../Helpers/Icons";
import { useAdd } from "../../../hooks/useAdd";
import { useFetch } from "../../../hooks/useFetch";
import MinusIcon from "./../../../Helpers/Icons/MinusIcon";

const CACHE_SIZE_CHART_CONTENT = {};
const AddSizeChart = ({ getCachedList, productId }) => {
  const { addItem } = useAdd();
  const { getData } = useFetch();
  const [rowLength, setRowLength] = useState(5);
  const [chartContent, setChartContent] = useState();
  const [chartId, setChartId] = useState(null);
  const [selectedChart, setSelectedChart] = useState({});

  const getChartContent = async (id) => {
    // const response = await getData("chart", id, "content");
    const response = await getData("chart_content");
    console.log(response);
    for (const chart of response) {
      CACHE_SIZE_CHART_CONTENT[chart?.chart_id] = chart;
    }
    setChartContent(response);
  };
  useEffect(() => {
    getChartContent();
  }, []);

  useEffect(() => {
    console.log(
      CACHE_SIZE_CHART_CONTENT["d84ac7fb-4dcf-401a-95d1-afeb607c81b5"],
      CACHE_SIZE_CHART_CONTENT
    );
    // setSelectedChart(CACHE_SIZE_CHART_CONTENT[chartId]);
    setSelectedChart(
      CACHE_SIZE_CHART_CONTENT["d84ac7fb-4dcf-401a-95d1-afeb607c81b5"]
    );
  }, [chartId]);

  const onSubmitChartData = async (data) => {
    // if (chartId) {
    //   toast.error("You must to add chart content before create chart data");
    //   return;
    // }
    console.log(data);
    const list = Object.values(data);
    for (const item of list) {
      if (item?.size_id && chartId && productId) {
        // await addItem("chart_data", {
        //   ...item,
        //   product_id: productId,
        //   chart_id: chartId,
        // });
        console.log({
          ...item,
          product_id: productId,
          chart_id: chartId,
        });
      }
    }
  };
  return (
    <>
      <SelectField
        className="mb-4"
        values={chartId}
        label="Choose Chart"
        name="chart_id"
        list={!!getCachedList ? getCachedList("chart") : []}
        keyValue={"id"}
        keyLabel="name"
        required
        onChange={(e) => setChartId(e.target.value)}
      />
      {!!selectedChart ? (
        <BlockPaper>
          <TableForm
            selectedChart={selectedChart}
            getCachedList={getCachedList}
            initialFields={chart_data}
            rowLength={rowLength}
            setRowLength={setRowLength}
            onSubmit={onSubmitChartData}
          />
        </BlockPaper>
      ) : null}
    </>
  );
};

export default AddSizeChart;
