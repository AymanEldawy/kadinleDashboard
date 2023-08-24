import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ADMIN } from "../../Api/globalActions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { EditIcon, SenderIcon } from "../../Helpers/Icons";
import DynamicLayout from "../Dynamics/DynamicLayout";

const OrderReturnRequests = () => {
  const columns = COMBINE_DB_API.combine_order_return_request || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="order_return_request"
      columns={columns}
      title="Order Return Requests"
      hideDelete={ADMIN?.role?.number !== 4}
      hideAction={ADMIN?.role?.number !== 4}
      renderTableAction={(data) => {
        return (
          <div className="flex items-center gap-2 ">
            <Link
              to={`/update/order_return_request/${data?.id}`}
              className="bg-primary-blue mx-auto text-white text-sm min-w-[80px] flex justify-center items-center gap-1 p-1 rounded-md"
            >
              <EditIcon className="w-4 h-4" />
              Edit
            </Link>
            <Link
              to="/send-email"
              className="bg-yellow-200 mx-auto text-yellow-600 text-sm min-w-[80px] flex justify-center items-center gap-1 p-1 rounded-md"
              state={{
                availableTemplates: [21, 22, 24],
                userId: data?.user_id,
              }}
            >
              <SenderIcon className="w-4 h-4" />
              Reply{" "}
            </Link>
          </div>
        );
      }}
    />
  );
};

export default OrderReturnRequests;
