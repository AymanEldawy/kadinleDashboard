import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const WarehouseAvailability = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_warehouse_availability || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="warehouse_availability"
      columns={columns}
      title="Warehouse Availability"
      onAddClick={() => navigate(`/add-warehouse-availability`)}
    />
  );
};

export default WarehouseAvailability;
