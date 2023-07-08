import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Newsletter = () => {
  const navigate = useNavigate();
  const columns = DB_API.newsletter?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="newsletter"
      columns={columns}
      title="Newsletter"
      onAddClick={() => navigate(`/add-newsletter`)}
    />
  );
};

export default Newsletter;
