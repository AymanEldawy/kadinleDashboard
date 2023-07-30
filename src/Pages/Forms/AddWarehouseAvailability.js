import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const AddWarehouseAvailability = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="warehouse_availability" title="Add warehouse availability" />;
};

export default AddWarehouseAvailability;
