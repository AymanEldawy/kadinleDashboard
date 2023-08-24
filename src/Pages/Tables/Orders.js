import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ADMIN } from "../../Api/globalActions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { EditIcon, EyeIcon, SenderIcon } from "../../Helpers/Icons";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Orders = () => {
  const navigate = useNavigate();
  const [toggleMore, setToggleMore] = useState(false);
  const columns = COMBINE_DB_API.combine_order || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="order"
      columns={columns}
      title="Orders"
      hideDelete={ADMIN?.role?.number !== 4}
      hideAction={ADMIN?.role?.number !== 4}
      renderTableAction={(data) => {
        return (
          <div className="flex items-center gap-2 ">
            <button
              className="bg-primary-red text-white p-1 rounded-md"
              onClick={() => setToggleMore((prev) => (prev ? "" : data?.id))}
            >
              <EyeIcon className={` w-5 h-5`} />
            </button>
            <Link
              to={`/update/order/${data?.id}`}
              className="bg-primary-blue mx-auto text-white text-sm min-w-[80px] flex justify-center items-center gap-1 p-1 rounded-md"
            >
              <EditIcon className="w-4 h-4" />
              Edit
            </Link>
            <Link
              to="/send-email"
              className="bg-yellow-200 mx-auto text-yellow-600 text-sm min-w-[80px] flex justify-center items-center gap-1 p-1 rounded-md"
              state={{
                availableTemplates: [24],
                userId: data?.user_id,
              }}
            >
              <SenderIcon className="w-4 h-4" />
              Reply{" "}
            </Link>
          </div>
        );
      }}
      openDrawerMore={toggleMore}
      setOpenDrawerMore={setToggleMore}
    />
  );
};

export default Orders;
