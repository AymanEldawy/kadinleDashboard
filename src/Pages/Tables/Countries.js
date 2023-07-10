import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Countries = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_country || [];

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
