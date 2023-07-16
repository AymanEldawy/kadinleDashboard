import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddUser = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="user" title="Add user" />;
};

export default AddUser;
