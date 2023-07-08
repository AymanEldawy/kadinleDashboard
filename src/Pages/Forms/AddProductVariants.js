import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const AddProductVariants = () => {
  return (
    <DynamicForm
      SUPABASE_TABLE_NAME="product_variant"
      title="Add Product variant"
    />
  );
};

export default AddProductVariants;
