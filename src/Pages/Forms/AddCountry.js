import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddCountry = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="country" title="Add Country" />;
};

export default AddCountry;
