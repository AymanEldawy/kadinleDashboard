import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddLanguage = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="language" title="Add language" />;
};

export default AddLanguage;
