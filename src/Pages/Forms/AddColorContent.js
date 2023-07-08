import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddColorContent = () => {
  return (
    <DynamicForm
      SUPABASE_TABLE_NAME="color_content"
      title="Add Color content"
    />
  );
};

export default AddColorContent;
