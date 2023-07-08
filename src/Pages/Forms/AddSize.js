import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddSize = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="size" title="Add size" />;
};

export default AddSize;
