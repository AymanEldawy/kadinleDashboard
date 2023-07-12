import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddOrderStatus = () => {
  return (
    <DynamicForm SUPABASE_TABLE_NAME="order_status" title="Add order status" />
  );
};

export default AddOrderStatus;
