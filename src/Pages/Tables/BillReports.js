import React from "react";
import { Link } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { SenderIcon } from "../../Helpers/Icons";
import DynamicLayout from "../Dynamics/DynamicLayout";

const BillReports = () => {
  const columns = COMBINE_DB_API.combine_bill_report || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="bill_report"
      columns={columns}
      title="Bill Reports"
      renderTableAction={(data) => {
        return (
          <Link
            to="/send-email"
            className="bg-yellow-200 mx-auto text-yellow-600 text-sm min-w-[80px] flex justify-center items-center gap-1 p-1 rounded-md"
            state={{
              availableTemplates: [0, 9],
              userId: data?.user_id,
            }}
          >
            <SenderIcon className="w-4 h-4" />
            Reply{" "}
          </Link>
        );
      }}
      // onAddClick={() => navigate(`/add-bill`)}
    />
  );
};

export default BillReports;
