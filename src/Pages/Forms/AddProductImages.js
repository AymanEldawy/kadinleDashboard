import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const AddProductImages = () => {
  return (
    <DynamicForm
      SUPABASE_TABLE_NAME="product_image"
      title="Add Product image"
    />
  );
};

export default AddProductImages;
