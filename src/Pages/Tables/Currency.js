import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Currency = () => {
  const navigate = useNavigate();
  const columns = DB_API.currency?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="currency"
      columns={columns}
      title="Currency"
      onAddClick={() => navigate(`/add-currency`)}
    />
  );
};

export default Currency;
