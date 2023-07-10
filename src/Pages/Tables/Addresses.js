import React from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Addresses = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_address;

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="address"
      columns={columns}
      title="Addresses"
      // onAddClick={() => navigate("/add-address")}
    />
  );
};

export default Addresses;
