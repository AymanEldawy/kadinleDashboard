import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const CollectionsContent = () => {
  const navigate = useNavigate();
  const columns = DB_API.collection_content?.map((col) => col?.name) || [];

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
