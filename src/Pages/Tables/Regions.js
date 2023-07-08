import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Regions = () => {
  const navigate = useNavigate();
  const columns = DB_API.region?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="regions"
      columns={columns}
      title="Regions"
      onAddClick={() => navigate(`/add-region`)}
    />
  );
};

export default Regions;
