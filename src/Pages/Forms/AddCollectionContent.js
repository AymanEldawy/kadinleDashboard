import React from "react";

import DynamicForm from "./../Dynamics/DynamicForm";

const AddCollectionContent = () => {
  return (
    <DynamicForm
      SUPABASE_TABLE_NAME="collection_content"
      title="Add collection content"
    />
  );
};

export default AddCollectionContent;
