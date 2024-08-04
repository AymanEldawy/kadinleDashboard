import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { useGlobalOptions } from "../../Context/GlobalOptions";



const Regions = () => {
  const { user: ADMIN } = useGlobalOptions()
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_region || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="region"
      columns={columns}
      title="Regions"
      onAddClick={ADMIN?.role?.number === 4 ? () => navigate(`/add-region`) : null}
      hideDelete={ADMIN?.role?.number !== 4}
      hideAction={ADMIN?.role?.number !== 4}
    />
  );
};

export default Regions;
