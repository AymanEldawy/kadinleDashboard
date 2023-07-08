import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Brand = () => {
  const navigate = useNavigate();

  const columns = DB_API.brand?.map((col) => col?.name);

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
