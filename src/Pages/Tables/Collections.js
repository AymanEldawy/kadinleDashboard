import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Collections = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_collection || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="collection"
      columns={columns}
      title="Collections"
      onAddClick={() => navigate(`/add-collection`)}
    />
  );
};

export default Collections;
