import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddBulkAlert = () => {
  return (
    <DynamicForm SUPABASE_TABLE_NAME="bulk_alert" title="Add Bulk Alert" />
  );
};

export default AddBulkAlert;
