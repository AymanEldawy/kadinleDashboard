import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Users = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_user || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="user"
      columns={columns}
      title="Users"
      onAddClick={() => navigate(`/add-user`)}
    />
  );
};

export default Users;
