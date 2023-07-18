import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Logs = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_logs || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="logs"
      columns={columns}
      title="Logs"
      // onAddClick={() => navigate(`/add-logs`)}
    />
  );
};

export default Logs;
