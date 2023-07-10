import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Regions = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_region || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="region"
      columns={columns}
      title="Regions"
      onAddClick={() => navigate(`/add-region`)}
    />
  );
};

export default Regions;
