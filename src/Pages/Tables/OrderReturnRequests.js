import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ADMIN } from "../../Api/globalActions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const OrderReturnRequests = () => {
  const columns = COMBINE_DB_API.combine_order_return_request || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="order_return_request"
      columns={columns}
      title="Order Return Requests"
      hideDelete={ADMIN?.role?.number === 3}
      hideAction={ADMIN?.role?.number === 3}
    />
  );
};

export default OrderReturnRequests;
