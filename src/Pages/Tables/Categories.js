import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Categories = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_category || [];

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
