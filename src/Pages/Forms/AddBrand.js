import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddBrand = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="brand" title="Add Brand" />;
};

export default AddBrand;
