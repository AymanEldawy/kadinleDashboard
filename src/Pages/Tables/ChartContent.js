import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const ChartContent = () => {
  const navigate = useNavigate();
  const columns = DB_API.chart_content?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="chart_content"
      columns={columns}
      title="Chart Content"
      onAddClick={() => navigate(`/add-chart-content`)}
    />
  );
};

export default ChartContent;
