import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const AddDefinitions = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="definitions" title="Add Definitions" />;
};

export default AddDefinitions;
