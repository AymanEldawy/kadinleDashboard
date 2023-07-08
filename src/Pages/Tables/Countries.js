import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Countries = () => {
  const navigate = useNavigate();
  const columns = DB_API.country?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="country"
      columns={columns}
      title="Country"
      onAddClick={() => navigate(`/add-country`)}
    />
  );
};

export default Countries;
