import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const SizesContent = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_size_content || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="size_content"
      columns={columns}
      title="Sizes Content"
      onAddClick={() => navigate(`/add-size-content`)}
    />
  );
};

export default SizesContent;
