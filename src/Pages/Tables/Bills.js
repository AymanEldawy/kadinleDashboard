import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Bills = () => {
  const columns = COMBINE_DB_API.combine_bill || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="bill"
      columns={columns}
      title="bills"
      hideAction
      // onAddClick={() => navigate(`/add-bill`)}
    />
  );
};

export default Bills;
