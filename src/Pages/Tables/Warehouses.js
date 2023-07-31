import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Warehouses = () => {
  const { user: ADMIN } = useGlobalOptions()
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_warehouse || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="warehouse"
      columns={columns}
      title="Warehouses"
      onAddClick={ADMIN?.role?.number === 4 ? () => navigate(`/add-warehouse`) : null}
      hideDelete={ADMIN?.role?.number !== 4}
      hideAction={ADMIN?.role?.number !== 4}
    />
  );
};

export default Warehouses;
