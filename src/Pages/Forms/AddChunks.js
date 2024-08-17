import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddChunks = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="chunks" title="Add chunks" />;
};

export default AddChunks;
