import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddPoint = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="point" title="Add point" />;
};

export default AddPoint;
