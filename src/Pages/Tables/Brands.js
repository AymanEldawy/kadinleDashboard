import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Brand = () => {
  const navigate = useNavigate();

  const columns = COMBINE_DB_API.combine_brand;

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="brand"
      columns={columns}
      title="Brands"
      onAddClick={() => navigate("/add-brand")}
    />
  );
};

export default Brand;
