import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddCoupon = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="coupon" title="Add coupons" />;
};

export default AddCoupon;
