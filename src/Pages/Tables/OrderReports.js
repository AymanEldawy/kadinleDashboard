import React from "react";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { Link } from "react-router-dom";
import { SenderIcon } from "../../Helpers/Icons";

const OrderReports = () => {
  const columns = COMBINE_DB_API.combine_order_report || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="order_report"
      columns={columns}
      title="Order Reports"
      renderTableAction={(data) => {
        return (
          <Link
            to="/send-email"
            className="bg-yellow-200 mx-auto text-yellow-600 text-sm min-w-[80px] flex justify-center items-center gap-1 p-1 rounded-md"
            state={{
              availableTemplates: [0, 8, 17, 18, 20],
              userId: data?.user_id,
            }}
          >
            <SenderIcon className="w-4 h-4" />
            Reply{" "}
          </Link>
        );
      }}
    />
  );
};

export default OrderReports;
