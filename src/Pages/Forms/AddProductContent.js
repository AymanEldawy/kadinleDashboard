import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const AddProductContent = () => {
  return (
    <DynamicForm
      SUPABASE_TABLE_NAME="product_content"
      title="Add Product content"
    />
  );
};

export default AddProductContent;
