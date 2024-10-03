import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const ChartGroupTable = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_chart_group || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="chart_group"
      columns={columns}
      title="Chart group"
      onAddClick={() => navigate(`/chart-group-from`)}
    />
  );
};

export default ChartGroupTable;
