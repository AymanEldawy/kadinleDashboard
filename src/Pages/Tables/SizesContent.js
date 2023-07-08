import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const SizesContent = () => {
  const navigate = useNavigate();
  const columns = DB_API.size_content?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="size_content"
      columns={columns}
      title="Sizes Content"
      onAddClick={() => navigate(`/add-size-content`)}
    />
  );
};

export default SizesContent;
