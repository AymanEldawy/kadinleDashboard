import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Warehouses = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_warehouse || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="warehouse"
      columns={columns}
      title="Warehouses"
      onAddClick={() => navigate(`/add-warehouse`)}
    />
  );
};

export default Warehouses;
