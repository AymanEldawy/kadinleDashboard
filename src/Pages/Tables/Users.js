import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { EditIcon, EyeIcon } from "../../Helpers/Icons";

const Stocks = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_user || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="user"
      columns={columns}
      title="users"
      onAddClick={() => navigate(`/add-user`)}
      renderTableAction={(data) => {
        return (
          <div className="flex gap-4 items-center">
            <Link
              className="bg-primary-blue mx-auto text-white text-sm min-w-[80px] flex justify-center items-center gap-1 p-1 rounded-md"
              to={`/update/user/${data?.id}`}
            >
              <EditIcon className="w-4 h-4" />
              Edit
            </Link>
            <Link className="text-primary-blue" to={`/users/${data?.id}`}>
              <EyeIcon />
            </Link>
          </div>
        );
      }}
    />
  );
};

export default Stocks;
