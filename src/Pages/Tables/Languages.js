import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Languages = () => {
  const navigate = useNavigate();
  const columns = DB_API.language?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="language"
      columns={columns}
      title="Languages"
      onAddClick={() => navigate(`/add-language`)}
    />
  );
};

export default Languages;