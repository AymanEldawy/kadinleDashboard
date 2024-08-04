import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const ReturnStatus = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_return_status || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="return_status"
      columns={columns}
      title="return status"
      onAddClick={() => navigate(`/add-return-status`)}
    />
  );
};

export default ReturnStatus;
