import React from "react";

import DynamicForm from "./../Dynamics/DynamicForm";

const AddCategory = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="category" title="Add Category" />;
};

export default AddCategory;
