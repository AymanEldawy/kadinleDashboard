import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddAddresses = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="address" title="Add Address" />;
};

export default AddAddresses;
