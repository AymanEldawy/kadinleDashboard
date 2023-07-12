import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Stocks = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_stock || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="stock"
      columns={columns}
      title="stocks"
      onAddClick={() => navigate(`/add-stock`)}
    />
  );
};

export default Stocks;
