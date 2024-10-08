import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Comments = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_comment || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="comment"
      columns={columns}
      title="Comments"
      hideSelect
    />
  );
};

export default Comments;
