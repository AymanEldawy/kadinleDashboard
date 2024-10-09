import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const ChartContent = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_chart_content || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="chart"
      columns={columns}
      title="Chart Content"
      onAddClick={() => navigate(`/add-chart`)}
      outerSelectedId={(row, relativeIndex, parent) => {
        console.log("🚀 ~ ChartContent ~ row:", row)
        return  row?.chart?.id
      }
      }
    />
  );
};

export default ChartContent;
