import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Coupons = () => {
  const navigate = useNavigate();
  const columns = DB_API.coupon?.map((col) => col?.name) || [];

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
