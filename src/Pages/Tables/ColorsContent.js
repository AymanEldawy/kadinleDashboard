import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const ColorsContent = () => {
  const navigate = useNavigate();
  const columns = DB_API.color_content?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="color_content"
      columns={columns}
      title="Colors Content"
      onAddClick={() => navigate(`/add-color-content`)}
    />
  );
};

export default ColorsContent;
