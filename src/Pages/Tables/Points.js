import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Points = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_point || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="point"
      columns={columns}
      title="Points"
      onAddClick={() => navigate(`/add-point`)}
    />
  );
};

export default Points;
