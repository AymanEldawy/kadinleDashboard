import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddNews = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="news" title="Add news" />;
};

export default AddNews;
