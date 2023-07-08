import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Logs = () => {
  const navigate = useNavigate();
  const columns = DB_API.logs?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="logs"
      columns={columns}
      title="Logs"
      onAddClick={() => navigate(`/add-logs`)}
    />
  );
};

export default Logs;
