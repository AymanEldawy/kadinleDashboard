import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const AddWeights = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="weights" title="Add weights" />;
};

export default AddWeights;
