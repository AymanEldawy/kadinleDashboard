import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const AddPartner = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="partner" title="Add partner" />;
};

export default AddPartner;
