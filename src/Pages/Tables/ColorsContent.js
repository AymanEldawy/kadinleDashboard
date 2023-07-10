import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const ColorsContent = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_color_content || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="color_content"
      columns={columns}
      title="Colors Content"
      onAddClick={() => navigate(`/add-color-content`)}
    />
  );
};

export default ColorsContent;
