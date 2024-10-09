import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Chart = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_chart || [];

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
