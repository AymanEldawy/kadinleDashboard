import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Colors = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_color || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="color"
      columns={columns}
      title="Colors"
      onAddClick={() => navigate(`/add-color`)}
    />
  );
};

export default Colors;
