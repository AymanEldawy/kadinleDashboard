import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Sales = () => {
  const navigate = useNavigate();
  const columns = DB_API.sale?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="sale"
      columns={columns}
      title="Sales"
      onAddClick={() => navigate(`/add-sale`)}
    />
  );
};

export default Sales;
