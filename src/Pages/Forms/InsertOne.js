import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const InsertOne = ({ layout }) => {
  return <DynamicForm SUPABASE_TABLE_NAME={layout} title={`Add ${layout}`} />;
};

export default InsertOne;
