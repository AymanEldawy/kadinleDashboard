import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Orders = () => {
  const navigate = useNavigate();
  const columns = DB_API.order?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="order"
      columns={columns}
      title="Orders"
      onAddClick={() => navigate(`/add-order`)}
    />
  );
};

export default Orders;
