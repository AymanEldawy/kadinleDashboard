import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Chunks = () => {
  const navigate = useNavigate();

  const columns = COMBINE_DB_API.combine_chunks;

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="chunks"
      columns={columns}
      title="Chunks"
      onAddClick={() => navigate("/add-chunks")}
    />
  );
};

export default Chunks;
