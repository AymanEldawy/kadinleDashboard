import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ADMIN } from "../../Api/globalActions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Orders = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_order || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="order"
      columns={columns}
      title="Orders"
      hideDelete={ADMIN?.role?.number !== 4}
      hideAction={ADMIN?.role?.number !== 4}
    />
  );
};

export default Orders;
