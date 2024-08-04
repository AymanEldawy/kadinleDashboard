import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddColor = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="color" title="Add Color" />;
};

export default AddColor;
