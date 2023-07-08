import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Users = () => {
  const navigate = useNavigate();
  const columns = DB_API.user?.map((col) => col?.name) || [];

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
