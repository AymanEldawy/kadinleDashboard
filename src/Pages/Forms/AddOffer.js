import React from "react";
import DynamicForm from "./../Dynamics/DynamicForm";

const AddOffers = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="offer" title="Add offer" />;
};

export default AddOffers;
