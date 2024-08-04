import React, { useEffect } from "react";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { useNavigate } from "react-router-dom";

const OrderStatus = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_order_status || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="order_status"
      columns={columns}
      title="Order Status"
      onAddClick={() => navigate(`/add-order-status`)}
    />
  );
};

export default OrderStatus;
