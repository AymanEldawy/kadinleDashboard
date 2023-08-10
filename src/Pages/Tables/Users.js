import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { EditIcon, EyeIcon } from "../../Helpers/Icons";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Users = (props) => {
  const { user: ADMIN } = useGlobalOptions()
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_user || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="user"
      columns={columns}
      title="users"
      onAddClick={ADMIN?.role?.number === 4 ? () => navigate(`/add-user`) : null}
      hideDelete={ADMIN?.role?.number !== 4}
      hideAction={ADMIN?.role?.number !== 4}
      renderTableAction={(data) => {
        return (
          <div className="flex gap-4 items-center">
            {
              ADMIN?.role?.title === 'superadmin' ?
                <Link
                  className="bg-primary-blue mx-auto text-white text-sm min-w-[80px] flex justify-center items-center gap-1 p-1 rounded-md"
                  to={`/update/user/${data?.id}`}
                >
                  <EditIcon className="w-4 h-4" />
                  Edit
                </Link>
                : null
            }
            <Link className="text-primary-blue" state={data} to={`/users/${data?.id}`}>
              <EyeIcon />
            </Link>
          </div>
        );
      }}
    />
  );
};

export default Users;
