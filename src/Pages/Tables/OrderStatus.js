import React, { useEffect } from "react";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const OrderReturnRequests = () => {
  const columns = COMBINE_DB_API.combine_order_status || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="order_status"
      columns={columns}
      title="Order Status"
    />
  );
};

export default OrderReturnRequests;
