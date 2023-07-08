import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Colors = () => {
  const navigate = useNavigate();
  const columns = DB_API.color?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="color"
      columns={columns}
      title="Colors"
      onAddClick={() => navigate(`/add-color`)}
    />
  );
};

export default Colors;
