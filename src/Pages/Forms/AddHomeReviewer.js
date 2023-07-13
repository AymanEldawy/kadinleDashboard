import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const AddHomeReviewer = () => {
  return (
    <DynamicForm SUPABASE_TABLE_NAME="home_reviews" title="Add Home Reviewer" />
  );
};

export default AddHomeReviewer;
