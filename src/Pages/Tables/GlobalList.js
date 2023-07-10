import React from "react";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useNavigate } from "react-router-dom";
import DynamicLayout from "../Dynamics/DynamicLayout";

const GlobalList = ({ table, addHref, title }) => {
  const navigate = useNavigate();
  const columns = DB_API?.[`${table}_content`];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME={`${table}_content`}
      columns={columns}
      title={title}
      onAddClick={() => navigate(addHref)}
    />
  );
};

export default GlobalList;
