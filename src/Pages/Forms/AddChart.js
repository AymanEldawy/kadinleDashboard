import React from "react";

import DynamicForm from "./../Dynamics/DynamicForm";

const AddChart = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="chart" title="Add Chart" />;
};

export default AddChart;
