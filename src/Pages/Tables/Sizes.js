import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Sizes = () => {
  const navigate = useNavigate();
  const columns = DB_API.size?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="size"
      columns={columns}
      title="Sizes"
      onAddClick={() => navigate(`/add-size`)}
    />
  );
};

export default Sizes;
