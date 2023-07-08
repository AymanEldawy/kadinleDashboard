import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Collections = () => {
  const navigate = useNavigate();
  const columns = DB_API.collection?.map((col) => col?.name) || [];

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
