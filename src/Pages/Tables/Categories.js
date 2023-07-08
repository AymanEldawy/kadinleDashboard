import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Categories = () => {
  const navigate = useNavigate();
  const columns = DB_API.category?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="category"
      columns={columns}
      title="Categories"
      onAddClick={() => navigate(`/add-category`)}
    />
  );
};

export default Categories;
