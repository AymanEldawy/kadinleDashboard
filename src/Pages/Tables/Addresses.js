import React from "react";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";

const Addresses = () => {
  const navigate = useNavigate();
  const columns = DB_API.address?.map((col) => col?.name);

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
