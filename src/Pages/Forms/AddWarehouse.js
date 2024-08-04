import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddWarehouse = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="warehouse" title="Add warehouse" />;
};

export default AddWarehouse;
