import React, { useEffect } from "react";
import { useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
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
  console.log("🚀 ~ file: SingleUserTable.js:21 ~ SingleUserTable ~ user:", user)

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME={`user_${name}`}
      additionalData={{ userId: user?.id }}
      columns={columns}
      contentBar={
        <div className="mb-2 dark:border-borderdark">
          <UserInfo user={user} />
        </div>
      }
      renderTableAction={(data) => {
        return (
          <Link
            className="text-primary-blue hover:underline"
            to={`/update/user_${name}/${data?.id}`}
          >
            Edit
          </Link>
        );
      }}
    />
  );
};

export default SingleUserTable;
