import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Newsletter = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_newsletter || [];

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
