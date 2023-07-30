

import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { useMemo } from "react";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import DynamicLayout from "../../Pages/Dynamics/DynamicLayout";
import { UserInfo } from "../Global/UserInfo/UserInfo";

export const SingleUserTable = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name } = params

  const columns = useMemo(() => {
    return COMBINE_DB_API?.[`combine_user_${name}`]
  }, [name])

  const user = location?.state;

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME={`user_${name}`}
      additionalData={{ userId: user?.id }}
      columns={columns}
      contentBar={
        <div className="mb-4 pb-2 border-b dark:border-borderdark">
          <UserInfo user={user} />
        </div>
      }
      renderTableAction={(data) => {
        return (
          <Link
            className="text-primary-blue hover:underline"
            to={`/update/${name}/${data?.id}`}
          >
            Edit
          </Link>
        );
      }}
    />
  );
};

export default SingleUserTable;
