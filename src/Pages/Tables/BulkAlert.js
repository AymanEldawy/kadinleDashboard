import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const BulkAlert = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_bulk_alert;
  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="bulk_alert"
      columns={columns}
      title="Bulk Alert"
      onAddClick={() => navigate("/add-bulk-alert")}
    />
  );
};

export default BulkAlert;
