import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddRegion = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="region" title="Add region" />;
};

export default AddRegion;
