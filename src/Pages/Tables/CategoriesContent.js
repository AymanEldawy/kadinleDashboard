import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const CategoriesContent = () => {
  const navigate = useNavigate();
  const columns = DB_API.category_content?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="category_content"
      columns={columns}
      title="Categories Content"
      onAddClick={() => navigate(`/add-category`)}
    />
  );
};

export default CategoriesContent;
