import React from "react";

import DynamicForm from "../Dynamics/DynamicForm";

const AddChartData = () => {
  return (
    <DynamicForm SUPABASE_TABLE_NAME="chart_data" title="Add Chart Data" />
  );
};

export default AddChartData;
