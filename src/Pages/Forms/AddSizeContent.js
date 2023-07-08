import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddSizeContent = () => {
  return (
    <DynamicForm SUPABASE_TABLE_NAME="size_content" title="Add size content" />
  );
};

export default AddSizeContent;
