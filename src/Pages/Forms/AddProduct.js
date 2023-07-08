import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddProduct = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="product" title="Add Product" />;
};

export default AddProduct;
