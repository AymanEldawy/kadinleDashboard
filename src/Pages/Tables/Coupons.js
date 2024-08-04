import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Coupons = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_coupon || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="coupon"
      columns={columns}
      title="Coupons"
      onAddClick={() => navigate(`/add-coupon`)}
    />
  );
};

export default Coupons;
