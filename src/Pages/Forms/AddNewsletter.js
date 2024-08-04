import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddNewsletter = () => {
  return (
    <DynamicForm SUPABASE_TABLE_NAME="newsletter" title="Add newsletter" />
  );
};

export default AddNewsletter;
