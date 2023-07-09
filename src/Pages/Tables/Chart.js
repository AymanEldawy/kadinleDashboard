import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Chart = () => {
  const navigate = useNavigate();
  const columns = DB_API.chart?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="chart"
      columns={columns}
      title="Chart"
      onAddClick={() => navigate(`/add-chart`)}
    />
  );
};

export default Chart;
