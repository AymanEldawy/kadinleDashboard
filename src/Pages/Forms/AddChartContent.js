import React from "react";

import DynamicForm from "../Dynamics/DynamicForm";

const AddChartContent = () => {
  return (
    <DynamicForm
      SUPABASE_TABLE_NAME="chart_content"
      title="Add Chart content"
    />
  );
};

export default AddChartContent;
