import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const AddReturnStatus = () => {
  return (
    <DynamicForm
      SUPABASE_TABLE_NAME="return_status"
      title="Add return status"
    />
  );
};

export default AddReturnStatus;
