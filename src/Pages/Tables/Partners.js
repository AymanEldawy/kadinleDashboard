import React from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Partners = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_partner;

  return (
    <>
      <DynamicLayout
        SUPABASE_TABLE_NAME="partner"
        columns={columns}
        title="partners"
        onAddClick={() => navigate("/add-partner")}
      />
    </>
  );
};

export default Partners;
