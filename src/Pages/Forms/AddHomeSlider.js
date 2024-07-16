import React from "react";
import DynamicForm from "../Dynamics/DynamicForm";

const AddHomeSlider = () => {
  return <DynamicForm SUPABASE_TABLE_NAME="home_sliders" title="Add home sliders" />;
};

export default AddHomeSlider;
