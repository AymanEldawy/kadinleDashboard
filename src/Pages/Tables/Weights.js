import React from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Weights = () => {
  const navigate = useNavigate();

  const columns = COMBINE_DB_API.combine_Weights;

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="weights"
      columns={columns}
      title="weights"
      onAddClick={() => navigate("/add-weights")}
    />
  );
};

export default Weights;
