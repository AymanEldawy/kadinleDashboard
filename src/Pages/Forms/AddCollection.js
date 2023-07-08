import React from "react";

import DynamicForm from "./../Dynamics/DynamicForm";

const AddCollection = () => {
  return (
    <DynamicForm SUPABASE_TABLE_NAME="collection" title="Add collection" />
  );
};

export default AddCollection;
