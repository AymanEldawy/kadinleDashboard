import React, { useState } from "react";
import { chart_content, chart_data } from "../../../Helpers/Forms/databaseApi";
import { FormIncreasable } from "../../../Components/CustomForm/FormIncreasable";
import TableForm from "../../../Components/Forms/TableForm/TableForm";
import { PlusIcon } from "../../../Helpers/Icons";
import MinusIcon from "./../../../Helpers/Icons/MinusIcon";
import BlockPaper from "../../../Components/BlockPaper/BlockPaper";
import { toast } from "react-toastify";
import { useAdd } from "../../../hooks/useAdd";

const AddSizeChart = ({ getCachedList, productId }) => {
  const { addItem } = useAdd();
  const [rowLength, setRowLength] = useState(5);
  const [chartId, setChartId] = useState(null);

  const onSubmitChartContent = async (data) => {
    if (!productId) {
      toast.error("You must add a product before create variant");
      return;
    }
    const chartResponse = await addItem("chart", {});
    if (chartResponse?.data) {
      let content = Object.values(data)?.[0];
      setChartId(chartResponse?.data?.[0]?.id);
      await addItem("chart_content", {
        ...content,
        chart_id: chartResponse?.data?.[0]?.id,
      });
    }
  };
  const onSubmitChartData = async (data) => {
    if (chartId) {
      toast.error("You must to add chart content before create chart data");
      return;
    }
    const list = Object.values(data);
    for (const item of list) {
      if (item?.size_id && chartId && productId) {
        await addItem("chart_data", {
          ...item,
          product_id: productId,
          chart_id: chartId,
        });
      }
    }
  };
  return (
    <>
      <BlockPaper>
        <TableForm
          getCachedList={getCachedList}
          initialFields={chart_content}
          rowLength={rowLength}
          setRowLength={setRowLength}
          onSubmit={onSubmitChartContent}
          hideIncreasable
        />
      </BlockPaper>
      <BlockPaper>
        <TableForm
          getCachedList={getCachedList}
          initialFields={chart_data}
          rowLength={rowLength}
          setRowLength={setRowLength}
          onSubmit={onSubmitChartData}
        />
      </BlockPaper>
    </>
  );
};

export default AddSizeChart;
