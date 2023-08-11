import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const AddShippingPrice = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="shipping_price" title="Add Shipping price" />;
};

export default AddShippingPrice;
