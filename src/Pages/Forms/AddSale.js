import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddSale = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="sale" title="Add sale" />;
};

export default AddSale;
