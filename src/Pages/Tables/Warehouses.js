import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { useGlobalOptions } from "../../Context/GlobalOptions";


const Warehouses = () => {
  const { user: ADMIN } = useGlobalOptions()
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_warehouse || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="warehouse"
      columns={columns}
      title="Warehouses"
      onAddClick={
        ADMIN?.role?.title === "admin"
          ? () => navigate(`/add-warehouse`)
          : undefined
      }
    />
  );
};

export default Warehouses;
