import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";

import DynamicLayout from "../Dynamics/DynamicLayout";

const BulkAlert = () => {
  const navigate = useNavigate();
  const columns = DB_API.bulk_alert?.map((col) => col?.name);
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
