import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Sales = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_sale || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="sale"
      columns={columns}
      title="Sales"
      onAddClick={() => navigate(`/add-sale`)}
    />
  );
};

export default Sales;
