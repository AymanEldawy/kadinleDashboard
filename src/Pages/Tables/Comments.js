import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Comments = () => {
  const navigate = useNavigate();
  const columns = DB_API.Comment?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="Comment"
      columns={columns}
      title="Comments"
      onAddClick={() => navigate(`/add-Comment`)}
    />
  );
};

export default Comments;
