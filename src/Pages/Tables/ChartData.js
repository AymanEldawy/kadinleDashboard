import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const ChartData = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_chart_data || [];

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
