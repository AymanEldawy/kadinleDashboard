import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const ChartData = () => {
  const navigate = useNavigate();
  const columns = DB_API.chart_data?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="chart_data"
      columns={columns}
      title="Chart Data"
      onAddClick={() => navigate(`/add-chart-data`)}
    />
  );
};

export default ChartData;
