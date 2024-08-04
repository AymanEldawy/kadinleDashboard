import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Sizes = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_size || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="size"
      columns={columns}
      title="Sizes"
      onAddClick={() => navigate(`/add-size`)}
    />
  );
};

export default Sizes;
