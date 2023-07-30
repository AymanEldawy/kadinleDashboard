import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { ADMIN } from "../../Api/globalActions";

const Orders = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_order || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="order"
      columns={columns}
      title="Orders"
      hideDelete={ADMIN.role?.number !== 3}
      hideAction={ADMIN.role?.number !== 3}
      // onAddClick={() => navigate(`/add-order`)}
    />
  );
};

export default Orders;
