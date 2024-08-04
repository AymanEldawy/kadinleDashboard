import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddCurrency = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="currency" title="Add currency" />;
};

export default AddCurrency;
