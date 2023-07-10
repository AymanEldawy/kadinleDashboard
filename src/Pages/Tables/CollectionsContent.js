import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const CollectionsContent = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_collection_content || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="collection_content"
      columns={columns}
      title="Collections Content"
      onAddClick={() => navigate(`/add-collection-content`)}
    />
  );
};

export default CollectionsContent;
