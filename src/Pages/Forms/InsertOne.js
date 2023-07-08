import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const InsertOne = ({ layout, title }) => {
  return <DynamicForm SUPABASE_TABLE_NAME={layout} title={title} />;
};

export default InsertOne;
