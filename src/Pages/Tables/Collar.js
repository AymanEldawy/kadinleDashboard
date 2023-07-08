import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Collar = () => {
  const navigate = useNavigate();
  const columns = DB_API.collar?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="collar"
      columns={columns}
      title="Collar"
      onAddClick={() => navigate(`/add-collar`)}
    />
  );
};

export default Collar;
