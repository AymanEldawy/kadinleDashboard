import React from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const LessThan = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_less_than;

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="less_than"
      columns={columns}
      title="less_than"
      onAddClick={() => navigate("/add-less_than")}
    />
  );
};

export default LessThan;
