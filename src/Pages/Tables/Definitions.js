import React from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Definitions = () => {
  const { user: ADMIN } = useGlobalOptions();
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_definitions;

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="definitions"
      columns={columns}
      title="Definitions"
      onAddClick={() => navigate("/add-definitions")}
    />
  );
};

export default Definitions;
