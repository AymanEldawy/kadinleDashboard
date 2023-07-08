import React from "react";

import DynamicForm from "./../Dynamics/DynamicForm";

const AddCategoryContent = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="category_content" title="Add Category Content" />;
};

export default AddCategoryContent;
